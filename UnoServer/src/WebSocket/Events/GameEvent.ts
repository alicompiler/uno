import { Game } from '../../Domain/Game/Game';

export interface GameEvent {
    send(game: Game): void;
}
