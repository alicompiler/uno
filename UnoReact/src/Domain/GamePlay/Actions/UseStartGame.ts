import { MessageType, type OutgoingMessage } from '../../Message/Outgoing/OutgoingMessage';
import { useWebsocket } from '../../Websocket/UseWebsocket';

interface UseStartGameOptions {
    onFailure?: (message: string) => void;
}
export function useStartGameAction(options?: UseStartGameOptions): () => void {
    const wsContext = useWebsocket();
    return () => {
        const ws = wsContext.ws;

        if (wsContext.connectionStatus !== 'connected' || !ws) {
            options?.onFailure?.('no connection');
            return;
        }

        const message = JSON.stringify({
            type: MessageType.StartGame,
        } as OutgoingMessage);

        ws.send(message);
    };
}
