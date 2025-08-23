import { NextPlayerBehavior } from '../Card/Behaviors/NextPlayerBehavior';
import { Card, CardColor, cardColors } from '../Card/Card';
import { createWithdrawEvent, Event, EventType } from '../Event/Event';
import { Player } from '../Player/Player';

export type GameDirection = 'rtl' | 'ltr';

export interface Game {
    id: string;
    players: Player[];

    withdrawPile: Card[];
    discardPile: Card[];

    direction: GameDirection;

    color: CardColor;

    activePlayerIndex: number;

    hasStarted: boolean;
    finished: boolean;
    drawCount: number;
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

    if (game.color === card.color) {
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
    newGame.drawCount = 0;

    if (!card.isWild && card.color !== newGame.color) {
        newGame.color = card.color;
    }

    const resetWithdrawPileEvents = resetWithdrawPileIfEmpty(newGame);
    events.push(...resetWithdrawPileEvents);

    if (currentPlayer.cards.length === 0) {
        events.push({
            type: EventType.GameFinished,
            payload: {
                winner: { id: currentPlayer.id, name: currentPlayer.name },
            },
        });
        newGame.finished = true;
    }

    return {
        game: newGame,
        events,
    };
}

// TODO: define canWithdrawCard

export function withdrawCard(game: Game): { game: Game; events: Event[] } {
    const newGame = { ...game };
    const currentPlayer = newGame.players[game.activePlayerIndex];
    const withdrawnCard = newGame.withdrawPile.pop();
    if (withdrawnCard) {
        currentPlayer.cards.push(withdrawnCard);
    }
    newGame.drawCount = newGame.drawCount + 1;

    const events = [createWithdrawEvent(currentPlayer.id, 1)];

    const resetWithdrawPileEvents = resetWithdrawPileIfEmpty(newGame);
    events.push(...resetWithdrawPileEvents);

    return {
        game: newGame,
        events,
    };
}

function resetWithdrawPileIfEmpty(game: Game): Event[] {
    if (game.withdrawPile.length === 0) {
        const topCard = game.discardPile.pop();

        game.withdrawPile = game.discardPile
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
        game.discardPile = [topCard!];

        return [{ type: EventType.WithdrawPileReset }];
    }
    return [];
}

export function skipNoCard(game: Game): { game: Game; events: Event[] } {
    const nextPlayerBehavior = new NextPlayerBehavior();
    const { game: newGame, events } = nextPlayerBehavior.execute(game);
    newGame.drawCount = 0;
    return {
        game: newGame,
        events,
    };
}

export function getNextPlayerIndex(game: Game, step: number): number {
    let newPosition = game.direction === 'ltr' ? game.activePlayerIndex + step : game.activePlayerIndex - step;
    newPosition = (newPosition + game.players.length) % game.players.length;
    return newPosition;
}

export const startGame = (game: Game) => {
    if (game.withdrawPile.length <= game.players.length * 7 || game.players.length < 2 || game.hasStarted) {
        throw new Error('cannot start game, invalid state');
    }

    game.withdrawPile = game.withdrawPile
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    const numberOfCardsForEachPlayer = 7;
    game.players.forEach((p) => {
        const cards: Card[] = [];
        for (let i = 0; i < numberOfCardsForEachPlayer; i++) {
            cards.push(game.withdrawPile.pop()!);
        }
        p.cards = cards;
    });

    const topCard = game.withdrawPile.pop();
    game.discardPile.push(topCard!);

    game.activePlayerIndex = Math.floor(Math.random() * game.players.length);

    const randomColor = cardColors[Math.floor(Math.random() * cardColors.length)];
    game.color = topCard!.isWild ? randomColor : topCard!.color;

    game.hasStarted = true;
};
