import type React from 'react';
import { useGamePlay } from '../../Domain/GamePlay/UseGamePlay';
import { useStartGameAction } from '../../Domain/GamePlay/Actions/UseStartGame';
import { Button } from '../../Components/Button/Button';

export const GameNotStarted: React.FC = () => {
    const gamePlay = useGamePlay();
    const players = gamePlay.gameState!.players;
    const startGame = useStartGameAction();

    return (
        <div className="flex gap-4 flex-col">
            <h2 className="text-xl">Joined:</h2>
            <div className="max-h-64 min-h-40 w-64 overflow-auto border-2 border-cyan-400 p-2 rounded">
                <ul>
                    {players.map((p, i) => (
                        <li key={p.id} className={`text-md p-2 ${i % 2 == 0 ? 'bg-gray-500' : 'bg-gray-800'}`}>
                            {p.name} {p.isAdmin ? ' (Admin)' : ''}
                        </li>
                    ))}
                </ul>
            </div>

            <Button disabled={players.length < 2} size="lg" onClick={() => startGame()}>
                Start
            </Button>

            <Button
                size="lg"
                onClick={() => {
                    const host = window.location.host;
                    const protocol = window.location.protocol;
                    const inviteUrl = `${protocol}${host}/join-game?gameId=${gamePlay.gameId}`;
                    if (window.navigator) {
                        navigator.clipboard.writeText(inviteUrl).catch(() => {
                            alert('Failed to copy url to the clipboard');
                        });
                    }
                }}
            >
                Invite
            </Button>
        </div>
    );
};
