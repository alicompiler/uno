import { Event } from '../../../Domain/Event/Event';
import { buildOutgoingMessage, OutgoingMessage, OutgoingMessageType } from './OutgoingMessage';

export const createEventsPayload = (events: Event[]): string => {
    const message: OutgoingMessage = {
        type: OutgoingMessageType.Event,
        payload: events,
    };
    return buildOutgoingMessage(message);
};
