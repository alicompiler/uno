import { buildGameStatus, Game } from '../../Domain/Game/Game';
import { buildOutgoingMessage, OutgoingMessageType } from './BaseResponse';

export function createGameStatusResponse(game: Game, userId: string): string {
    return buildOutgoingMessage({
        type: OutgoingMessageType.GameStatus,
        payload: buildGameStatus(game, userId),
    });
}
