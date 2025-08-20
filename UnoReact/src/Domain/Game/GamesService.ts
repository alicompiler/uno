const baseUrl = 'http://localhost:3000';
import Axios from 'axios';
import type { UnoCard } from '../Card/UnoCard';

export interface GameStatus {
    id: string;

    players: { id: string; name: string; isAdmin: boolean }[];
    topCard?: UnoCard;
    withdrewPileCount: number;
    direction: 'rtl' | 'ltr';
}

interface Player {
    name: string;
    id: string;
}

export const createGame = async (creator: Player): Promise<GameStatus> => {
    const url = `${baseUrl}/api/games`;
    const response = await Axios.post<GameStatus>(url, {
        type: 'original',
        creator,
    });
    if (response.status === 201) {
        return response.data;
    }

    throw Error('Failed to create game');
};

export const joinGame = async (gameId: string, player: Player) => {
    const url = `${baseUrl}/api/games/${gameId}/players`;
    const response = await Axios.post<GameStatus>(url, {
        gameId,
        userId: player.id,
        name: player.name,
    });

    if (response.status === 201) {
        return;
    }

    throw Error('Failed to create game');
};
