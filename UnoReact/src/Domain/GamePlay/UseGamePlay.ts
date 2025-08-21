import { useContext } from 'react';
import { GamePlayContext, type GamePlayContextType } from './GamePlayContext';

export function useGamePlay(): GamePlayContextType {
    const context = useContext(GamePlayContext);
    if (!context) {
        throw new Error('cannot find GamePlayContext');
    }
    return context;
}
