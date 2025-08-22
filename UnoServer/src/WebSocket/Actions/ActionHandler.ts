import { WebSocket } from 'ws';
import { IncomingMessage } from '../Message/Incoming/IncomingMessage';

export interface ActionHandler {
    handleAction(ws: WebSocket, message: IncomingMessage): void;
}
