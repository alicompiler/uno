import { assertNoChanged, buildMockGame } from '../../../TestUtils/GameMocks';
import { EventType } from '../../Event/Event';
import { ChangeColorBehavior } from './ChangeColorBehavior';

describe('ChangeColorBehavior', () => {
    it('should change color', () => {
        const game = buildMockGame();
        const behavior = new ChangeColorBehavior();

        const { game: newGame, events } = behavior.execute(game, { color: 'red' });

        expect(newGame.color).toEqual('red');

        expect(events.length).toEqual(1);
        expect(events[0].type).toEqual(EventType.ChangeColor);
        expect(events[0].payload).toEqual({ newColor: 'red' });

        assertNoChanged(game, newGame, ['color']);
    });

    it('should not generate event when the new color is already same as the game color', () => {
        const game = buildMockGame();
        game.color = 'red';
        const behavior = new ChangeColorBehavior();

        const { game: newGame, events } = behavior.execute(game, { color: 'red' });

        expect(newGame.color).toEqual('red');

        expect(events.length).toEqual(0);
        assertNoChanged(game, newGame, ['color']);
    });
});
