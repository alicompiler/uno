import { useEffect, useState } from 'react';
import { useGamePlay } from '../../Domain/GamePlay/UseGamePlay';
import { useWebsocket } from '../../Domain/Websocket/UseWebsocket';
import { getProfile, type Profile } from '../../Domain/Profile/Profile';
import { StatusDot } from './StatusDot';

export const GameInfoBar: React.FC = () => {
    const [time, setTime] = useState(0);
    const gamePlay = useGamePlay();
    const ws = useWebsocket();
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        setProfile(getProfile());
    }, []);

    useEffect(() => {
        setTime(0);
        const intervalId = setInterval(() => {
            // 30 must come from game settings
            setTime((t) => (t + 1) % 30);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [gamePlay.gameState?.activePlayer]);

    const gameState = gamePlay.gameState!;
    const activePlayer = gameState.activePlayer;

    return (
        <div className="w-full flex justify-between items-center">
            <div className="w-12 h-12 border-4 border-cyan-500 rounded-full flex items-center justify-center">
                <p className="text-lg text-white">{time}</p>
            </div>

            <div className="w-44 flex flex-col items-center justify-center">
                <p className="text-md w-full text-center">
                    Playing: {activePlayer.name} {activePlayer.id === profile?.id ? '(You)' : ''}
                </p>
                <p className={`w-full text-md text-center p-1 bg-${gameState.color}-500 rounded`}>
                    {gameState.color.toUpperCase()}
                </p>
            </div>

            <div className="flex items-center justify-center flex-col gap-2">
                <StatusDot status={ws.connectionStatus} />
            </div>
        </div>
    );
};
