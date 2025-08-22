import { Game } from '../Game';

export interface GameRepository {
    getAll(): Game[];
    addGame(game: Game): Game;
    removeById(id: string): void;
    findById(id: string): Game | null;
    update(game: Game): void;
}
