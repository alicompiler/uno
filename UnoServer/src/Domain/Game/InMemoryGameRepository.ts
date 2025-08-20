import { Game } from './Game';
import { DuplicateGameErrorCode, GameRepository } from './GameRepository';

export class InMemoryGameRepository implements GameRepository {
    private games: Game[] = [];

    addGame(game: Game): Game {
        if (this.games.find((g) => g.id === game.id)) {
            throw new Error(`${DuplicateGameErrorCode}-Cannot add game, the id: ${game.id} is already used`);
        }
        this.games.push(game);
        return game;
    }

    removeById(id: string): void {
        this.games = this.games.filter((g) => g.id !== id);
    }

    findById(id: string): Game | null {
        const game = this.games.find((g) => g.id === id);
        return game ?? null;
    }
}
