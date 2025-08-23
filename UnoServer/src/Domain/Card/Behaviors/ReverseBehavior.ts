import { Event } from '../../Event/Event';
import { Game } from '../../Game/Game';
import { CardBehavior } from '../CardBehavior';

export class ReverseBehavior implements CardBehavior {
    execute(game: Game): { game: Game; events: Event[] } {
        const newGame = { ...game };
        newGame.direction = newGame.direction === 'rtl' ? 'ltr' : 'rtl';
        return {
            game: newGame,
            events: [],
        };
    }
}
