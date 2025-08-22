import { Event } from '../../Event/Event';
import { Game, getNextPlayerIndex } from '../../Game/Game';
import { CardBehavior } from '../CardBehavior';

export abstract class ChangePlayerBehavior implements CardBehavior {
    execute(game: Game): { game: Game; events: Event[] } {
        console.log('changing player behavior');
        const newGame = { ...game };
        const events: Event[] = [];
        const newPosition = getNextPlayerIndex(newGame, this.getStep());
        const nextPlayer = newGame.players[newPosition];
        events.push(...this.getEvents(nextPlayer.id));
        newGame.activePlayerIndex = newPosition;
        return {
            game: newGame,
            events,
        };
    }

    abstract getStep(): number;

    abstract getEvents(nextPlayerId: string): Event[];
}
