import { useCallback, useState, type PropsWithChildren } from 'react';
import { GamePlayContext, type GamePlayContextType } from './GamePlayContext';
import { WebsocketProvider } from '../Websocket/WebsocketProvider';
import type { GameStatus } from '../Message/Incoming/GameStatusMessagePayload';
import { EventType, IncomingMessageType, type IncomingMessage } from '../Message/Incoming/IncomingMessage';

interface Props extends PropsWithChildren {
    gameId: string;
}

export const GamePlayProvider: React.FC<Props> = ({ gameId, children }) => {
    const [gameStatus, setGameStatus] = useState<GameStatus | null>(null);
    const [winner, setWinner] = useState<GamePlayContextType['winner']>(undefined);

    const handleMessage = useCallback((message: IncomingMessage) => {
        switch (message.type) {
            case IncomingMessageType.GameStatus:
                setGameStatus(message.payload);
                break;
            case IncomingMessageType.Error:
                console.log('error', message.payload);
                break;
            case IncomingMessageType.Event:
                const finishedEvent = message.payload.find((e) => e.type === EventType.GameFinished);
                if (finishedEvent) {
                    setWinner(finishedEvent.payload.winner);
                }
                break;
        }
    }, []);

    return (
        <WebsocketProvider gameId={gameId} onMessage={handleMessage}>
            <GamePlayContext.Provider
                value={{
                    gameState: gameStatus,
                    gameId: gameId,
                    winner: winner,
                }}
            >
                {children}
            </GamePlayContext.Provider>
        </WebsocketProvider>
    );
};
