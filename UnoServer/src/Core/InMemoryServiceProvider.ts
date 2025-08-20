import { GameRepository } from '../Domain/Game/GameRepository';
import { InMemoryGameRepository } from '../Domain/Game/InMemoryGameRepository';
import { ServiceProvider } from './ServiceProvider';

export class InMemoryServiceProvider implements ServiceProvider {
    private gameRepository: GameRepository | null = null;

    getGameRepository(): GameRepository {
        if (this.gameRepository) {
            return this.gameRepository;
        }
        this.gameRepository = new InMemoryGameRepository();
        return this.gameRepository;
    }
}
