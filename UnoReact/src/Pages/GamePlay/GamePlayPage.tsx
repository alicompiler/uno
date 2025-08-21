import { useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { UnoCardComponent } from '../../Components/UnoCard/UnoCard';
import type { UnoCard } from '../../Domain/Card/UnoCard';
import { GamePlayProvider } from '../../Domain/GamePlay/GamePlayProvider';
import { default as CCWIcon, default as CWIcon } from './../../assets/cw.png';
import { GamePlayContainer } from './GamePlayContainer';
import type { GameStatus } from '../../Domain/Message/Incoming/GameStatusMessagePayload';

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

export const GamePlayPage: React.FC = () => {
    const { gameId } = useParams() as { gameId: string };

    return (
        <GamePlayProvider gameId={gameId}>
            <GamePlayContainer />
        </GamePlayProvider>
    );
};

interface TableProps {
    players: GameStatus['players'];
    activePlayer: number;
    meId: string;
    direction: 'ltr' | 'rtl';
}

const Table: React.FC<TableProps> = ({ players, meId, direction }) => {
    const layout = getTableLayout(players.length);
    const arrangedPlayers = useMemo(() => {
        const meIndex = players.findIndex((p) => p.id === meId);
        return reArrangePlayers(players, meIndex);
    }, [players, meId]);

    let pointer = 1;
    const left: TableProps['players'] = [];
    const right: TableProps['players'] = [];
    const top: TableProps['players'] = [];
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
                    <UnoCardComponent
                        height={120 * 1.5}
                        width={70 * 1.5}
                        card={{
                            id: 'test',
                            isWild: true,
                            value: 'reverse',
                        }}
                    />
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
                        <Player id={p.id} name={p.name} isActive={false} />
                    </div>
                ))}
            </div>
            <div className="absolute -right-10 top-1/5 h-2/3 flex flex-col items-center justify-around">
                {right.map((p) => (
                    <div key={p.id} className="rotate-270">
                        <Player id={p.id} name={p.name} isActive={false} />
                    </div>
                ))}
            </div>
            <div className="absolute right-0 -left-0 -top-10 w-full flex items-center justify-center">
                {top.map((p) => (
                    <Player key={p.id} id={p.id} name={p.name} isActive={false} />
                ))}
            </div>
            <div className="absolute right-0 left-0 -bottom-10 w-full flex items-center justify-center">
                {arrangedPlayers[0] && (
                    <Player id={arrangedPlayers[0].id} name={arrangedPlayers[0].name} isActive={false} />
                )}
            </div>
        </div>
    );
};

const Player: React.FC<{ name: string; id: string; isActive: boolean }> = ({ name }) => {
    return (
        <div className="bg-black text-white p-2 rounded shadow-2xl">
            <p className="text-sm w-12 max-w-12 overflow-ellipsis text-center text-nowrap overflow-hidden">{name}</p>
        </div>
    );
};

type Layout = { right: number; top: number; left: number };

const getTableLayout = (length: number): Layout => {
    const map: Record<number, Layout> = {
        0: { right: 0, top: 0, left: 0 },
        1: { right: 0, top: 0, left: 0 },
        2: { right: 0, top: 1, left: 0 },
        3: { right: 1, top: 0, left: 1 },
        4: { right: 1, top: 1, left: 1 },
        5: { right: 1, top: 2, left: 1 },
        6: { right: 2, top: 1, left: 2 },
        7: { right: 2, top: 2, left: 2 },
        8: { right: 3, top: 1, left: 3 },
        9: { right: 3, top: 2, left: 3 },
        10: { right: 4, top: 1, left: 4 },
    };
    const layout = map[length];
    if (!layout) {
        throw Error('cannot render table with length: ' + length);
    }
    return layout;
};

function reArrangePlayers<T>(players: T[], meIndex: number): T[] {
    const newArray = [...players];
    for (let i = 0; i < meIndex; i++) {
        newArray.push(newArray.shift()!);
    }
    return newArray;
}

const Card = ({ card, raised }: { card: UnoCard; raised?: boolean }) => {
    return (
        <div
            className={`cursor-pointer transition-transform duration-300 ease-out ${
                raised ? '-translate-y-6 scale-105' : 'hover:-translate-y-2 hover:scale-105'
            }`}
            draggable={false}
        >
            <UnoCardComponent card={card} height={120 * 1.5} width={70 * 1.5} />
        </div>
    );
};

export default function HandOfCards() {
    const [selected, setSelected] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const dragRef = useRef({ isDown: false, startX: 0, scrollLeft: 0, moved: false });

    const cards: UnoCard[] = [
        {
            isWild: true,
            id: '1',
        },
        {
            isWild: true,
            id: '2',
            value: 'plus4',
        },
        {
            isWild: false,
            color: 'blue',
            id: '3',
            value: '2',
        },
        {
            isWild: false,
            color: 'green',
            id: '4',
            value: '9',
        },
        {
            isWild: false,
            color: 'blue',
            id: '5',
            value: '1',
        },
        {
            isWild: false,
            color: 'blue',
            id: '6',
            value: '2',
        },
        {
            isWild: false,
            color: 'red',
            id: '7',
            value: '2',
        },
        {
            isWild: false,
            color: 'yellow',
            id: '8',
            value: 'plus2',
        },
        {
            isWild: false,
            color: 'green',
            id: '9',
            value: 'skip',
        },
        {
            isWild: false,
            color: 'red',
            id: '10',
            value: 'reverse',
        },
    ];

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        const el = containerRef.current;
        if (!el) return;
        dragRef.current = { isDown: true, startX: e.clientX, scrollLeft: el.scrollLeft, moved: false };
    };

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const el = containerRef.current;
        const s = dragRef.current;
        if (!el || !s.isDown) return;
        const dx = e.clientX - s.startX;
        if (Math.abs(dx) > 3) s.moved = true;
        el.scrollLeft = s.scrollLeft - dx;
        e.preventDefault();
    };

    const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
        const el = containerRef.current;
        if (!el) return;
        dragRef.current.isDown = false;
        el.releasePointerCapture?.(e.pointerId);
        const cardWidth = el.clientWidth / 5;
        el.scrollTo({ left: Math.round(el.scrollLeft / cardWidth) * cardWidth, behavior: 'smooth' });
    };

    const onCardClick = (id: string) => {
        console.log('onCardClick');
        if (dragRef.current.moved) {
            dragRef.current.moved = false;
            return;
        }
        setSelected((prev) => (prev === id ? null : id));
    };

    return (
        <>
            <style>{`
        .no-scrollbar::-webkit-scrollbar{display:none}
        .no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
      `}</style>

            <div className="relative max-w-full md:max-w-128 lg:max-w-144 flex items-end">
                <div
                    ref={containerRef}
                    className="no-scrollbar select-none overflow-x-auto flex items-end w-full cursor-grab active:cursor-grabbing pt-6"
                    style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={endDrag}
                    onPointerLeave={endDrag}
                >
                    <div className="flex gap-4 px-4 py-2 min-w-max">
                        {cards.map((card) => (
                            <button key={card.id} onClick={() => onCardClick(card.id)}>
                                <Card card={card} raised={selected === card.id} />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
