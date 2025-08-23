import { useCallback, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import type { GameStatus } from '../Message/Incoming/GameStatusMessagePayload';
import { EventType, IncomingMessageType, type IncomingMessage } from '../Message/Incoming/IncomingMessage';
import { WebsocketProvider } from '../Websocket/WebsocketProvider';
import { GamePlayContext, type GamePlayContextType } from './GamePlayContext';
import { type Event } from '../Message/Incoming/IncomingMessage';
import { getProfile, type Profile } from '../Profile/Profile';

interface Props extends PropsWithChildren {
    gameId: string;
}

export const GamePlayProvider: React.FC<Props> = ({ gameId, children }) => {
    const [gameState, setGameState] = useState<GameStatus | null>(null);
    const [winner, setWinner] = useState<GamePlayContextType['winner']>(undefined);
    const [events, setEvents] = useState<Event[]>([]);
    const [profile, setProfile] = useState<Profile | null>(null);

    const handleMessage = useCallback((message: IncomingMessage) => {
        setEvents([]);
        switch (message.type) {
            case IncomingMessageType.GameStatus:
                setGameState(message.payload);
                break;
            case IncomingMessageType.Error:
                // TODO: handle error messages
                break;
            case IncomingMessageType.Event:
                const finishedEvent = message.payload.find((e) => e.type === EventType.GameFinished);
                if (finishedEvent) {
                    setWinner(finishedEvent.payload.winner);
                }
                setEvents(message.payload);
                break;
        }
    }, []);

    useEffect(() => {
        const profile = getProfile();
        if (!profile) {
            throw new Error('Cannot get profile');
        }
        setProfile(profile);
    }, []);

    const contextValue = useMemo(
        () => ({
            gameState,
            gameId: gameId,
            winner,
            events,
            currentPlayer: {
                id: profile?.id ?? '',
                name: profile?.name ?? '',
                isAdmin: gameState?.players.find((p) => p.id === profile?.id && p.isAdmin) !== undefined,
            },
        }),
        [gameState, gameId, winner, events, profile]
    );

    return (
        <WebsocketProvider gameId={gameId} onMessage={handleMessage}>
            <GamePlayContext.Provider value={contextValue}>{children}</GamePlayContext.Provider>
        </WebsocketProvider>
    );
};
