import type { CardColor, CardValue } from '../../Card/UnoCard';
import type { ErrorMessagePayload } from './ErrorMessagePayload';
import type { GameStatus } from './GameStatusMessagePayload';

export enum IncomingMessageType {
    Error = 'error',
    GameStatus = 'game-state',
    Event = 'event',
}

export enum EventType {
    GameStarted = 'game-started',
    CardPlayed = 'card-played',
    SkipNoCard = 'skip-no-card',
    ColorChanged = 'colored-changed',
    Withdraw = 'withdraw',
    GameFinished = 'game-finished',
    WithdrawPileReset = 'withdraw-pile-reset',
}

export type Event =
    | {
          type: EventType.GameStarted;
          payload?: never;
      }
    | {
          type: EventType.CardPlayed;
          payload: {
              playerName: string;
              playerId: string;
              cardValue?: CardValue;
          };
      }
    | {
          type: EventType.SkipNoCard;
          payload: {
              playerName: string;
              playerId: string;
          };
      }
    | {
          type: EventType.Withdraw;
          payload: {
              playerName: string;
              playerId: string;
              count: number;
              cardValue?: CardValue;
          };
      }
    | {
          type: EventType.WithdrawPileReset;
          payload?: never;
      }
    | {
          type: EventType.GameFinished;
          payload: {
              winner: {
                  id: string;
                  name: string;
              };
          };
      }
    | {
          type: EventType.ColorChanged;
          payload: {
              newColor: CardColor;
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
