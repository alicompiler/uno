import { Event, EventType } from '../../Event/Event';
import { Game } from '../../Game/Game';
import { CardColor } from '../Card';
import { CardBehavior } from '../CardBehavior';

interface ChangeColorPayload {
    color: CardColor;
}

export class ChangeColorBehavior implements CardBehavior {
    execute(game: Game, payload: unknown): { game: Game; events: Event[] } {
        const newGame = { ...game };
        const p = payload as ChangeColorPayload;

        newGame.color = p.color;

        return {
            game: newGame,
            events: [
                {
                    type: EventType.ColorChanged,
                    payload: {
                        newColor: p.color,
                    },
                },
            ],
        };
    }
}
