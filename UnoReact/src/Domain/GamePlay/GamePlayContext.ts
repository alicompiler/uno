import React from 'react';
import type { GameStatus } from '../Message/Incoming/GameStatusMessagePayload';

export interface GamePlayContextType {
    gameState: GameStatus | null;
    gameId: string;
}

export const GamePlayContext = React.createContext<GamePlayContextType | null>(null);
