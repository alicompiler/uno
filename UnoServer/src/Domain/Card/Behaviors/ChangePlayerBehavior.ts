import { Event } from '../../Event/Event';
import { Game, getNextPlayerIndex } from '../../Game/Game';
import { CardBehavior } from '../CardBehavior';

export abstract class ChangePlayerBehavior implements CardBehavior {
    execute(game: Game): { game: Game; events: Event[] } {
        const newGame = { ...game };
        const newPosition = getNextPlayerIndex(newGame, this.getStep());

        newGame.activePlayerIndex = newPosition;
        return {
            game: newGame,
            events: [],
        };
    }

    abstract getStep(): number;
}
