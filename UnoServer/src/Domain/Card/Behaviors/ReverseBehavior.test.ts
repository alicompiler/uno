import { assertNotChanged as assertNotChanged, buildMockGame } from '../../../TestUtils/GameMocks';
import { EventType } from '../../Event/Event';
import { ReverseBehavior } from './ReverseBehavior';

describe('ReversePlayerBehavior', () => {
    it('should reverse ltr -> rtl', () => {
        const game = buildMockGame();
        game.direction = 'ltr';
        const behavior = new ReverseBehavior();
        const { game: newGame, events } = behavior.execute(game);
        expect(newGame.direction).toEqual('rtl');
        expect(events.length).toEqual(1);
        expect(events[0].type).toEqual(EventType.ReversePlayingDirection);
        assertNotChanged(game, newGame, ['direction']);
    });

    it('should reverse rtl -> ltr', () => {
        const game = buildMockGame();
        game.direction = 'rtl';
        const behavior = new ReverseBehavior();
        const { game: newGame, events } = behavior.execute(game);
        expect(newGame.direction).toEqual('ltr');
        expect(events.length).toEqual(1);
        expect(events[0].type).toEqual(EventType.ReversePlayingDirection);
        assertNotChanged(game, newGame, ['direction']);
    });
});
