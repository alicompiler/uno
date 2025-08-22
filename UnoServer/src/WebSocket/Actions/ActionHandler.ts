import { WebSocket } from 'ws';
import { IncomingMessage } from '../Message/Incoming/IncomingMessage';

export interface WsActionHandler {
    handleAction(ws: WebSocket, message: IncomingMessage): void;
}
