import { buildGameStatus, Game, GameStatus } from '../../Domain/Game/Game';
import { buildOutgoingMessage, OutgoingMessageType } from './BaseResponse';

export function createGameStatusResponse(game: Game): string {
    return buildOutgoingMessage({
        type: OutgoingMessageType.GameStatus,
        payload: buildGameStatus(game),
    });
}
