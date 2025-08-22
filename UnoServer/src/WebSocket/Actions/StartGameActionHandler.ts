import { WebSocket } from 'ws';
import { getServiceProvider } from '../../Core/ServiceProvider';
import { Game, startGame } from '../../Domain/Game/Game';
import { IncomingMessage } from '../Message/Incoming/IncomingMessage';
import { BaseActionHandler } from './BaseActionHandler';

export class StartGameActionHandler extends BaseActionHandler {
    handle(_: WebSocket, __: IncomingMessage, game: Game): Game | null {
        startGame(game);
        return game;
    }

    protected allowOnlyAdmins(): boolean {
        return true;
    }
}
