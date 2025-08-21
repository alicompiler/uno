import { Game } from '../../Domain/Game/Game';

export interface WsGameEvent {
    send(game: Game): void;
}
