import type React from 'react';
import { useGamePlay } from '../../Domain/GamePlay/UseGamePlay';
import { GameNotStarted } from './GameNotStarted';
import { GameStarted } from './GameStarted';

export const GamePlayContainer: React.FC = () => {
    const gamePlay = useGamePlay();

    if (!gamePlay.gameState) {
        return (
            <div className="flex items-center justify-center h-full flex-col gap-8">
                <p className="text-lg">Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center h-full flex-col gap-8">
            {gamePlay.gameState?.hasStarted ? <GameStarted /> : <GameNotStarted />}
        </div>
    );
};
