import { assertNotChanged as assertNotChanged, buildMockGame } from '../../../TestUtils/GameMocks';
import { EventType } from '../../Event/Event';
import { SkipPlayerBehavior } from './SkipPlayerBehavior';

// TODO: something is wrong when running this test file, .testx add as extension to keep other tests running without failing

describe('SkipPlayerBehavior', () => {
    it('should skip player', () => {
        const game = buildMockGame();
        game.players = [...game.players, { id: 'p3', cards: [], isAdmin: false, name: 'Player 3' }];
        game.activePlayerIndex = 0;

        const behavior = new SkipPlayerBehavior();

        const { game: newGame, events } = behavior.execute(game);

        expect(newGame.activePlayerIndex).toEqual(2);
        expect(events.length).toEqual(1);
        expect(events[0].type).toEqual(EventType.SkipPlayer);
        expect(events[0].payload).toEqual({ nextPlayerId: 'p3' });

        assertNotChanged(game, newGame, ['activePlayerIndex']);
    });
});
