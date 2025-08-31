import { DuplicateGameErrorCode } from '../../Errors/ErrorCodes';
import { Game } from '../Game';
import { generateGameKey } from '../KeyGenerator';
import { GameRepository } from './GameRepository';

export class InMemoryGameRepository implements GameRepository {
    private games: Game[] = [];

    getAll(): Game[] {
        return this.games;
    }

    addGame(game: Game): Game {
        if (this.games.find((g) => g.id === game.id)) {
            throw new Error(`${DuplicateGameErrorCode}-Cannot add game, the id: ${game.id} is already used`);
        }
        game.id = this.generateId();
        this.games.push(game);
        return game;
    }

    private generateId(): string {
        let attempt = 1;
        while (attempt <= 10) {
            const key = generateGameKey();
            const isKeyUsed = this.games.some((g) => g.id === key);
            if (!isKeyUsed) {
                return key;
            }
            attempt++;
        }
        throw new Error('Cannot generate key');
    }

    removeById(id: string): void {
        this.games = this.games.filter((g) => g.id !== id);
    }

    findById(id: string): Game | null {
        const game = this.games.find((g) => g.id === id);
        return game ?? null;
    }

    update(game: Game): void {
        const gameIndex = this.games.findIndex((g) => g.id === game.id);
        if (gameIndex < 0) {
            throw Error('cannot update game, the game is not exists');
        }
        this.games[gameIndex] = game;
    }
}
