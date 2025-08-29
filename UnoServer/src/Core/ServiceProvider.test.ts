import { InMemoryServiceProvider } from './InMemoryServiceProvider';
import { getServiceProvider } from './ServiceProvider';

describe('ServiceProvider', () => {
    describe('creating service provider', () => {
        it('should create only one instance (singleton)', () => {
            const sp = getServiceProvider();
            expect(sp).toBeInstanceOf(InMemoryServiceProvider);
            const sp2 = getServiceProvider();
            expect(sp2).toBe(sp);
        });
    });
});
