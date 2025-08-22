import { getServiceProvider } from '../../Core/ServiceProvider';
import {
    DidNotExceedDrawTimesErrorCode,
    GameNotFoundErrorCode,
    ItsNotYourTurnErrorCode,
    PlayerNotFoundErrorCode,
} from '../../Domain/Game/ErrorCodes';
import { skipNoCard } from '../../Domain/Game/Game';
import { GameStatusEvent } from '../Events/GameStatusEvent';
import { WebSocket } from 'ws';
import { createErrorResponse } from '../Response/ErrorResponse';
import { WsActionHandler } from './ActionHandler';

const sp = getServiceProvider();
const gameRepository = sp.getGameRepository();

const MAX_DRAW_COUNT = 1;

export class SkipNoCardActionHandler implements WsActionHandler {
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

        const currentTurnPlayer = game.players[game.activePlayerIndex];
        if (currentTurnPlayer.id !== player.id) {
            const errorResponse = createErrorResponse('its not your turn', ItsNotYourTurnErrorCode);
            ws.send(errorResponse);
            return;
        }

        if (game.drawCount < MAX_DRAW_COUNT) {
            const errorResponse = createErrorResponse("didn't exceed draw times", DidNotExceedDrawTimesErrorCode);
            ws.send(errorResponse);
            return;
        }

        const { game: updatedGame } = skipNoCard(game);
        gameRepository.update(updatedGame);

        const gameStatusEvent = new GameStatusEvent();
        gameStatusEvent.send(updatedGame);
    }
}
