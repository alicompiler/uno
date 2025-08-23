import { useEffect, useState } from 'react';
import type { GameStatus } from '../../Domain/Message/Incoming/GameStatusMessagePayload';
import Confetti from 'react-confetti';

export type MyGameResult = 'win' | 'lose';

interface Props {
    gameState: GameStatus;
}

export const GameResult: React.FC<Props> = ({ gameState }) => {
    const [myGameResult, setMyGameResult] = useState<MyGameResult | null>(null);

    const myCardsCount = gameState.myCards.length;
    const hasGameFinished = gameState.finished;
    useEffect(() => {
        if (hasGameFinished && !myGameResult) {
            const didIWon = myCardsCount === 0;
            if (didIWon) {
                setMyGameResult('win');
            } else {
                setMyGameResult('lose');
            }
        }
    }, [hasGameFinished, myCardsCount, myGameResult]);

    if (myGameResult === 'win') {
        return <Confetti width={window.innerWidth} height={window.innerHeight} />;
    } else if (myGameResult === 'lose') {
        return (
            <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                numberOfPieces={100}
                colors={['#6B7280', '#374151', '#111827']}
                recycle={false}
                gravity={0.3}
            />
        );
    } else {
        return null;
    }
};
