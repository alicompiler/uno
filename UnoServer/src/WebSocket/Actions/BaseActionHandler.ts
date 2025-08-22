import { WebSocket } from 'ws';
import { IncomingMessage } from '../Message/Incoming/IncomingMessage';
import { ActionHandler } from './ActionHandler';
import { getServiceProvider } from '../../Core/ServiceProvider';
import { createErrorResponse } from '../Message/Outgoing/ErrorMessagePayload';
import {
    GameNotFoundErrorCode,
    ItsNotYourTurnErrorCode,
    PlayerNotAdminErrorCode,
    PlayerNotFoundErrorCode,
} from '../../Domain/Errors/ErrorCodes';
import { Game } from '../../Domain/Game/Game';
import { GameStateEvent } from '../Events/GameStateEvent';
import { Player } from '../../Domain/Player/Player';

const sp = getServiceProvider();
const gameRepository = sp.getGameRepository();

export abstract class BaseActionHandler implements ActionHandler {
    constructor(
        private readonly gameId: string,
        private readonly playerId: string
    ) {}

    handleAction(ws: WebSocket, message: IncomingMessage): void {
        const game = gameRepository.findById(this.gameId);
        if (!game) {
            this.sendError(ws, 'cannot start game, cannot find the game', GameNotFoundErrorCode);
            return;
        }

        const player = game.players.find((p) => p.id === this.playerId);
        if (!player) {
            this.sendError(ws, 'cannot start game, cannot find the player', PlayerNotFoundErrorCode);
            return;
        }

        if (this.allowOnlyAdmins()) {
            if (!player.isAdmin) {
                this.sendError(ws, 'cannot start game, player is not admin', PlayerNotAdminErrorCode);
                return;
            }
        }

        if (this.checkTurn()) {
            const currentTurnPlayer = this.currentTurnPlayer(game);
            if (currentTurnPlayer.id !== player.id) {
                this.sendError(ws, 'its not your turn', ItsNotYourTurnErrorCode);
                return;
            }
        }

        const updatedGame = this.handle(ws, message, game, player);
        if (updatedGame === null) {
            return;
        }

        gameRepository.update(updatedGame);

        const gameStatusEvent = new GameStateEvent();
        gameStatusEvent.send(updatedGame);
    }

    abstract handle(ws: WebSocket, message: IncomingMessage, game: Game, player: Player): Game | null;

    protected allowOnlyAdmins(): boolean {
        return false;
    }

    protected checkTurn(): boolean {
        return false;
    }

    protected currentTurnPlayer(game: Game): Player {
        return game.players[game.activePlayerIndex];
    }

    protected sendError(ws: WebSocket, message: string, code: string): void {
        const errorResponse = createErrorResponse(message, code);
        ws.send(errorResponse);
    }
}
