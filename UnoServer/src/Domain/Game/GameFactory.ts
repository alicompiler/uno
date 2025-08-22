import { ChangeColorBehavior } from '../Card/Behaviors/ChangeColorBehavior';
import { NextPlayerBehavior } from '../Card/Behaviors/NextPlayerBehavior';
import { Card, CardColor, cardColors, CardValue } from '../Card/Card';
import { CardBehavior } from '../Card/CardBehavior';
import { Game } from './Game';
import { createOriginalGame } from './OriginalGameFactory';
import * as uuid from 'uuid';

export type GameType = 'original';
export const gameTypeValues: GameType[] = ['original'];

export function createGame(type: GameType): Game {
    switch (type) {
        case 'original':
            return createOriginalGame();
        default:
            throw new Error(`Cannot create game for type: ${type}`);
    }
}

export const createColoredCard = ({
    color,
    value,
    behaviors,
    times,
    noNextPlayerBehavior,
}: {
    times: number;
    color: CardColor;
    value: CardValue;
    behaviors: CardBehavior[];
    noNextPlayerBehavior?: boolean;
}): Card[] => {
    const allBehaviors = [...behaviors];
    if (!noNextPlayerBehavior) {
        allBehaviors.push(new NextPlayerBehavior());
    }

    return new Array(times).fill(0).map(() => ({
        id: uuid.v4(),
        isWild: false,
        color,
        value,
        behaviors: allBehaviors,
    }));
};

export const createWildCard = ({
    times,
    value,
    behaviors,
    noNextPlayerBehavior,
}: {
    times: number;
    value?: CardValue;
    behaviors: CardBehavior[];
    noNextPlayerBehavior?: boolean;
}): Card[] => {
    const allBehaviors = [...behaviors];
    if (!noNextPlayerBehavior) {
        allBehaviors.push(new NextPlayerBehavior());
    }
    return new Array(times).fill(0).map(() => ({
        id: uuid.v4(),
        isWild: true,
        value,
        behaviors: [new ChangeColorBehavior(), ...allBehaviors],
    }));
};

export const createColoredCards = (
    timesForEachValue: number,
    values: CardValue[],
    behaviors: CardBehavior[],
    noNextPlayerBehavior: boolean = false
): Card[] => {
    return cardColors
        .map((color) =>
            values
                .map((value) =>
                    createColoredCard({
                        color,
                        value,
                        behaviors: behaviors,
                        times: timesForEachValue,
                        noNextPlayerBehavior: noNextPlayerBehavior,
                    }).flat()
                )
                .flat()
        )
        .flat();
};

export const createWildCards = (
    timesForEachValue: number,
    values: (CardValue | undefined)[],
    behaviors: CardBehavior[],
    noNextPlayerBehavior: boolean = false
): Card[] => {
    return values
        .map((value) =>
            createWildCard({
                value,
                behaviors: behaviors,
                times: timesForEachValue,
                noNextPlayerBehavior: noNextPlayerBehavior,
            }).flat()
        )
        .flat();
};
