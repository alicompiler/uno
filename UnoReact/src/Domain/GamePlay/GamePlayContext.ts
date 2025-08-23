import React from 'react';
import type { GameStatus } from '../Message/Incoming/GameStatusMessagePayload';

export interface GamePlayContextType {
    gameState: GameStatus | null;
    gameId: string;
    winner?: {
        id: string;
        name: string;
    };
}

export const GamePlayContext = React.createContext<GamePlayContextType | null>(null);
