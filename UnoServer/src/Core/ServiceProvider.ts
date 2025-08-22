import { GameRepository } from '../Domain/Game/Repository/GameRepository';
import { InMemoryServiceProvider } from './InMemoryServiceProvider';

export interface ServiceProvider {
    getGameRepository(): GameRepository;
}

let serviceProvider: ServiceProvider | null = null;
export const getServiceProvider = (): ServiceProvider => {
    if (serviceProvider == null) {
        serviceProvider = new InMemoryServiceProvider();
    }
    return serviceProvider;
};
