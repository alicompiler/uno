import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import type { GamePlayContextType } from '../../Domain/GamePlay/GamePlayContext';
import { getProfile, type Profile } from '../../Domain/Profile/Profile';
import { Link } from 'react-router';
import { Button } from '../../Components/Button/Button';

export type MyGameResult = 'win' | 'lose';

interface Props {
    winner?: GamePlayContextType['winner'];
}

export const GameResult: React.FC<Props> = ({ winner }) => {
    const [profile, setProfile] = useState<Profile | null>(null);

    const isWinnerMe = winner?.id === profile?.id;

    useEffect(() => {
        setProfile(getProfile());
    }, []);

    if (winner && isWinnerMe) {
        return (
            <div className="p-8 bg-white w-full text-black flex items-center justify-center flex-col gap-4">
                <Confetti width={window.innerWidth} height={window.innerHeight} />
                <p className="text-xl">You Win, Congratulations</p>
                <Link to={'/create-game'}>
                    <Button size="lg">New Game</Button>
                </Link>
            </div>
        );
    } else if (winner && isWinnerMe === false) {
        return (
            <div className="p-4 bg-white w-full text-black flex items-center justify-center flex-col gap-4">
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    numberOfPieces={100}
                    colors={['#6B7280', '#374151', '#111827']}
                    gravity={0.3}
                />

                <p className="text-xl">{winner.name} has won</p>
                <p className="text-xl">You Lost, Butter Luck Next Time</p>
                <Link to={'/create-game'}>
                    <Button size="lg">New Game</Button>
                </Link>
            </div>
        );
    } else {
        return null;
    }
};
