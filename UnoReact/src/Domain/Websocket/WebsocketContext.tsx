import React from 'react';

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

export interface WebsocketContextType {
    ws: WebSocket | null;
    connectionStatus: ConnectionStatus;
}

export const WebsocketContext = React.createContext<WebsocketContextType | null>(null);
