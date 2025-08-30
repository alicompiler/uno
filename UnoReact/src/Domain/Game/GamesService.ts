const baseUrl = import.meta.env.VITE_API_BASE;
import Axios from 'axios';
import type { GameStatus } from '../Message/Incoming/GameStatusMessagePayload';

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
