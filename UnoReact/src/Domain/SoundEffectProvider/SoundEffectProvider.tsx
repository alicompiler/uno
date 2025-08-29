import { useCallback, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import { SoundEffectContext } from './SoundEffectContext';

interface Props extends PropsWithChildren {
    sounds: Record<string, string>;
}

export const SoundEffectProvider: React.FC<Props> = ({ sounds, children }) => {
    const [audioList, setAudioList] = useState<Record<string, HTMLAudioElement>>({});

    useEffect(() => {
        const keys = Object.keys(sounds);
        const audioObjects: Record<string, HTMLAudioElement> = {};
        for (const key of keys) {
            const file = sounds[key];
            const audio = new Audio(file);
            audioObjects[key] = audio;
        }
        setAudioList(audioObjects);
    }, [sounds]);

    const play = useCallback(
        async (key: string) => {
            const audio = audioList[key];
            if (audio) {
                audio.play();
            }
        },
        [audioList]
    );

    const loadAll = useCallback(() => {
        const keys = Object.keys(audioList);
        for (const key of keys) {
            const audio = audioList[key];
            // audio.muted = true;
            audio.play().then(() => {
                audio.pause();
                audio.currentTime = 0;
                audio.muted = false;
            });
        }
    }, [audioList]);

    const contextValue = useMemo(() => ({ play, loadAll }), [play, loadAll]);
    return <SoundEffectContext.Provider value={contextValue}>{children}</SoundEffectContext.Provider>;
};
