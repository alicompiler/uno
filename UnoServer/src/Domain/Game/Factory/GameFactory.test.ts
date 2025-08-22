import { createGame } from './GameFactory';
import * as OriginalGameFactory from './OriginalGameFactory';

describe('GameFactory', () => {
    it('should create original game', () => {
        const createSpy = vitest.spyOn(OriginalGameFactory, 'createOriginalGame');
        createGame('original');
        expect(createSpy).toHaveBeenCalledTimes(1);
    });
});
