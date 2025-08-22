import { Game } from '../../Domain/Game/Game';
import { getConnectionsForGame } from '../Connections';
import { createGameStatusResponse } from './../Message/Outgoing/GameStatePayload';
import { GameEvent } from './GameEvent';

export class GameStateEvent implements GameEvent {
    send(game: Game): void {
        const connections = getConnectionsForGame(
            game.id,
            game.players.map((p) => p.id)
        );

        const keys = Object.keys(connections);
        keys.forEach((pId) => {
            const ws = connections[pId];
            ws.send(createGameStatusResponse(game, pId));
        });
    }
}
