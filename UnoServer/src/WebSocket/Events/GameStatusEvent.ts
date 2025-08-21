import { buildGameStatus, Game } from '../../Domain/Game/Game';
import { getConnectionsForGame } from '../Connections';
import { createGameStatusResponse } from '../Response/GameStatusResponse';
import { WsGameEvent } from './WsGameEvent';

export class GameStatusEvent implements WsGameEvent {
    send(game: Game): void {
        const connections = getConnectionsForGame(
            game.id,
            game.players.map((p) => p.id)
        );

        const response = createGameStatusResponse(game);

        connections.forEach((ws) => ws.send(response));
    }
}
