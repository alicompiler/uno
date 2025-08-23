import { Event } from '../../Domain/Event/Event';
import { createEventsPayload } from '../Message/Outgoing/EventMessagePayload';
import { BaseGameEvent } from './BaseGameEvent';

export class UIEvents extends BaseGameEvent {
    constructor(private readonly events: Event[]) {
        super();
    }

    protected getMessageForPlayer(): string {
        return createEventsPayload(this.events);
    }
}
