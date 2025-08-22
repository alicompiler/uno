import { DrawCardActionHandler } from './Actions/DrawCardActionHandler';
import { PlayCardActionHandler } from './Actions/PlayCardActionHandler';
import { SkipNoCardActionHandler } from './Actions/SkipNoCardActionHandler';
import { StartGameActionHandler } from './Actions/StartGameActionHandler';
import { MessageType, IncomingMessage } from './Message/Incoming/IncomingMessage';
import { WebSocket } from 'ws';

export const handleWebSocketMessage = (data: string, gameId: string, playerId: string, ws: WebSocket) => {
    const message = JSON.parse(data) as IncomingMessage;

    switch (message.type) {
        case MessageType.StartGame:
            new StartGameActionHandler(gameId, playerId).handleAction(ws);
            break;

        case MessageType.PlayCard:
            new PlayCardActionHandler(gameId, playerId).handleAction(ws, message);
            break;

        case MessageType.DrawCard:
            new DrawCardActionHandler(gameId, playerId).handleAction(ws);
            break;

        case MessageType.SkipNoCard:
            new SkipNoCardActionHandler(gameId, playerId).handleAction(ws);
            break;
    }
};
