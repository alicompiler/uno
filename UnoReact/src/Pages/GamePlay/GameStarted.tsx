import type React from 'react';
import { useEffect, useState } from 'react';
import type { UnoCard } from '../../Domain/Card/UnoCard';
import { usePlayCard } from '../../Domain/GamePlay/Actions/UsePlayCard';
import { useGamePlay } from '../../Domain/GamePlay/UseGamePlay';
import { getProfile } from '../../Domain/Profile/Profile';
import { ChooseColorModal } from './ChooseColorModal';
import { GameInfoBar } from './GameInfoBar';
import { HandOfCards } from './HandOfCards';
import { Table } from './Table';
import { GameResult } from './GameResult';

export const GameStarted: React.FC = () => {
    const [isColorModalOpen, setIsColorModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState<UnoCard | null>(null);
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
                <HandOfCards
                    cards={gameState.myCards}
                    onDiscardCard={(c) => {
                        if (c.isWild) {
                            setIsColorModalOpen(true);
                            setSelectedCard(c);
                        } else {
                            playCard(c.id, {});
                        }
                    }}
                />
            </div>

            <GameResult gameState={gameState} />

            {isColorModalOpen ? (
                <ChooseColorModal
                    onClose={() => setIsColorModalOpen(false)}
                    onSelectColor={(color) => {
                        if (selectedCard) {
                            playCard(selectedCard.id, {
                                color,
                            });
                            setSelectedCard(null);
                        }
                    }}
                />
            ) : null}
        </>
    );
};
