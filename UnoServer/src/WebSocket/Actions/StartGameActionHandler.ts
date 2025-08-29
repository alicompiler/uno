import { WebSocket } from 'ws';
import { Game, startGame } from '../../Domain/Game/Game';
import { IncomingMessage } from '../Message/Incoming/IncomingMessage';
import { BaseActionHandler } from './BaseActionHandler';

export class StartGameActionHandler extends BaseActionHandler {
    handle(_: WebSocket, __: IncomingMessage, game: Game) {
        const { game: newGame, events } = startGame(game);
        return { game: newGame, events: events };
    }

    protected allowOnlyAdmins(): boolean {
        return true;
    }

    protected ensureGameHasStarted(): boolean {
        return false;
    }
}
