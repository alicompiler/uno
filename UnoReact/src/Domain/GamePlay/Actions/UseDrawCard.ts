import { MessageType, type OutgoingMessage } from '../../Message/Outgoing/OutgoingMessage';
import { useWebsocket } from '../../Websocket/UseWebsocket';

interface UseDrawCardOptions {
    onFailure?: (message: string) => void;
}
export function useDrawCard(options?: UseDrawCardOptions): () => void {
    const wsContext = useWebsocket();
    return () => {
        const ws = wsContext.ws;

        if (wsContext.connectionStatus !== 'connected' || !ws) {
            options?.onFailure?.('no connection');
            return;
        }

        const message = JSON.stringify({
            type: MessageType.DrawCard,
        } as OutgoingMessage);

        ws.send(message);
    };
}
