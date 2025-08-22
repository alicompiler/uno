export enum MessageType {
    StartGame = 'start-game',
    PlayCard = 'play-card',
    DrawCard = 'draw-card',
    SkipNoCard = 'skip-no-card',
}

export type IncomingMessage =
    | {
          type: MessageType.StartGame;
          payload: never;
      }
    | {
          type: MessageType.PlayCard;
          payload: {
              cardId: string;
              extraPayload: unknown;
          };
      }
    | {
          type: MessageType.DrawCard;
          payload: never;
      }
    | {
          type: MessageType.SkipNoCard;
          payload: never;
      };
