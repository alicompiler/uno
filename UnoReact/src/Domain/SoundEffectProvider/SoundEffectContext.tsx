import React from 'react';

interface SoundEffectContextType {
    play: (key: string) => void;
    loadAll: () => void;
}

export const SoundEffectContext = React.createContext<SoundEffectContextType>({
    play: () => console.error('cannot find sound effect provider'),
    loadAll: () => console.error('cannot find sound effect provider'),
});
