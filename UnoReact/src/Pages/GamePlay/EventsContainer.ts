import { useEffect, useMemo, type PropsWithChildren } from 'react';
import {
    SOUND_EFFECT_KEY_BLUE,
    SOUND_EFFECT_KEY_GAME_STARTED,
    SOUND_EFFECT_KEY_GREEN,
    SOUND_EFFECT_KEY_NEW_TURN,
    SOUND_EFFECT_KEY_RED,
    SOUND_EFFECT_KEY_YELLOW,
    SOUND_EFFECT_KEY_YOU_LOSE,
    SOUND_EFFECT_KEY_YOU_WIN,
} from '../../App';
import { useDisplayMessage } from '../../Components/MessageProvider/UseDisplayMessage';
import { useGamePlay } from '../../Domain/GamePlay/UseGamePlay';
import { getEventMessage } from '../../Domain/Message/Incoming/EventMessage';
import { EventType } from '../../Domain/Message/Incoming/IncomingMessage';
import { useSoundEffects } from '../../Domain/SoundEffectProvider/UseSoundEffects';

export const EventsContainer: React.FC<PropsWithChildren> = () => {
    const displayMessage = useDisplayMessage();
    const { play } = useSoundEffects();
    const gamePlay = useGamePlay();
    const events = gamePlay?.latestEvents;
    const activePlayer = gamePlay.gameState?.activePlayer;
    const hasGameStarted = gamePlay.gameState?.hasStarted;

    const me = gamePlay.currentPlayer;

    useEffect(() => {
        if (!events) {
            return;
        }

        const isGameStartedEvent = events.some((e) => e.type === EventType.GameStarted);
        if (isGameStartedEvent) {
            play(SOUND_EFFECT_KEY_GAME_STARTED);
            return;
        }

        const gameFinishedEvent = events.find((e) => e.type === EventType.GameFinished);
        if (gameFinishedEvent) {
            const isMeWinner = gameFinishedEvent.payload.winner.id === me.id;
            if (isMeWinner) {
                play(SOUND_EFFECT_KEY_YOU_WIN);
            } else {
                play(SOUND_EFFECT_KEY_YOU_LOSE);
            }
            return;
        }

        const isNewTurn = events.some((e) => e.type === EventType.SkipNoCard || e.type === EventType.CardPlayed);
        if (isNewTurn) {
            play(SOUND_EFFECT_KEY_NEW_TURN);
        }

        const colorChangedEvent = events.find((e) => e.type === EventType.ColorChanged);
        if (colorChangedEvent) {
            const soundEffectMap = {
                red: SOUND_EFFECT_KEY_RED,
                yellow: SOUND_EFFECT_KEY_YELLOW,
                blue: SOUND_EFFECT_KEY_BLUE,
                green: SOUND_EFFECT_KEY_GREEN,
            };
            const sound = soundEffectMap[colorChangedEvent.payload.newColor];
            play(sound);
        }

        return;
    }, [events, play, me]);

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
        if (events) {
            const message = getEventMessage(events, playersMap ?? {});
            displayMessage(message);
        }
    }, [displayMessage, playersMap, events]);

    useEffect(() => {
        if (hasGameStarted && me.id === activePlayer?.id) {
            displayMessage('YOUR TURN');
        }
    }, [me, activePlayer, displayMessage, hasGameStarted]);

    return null;
};
