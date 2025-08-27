import { assertNotChanged as assertNotChanged, buildMockGame } from '../../../TestUtils/GameMocks';
import { NextPlayerBehavior } from './NextPlayerBehavior';

describe('NextPlayerBehavior', () => {
    it('should move to next player', () => {
        const game = buildMockGame();
        game.activePlayerIndex = 0;

        const behavior = new NextPlayerBehavior();

        const { game: newGame, events } = behavior.execute(game);

        expect(newGame.activePlayerIndex).toEqual(1);
        expect(events.length).toEqual(0);

        assertNotChanged(game, newGame, ['activePlayerIndex']);
    });

    it('should not return any event', () => {
        const behavior = new NextPlayerBehavior();
        expect(behavior.getEvents().length).toEqual(0);
    });
});
