import { InMemoryGameRepository } from '../Domain/Game/Repository/InMemoryGameRepository';
import { InMemoryServiceProvider } from './InMemoryServiceProvider';

describe('InMemoryServiceProvider', () => {
    describe('creating services', () => {
        it('should create only one instance (single) for game repository', () => {
            const sp = new InMemoryServiceProvider();
            const gameRepository = sp.getGameRepository();
            expect(gameRepository).toBeInstanceOf(InMemoryGameRepository);
            const gameRepository2 = sp.getGameRepository();
            expect(gameRepository2).toBe(gameRepository);
        });
    });
});
