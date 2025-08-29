import { useMemo } from 'react';
import { getTableLayout, reArrangePlayers } from '../../Domain/GamePlay/Utils';
import type { GameStatus } from '../../Domain/Message/Incoming/GameStatusMessagePayload';
import CWIcon from './../../assets/cw.png';
import CCWIcon from './../../assets/ccw.png';
import { UnoCardComponent } from '../../Components/UnoCard/UnoCard';
import { TablePlayer } from './TablePlayer';
import { useDrawCard } from '../../Domain/GamePlay/Actions/UseDrawCard';
import { useSkipNoCards } from '../../Domain/GamePlay/Actions/UseSkipNoCards';
import { Button } from '../../Components/Button/Button';

interface TableProps {
    gameState: GameStatus;
    meId: string;
}

const MAX_DRAW_COUNT = 1;

export const Table: React.FC<TableProps> = ({ meId, gameState }) => {
    const players = gameState.players;
    const direction = gameState.direction;
    const layout = getTableLayout(players.length);
    const drawCard = useDrawCard();
    const skipNoCard = useSkipNoCards();
    const arrangedPlayers = useMemo(() => {
        const meIndex = players.findIndex((p) => p.id === meId);
        return reArrangePlayers(players, meIndex);
    }, [players, meId]);

    const isMyTurn = gameState.activePlayer.id === meId;

    let pointer = 1;
    const left: GameStatus['players'] = [];
    const right: GameStatus['players'] = [];
    const top: GameStatus['players'] = [];
    for (let i = 0; i < layout.left; i++) {
        left.push(arrangedPlayers[pointer]);
        pointer++;
    }
    for (let i = 0; i < layout.top; i++) {
        top.push(arrangedPlayers[pointer]);
        pointer++;
    }
    for (let i = 0; i < layout.right; i++) {
        right.push(arrangedPlayers[pointer]);
        pointer++;
    }

    return (
        <div className="relative h-full w-full flex items-center justify-center">
            <div
                className={`bg-gray-700 h-full w-4/5 md:w-88 rounded-full shadow-lg shadow-gray-500 flex flex-col gap-2 justify-between items-center text-white font-bold`}
            >
                <div className="p-8 flex flex-col items-center justify-center gap-2">
                    <p className="text-lg">Play Direction</p>
                    <img src={direction === 'rtl' ? CWIcon : CCWIcon} className="w-8 h-8 invert-100" />
                </div>
                <div>
                    {gameState.topCard ? (
                        <UnoCardComponent height={120 * 1.5} width={70 * 1.5} card={gameState.topCard} />
                    ) : null}
                </div>
                <div className="p-8">
                    {isMyTurn ? (
                        <>
                            {gameState.drawCount >= MAX_DRAW_COUNT ? (
                                <Button size="sm" onClick={() => skipNoCard()}>
                                    Skip No Card
                                </Button>
                            ) : (
                                <Button size="sm" onClick={() => drawCard()}>
                                    Draw Card
                                </Button>
                            )}
                        </>
                    ) : null}
                </div>
            </div>
            <div className="absolute -left-10 top-1/5 h-2/3 flex flex-col items-center justify-around">
                {left.map((p) => (
                    <div key={p.id} className="rotate-270">
                        <TablePlayer player={p} isActive={p.id === gameState.activePlayer.id} />
                    </div>
                ))}
            </div>
            <div className="absolute -right-10 top-1/5 h-2/3 flex flex-col items-center justify-around">
                {right.map((p) => (
                    <div key={p.id} className="rotate-270">
                        <TablePlayer player={p} isActive={p.id === gameState.activePlayer.id} />
                    </div>
                ))}
            </div>
            <div className="absolute right-0 -left-0 -top-10 w-full flex items-center justify-center">
                {top.map((p) => (
                    <TablePlayer key={p.id} player={p} isActive={p.id === gameState.activePlayer.id} />
                ))}
            </div>
            <div className="absolute right-0 left-0 -bottom-10 w-full flex items-center justify-center">
                {arrangedPlayers[0] && (
                    <TablePlayer
                        player={arrangedPlayers[0]}
                        isActive={arrangedPlayers[0].id === gameState.activePlayer.id}
                    />
                )}
            </div>
        </div>
    );
};
