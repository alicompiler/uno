import type { ErrorMessagePayload } from './ErrorMessagePayload';
import type { GameStatus } from './GameStatusMessagePayload';

export enum IncomingMessageType {
    Error = 'error',
    GameStatus = 'game-state',
    Event = 'event',
}

export enum EventType {
    Withdraw = 'withdraw',
    GameFinished = 'game-finished',
    WithdrawPileReset = 'withdraw-pile-reset',
}

export type Event =
    | {
          type: EventType.Withdraw;
          payload: {
              playerId: string;
              count: number;
          };
      }
    | {
          type: EventType.WithdrawPileReset;
          payload: never;
      }
    | {
          type: EventType.GameFinished;
          payload: {
              winner: {
                  id: string;
                  name: string;
              };
          };
      };

export type IncomingMessage =
    | {
          type: IncomingMessageType.Error;
          payload: ErrorMessagePayload;
      }
    | {
          type: IncomingMessageType.GameStatus;
          payload: GameStatus;
      }
    | {
          type: IncomingMessageType.Event;
          payload: Event[];
      };
