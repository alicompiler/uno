import { PlayCardActionHandler } from './Actions/PlayCardActionHandler';
import { StartGameActionHandler } from './Actions/StartGameActionHandler';
import { MessageType, IncomingMessage } from './Message/WsMessage';
import { WebSocket } from 'ws';

export const handleWebSocketMessage = (data: string, gameId: string, playerId: string, ws: WebSocket) => {
    const message = JSON.parse(data) as IncomingMessage;

    switch (message.type) {
        case MessageType.StartGame:
            new StartGameActionHandler(gameId, playerId).handleAction(ws);
            break;

        case MessageType.PlayCard:
            new PlayCardActionHandler(gameId, playerId).handleAction(ws, message);
    }
};
