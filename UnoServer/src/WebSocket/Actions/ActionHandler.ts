import { WebSocket } from 'ws';
import { IncomingMessage } from '../Message/IncomingMessage';

export interface WsActionHandler {
    handleAction(ws: WebSocket, message: IncomingMessage): void;
}
