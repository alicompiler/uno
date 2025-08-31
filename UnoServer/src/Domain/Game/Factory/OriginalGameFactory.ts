import { Game } from '../Game';
import { GameSettings } from '../GameSetting';
import { Card, CardValue } from '../../Card/Card';
import { createColoredCards, createWildCards } from './../../Card/Factory/CardsFactory';
import { ReverseBehavior } from '../../Card/Behaviors/ReverseBehavior';
import { SkipPlayerBehavior } from '../../Card/Behaviors/SkipPlayerBehavior';
import { WithdrawBehaviorForNextPlayer } from '../../Card/Behaviors/WithdrawBehaviorForNextPlayer';

const originalGameSettings: GameSettings = {
    startingNumber: 0,
    endingNumber: 9,
};

export const createOriginalGame = (): Game => {
    const numberedValues: CardValue[] = [];
    for (let i = originalGameSettings.startingNumber; i <= originalGameSettings.endingNumber; i++) {
        numberedValues.push(`${i}` as CardValue);
    }

    const cards: Card[] = [
        ...createColoredCards(2, numberedValues, []),
        ...createColoredCards(2, ['reverse'], [new ReverseBehavior()]),
        ...createColoredCards(2, ['skip'], [new SkipPlayerBehavior()], true),
        ...createColoredCards(2, ['plus1'], [new WithdrawBehaviorForNextPlayer(1, 1), new SkipPlayerBehavior()], true),
        ...createColoredCards(2, ['plus2'], [new WithdrawBehaviorForNextPlayer(2, 1), new SkipPlayerBehavior()], true),
        ...createColoredCards(2, ['plus4'], [new WithdrawBehaviorForNextPlayer(4, 1), new SkipPlayerBehavior()], true),
        ...createWildCards(4, [undefined], []),
        ...createWildCards(4, ['plus4'], [new WithdrawBehaviorForNextPlayer(4, 1), new SkipPlayerBehavior()], true),
        ...createWildCards(2, ['reverse'], [new ReverseBehavior()]),
    ];

    return {
        id: '',
        activePlayerIndex: 0,
        players: [],
        color: 'blue',
        direction: 'ltr',
        discardPile: [],
        withdrawPile: cards,
        hasStarted: false,
        finished: false,
        drawCount: 0,
    };
};
