import { createSkipPlayerEvent, Event } from '../../Event/Event';
import { ChangePlayerBehavior } from './ChangePlayerBehavior';

export class SkipPlayerBehavior extends ChangePlayerBehavior {
    getStep(): number {
        return 2;
    }

    getEvents(nextPlayerId: string): Event[] {
        return [createSkipPlayerEvent(nextPlayerId)];
    }
}
