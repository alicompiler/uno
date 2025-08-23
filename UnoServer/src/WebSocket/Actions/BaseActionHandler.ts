import { WebSocket } from 'ws';
import { IncomingMessage } from '../Message/Incoming/IncomingMessage';
import { ActionHandler } from './ActionHandler';
import { getServiceProvider } from '../../Core/ServiceProvider';
import { createErrorResponse } from '../Message/Outgoing/ErrorMessagePayload';
import {
    GameFinishedErrorCode,
    GameNotFoundErrorCode,
    GameNotStartedStartedErrorCode,
    ItsNotYourTurnErrorCode,
    PlayerNotAdminErrorCode,
    PlayerNotFoundErrorCode,
} from '../../Domain/Errors/ErrorCodes';
import { Game } from '../../Domain/Game/Game';
import { GameStateEvent } from '../Events/GameStateEvent';
import { Player } from '../../Domain/Player/Player';
import { UIEvents } from '../Events/UIEvents';
import { Event } from '../../Domain/Event/Event';

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
            this.sendError(ws, 'cannot find the game', GameNotFoundErrorCode);
            return;
        }

        if (this.ensureGameHasStarted()) {
            if (!game.hasStarted) {
                this.sendError(ws, 'game not started yet', GameNotStartedStartedErrorCode);
                return;
            }
        }

        if (this.ensureGameIsNotFinished()) {
            if (game.finished) {
                this.sendError(ws, 'game has finished', GameFinishedErrorCode);
                return;
            }
        }

        const player = game.players.find((p) => p.id === this.playerId);
        if (!player) {
            this.sendError(ws, 'cannot find the player', PlayerNotFoundErrorCode);
            return;
        }

        if (this.allowOnlyAdmins()) {
            if (!player.isAdmin) {
                this.sendError(ws, 'player is not admin', PlayerNotAdminErrorCode);
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

        const result = this.handle(ws, message, game, player);
        if (result === null) {
            return;
        }

        gameRepository.update(result.game);

        const gameStatusEvent = new GameStateEvent();
        gameStatusEvent.send(result.game);

        if (result.events.length > 0) {
            new UIEvents(result.events).send(game);
        }
    }

    abstract handle(
        ws: WebSocket,
        message: IncomingMessage,
        game: Game,
        player: Player
    ): { game: Game; events: Event[] } | null;

    protected allowOnlyAdmins(): boolean {
        return false;
    }

    protected checkTurn(): boolean {
        return false;
    }

    protected ensureGameIsNotFinished(): boolean {
        return true;
    }

    protected ensureGameHasStarted(): boolean {
        return true;
    }

    protected currentTurnPlayer(game: Game): Player {
        return game.players[game.activePlayerIndex];
    }

    protected sendError(ws: WebSocket, message: string, code: string): void {
        const errorResponse = createErrorResponse(message, code);
        ws.send(errorResponse);
    }
}
