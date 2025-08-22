import { WebSocket } from 'ws';
import { CardColor, cardColors } from '../../Domain/Card/Card';
import {
    CardNotFoundErrorCode,
    InvalidCardErrorCode,
    InvalidCardPayloadErrorCode,
} from '../../Domain/Errors/ErrorCodes';
import { canPlayCard, Game, playCard } from '../../Domain/Game/Game';
import { Player } from '../../Domain/Player/Player';
import { IncomingMessage } from '../Message/Incoming/IncomingMessage';
import { BaseActionHandler } from './BaseActionHandler';

export class PlayCardActionHandler extends BaseActionHandler {
    handle(ws: WebSocket, message: IncomingMessage, game: Game, player: Player): Game | null {
        const card = player.cards.find((c) => c.id === message.payload.cardId);
        if (!card) {
            this.sendError(ws, 'cannot find the card', CardNotFoundErrorCode);
            return null;
        }

        if (card.isWild) {
            const extraPayload = message.payload.extraPayload as { color: CardColor };
            if (!extraPayload || !cardColors.includes(extraPayload.color)) {
                this.sendError(ws, 'invalid payload', InvalidCardPayloadErrorCode);
                return null;
            }
        }

        if (!canPlayCard(game, card)) {
            this.sendError(ws, 'cannot play card', InvalidCardErrorCode);
            return null;
        }

        // TODO: validate extra payload
        const { game: updatedGame } = playCard(game, card, message.payload.extraPayload);
        return updatedGame;
    }

    protected checkTurn(): boolean {
        return true;
    }
}
