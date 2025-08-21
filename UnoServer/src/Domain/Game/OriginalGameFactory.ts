import { ChangeColorBehavior } from '../Card/Behaviors/ChangeColorBehavior';
import { NextPlayerBehavior } from '../Card/Behaviors/NextPlayerBehavior';
import { ReverseBehavior } from '../Card/Behaviors/ReverseBehavior';
import { SkipPlayerBehavior } from '../Card/Behaviors/SkipPlayerBehavior';
import { WithdrewBehavior } from '../Card/Behaviors/WithdrewBehavior';
import { Card, CardColor, CardValue } from '../Card/Card';
import { Game } from './Game';
import * as uuid from 'uuid';

export const createOriginalGame = (): Game => {
    const cards = [
        ...createNumberedCards('blue'),
        ...createNumberedCards('yellow'),
        ...createNumberedCards('green'),
        ...createNumberedCards('red'),
        ...createNumberedCards('blue'),
        ...createNumberedCards('yellow'),
        ...createNumberedCards('green'),
        ...createNumberedCards('red'),
        createReverseCard('blue'),
        createReverseCard('blue'),
        createReverseCard('yellow'),
        createReverseCard('yellow'),
        createReverseCard('red'),
        createReverseCard('red'),
        createReverseCard('green'),
        createReverseCard('green'),
        createPlusCard('blue', '1'),
        createPlusCard('blue', '1'),
        createPlusCard('yellow', '1'),
        createPlusCard('yellow', '1'),
        createPlusCard('green', '1'),
        createPlusCard('green', '1'),
        createPlusCard('red', '1'),
        createPlusCard('red', '1'),
        createPlusCard('blue', '2'),
        createPlusCard('blue', '2'),
        createPlusCard('yellow', '2'),
        createPlusCard('yellow', '2'),
        createPlusCard('green', '2'),
        createPlusCard('green', '2'),
        createPlusCard('red', '2'),
        createPlusCard('red', '2'),
        createPlusCard('blue', '4'),
        createPlusCard('blue', '4'),
        createPlusCard('yellow', '4'),
        createPlusCard('yellow', '4'),
        createPlusCard('green', '4'),
        createPlusCard('green', '4'),
        createPlusCard('red', '4'),
        createPlusCard('red', '4'),
        createSkipCard('blue'),
        createSkipCard('blue'),
        createSkipCard('yellow'),
        createSkipCard('yellow'),
        createSkipCard('green'),
        createSkipCard('green'),
        createSkipCard('red'),
        createSkipCard('red'),
        createWildCard(),
        createWildCard(),
        createWildCard(),
        createWildCard(),
        createWildPlusCard('4'),
        createWildPlusCard('4'),
        createWildPlusCard('4'),
        createWildPlusCard('4'),
        createWildReverseCard(),
        createWildReverseCard(),
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
    };
};

const createNumberedCards = (color: CardColor): Card[] => {
    const cards: Card[] = [];
    for (let i = 0; i < 10; i++) {
        const card: Card = {
            id: uuid.v4(),
            color,
            isWild: false,
            value: `${i}` as CardValue,
            behaviors: [new NextPlayerBehavior()],
        };
        cards.push(card);
    }
    return cards;
};

const createReverseCard = (color: CardColor): Card => {
    return {
        id: uuid.v4(),
        isWild: false,
        color,
        value: 'reverse',
        behaviors: [new ReverseBehavior(), new NextPlayerBehavior()],
    };
};

const createPlusCard = (color: CardColor, plus: '1' | '2' | '4'): Card => {
    return {
        id: uuid.v4(),
        isWild: false,
        color,
        value: `plus${plus}`,
        behaviors: [new WithdrewBehavior(parseInt(plus)), new SkipPlayerBehavior()],
    };
};

const createSkipCard = (color: CardColor): Card => {
    return {
        id: uuid.v4(),
        isWild: false,
        color,
        value: 'skip',
        behaviors: [new SkipPlayerBehavior()],
    };
};

const createWildCard = (): Card => {
    return {
        id: uuid.v4(),
        isWild: true,
        behaviors: [new ChangeColorBehavior()],
    };
};

const createWildPlusCard = (plus: '1' | '2' | '4'): Card => {
    return {
        id: uuid.v4(),
        isWild: true,
        value: `plus${plus}`,
        behaviors: [new ChangeColorBehavior(), new WithdrewBehavior(parseInt(plus))],
    };
};

const createWildReverseCard = (): Card => {
    return {
        id: uuid.v4(),
        isWild: true,
        value: 'reverse',
        behaviors: [new ChangeColorBehavior(), new ReverseBehavior()],
    };
};
