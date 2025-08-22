import { WebSocket } from 'ws';
import { DidNotExceedDrawTimesErrorCode } from '../../Domain/Errors/ErrorCodes';
import { Game, skipNoCard } from '../../Domain/Game/Game';
import { IncomingMessage } from '../Message/Incoming/IncomingMessage';
import { createErrorResponse } from '../Message/Outgoing/ErrorMessagePayload';
import { BaseActionHandler } from './BaseActionHandler';

// TODO: should be moved to the settings
const MAX_DRAW_COUNT = 1;

export class SkipNoCardActionHandler extends BaseActionHandler {
    handle(ws: WebSocket, _: IncomingMessage, game: Game): Game | null {
        if (game.drawCount < MAX_DRAW_COUNT) {
            this.sendError(ws, "didn't exceed draw times", DidNotExceedDrawTimesErrorCode);
            return null;
        }

        const { game: updatedGame } = skipNoCard(game);
        return updatedGame;
    }

    protected checkTurn(): boolean {
        return true;
    }
}
