import { Event, EventType } from '../../Event/Event';
import { Game } from '../../Game/Game';
import { Card } from '../Card';
import { CardBehavior } from '../CardBehavior';

export abstract class WithdrawBehaviorBase implements CardBehavior {
    private readonly count: number;

    constructor(count: number) {
        this.count = count;
    }

    execute(game: Game): { game: Game; events: Event[] } {
        const newGame = { ...game };

        const drawCounts = newGame.withdrawPile.length < this.count ? newGame.withdrawPile.length : this.count;
        const withdrawnCards: Card[] = [];
        for (let i = 1; i <= drawCounts; i++) {
            withdrawnCards.push(newGame.withdrawPile.pop()!);
        }
        const nextPlayer = game.players[this.getPlayerIndex(game)];
        nextPlayer.cards.push(...withdrawnCards);

        return {
            game: newGame,
            events: [
                {
                    type: EventType.Withdraw,
                    payload: {
                        count: drawCounts,
                        playerId: nextPlayer.id,
                        playerName: nextPlayer.name,
                    },
                },
            ],
        };
    }

    protected abstract getPlayerIndex(game: Game): number;
}
