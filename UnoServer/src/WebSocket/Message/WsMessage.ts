export enum MessageType {
    StartGame = 'start-game',
}

export type IncomingMessage = {
    type: MessageType.StartGame;
    payload: never;
};
