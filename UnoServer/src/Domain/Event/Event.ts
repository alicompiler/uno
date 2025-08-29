import { CardColor, CardValue } from '../Card/Card';

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
