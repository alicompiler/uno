import { ErrorMessagePayload } from './ErrorMessagePayload';
import { GameState } from './GameStatePayload';

export enum OutgoingMessageType {
    Error = 'error',
    GameStatus = 'game-state',
}

export type OutgoingMessage =
    | {
          type: OutgoingMessageType.Error;
          payload: ErrorMessagePayload;
      }
    | {
          type: OutgoingMessageType.GameStatus;
          payload: GameState;
      };

export function buildOutgoingMessage(response: OutgoingMessage): string {
    return JSON.stringify(response);
}
