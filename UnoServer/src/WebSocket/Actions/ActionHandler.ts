import { WebSocket } from 'ws';

export interface WsActionHandler {
    handleAction(ws: WebSocket): void;
}
