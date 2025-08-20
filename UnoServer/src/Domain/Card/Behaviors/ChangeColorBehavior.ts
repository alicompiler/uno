import { createChangeColorEvent, Event } from '../../Event/Event';
import { Game } from '../../Game/Game';
import { CardColor } from '../Card';
import { CardBehavior } from '../CardBehavior';

interface ChangeColorPayload {
    color: CardColor;
}

export class ChangeColorBehavior implements CardBehavior {
    execute(game: Game, payload: unknown): { game: Game; events: Event[] } {
        const newGame = { ...game };
        const events: Event[] = [];
        const p = payload as ChangeColorPayload;

        const topCard = game.discardPile[game.discardPile.length - 1];

        newGame.color = p.color;

        if (!topCard.isWild && topCard.color != p.color) {
            events.push(createChangeColorEvent(p.color));
        }

        return {
            game: newGame,
            events,
        };
    }
}
