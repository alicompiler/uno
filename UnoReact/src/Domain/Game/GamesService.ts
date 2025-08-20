const baseUrl = 'http://localhost:3000';
import Axios from 'axios';

export interface Game {
    id: string;
}

interface Creator {
    name: string;
    id: string;
}

export const createGame = async (creator: Creator): Promise<Game> => {
    const url = `${baseUrl}/api/games`;
    const response = await Axios.post<Game>(url, {
        type: 'original',
        creator,
    });
    if (response.status === 201) {
        return response.data;
    }

    throw Error('Failed to create game');
};
