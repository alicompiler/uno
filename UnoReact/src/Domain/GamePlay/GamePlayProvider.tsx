import { useCallback, useState, type PropsWithChildren } from 'react';
import { GamePlayContext } from './GamePlayContext';
import { WebsocketProvider } from '../Websocket/WebsocketProvider';
import type { GameStatus } from '../Message/Incoming/GameStatusMessagePayload';
import { IncomingMessageType, type IncomingMessage } from '../Message/Incoming/IncomingMessage';

interface Props extends PropsWithChildren {
    gameId: string;
}
export const GamePlayProvider: React.FC<Props> = ({ gameId, children }) => {
    const [gameStatus, setGameStatus] = useState<GameStatus | null>(null);

    const handleMessage = useCallback((message: IncomingMessage) => {
        console.log(message.type);
        switch (message.type) {
            case IncomingMessageType.GameStatus:
                setGameStatus(message.payload);
                break;
            case IncomingMessageType.Error:
                console.log('error', message.payload);
                break;
        }
    }, []);

    return (
        <WebsocketProvider gameId={gameId} onMessage={handleMessage}>
            <GamePlayContext.Provider
                value={{
                    gameState: gameStatus,
                    gameId: gameId,
                }}
            >
                {children}
            </GamePlayContext.Provider>
        </WebsocketProvider>
    );
};
