import type React from 'react';
import { GameInfoBar } from './GameInfoBar';
import { Table } from './Table';
import { useGamePlay } from '../../Domain/GamePlay/UseGamePlay';
import { useEffect, useState } from 'react';
import { getProfile } from '../../Domain/Profile/Profile';
import { HandOfCards } from './HandOfCards';
import { usePlayCard } from '../../Domain/GamePlay/Actions/UsePlayCard';

export const GameStarted: React.FC = () => {
    const [myId, setMyId] = useState('');
    const gamePlay = useGamePlay();
    const gameState = gamePlay.gameState!;
    const playCard = usePlayCard();

    useEffect(() => {
        const profile = getProfile();
        setMyId(profile?.id ?? '');
    }, []);

    return (
        <>
            <div className="p-4 w-full">
                <GameInfoBar />
            </div>
            <div className="flex-1">
                <Table gameState={gameState} meId={myId} />
            </div>
            <div>
                <HandOfCards cards={gameState.myCards} onDiscardCard={(c) => playCard(c.id, {})} />
            </div>
        </>
    );
};
