import { WebSocket } from 'ws';
import { ExceededDrawTimesErrorCode } from '../../Domain/Errors/ErrorCodes';
import { Game, withdrawCard } from '../../Domain/Game/Game';
import { IncomingMessage } from '../Message/Incoming/IncomingMessage';
import { BaseActionHandler } from './BaseActionHandler';

// TODO: move to the settings
const MAX_DRAW_COUNT = 1;

export class DrawCardActionHandler extends BaseActionHandler {
    handle(ws: WebSocket, _: IncomingMessage, game: Game): Game | null {
        if (game.drawCount >= MAX_DRAW_COUNT) {
            this.sendError(ws, 'exceed draw times', ExceededDrawTimesErrorCode);
            return null;
        }

        const { game: updatedGame } = withdrawCard(game);
        return updatedGame;
    }

    protected checkTurn(): boolean {
        return true;
    }
}
