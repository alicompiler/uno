import { Game } from './Game';
import { createOriginalGame } from './OriginalGameFactory';

export type GameType = 'original';
export const gameTypeValues: GameType[] = ['original'];

export function createGame(type: GameType): Game {
    switch (type) {
        case 'original':
            return createOriginalGame();
        default:
            throw new Error(`Cannot create game for type: ${type}`);
    }
}
