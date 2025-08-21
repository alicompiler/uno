import { WebSocket } from 'ws';
import { IncomingMessage } from 'http';
import { registerConnection } from './Connections';
import { getServiceProvider } from '../Core/ServiceProvider';
import { GameStatusEvent } from './Events/GameStatusEvent';
import { handleWebSocketMessage } from './WebSocketMessageHandler';

const serviceProvider = getServiceProvider();
const gamesRepository = serviceProvider.getGameRepository();

export const createWebSocketConnectionHandler = (ws: WebSocket, req: IncomingMessage) => {
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const gameId = url.searchParams.get('gameId');
    const playerId = url.searchParams.get('playerId');

    if (!gameId || !playerId) {
        ws.close();
        console.log('invalid payload connection closed');
        return;
    }

    const game = gamesRepository.findById(gameId);
    if (!game) {
        ws.close();
        console.log('game not found, connection closed');
        return;
    }

    registerConnection(gameId, playerId, ws);

    console.log(`Player connected: Game Id: ${gameId} , Player Id: ${playerId}`);

    ws.on('message', (data) => {
        handleWebSocketMessage(data.toString(), gameId, playerId, ws);
    });

    ws.on('close', () => {});

    const gameStatusEvent = new GameStatusEvent();
    gameStatusEvent.send(game);
};
