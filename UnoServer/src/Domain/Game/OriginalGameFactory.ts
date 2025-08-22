import * as uuid from 'uuid';
import { Game } from './Game';
import { GameSettings } from './GameSetting';
import { Card, CardValue } from '../Card/Card';
import { createColoredCard, createColoredCards, createWildCards } from './GameFactory';
import { ReverseBehavior } from '../Card/Behaviors/ReverseBehavior';
import { SkipPlayerBehavior } from '../Card/Behaviors/SkipPlayerBehavior';
import { WithdrewBehavior } from '../Card/Behaviors/WithdrewBehavior';

const originalGameSettings: GameSettings = {
    startingNumber: 0,
    endingNumber: 9,
};

export const createOriginalGame = (): Game => {
    let numberedValues: CardValue[] = [];
    for (let i = originalGameSettings.startingNumber; i <= originalGameSettings.endingNumber; i++) {
        numberedValues.push(`${i}` as CardValue);
    }

    const cards: Card[] = [
        ...createColoredCards(2, numberedValues, []),
        ...createColoredCards(2, ['reverse'], [new ReverseBehavior()]),
        ...createColoredCards(2, ['skip'], [new SkipPlayerBehavior()], true),
        ...createColoredCards(2, ['plus1'], [new WithdrewBehavior(1), new SkipPlayerBehavior()], true),
        ...createColoredCards(2, ['plus2'], [new WithdrewBehavior(2), new SkipPlayerBehavior()], true),
        ...createColoredCards(2, ['plus4'], [new WithdrewBehavior(4), new SkipPlayerBehavior()], true),
        ...createWildCards(4, [undefined], []),
        ...createWildCards(4, ['plus4'], [new WithdrewBehavior(4), new SkipPlayerBehavior()], true),
        ...createWildCards(2, ['reverse'], [new ReverseBehavior()]),
    ];

    return {
        id: uuid.v4(),
        activePlayerIndex: 0,
        players: [],
        color: 'blue',
        direction: 'ltr',
        discardPile: [],
        withdrewPile: cards,
        hasStarted: false,
        finished: false,
        drawCount: 0,
    };
};
