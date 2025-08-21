export enum MessageType {
    StartGame = 'start-game',
}

export type OutgoingMessage = {
    type: MessageType.StartGame;
    payload: never;
};
