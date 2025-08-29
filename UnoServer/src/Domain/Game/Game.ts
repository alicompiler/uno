import { NextPlayerBehavior } from '../Card/Behaviors/NextPlayerBehavior';
import { Card, CardColor, cardColors } from '../Card/Card';
import { Event, EventType } from '../Event/Event';
import { Player } from '../Player/Player';

export type GameDirection = 'rtl' | 'ltr';

type GameActionResult = { game: Game; events: Event[] };

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

export function playCard(game: Game, card: Card, payload: unknown): GameActionResult {
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

    events.push({
        type: EventType.CardPlayed,
        payload: {
            playerId: currentPlayer.id,
            playerName: currentPlayer.name,
            cardValue: card.value,
        },
    });

    return {
        game: newGame,
        events,
    };
}

// TODO: define canWithdrawCard

export function withdrawCard(game: Game): GameActionResult {
    const newGame = { ...game };
    const currentPlayer = newGame.players[game.activePlayerIndex];
    const withdrawnCard = newGame.withdrawPile.pop();
    if (withdrawnCard) {
        currentPlayer.cards.push(withdrawnCard);
    }
    newGame.drawCount = newGame.drawCount + 1;

    const events: Event[] = [
        {
            type: EventType.Withdraw,
            payload: {
                count: 1,
                playerId: currentPlayer.id,
                playerName: currentPlayer.name,
                cardValue: withdrawnCard?.value,
            },
        },
    ];

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

export function skipNoCard(game: Game): GameActionResult {
    const currentPlayer = game.players[game.activePlayerIndex];
    const nextPlayerBehavior = new NextPlayerBehavior();
    const { game: newGame, events } = nextPlayerBehavior.execute(game);
    newGame.drawCount = 0;
    events.push({
        type: EventType.SkipNoCard,
        payload: {
            playerId: currentPlayer.id,
            playerName: currentPlayer.name,
        },
    });

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

export const startGame = (game: Game): GameActionResult => {
    if (game.withdrawPile.length <= game.players.length * 7 || game.players.length < 2 || game.hasStarted) {
        throw new Error('cannot start game, invalid state');
    }

    const newGame = { ...game };

    newGame.withdrawPile = newGame.withdrawPile
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    // TODO: make 7 in the game settings
    const numberOfCardsForEachPlayer = 7;
    newGame.players.forEach((p) => {
        const cards: Card[] = [];
        for (let i = 0; i < numberOfCardsForEachPlayer; i++) {
            cards.push(newGame.withdrawPile.pop()!);
        }
        p.cards = cards;
    });

    const topCard = newGame.withdrawPile.pop();
    newGame.discardPile.push(topCard!);

    newGame.activePlayerIndex = Math.floor(Math.random() * newGame.players.length);

    const randomColor = cardColors[Math.floor(Math.random() * cardColors.length)];
    newGame.color = topCard!.isWild ? randomColor : topCard!.color;

    newGame.hasStarted = true;

    return {
        game: newGame,
        events: [
            {
                type: EventType.GameStarted,
            },
        ],
    };
};

export const updatePlayerConnectionStatus = (game: Game, playerId: string, isConnected: boolean): void => {
    const player = game.players.find((p) => p.id === playerId);
    if (player) {
        player.isConnected = isConnected;
    }
};
