import { assertNotChanged, buildMockGame } from '../../../TestUtils/GameMocks';
import { EventType } from '../../Event/Event';
import { WithdrawBehaviorForCurrentPlayer } from './WithdrawBehaviorForCurrentPlayer';

describe('WithdrawBehavior', () => {
    it('should withdraw cards', () => {
        const game = buildMockGame();
        game.withdrawPile = [
            { id: 'c-1', behaviors: [], isWild: true },
            { id: 'c-2', behaviors: [], isWild: false, color: 'blue', value: '2' },
            { id: 'c-3', behaviors: [], isWild: false, color: 'blue', value: '2' },
        ];
        game.players[0].cards = [{ id: 'c-3', behaviors: [], isWild: true }];
        game.activePlayerIndex = 0;

        const behavior = new WithdrawBehaviorForCurrentPlayer(2);
        const { game: newGame, events } = behavior.execute(game);

        expect(newGame.players[0].cards.length).toEqual(3);
        expect(newGame.withdrawPile.length).toEqual(1);
        expect(newGame.withdrawPile[0].id).toEqual('c-1');
        expect(events.length).toEqual(1);
        expect(events[0].type).toEqual(EventType.Withdraw);

        assertNotChanged(game, newGame, ['withdrawPile']);
    });

    it('should withdraw remaining cards if the request cards more than available', () => {
        const game = buildMockGame();
        game.withdrawPile = [{ id: 'c-1', behaviors: [], isWild: true }];
        game.players[0].cards = [{ id: 'c-3', behaviors: [], isWild: true }];
        game.activePlayerIndex = 0;

        const behavior = new WithdrawBehaviorForCurrentPlayer(2);
        const { game: newGame, events } = behavior.execute(game);

        expect(newGame.players[0].cards.length).toEqual(2);
        expect(newGame.withdrawPile.length).toEqual(0);
        expect(events.length).toEqual(1);
        expect(events[0].type).toEqual(EventType.Withdraw);

        assertNotChanged(game, newGame, ['withdrawPile']);
    });
});
