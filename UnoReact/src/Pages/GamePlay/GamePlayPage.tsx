import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { UnoCardComponent } from '../../Components/UnoCard/UnoCard';
import CWIcon from './../../assets/cw.png';
import CCWIcon from './../../assets/cw.png';
import type { GameStatus } from '../../Domain/Game/GamesService';
import { getProfileOrCreateIfNotExists } from '../../Domain/Profile/Profile';

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

export const GamePlayPage: React.FC = () => {
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
    const { gameId } = useParams() as { gameId: string };
    const [gameStatus, setGameStatus] = useState<GameStatus | null>(null);
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        const profile = getProfileOrCreateIfNotExists();
        ws.current = new WebSocket(`ws://localhost:3001?gameId=${gameId}&playerId=${profile.name}`);
        setConnectionStatus('connecting');
        ws.current.onopen = () => {
            setConnectionStatus('connected');
        };

        ws.current.onmessage = (message) => {
            const data = JSON.parse(message.data.toString());
            if (data.event === 'game-status') {
                setGameStatus(data.payload);
            }
        };

        ws.current.onclose = () => {
            setConnectionStatus('disconnected');
        };

        return () => {
            ws.current?.close();
            setConnectionStatus('disconnected');
            console.log('close the connection');
        };
    }, [gameId]);

    return (
        <div className="flex items-center justify-center h-full flex-col gap-8">
            <p>Connection Status: {connectionStatus}</p>
            <Table players={gameStatus?.players ?? []} meId="ali" activePlayer={6} direction="rtl" />
        </div>
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
