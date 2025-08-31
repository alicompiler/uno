import { WebSocket } from 'ws';
import { IncomingMessage } from 'http';
import { registerConnection, unregisterConnection } from './Connections';
import { getServiceProvider } from '../Core/ServiceProvider';
import { GameStateEvent } from './Events/GameStateEvent';
import { handleWebSocketMessage } from './WebSocketMessageHandler';
import { Game, updatePlayerConnectionStatus } from '../Domain/Game/Game';
import { cancelGameRemoval, scheduleGameRemoval } from '../Jobs/GameCleanup';

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
    if (!game || canPlayerJoin(game, playerId) === false) {
        ws.close();
        return;
    }

    registerConnection(gameId, playerId, ws);
    updatePlayerConnectionStatus(game, playerId, true);
    cancelGameRemoval(gameId);

    console.log(`Player connected: Game Id: ${gameId} , Player Id: ${playerId}`);

    ws.on('message', (data) => {
        handleWebSocketMessage(data.toString(), gameId, playerId, ws);
    });

    ws.on('close', () => {
        unregisterConnection(gameId, playerId);
        updatePlayerConnectionStatus(game, playerId, false);
        const gameStatusEvent = new GameStateEvent();
        gameStatusEvent.send(game);

        scheduleGameRemoval(gameId);
    });

    const gameStatusEvent = new GameStateEvent();
    gameStatusEvent.send(game);
};

const canPlayerJoin = (game: Game, playerId: string) => {
    const isPlayerAlreadyExist = game.players.some((p) => p.id === playerId);
    return game.finished === false && (game.hasStarted === false || (game.hasStarted && isPlayerAlreadyExist));
};
