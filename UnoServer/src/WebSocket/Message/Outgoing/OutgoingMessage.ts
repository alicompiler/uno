import { ErrorMessagePayload } from './ErrorMessagePayload';
import { GameState } from './GameStatePayload';
import { Event } from '../../../Domain/Event/Event';

export enum OutgoingMessageType {
    Error = 'error',
    GameStatus = 'game-state',
    Event = 'event',
}

export type OutgoingMessage =
    | {
          type: OutgoingMessageType.Error;
          payload: ErrorMessagePayload;
      }
    | {
          type: OutgoingMessageType.GameStatus;
          payload: GameState;
      }
    | {
          type: OutgoingMessageType.Event;
          payload: Event[];
      };

export function buildOutgoingMessage(response: OutgoingMessage): string {
    return JSON.stringify(response);
}
