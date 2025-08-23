import { assertNotChanged, buildMockGame } from '../../../TestUtils/GameMocks';
import { ChangeColorBehavior } from './ChangeColorBehavior';

describe('ChangeColorBehavior', () => {
    it('should change color', () => {
        const game = buildMockGame();
        const behavior = new ChangeColorBehavior();

        const { game: newGame, events } = behavior.execute(game, { color: 'red' });

        expect(newGame.color).toEqual('red');

        expect(events.length).toEqual(0);

        assertNotChanged(game, newGame, ['color']);
    });
});
