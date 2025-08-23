import { WebSocket } from 'ws';

const connections: Record<string, Record<string, WebSocket>> = {};

export const getConnection = (playerId: string, gameId: string): WebSocket | null => {
    const playerConnections = connections[playerId];
    if (!playerConnections) {
        return null;
    }

    const connectionInGame = playerConnections[gameId];
    if (!connectionInGame) {
        return null;
    }

    return connectionInGame;
};

export const registerConnection = (gameId: string, playerId: string, ws: WebSocket): void => {
    let playerConnections = connections[playerId];
    if (!playerConnections) {
        playerConnections = {};
        connections[playerId] = playerConnections;
    }

    playerConnections[gameId] = ws;
};

export const unregisterConnection = (gameId: string, playerId: string) => {
    const playerConnections = connections[playerId];
    if (playerConnections) {
        delete playerConnections[gameId];
    }
};

export const getConnectionsForGame = (gameId: string, playersId: string[]): Record<string, WebSocket> => {
    return playersId.reduce(
        (acc, pId) => {
            const connection = getConnection(pId, gameId);
            if (connection != null) {
                acc[pId] = connection;
            }
            return acc;
        },
        {} as Record<string, WebSocket>
    );
};
