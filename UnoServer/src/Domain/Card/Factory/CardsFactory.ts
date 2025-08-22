import { ChangeColorBehavior } from '../Behaviors/ChangeColorBehavior';
import { NextPlayerBehavior } from '../Behaviors/NextPlayerBehavior';
import { Card, CardColor, cardColors, CardValue } from '../Card';
import { CardBehavior } from '../CardBehavior';
import * as uuid from 'uuid';

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
