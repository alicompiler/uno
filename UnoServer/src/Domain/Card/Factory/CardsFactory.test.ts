import { ChangeColorBehavior } from '../Behaviors/ChangeColorBehavior';
import { NextPlayerBehavior } from '../Behaviors/NextPlayerBehavior';
import { SkipPlayerBehavior } from '../Behaviors/SkipPlayerBehavior';
import { cardColors } from '../Card';
import { createColoredCard, createColoredCards, createWildCard, createWildCards } from './CardsFactory';

describe('Cards Factory', () => {
    it('should create colored cards', () => {
        const cards = createColoredCard({
            color: 'blue',
            behaviors: [],
            times: 2,
            value: '7',
        });

        expect(cards.length).toEqual(2);
        expect(cards[0].id).not.toBeNull();
        expect(cards[0].color).toEqual('blue');
        expect(cards[0].isWild).toEqual(false);
        expect(cards[0].value).toEqual('7');
        expect(cards[0].behaviors.length).toEqual(1);
        expect(cards[0].behaviors[0]).toBeInstanceOf(NextPlayerBehavior);

        expect(cards[1].id).not.toBeNull();
        expect(cards[1].color).toEqual('blue');
        expect(cards[1].isWild).toEqual(false);
        expect(cards[1].value).toEqual('7');
        expect(cards[1].behaviors.length).toEqual(1);
        expect(cards[1].behaviors[0]).toBeInstanceOf(NextPlayerBehavior);
    });

    it('should create colored cards but with no next player behavior', () => {
        const skipBehavior = new SkipPlayerBehavior();
        const cards = createColoredCard({
            color: 'blue',
            behaviors: [skipBehavior],
            times: 2,
            value: '7',
            noNextPlayerBehavior: true,
        });

        expect(cards.length).toEqual(2);
        expect(cards[0].id).not.toBeNull();
        expect(cards[0].color).toEqual('blue');
        expect(cards[0].isWild).toEqual(false);
        expect(cards[0].value).toEqual('7');
        expect(cards[0].behaviors.length).toEqual(1);
        expect(cards[0].behaviors[0]).toBe(skipBehavior);

        expect(cards[1].id).not.toBeNull();
        expect(cards[1].color).toEqual('blue');
        expect(cards[1].isWild).toEqual(false);
        expect(cards[1].value).toEqual('7');
        expect(cards[1].behaviors.length).toEqual(1);
        expect(cards[1].behaviors[0]).toBe(skipBehavior);
    });

    it('should create colored cards for all colors', () => {
        const cards = createColoredCards(1, ['0', '1'], []);

        expect(cards.length).toEqual(8);
        for (let i = 0; i < 8; i++) {
            expect(cards[i].id).not.toBeNull();
            expect(cards[i].color).toEqual(cardColors[Math.floor(i / 2)]);
            expect(cards[i].isWild).toEqual(false);
            expect(cards[i].value).toEqual(i % 2 === 0 ? '0' : '1');
            expect(cards[i].behaviors.length).toEqual(1);
            expect(cards[i].behaviors[0]).toBeInstanceOf(NextPlayerBehavior);
        }
    });

    it('should create colored cards for all colors with no next player behavior', () => {
        const skipBehavior = new SkipPlayerBehavior();
        const cards = createColoredCards(1, ['0', '1'], [skipBehavior], true);

        expect(cards.length).toEqual(8);
        for (let i = 0; i < 8; i++) {
            expect(cards[i].id).not.toBeNull();
            expect(cards[i].color).toEqual(cardColors[Math.floor(i / 2)]);
            expect(cards[i].isWild).toEqual(false);
            expect(cards[i].value).toEqual(i % 2 === 0 ? '0' : '1');
            expect(cards[i].behaviors.length).toEqual(1);
            expect(cards[i].behaviors[0]).toBeInstanceOf(SkipPlayerBehavior);
        }
    });

    it('should create wild cards', () => {
        const cards = createWildCard({
            times: 2,
            behaviors: [],
        });

        expect(cards.length).toEqual(2);
        expect(cards[0].id).not.toBeNull();
        expect(cards[0].color).toEqual(undefined);
        expect(cards[0].isWild).toEqual(true);
        expect(cards[0].value).toEqual(undefined);
        expect(cards[0].behaviors.length).toEqual(2);
        expect(cards[0].behaviors[0]).toBeInstanceOf(ChangeColorBehavior);
        expect(cards[0].behaviors[1]).toBeInstanceOf(NextPlayerBehavior);

        expect(cards[1].id).not.toBeNull();
        expect(cards[1].color).toEqual(undefined);
        expect(cards[1].isWild).toEqual(true);
        expect(cards[1].value).toEqual(undefined);
        expect(cards[1].behaviors.length).toEqual(2);
        expect(cards[1].behaviors[0]).toBeInstanceOf(ChangeColorBehavior);
        expect(cards[1].behaviors[1]).toBeInstanceOf(NextPlayerBehavior);
    });

    it('should create wild cards without next player behavior', () => {
        const cards = createWildCard({
            times: 2,
            behaviors: [],
            noNextPlayerBehavior: true,
        });

        expect(cards.length).toEqual(2);
        expect(cards[0].id).not.toBeNull();
        expect(cards[0].color).toEqual(undefined);
        expect(cards[0].isWild).toEqual(true);
        expect(cards[0].value).toEqual(undefined);
        expect(cards[0].behaviors.length).toEqual(1);
        expect(cards[0].behaviors[0]).toBeInstanceOf(ChangeColorBehavior);

        expect(cards[1].id).not.toBeNull();
        expect(cards[1].color).toEqual(undefined);
        expect(cards[1].isWild).toEqual(true);
        expect(cards[1].value).toEqual(undefined);
        expect(cards[1].behaviors.length).toEqual(1);
        expect(cards[1].behaviors[0]).toBeInstanceOf(ChangeColorBehavior);
    });

    it('should create wild cards for set of values', () => {
        const cards = createWildCards(1, ['plus4', 'reverse'], []);

        expect(cards.length).toEqual(2);
        expect(cards[0].id).not.toBeNull();
        expect(cards[0].color).toEqual(undefined);
        expect(cards[0].isWild).toEqual(true);
        expect(cards[0].value).toEqual('plus4');
        expect(cards[0].behaviors.length).toEqual(2);
        expect(cards[0].behaviors[0]).toBeInstanceOf(ChangeColorBehavior);
        expect(cards[0].behaviors[1]).toBeInstanceOf(NextPlayerBehavior);

        expect(cards[1].id).not.toBeNull();
        expect(cards[1].color).toEqual(undefined);
        expect(cards[1].isWild).toEqual(true);
        expect(cards[1].value).toEqual('reverse');
        expect(cards[1].behaviors.length).toEqual(2);
        expect(cards[1].behaviors[0]).toBeInstanceOf(ChangeColorBehavior);
        expect(cards[1].behaviors[1]).toBeInstanceOf(NextPlayerBehavior);
    });
});
