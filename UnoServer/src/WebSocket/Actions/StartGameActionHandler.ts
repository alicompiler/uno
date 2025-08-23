import { WebSocket } from 'ws';
import { Game, startGame } from '../../Domain/Game/Game';
import { IncomingMessage } from '../Message/Incoming/IncomingMessage';
import { BaseActionHandler } from './BaseActionHandler';

export class StartGameActionHandler extends BaseActionHandler {
    handle(_: WebSocket, __: IncomingMessage, game: Game) {
        startGame(game);
        return { game, events: [] };
    }

    protected allowOnlyAdmins(): boolean {
        return true;
    }

    protected ensureGameHasStarted(): boolean {
        return false;
    }
}
