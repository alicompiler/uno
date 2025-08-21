import { WebSocket } from 'ws';
import { WsActionHandler } from './ActionHandler';
import { getServiceProvider } from '../../Core/ServiceProvider';
import { createErrorResponse } from '../Response/ErrorResponse';
import { GameNotFoundErrorCode, PlayerNotAdminErrorCode, PlayerNotFoundErrorCode } from '../../Domain/Game/ErrorCodes';
import { GameStatusEvent } from '../Events/GameStatusEvent';
import { startGame } from '../../Domain/Game/Game';

const sp = getServiceProvider();
const gameRepository = sp.getGameRepository();

export class StartGameActionHandler implements WsActionHandler {
    constructor(
        private readonly gameId: string,
        private readonly playerId: string
    ) {}

    handleAction(ws: WebSocket): void {
        const game = gameRepository.findById(this.gameId);
        if (!game) {
            const errorResponse = createErrorResponse('cannot start game, cannot find the game', GameNotFoundErrorCode);
            ws.send(errorResponse);
            return;
        }

        const player = game.players.find((p) => p.id === this.playerId);
        if (!player) {
            const errorResponse = createErrorResponse(
                'cannot start game, cannot find the player',
                PlayerNotFoundErrorCode
            );
            ws.send(errorResponse);
            return;
        }

        if (!player.isAdmin) {
            const errorResponse = createErrorResponse(
                'cannot start game, player is not admin',
                PlayerNotAdminErrorCode
            );
            ws.send(errorResponse);
            return;
        }

        startGame(game);

        const gameStatusEvent = new GameStatusEvent();
        gameStatusEvent.send(game);
    }
}
