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
        const intervalId = setInterval(() => {
            setTime((t) => (t + 1) % 60);
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const gameState = gamePlay.gameState!;
    const activePlayer = gameState.activePlayer;

    return (
        <div className="w-full flex justify-between items-center p-4">
            <div className="w-12 h-12 border-2 border-indigo-500 rounded-full flex items-center justify-center">
                <p className="text-md text-indigo-500">{time}</p>
            </div>

            <div>
                <p className="text-md">
                    Playing: {activePlayer.name} {activePlayer.id === profile?.id ? '(You)' : ''}
                </p>
                <p className={`text-md text-center p-1 bg-${gameState.color}-500`}>{gameState.color}</p>
            </div>

            <div>
                <StatusDot status={ws.connectionStatus} />
            </div>
        </div>
    );
};
