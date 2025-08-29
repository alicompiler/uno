import React from 'react';

interface SoundEffectContextType {
    play: (key: string) => void;
    loadAll: () => void;
}

export const SoundEffectContext = React.createContext<SoundEffectContextType>({
    play: () => console.log('cannot find sound effect provider'),
    loadAll: () => console.log('cannot find sound effect provider'),
});
