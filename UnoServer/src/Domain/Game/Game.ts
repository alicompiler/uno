import { Card, CardColor, cardColors } from '../Card/Card';
import { createWithdrewEvent, Event } from '../Event/Event';
import { Player } from './Player';

export type GameDirection = 'rtl' | 'ltr';

export interface Game {
    id: string;
    players: Player[];

    withdrewPile: Card[];
    discardPile: Card[];

    direction: GameDirection;

    color: CardColor;

    activePlayerIndex: number;

    hasStarted: boolean;
}

export interface GameStatus {
    id: string;

    players: { id: string; name: string; isAdmin: boolean; cards: Card[] }[];
    topCard?: Card;
    withdrewPileCount: number;
    direction: GameDirection;
    hasStarted: boolean;

    activePlayer: { id: string; name: string };
    myCards: Card[];
}

export function canPlayCard(game: Game, card: Card): boolean {
    if (card.isWild) {
        return true;
    }

    const topCardIndex = game.discardPile.length - 1;
    const topCard = game.discardPile[topCardIndex];

    if (card.color == topCard.color) {
        return true;
    }

    if (card.value == topCard.value) {
        return true;
    }

    return false;
}

export function playCard(game: Game, card: Card, payload: unknown): { game: Game; events: Event[] } {
    let newGame = { ...game };
    const events: Event[] = [];

    card.behaviors.forEach((behavior) => {
        const { game: g, events: e } = behavior.execute(newGame, payload);
        newGame = g;
        events.push(...e);
    });

    newGame.discardPile.push(card);
    const currentPlayer = newGame.players[game.activePlayerIndex];
    currentPlayer.cards = currentPlayer.cards.filter((c) => c.id !== card.id);

    return {
        game: newGame,
        events,
    };
}

export function withdrewCard(game: Game): { game: Game; events: Event[] } {
    const newGame = { ...game };
    const currentPlayer = newGame.players[game.activePlayerIndex];
    const withdrawnCard = newGame.withdrewPile.pop();
    if (withdrawnCard) {
        currentPlayer.cards.push(withdrawnCard);
    }

    const events = [createWithdrewEvent(currentPlayer.id, 1)];
    return {
        game: newGame,
        events,
    };
}

export function buildGameStatus(game: Game, playerId: string): GameStatus {
    const topCard = game.discardPile.length > 0 ? game.discardPile[game.discardPile.length - 1] : undefined;
    const activePlayer = game.players[game.activePlayerIndex];
    const me = game.players.find((g) => g.id === playerId);
    return {
        id: game.id,
        players: [...game.players],
        topCard,
        withdrewPileCount: game.withdrewPile.length,
        direction: game.direction,
        hasStarted: game.hasStarted,
        activePlayer: {
            id: activePlayer.id,
            name: activePlayer.name,
        },
        myCards: me!.cards,
    };
}

export const startGame = (game: Game) => {
    if (game.withdrewPile.length <= game.players.length * 7 || game.players.length < 2 || game.hasStarted) {
        throw new Error('cannot start game, invalid state');
    }

    game.withdrewPile = game.withdrewPile
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    const numberOfCardsForEachPlayer = 7;
    game.players.forEach((p) => {
        const cards: Card[] = [];
        for (let i = 0; i < numberOfCardsForEachPlayer; i++) {
            cards.push(game.withdrewPile.pop()!);
        }
        p.cards = cards;
    });

    const topCard = game.withdrewPile.pop();
    game.discardPile.push(topCard!);

    game.activePlayerIndex = Math.floor(Math.random() * game.players.length);

    const randomColor = cardColors[Math.floor(Math.random() * cardColors.length)];
    game.color = topCard!.isWild ? randomColor : topCard!.color;

    game.hasStarted = true;
};
