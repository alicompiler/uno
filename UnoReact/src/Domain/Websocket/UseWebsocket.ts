import { useContext } from 'react';
import { WebsocketContext, type WebsocketContextType } from './WebsocketContext';

export function useWebsocket(): WebsocketContextType {
    const context = useContext(WebsocketContext);
    if (!context) {
        throw new Error('cannot find WebsocketProvider');
    }
    return context;
}
