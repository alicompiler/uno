import { GameRepository } from '../Domain/Game/GameRepository';
import { InMemoryServiceProvider } from './InMemoryServiceProvider';

export interface ServiceProvider {
    getGameRepository(): GameRepository;
}

export const getServiceProvider = (): ServiceProvider => {
    return new InMemoryServiceProvider();
};
