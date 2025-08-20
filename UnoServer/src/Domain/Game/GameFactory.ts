import { Game } from './Game';
import { createOriginalGame } from './OriginalGameFactory';

export type GameType = 'original';

export function createGame(type: GameType): Game {
    switch (type) {
        case 'original':
            createOriginalGame();
        default:
            throw new Error(`Cannot create game for type: ${type}`);
    }
}
