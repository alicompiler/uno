import { createReverseEvent, Event } from '../../Event/Event';
import { Game } from '../../Game/Game';
import { CardBehavior } from '../CardBehavior';

export class ReverseBehavior implements CardBehavior {
    execute(game: Game, _: unknown): { game: Game; events: Event[] } {
        const newGame = { ...game };
        const events: Event[] = [];
        newGame.direction = newGame.direction === 'rtl' ? 'ltr' : 'rtl';
        events.push(createReverseEvent(newGame.direction));
        return {
            game: newGame,
            events,
        };
    }
}
