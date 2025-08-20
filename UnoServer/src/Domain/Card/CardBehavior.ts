import { Event } from '../Event/Event';
import { Game } from '../Game/Game';

export interface CardBehavior {
    execute(game: Game, payload: unknown): { game: Game; events: Event[] };
}
