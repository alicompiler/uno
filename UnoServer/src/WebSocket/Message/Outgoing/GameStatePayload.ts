import { Card, CardColor } from '../../../Domain/Card/Card';
import { Game, GameDirection } from '../../../Domain/Game/Game';
import { Player } from '../../../Domain/Player/Player';
import { buildOutgoingMessage, OutgoingMessageType } from './OutgoingMessage';

type CardCountIndicator = 'low' | 'few' | 'high';

export interface GameState {
    id: string;

    players: (Player & { cardsCountIndicator: CardCountIndicator })[];
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

const getCardsCountIndicator = (p: Player): CardCountIndicator => {
    if (p.cards.length <= 3) {
        return 'low';
    } else if (p.cards.length <= 5) {
        return 'few';
    } else {
        return 'high';
    }
};

function buildGameState(game: Game, playerId: string): GameState {
    const topCard = game.discardPile.length > 0 ? game.discardPile[game.discardPile.length - 1] : undefined;
    const activePlayer = game.players[game.activePlayerIndex];
    const me = game.players.find((g) => g.id === playerId);

    return {
        id: game.id,
        players: game.players.map((p) => ({ ...p, cards: [], cardsCountIndicator: getCardsCountIndicator(p) })),
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
