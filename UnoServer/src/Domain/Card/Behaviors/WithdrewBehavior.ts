import { createWithdrewEvent, Event } from '../../Event/Event';
import { Game, getNextPlayerIndex } from '../../Game/Game';
import { Card } from '../Card';
import { CardBehavior } from '../CardBehavior';

export class WithdrewBehavior implements CardBehavior {
    private readonly count: number;

    constructor(count: number) {
        this.count = count;
    }

    execute(game: Game): { game: Game; events: Event[] } {
        const events: Event[] = [];
        const newGame = { ...game };

        const count = newGame.withdrewPile.length < this.count ? newGame.withdrewPile.length : this.count;
        const withdrawnCards: Card[] = [];
        for (let i = 1; i <= count; i++) {
            withdrawnCards.push(newGame.withdrewPile.pop()!);
        }
        const nextPlayer = game.players[getNextPlayerIndex(game, 1)];
        nextPlayer.cards.push(...withdrawnCards);
        events.push(createWithdrewEvent(nextPlayer.id, count));

        return {
            game: newGame,
            events,
        };
    }
}
