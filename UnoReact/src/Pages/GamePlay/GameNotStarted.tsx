import type React from 'react';
import { useGamePlay } from '../../Domain/GamePlay/UseGamePlay';
import { useStartGameAction } from '../../Domain/GamePlay/Actions/UseStartGame';
import { Button } from '../../Components/Button/Button';
import { StatusDot } from './StatusDot';
import { useWebsocket } from '../../Domain/Websocket/UseWebsocket';

export const GameNotStarted: React.FC = () => {
    const ws = useWebsocket();
    const gamePlay = useGamePlay();
    const players = gamePlay.gameState!.players;
    const startGame = useStartGameAction();

    const host = window.location.host;
    const protocol = window.location.protocol;
    const inviteUrl = `${protocol}//${host}/join-game?gameId=${gamePlay.gameId}`;

    return (
        <div className="flex gap-4 flex-col">
            <div className="flex gap-4 items-center">
                <p>Your Connection Status:</p>
                <StatusDot status={ws.connectionStatus} />
            </div>
            <h2 className="text-xl">Joined:</h2>
            <div className="max-h-64 min-h-40 min-w-64 w-full overflow-auto border-2 border-cyan-400 p-2 rounded">
                <ul>
                    {players.map((p, i) => (
                        <li key={p.id} className={`text-md p-2 ${i % 2 == 0 ? 'bg-gray-500' : 'bg-gray-800'}`}>
                            {p.name} {p.isAdmin ? ' (Admin)' : ''} {p.isConnected ? '' : '[Disconnected]'}
                        </li>
                    ))}
                </ul>
            </div>

            <Button
                disabled={players.length < 2 || gamePlay?.currentPlayer.isAdmin === false}
                size="lg"
                onClick={() => startGame()}
            >
                Start
            </Button>

            {window.navigator?.clipboard ? (
                <Button
                    size="lg"
                    onClick={() => {
                        if (window.navigator && window.navigator.clipboard) {
                            navigator.clipboard
                                .writeText(inviteUrl)
                                .then(() => alert('Link copied to the clipboard'))
                                .catch(() => {
                                    alert('Failed to copy url to the clipboard');
                                });
                        }
                    }}
                >
                    Invite
                </Button>
            ) : (
                <div className="p-2 flex flex-col justify-center items-center gap-4">
                    <p className="text-lg">
                        Copy{' '}
                        <a className="text-blue-500" href={inviteUrl}>
                            This Link
                        </a>{' '}
                        and share it with your friends
                    </p>
                </div>
            )}
        </div>
    );
};
