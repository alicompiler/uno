import { createOriginalGame } from './OriginalGameFactory';

describe('Original Game Factory', () => {
    it('should create original game', () => {
        const game = createOriginalGame();

        expect(game.id).not.toBeNull();
        expect(game.color).toEqual('blue');
        expect(game.drawCount).toEqual(0);
        expect(game.direction).toEqual('ltr');
        expect(game.discardPile.length).toEqual(0);
        expect(game.finished).toEqual(false);
        expect(game.hasStarted).toEqual(false);
        expect(game.players.length).toEqual(0);
        expect(game.activePlayerIndex).toEqual(0);
        expect(game.withdrewPile.length).toEqual(130);
    });
});
