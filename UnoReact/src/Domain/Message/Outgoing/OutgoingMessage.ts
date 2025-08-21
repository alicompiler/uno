export enum MessageType {
    StartGame = 'start-game',
    PlayCard = 'play-card',
}

export type OutgoingMessage =
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
      };
