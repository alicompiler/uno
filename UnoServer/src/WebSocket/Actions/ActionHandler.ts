import { WebSocket } from 'ws';
import { IncomingMessage } from '../Message/WsMessage';

export interface WsActionHandler {
    handleAction(ws: WebSocket, message: IncomingMessage): void;
}
