import { Event } from '../../Event/Event';
import { Game } from '../../Game/Game';
import { CardBehavior } from '../CardBehavior';

export abstract class ChangePlayerBehavior implements CardBehavior {
    execute(game: Game, _: unknown): { game: Game; events: Event[] } {
        console.log('changing player behavior');
        const newGame = { ...game };
        const events: Event[] = [];
        const newPosition = this.getNewPosition(newGame);
        const nextPlayer = newGame.players[newPosition];
        events.push(...this.getEvents(nextPlayer.id));
        newGame.activePlayerIndex = newPosition;
        return {
            game: newGame,
            events,
        };
    }

    getNewPosition(game: Game): number {
        const step = this.getStep() % game.players.length;
        let newPosition = game.direction === 'ltr' ? game.activePlayerIndex + step : game.activePlayerIndex - step;
        newPosition = (newPosition + game.players.length) % game.players.length;
        return newPosition;
    }

    abstract getStep(): number;

    abstract getEvents(nextPlayerId: string): Event[];
}
