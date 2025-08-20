import { Card, CardColor } from '../Card/Card';
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
