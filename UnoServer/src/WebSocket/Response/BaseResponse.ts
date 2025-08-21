import { GameStatus } from '../../Domain/Game/Game';
import { ErrorMessagePayload } from './ErrorResponse';

export enum OutgoingMessageType {
    Error = 'error',
    GameStatus = 'game-status',
}

export type outgoingMessage =
    | {
          type: OutgoingMessageType.Error;
          payload: ErrorMessagePayload;
      }
    | {
          type: OutgoingMessageType.GameStatus;
          payload: GameStatus;
      };

export function buildOutgoingMessage(response: outgoingMessage): string {
    return JSON.stringify(response);
}
