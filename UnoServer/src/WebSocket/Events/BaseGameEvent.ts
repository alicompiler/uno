import { Game } from '../../Domain/Game/Game';
import { getConnectionsForGame } from '../Connections';
import { GameEvent } from './GameEvent';

export abstract class BaseGameEvent implements GameEvent {
    send(game: Game): void {
        const connections = getConnectionsForGame(
            game.id,
            game.players.map((p) => p.id)
        );

        const keys = Object.keys(connections);
        keys.forEach((pId) => {
            const ws = connections[pId];
            ws.send(this.getMessageForPlayer(game, pId));
        });
    }

    protected abstract getMessageForPlayer(game: Game, playerId: string): string;
}
