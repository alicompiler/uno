import { Game } from '../../Domain/Game/Game';
import { createGameStatusResponse } from './../Message/Outgoing/GameStatePayload';
import { BaseGameEvent } from './BaseGameEvent';

export class GameStateEvent extends BaseGameEvent {
    protected getMessageForPlayer(game: Game, playerId: string): string {
        return createGameStatusResponse(game, playerId);
    }
}
