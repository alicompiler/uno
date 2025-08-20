import { useMemo } from 'react';
import { useParams } from 'react-router';
import { UnoCardComponent } from '../../Components/UnoCard/UnoCard';
import CWIcon from './../../assets/cw.png';
import CCWIcon from './../../assets/cw.png';
import { CardBack } from '../../Components/UnoCard/CardBack';

export const GamePlayPage: React.FC = () => {
    const { gameId } = useParams() as { gameId: string };
    console.log(gameId);
    const players = [
        { name: 'Hay', id: 'Hay' },
        { name: 'Mah', id: 'Mah' },
        { name: 'Hak', id: 'Hak' },
        { name: 'Muj', id: 'Muj' },
        { name: 'Dur', id: 'Dur' },
        { name: 'Mua', id: 'Mua' },
        { name: 'Ali', id: 'ali' },
        { name: 'Muh', id: 'Muh' },
    ];

    return (
        <div className="flex items-center justify-center h-full gap-8">
            <Table players={players} meId="ali" activePlayer={6} direction="rtl" />
        </div>
    );
};

interface TableProps {
    players: { id: string; name: string }[];
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
            <div className="bg-indigo-500 w-50 h-96 md:w-72 md:h-100 lg:w-80 lg:h-140 rounded-full shadow-lg flex flex-col gap-2 justify-center items-center text-white font-bold border-8 border-orange-400">
                <div>
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
                <div>
                    <div className="rotate-270 cursor-pointer">
                        <CardBack width={70} height={120} />
                    </div>
                    <p>Cards Deck</p>
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
                <Player id={arrangedPlayers[0].id} name={arrangedPlayers[0].name} isActive={false} />
            </div>
        </div>
    );
};

const Player: React.FC<{ name: string; id: string; isActive: boolean }> = ({ name }) => {
    return (
        <div className="bg-black text-white p-2 rounded shadow-2xl">
            <p className="text-xl w-12 overflow-ellipsis text-center">{name}</p>
        </div>
    );
};

type Layout = { right: number; top: number; left: number };

const getTableLayout = (length: number): Layout => {
    const map: Record<number, Layout> = {
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
