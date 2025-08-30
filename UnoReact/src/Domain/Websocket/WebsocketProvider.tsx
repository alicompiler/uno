import { useEffect, useMemo, useRef, useState, type PropsWithChildren } from 'react';
import { getProfileOrCreateIfNotExists } from '../Profile/Profile';
import type { IncomingMessage } from '../Message/Incoming/IncomingMessage';
import { WebsocketContext, type ConnectionStatus } from './WebsocketContext';

interface Props extends PropsWithChildren {
    gameId: string;
    onMessage: (message: IncomingMessage, ws: WebSocket | null) => void;
}

const baseUrl = import.meta.env.VITE_WS_BASE;

export const WebsocketProvider: React.FC<Props> = ({ gameId, onMessage, children }) => {
    const ws = useRef<WebSocket | null>(null);
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');

    useEffect(() => {
        const profile = getProfileOrCreateIfNotExists();
        ws.current = new WebSocket(`${baseUrl}?gameId=${gameId}&playerId=${profile.id}`);
        setConnectionStatus('connecting');
        ws.current.onopen = () => {
            setConnectionStatus('connected');
        };

        ws.current.onmessage = (message) => {
            const data = JSON.parse(message.data.toString()) as IncomingMessage;
            onMessage(data, ws.current);
        };

        ws.current.onclose = () => {
            setConnectionStatus('disconnected');
        };

        return () => {
            ws.current?.close();
            setConnectionStatus('disconnected');
        };
    }, [gameId, onMessage]);

    const value = useMemo(
        () => ({
            connectionStatus,
            ws: ws.current,
        }),
        [connectionStatus, ws]
    );

    return <WebsocketContext.Provider value={value}>{children}</WebsocketContext.Provider>;
};
