import { MessageType, type OutgoingMessage } from '../../Message/Outgoing/OutgoingMessage';
import { useWebsocket } from '../../Websocket/UseWebsocket';

interface UsePlayCardOptions {
    onFailure?: (message: string) => void;
}
export function usePlayCard(options?: UsePlayCardOptions): (cardId: string, extraPayload: unknown) => void {
    const wsContext = useWebsocket();
    return (cardId, extraPayload) => {
        const ws = wsContext.ws;

        if (wsContext.connectionStatus !== 'connected' || !ws) {
            options?.onFailure?.('no connection');
            return;
        }

        const message = JSON.stringify({
            type: MessageType.PlayCard,
            payload: {
                cardId,
                extraPayload,
            },
        } as OutgoingMessage);

        ws.send(message);
    };
}
