import React from 'react';
import type { GameStatus } from '../Message/Incoming/GameStatusMessagePayload';
import { type Event } from '../Message/Incoming/IncomingMessage';

export interface GamePlayContextType {
    gameState: GameStatus | null;
    gameId: string;
    winner?: {
        id: string;
        name: string;
    };
    events: Event[];
}

export const GamePlayContext = React.createContext<GamePlayContextType | null>(null);
