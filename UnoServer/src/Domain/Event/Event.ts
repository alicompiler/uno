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

export function createWithdrawEvent(playerId: string, count: number): Event {
    return {
        type: EventType.Withdraw,
        payload: {
            playerId,
            count,
        },
    };
}
