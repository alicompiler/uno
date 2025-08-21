import { useMemo } from 'react';
import { getTableLayout, reArrangePlayers } from '../../Domain/GamePlay/Utils';
import type { GameStatus } from '../../Domain/Message/Incoming/GameStatusMessagePayload';
import CWIcon from './../../assets/cw.png';
import CCWIcon from './../../assets/ccw.png';
import { UnoCardComponent } from '../../Components/UnoCard/UnoCard';
import { TablePlayer } from './TablePlayer';

interface TableProps {
    gameState: GameStatus;
    meId: string;
}

export const Table: React.FC<TableProps> = ({ meId, gameState }) => {
    const players = gameState.players;
    const direction = gameState.direction;
    const layout = getTableLayout(players.length);
    const arrangedPlayers = useMemo(() => {
        const meIndex = players.findIndex((p) => p.id === meId);
        return reArrangePlayers(players, meIndex);
    }, [players, meId]);

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
        <div className="relative">
            <div className="bg-indigo-500 w-50 h-96 md:w-72 md:h-100 lg:w-80 lg:h-140 rounded-full shadow-lg flex flex-col gap-2 justify-between items-center text-white font-bold border-8 border-orange-400">
                <div className="p-8">
                    <img src={direction === 'rtl' ? CWIcon : CCWIcon} className="w-8 h-8 invert-100" />
                </div>
                <div>
                    {gameState.topCard ? (
                        <UnoCardComponent height={120 * 1.5} width={70 * 1.5} card={gameState.topCard} />
                    ) : null}
                </div>
                <div className="p-8">
                    <button className="border-2 border-white bg-orange-500 text-white rounded px-4 py-2 cursor-pointer hover:opacity-70">
                        Drew Card
                    </button>
                </div>
            </div>
            <div className="absolute -left-10 top-1/5 h-2/3 flex flex-col items-center justify-around">
                {left.map((p) => (
                    <div key={p.id} className="rotate-270">
                        <TablePlayer id={p.id} name={p.name} isActive={false} />
                    </div>
                ))}
            </div>
            <div className="absolute -right-10 top-1/5 h-2/3 flex flex-col items-center justify-around">
                {right.map((p) => (
                    <div key={p.id} className="rotate-270">
                        <TablePlayer id={p.id} name={p.name} isActive={false} />
                    </div>
                ))}
            </div>
            <div className="absolute right-0 -left-0 -top-10 w-full flex items-center justify-center">
                {top.map((p) => (
                    <TablePlayer key={p.id} id={p.id} name={p.name} isActive={false} />
                ))}
            </div>
            <div className="absolute right-0 left-0 -bottom-10 w-full flex items-center justify-center">
                {arrangedPlayers[0] && (
                    <TablePlayer id={arrangedPlayers[0].id} name={arrangedPlayers[0].name} isActive={false} />
                )}
            </div>
        </div>
    );
};
