import { GameRepository } from '../Domain/Game/Repository/GameRepository';
import { InMemoryGameRepository } from '../Domain/Game/Repository/InMemoryGameRepository';
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
