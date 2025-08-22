import { Card, CardColor } from '../../../Domain/Card/Card';
import { Game, GameDirection } from '../../../Domain/Game/Game';
import { buildOutgoingMessage, OutgoingMessageType } from './OutgoingMessage';

export interface GameState {
    id: string;

    players: { id: string; name: string; isAdmin: boolean; cards: Card[] }[];
    topCard?: Card;
    withdrawPileCount: number;
    direction: GameDirection;
    hasStarted: boolean;

    activePlayer: { id: string; name: string };
    myCards: Card[];

    drawCount: number;
    color: CardColor;
    finished: boolean;
}

function buildGameState(game: Game, playerId: string): GameState {
    const topCard = game.discardPile.length > 0 ? game.discardPile[game.discardPile.length - 1] : undefined;
    const activePlayer = game.players[game.activePlayerIndex];
    const me = game.players.find((g) => g.id === playerId);
    return {
        id: game.id,
        players: [...game.players],
        topCard,
        withdrawPileCount: game.withdrawPile.length,
        direction: game.direction,
        hasStarted: game.hasStarted,
        activePlayer: {
            id: activePlayer.id,
            name: activePlayer.name,
        },
        myCards: me!.cards,
        color: game.color,
        drawCount: game.drawCount,
        finished: game.finished,
    };
}

export function createGameStatusResponse(game: Game, userId: string): string {
    return buildOutgoingMessage({
        type: OutgoingMessageType.GameStatus,
        payload: buildGameState(game, userId),
    });
}
