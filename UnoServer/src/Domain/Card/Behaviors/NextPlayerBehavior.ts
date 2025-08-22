import { Event } from '../../Event/Event';
import { ChangePlayerBehavior } from './ChangePlayerBehavior';

export class NextPlayerBehavior extends ChangePlayerBehavior {
    getStep(): number {
        return 1;
    }

    getEvents(): Event[] {
        return [];
    }
}
