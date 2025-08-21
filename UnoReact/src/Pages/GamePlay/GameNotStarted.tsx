import type React from 'react';
import { useGamePlay } from '../../Domain/GamePlay/UseGamePlay';
import { useStartGameAction } from '../../Domain/GamePlay/Actions/UseStartGame';

export const GameNotStarted: React.FC = () => {
    const gamePlay = useGamePlay();
    const players = gamePlay.gameState!.players;
    const startGame = useStartGameAction();

    return (
        <div className="flex gap-4 flex-col">
            <h2 className="text-xl">Players in the room:</h2>
            <div className="max-h-64 overflow-auto">
                <ul>
                    {players.map((p) => (
                        <li key={p.id} className="text-md">
                            {p.name} {p.isAdmin ? ' (Admin)' : ''}
                        </li>
                    ))}
                </ul>
            </div>

            <button
                className="w-40 border-2 border-indigo-500 text-lg p-2 hover:bg-indigo-500 hover:text-white cursor-pointer"
                onClick={() => startGame()}
            >
                Start
            </button>
        </div>
    );
};
