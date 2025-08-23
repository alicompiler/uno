import { useEffect, useMemo, type PropsWithChildren } from 'react';
import { useDisplayMessage } from '../../Components/MessageProvider/UseDisplayMessage';
import { useGamePlay } from '../../Domain/GamePlay/UseGamePlay';
import { getEventMessage } from '../../Domain/Message/Incoming/EventMessage';

export const EventMessagesContainer: React.FC<PropsWithChildren> = () => {
    const displayMessage = useDisplayMessage();
    const gamePlay = useGamePlay();
    const events = gamePlay?.events;

    const playersMap = useMemo(() => {
        return gamePlay?.gameState?.players.reduce(
            (map, p) => {
                map[p.id] = p.name;
                return map;
            },
            {} as Record<string, string>
        );
    }, [gamePlay?.gameState?.players]);

    useEffect(() => {
        const message = getEventMessage(events, playersMap ?? {});
        displayMessage(message);
    }, [displayMessage, playersMap, events]);

    return null;
};
