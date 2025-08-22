import { WebSocket } from 'ws';
import { WsActionHandler } from './ActionHandler';
import { IncomingMessage } from '../Message/IncomingMessage';
import { createErrorResponse } from '../Response/ErrorResponse';
import {
    CardNotFoundErrorCode,
    GameNotFoundErrorCode,
    InvalidCardErrorCode,
    InvalidCardPayloadErrorCode,
    ItsNotYourTurnErrorCode,
    PlayerNotFoundErrorCode,
} from '../../Domain/Game/ErrorCodes';
import { getServiceProvider } from '../../Core/ServiceProvider';
import { canPlayCard, playCard } from '../../Domain/Game/Game';
import { GameStatusEvent } from '../Events/GameStatusEvent';
import { CardColor, cardColors } from '../../Domain/Card/Card';

const sp = getServiceProvider();
const gameRepository = sp.getGameRepository();

export class PlayCardActionHandler implements WsActionHandler {
    constructor(
        private readonly gameId: string,
        private readonly playerId: string
    ) {}

    handleAction(ws: WebSocket, message: IncomingMessage): void {
        const game = gameRepository.findById(this.gameId);
        if (!game) {
            const errorResponse = createErrorResponse('cannot find the game', GameNotFoundErrorCode);
            ws.send(errorResponse);
            return;
        }

        const player = game.players.find((p) => p.id === this.playerId);
        if (!player) {
            const errorResponse = createErrorResponse('cannot find the player', PlayerNotFoundErrorCode);
            ws.send(errorResponse);
            return;
        }

        const card = player.cards.find((c) => c.id === message.payload.cardId);
        if (!card) {
            const errorResponse = createErrorResponse('cannot find the card', CardNotFoundErrorCode);
            ws.send(errorResponse);
            return;
        }

        const currentTurnPlayer = game.players[game.activePlayerIndex];
        if (currentTurnPlayer.id !== player.id) {
            const errorResponse = createErrorResponse('its not your turn', ItsNotYourTurnErrorCode);
            ws.send(errorResponse);
            return;
        }

        if (card.isWild) {
            const extraPayload = message.payload.extraPayload as { color: CardColor };

            if (!extraPayload || !cardColors.includes(extraPayload.color)) {
                const errorResponse = createErrorResponse('invalid payload', InvalidCardPayloadErrorCode);
                ws.send(errorResponse);
                return;
            }
        }

        if (!canPlayCard(game, card)) {
            const errorResponse = createErrorResponse('cannot play card', InvalidCardErrorCode);
            ws.send(errorResponse);
            return;
        }

        // TODO: validate extra payload
        const { game: updatedGame } = playCard(game, card, message.payload.extraPayload);
        gameRepository.update(updatedGame);

        const gameStatusEvent = new GameStatusEvent();
        gameStatusEvent.send(updatedGame);
    }
}
