import { createGame, GameType } from './GameFactory';
import * as OriginalGameFactory from './OriginalGameFactory';

describe('GameFactory', () => {
    it('should create original game', () => {
        const createSpy = vitest.spyOn(OriginalGameFactory, 'createOriginalGame');
        createGame('original');
        expect(createSpy).toHaveBeenCalledTimes(1);
    });

    it('should throw error when origin is unknown', () => {
        expect(() => createGame('non_exists_origin' as unknown as GameType)).toThrow();
    });
});
