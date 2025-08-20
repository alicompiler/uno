import { Game } from './Game';

export interface GameRepository {
    addGame(game: Game): Game;
    removeById(id: string): void;
    findById(id: string): Game | null;
}

export const DuplicateGameErrorCode = 'GAME-100';
