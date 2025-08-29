import { useContext } from 'react';
import { SoundEffectContext } from './SoundEffectContext';

export function useSoundEffects(): {
    play: (key: string) => void;
    loadAll: () => void;
} {
    const context = useContext(SoundEffectContext);
    if (!context) {
        throw new Error('cannot find sound effect provider');
    }

    return {
        play: context.play,
        loadAll: context.loadAll,
    };
}
