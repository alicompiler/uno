import type { ErrorMessagePayload } from './ErrorMessagePayload';
import type { GameStatus } from './GameStatusMessagePayload';

export enum IncomingMessageType {
    Error = 'error',
    GameStatus = 'game-status',
}

export type IncomingMessage =
    | {
          type: IncomingMessageType.Error;
          payload: ErrorMessagePayload;
      }
    | {
          type: IncomingMessageType.GameStatus;
          payload: GameStatus;
      };
