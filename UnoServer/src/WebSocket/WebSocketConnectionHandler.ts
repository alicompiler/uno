import { WebSocket } from 'ws';
import { IncomingMessage } from 'http';
import { registerConnection, unregisterConnection } from './Connections';
import { getServiceProvider } from '../Core/ServiceProvider';
import { GameStateEvent } from './Events/GameStateEvent';
import { handleWebSocketMessage } from './WebSocketMessageHandler';
import { updatePlayerConnectionStatus } from '../Domain/Game/Game';

const serviceProvider = getServiceProvider();
const gamesRepository = serviceProvider.getGameRepository();

export const createWebSocketConnectionHandler = (ws: WebSocket, req: IncomingMessage) => {
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const gameId = url.searchParams.get('gameId');
    const playerId = url.searchParams.get('playerId');

    if (!gameId || !playerId) {
        ws.close();
        return;
    }

    const game = gamesRepository.findById(gameId);
    if (!game) {
        ws.close();
        return;
    }

    registerConnection(gameId, playerId, ws);
    updatePlayerConnectionStatus(game, playerId, true);

    console.log(`Player connected: Game Id: ${gameId} , Player Id: ${playerId}`);

    ws.on('message', (data) => {
        handleWebSocketMessage(data.toString(), gameId, playerId, ws);
    });

    ws.on('close', () => {
        unregisterConnection(gameId, playerId);
        updatePlayerConnectionStatus(game, playerId, false);
        const gameStatusEvent = new GameStateEvent();
        gameStatusEvent.send(game);
    });

    const gameStatusEvent = new GameStateEvent();
    gameStatusEvent.send(game);
};
