import { buildMockGame } from '../../TestUtils/GameMocks';
import { Card, CardColor, cardColors } from '../Card/Card';
import { CardBehavior } from '../Card/CardBehavior';
import { EventType } from '../Event/Event';
import { canPlayCard, Game, getNextPlayerIndex, playCard, skipNoCard, startGame, withdrawCard } from './Game';

describe('Game', () => {
    describe('can play card', () => {
        it('should return true when the discarded card is wild', () => {
            const game = buildMockGame();
            const card: Card = { id: '', behaviors: [], isWild: true };
            const topCard: Card = { id: '', behaviors: [], isWild: false, color: 'blue', value: '7' };
            game.discardPile.push(topCard);

            const can = canPlayCard(game, card);

            expect(can).toBe(true);
        });

        it('should return true when top card in the discard pile matches the color of the discarded card', () => {
            const game = buildMockGame();
            const card: Card = { id: '', behaviors: [], isWild: false, color: 'blue', value: '1' };
            const topCard: Card = { id: '', behaviors: [], isWild: false, color: 'blue', value: '7' };
            game.discardPile.push(topCard);

            const can = canPlayCard(game, card);

            expect(can).toBe(true);
        });

        it('should return true when top card in the discard pile matches the value of the discarded card', () => {
            const game = buildMockGame();
            const card: Card = { id: '', behaviors: [], isWild: false, color: 'blue', value: '1' };
            const topCard: Card = { id: '', behaviors: [], isWild: false, color: 'green', value: '1' };
            game.discardPile.push(topCard);

            const can = canPlayCard(game, card);

            expect(can).toBe(true);
        });

        it('should return true when the color of the game matches the color of the discarded card', () => {
            const game = buildMockGame();
            game.color = 'green';
            const card: Card = { id: '', behaviors: [], isWild: false, color: 'green', value: '1' };
            const topCard: Card = { id: '', behaviors: [], isWild: true };
            game.discardPile.push(topCard);

            const can = canPlayCard(game, card);

            expect(can).toBe(true);
        });

        it('should return false when no condition matched', () => {
            const game = buildMockGame();
            const card: Card = { id: '', behaviors: [], isWild: false, color: 'red', value: '1' };
            const topCard: Card = { id: '', behaviors: [], isWild: false, color: 'green', value: '7' };
            game.discardPile.push(topCard);

            const can = canPlayCard(game, card);

            expect(can).toBe(false);
        });
    });

    describe('play card', () => {
        const mockBehavior1: CardBehavior = {
            execute(game) {
                return {
                    game: { ...game, activePlayerIndex: 10 },
                    events: [{ type: EventType.ChangeColor, payload: 'blue' }],
                };
            },
        };

        const mockBehavior2: CardBehavior = {
            execute(game) {
                return {
                    game: { ...game, direction: 'rtl' },
                    events: [{ type: EventType.SkipPlayer, payload: 'Ali' }],
                };
            },
        };

        it('should discard a card', () => {
            const game = buildMockGame();
            const card: Card = {
                id: 'discarded-card',
                isWild: false,
                color: 'red',
                value: '1',
                behaviors: [],
            };

            game.activePlayerIndex = 0;
            game.players[0].cards = [card, { id: 'test-card', behaviors: [], isWild: true }];

            const { game: newGame } = playCard(game, card, {});

            expect(game).not.toBe(newGame);
            const topCard = newGame.discardPile.pop();

            expect(topCard!.id).toBe('discarded-card');
            expect(newGame.players[0].cards.length).toEqual(1);
            expect(newGame.players[0].cards[0].id).toEqual('test-card');
        });

        it('should apply all behaviors of the card', () => {
            const game = buildMockGame();
            const card: Card = {
                id: '',
                isWild: false,
                color: 'blue',
                value: 'reverse',
                behaviors: [mockBehavior1, mockBehavior2],
            };

            const { game: newGame, events } = playCard(game, card, {});

            expect(newGame.activePlayerIndex).toEqual(10);
            expect(newGame.direction).toEqual('rtl');
            expect(game.direction).toEqual('ltr');

            expect(events[0].type).toEqual(EventType.ChangeColor);
            expect(events[0].payload).toEqual('blue');

            expect(events[1].type).toEqual(EventType.SkipPlayer);
            expect(events[1].payload).toEqual('Ali');
        });

        it('should reset draw count', () => {
            const game = buildMockGame();
            game.drawCount = 10;
            const card: Card = {
                id: 'discarded-card',
                isWild: false,
                color: 'red',
                value: '1',
                behaviors: [],
            };

            const { game: newGame } = playCard(game, card, {});

            expect(newGame.drawCount).toEqual(0);
        });

        it('should change color of the game when the color of the game changed by wild card', () => {
            const game = buildMockGame();
            const card: Card = {
                id: 'discarded-card',
                isWild: false,
                color: 'red',
                value: '1',
                behaviors: [],
            };

            const { game: newGame } = playCard(game, card, {});

            expect(newGame.color).not.toEqual(game.color);
            expect(newGame.color).toEqual('red');
        });

        it('should finish the game when last card of the player is discarded', () => {
            const game = buildMockGame();
            const card: Card = {
                id: 'discarded-card',
                isWild: false,
                color: 'red',
                value: '1',
                behaviors: [],
            };
            game.activePlayerIndex = 0;
            game.players[0].cards = [card];

            const { game: newGame, events } = playCard(game, card, {});

            expect(newGame.finished).toEqual(true);
            expect(events.length).toEqual(1);
            expect(events[0].type).toEqual(EventType.GameFinished);
            expect(events[0].payload).toEqual({
                winner: {
                    id: 'p1',
                    name: 'Player 1',
                },
            });
        });

        it('should reset withdraw pile if empty', () => {
            const game = buildMockGame();
            const card: Card = {
                id: 'discarded-card',
                isWild: false,
                color: 'red',
                value: '1',
                behaviors: [],
            };
            game.activePlayerIndex = 0;
            game.players[0].cards = new Array(3)
                .fill(0)
                .map((_, i) => ({ id: `id-${i}`, isWild: true, behaviors: [] }));
            game.withdrawPile = [];
            game.discardPile = new Array(10)
                .fill(0)
                .map((_, i) => ({ id: `discard-id-${i}`, isWild: true, behaviors: [] }));

            const { game: newGame, events } = playCard(game, card, {});

            expect(newGame.withdrawPile.length).toEqual(10);
            newGame.withdrawPile.forEach((c) => expect(c.id.startsWith('discard-id-')).toEqual(true));
            expect(events.length).toEqual(1);
            expect(events[0].type).toEqual(EventType.WithdrawPileReset);
        });
    });

    describe('withdraw card', () => {
        it('should withdraw card', () => {
            const cards: Card[] = [
                { id: 'c1', isWild: true, value: 'plus4', behaviors: [] },
                { id: 'c2', isWild: true, value: 'plus2', behaviors: [] },
                { id: 'c3', isWild: true, value: 'plus1', behaviors: [] },
            ];
            const game = buildMockGame();
            game.withdrawPile = cards;
            game.activePlayerIndex = 0;
            game.drawCount = 0;

            const { game: newGame, events } = withdrawCard(game);
            expect(newGame.players[0].cards.length).toEqual(2);
            expect(newGame.withdrawPile.length).toEqual(2);
            expect(newGame.withdrawPile[0].id).toEqual('c1');
            expect(newGame.withdrawPile[1].id).toEqual('c2');
            expect(newGame.drawCount).toEqual(1);
            expect(events[0].type).toEqual(EventType.Withdraw);
            expect(events[0].payload).toEqual({
                playerId: 'p1',
                count: 1,
            });
        });

        it('should reset withdraw pile', () => {
            const cards: Card[] = [
                { id: 'c1', isWild: true, value: 'plus4', behaviors: [] },
                { id: 'c2', isWild: true, value: 'plus2', behaviors: [] },
                { id: 'c3', isWild: true, value: 'plus1', behaviors: [] },
                { id: 'c4', isWild: true, value: 'plus1', behaviors: [] },
                { id: 'c5', isWild: true, value: 'plus1', behaviors: [] },
                { id: 'c6', isWild: true, value: 'plus1', behaviors: [] },
            ];
            const game = buildMockGame();
            game.withdrawPile = [{ id: 'c7', isWild: true, value: 'reverse', behaviors: [] }];
            game.discardPile = cards;
            game.activePlayerIndex = 0;

            const { game: newGame, events } = withdrawCard(game);

            expect(newGame.withdrawPile.length).toEqual(5);
            expect(newGame.discardPile.length).toEqual(1);

            expect(events[1].type).toEqual(EventType.WithdrawPileReset);
            expect(events[1].payload).toEqual({});
        });
    });

    describe('skip no card', () => {
        it('should skip play with no card', () => {
            const game = buildMockGame();
            game.activePlayerIndex = 0;
            const { game: newGame, events } = skipNoCard(game);
            expect(newGame.drawCount).toEqual(0);
            expect(events.length).toEqual(0);
            expect(newGame.activePlayerIndex).toEqual(1);
        });
    });

    describe('next player position', () => {
        const game = buildMockGame();
        game.players = [
            ...game.players,
            { id: 'p3', cards: [], isAdmin: false, name: 'Player 3' },
            { id: 'p4', cards: [], isAdmin: false, name: 'Player 4' },
        ];

        it('should get next player when active player is in the middle (ltr)', () => {
            game.activePlayerIndex = 1;
            game.direction = 'ltr';
            const newPosition = getNextPlayerIndex(game, 1);
            expect(newPosition).toEqual(2);
        });

        it('should get next player when last player reached (ltr)', () => {
            game.activePlayerIndex = 3;
            game.direction = 'ltr';
            const newPosition = getNextPlayerIndex(game, 1);
            expect(newPosition).toEqual(0);
        });

        it('should get next player when first player reached (ltr)', () => {
            game.activePlayerIndex = 0;
            game.direction = 'ltr';
            const newPosition = getNextPlayerIndex(game, 1);
            expect(newPosition).toEqual(1);
        });

        it('should get next player when active player is in the middle (rtl)', () => {
            game.activePlayerIndex = 2;
            game.direction = 'rtl';
            const newPosition = getNextPlayerIndex(game, 1);
            expect(newPosition).toEqual(1);
        });

        it('should get next player when last player reached (rtl)', () => {
            game.activePlayerIndex = 0;
            game.direction = 'rtl';
            const newPosition = getNextPlayerIndex(game, 1);
            expect(newPosition).toEqual(3);
        });

        it('should get next player when first player reached (rtl)', () => {
            game.activePlayerIndex = 3;
            game.direction = 'rtl';
            const newPosition = getNextPlayerIndex(game, 1);
            expect(newPosition).toEqual(2);
        });

        it('should get next player using 2 steps (ltr)', () => {
            game.activePlayerIndex = 2;
            game.direction = 'ltr';
            const newPosition = getNextPlayerIndex(game, 2);
            expect(newPosition).toEqual(0);
        });

        it('should get next player using 2 steps (rtl)', () => {
            game.activePlayerIndex = 1;
            game.direction = 'rtl';
            const newPosition = getNextPlayerIndex(game, 2);
            expect(newPosition).toEqual(3);
        });
    });

    describe('start game', () => {
        it('should throw when there is no enough cards', () => {
            const game = buildMockGame();
            game.hasStarted = false;
            expect(() => startGame(game)).toThrowError('cannot start game, invalid state');
        });

        it('should throw when there is no enough players', () => {
            const game = buildMockGame();
            game.players = [game.players[0]];
            game.withdrawPile = new Array(100).fill(0).map((_, i) => ({ id: `id-${i}`, behaviors: [], isWild: true }));
            expect(() => startGame(game)).toThrowError('cannot start game, invalid state');
        });

        it('should throw when game already started', () => {
            const game = buildMockGame();
            game.withdrawPile = new Array(100).fill(0).map((_, i) => ({ id: `id-${i}`, behaviors: [], isWild: true }));
            game.hasStarted = true;
            expect(() => startGame(game)).toThrowError('cannot start game, invalid state');
        });

        it('should start game', () => {
            const game = buildMockGame();
            game.hasStarted = false;
            game.discardPile = [];
            game.activePlayerIndex = -1;
            game.color = '' as unknown as CardColor;
            game.withdrawPile = new Array(100).fill(0).map((_, i) => ({ id: `id-${i}`, behaviors: [], isWild: true }));

            startGame(game);

            expect(game.hasStarted).toEqual(true);
            expect(game.discardPile.length).toEqual(1);
            expect(game.players[0].cards.length).toEqual(7);
            expect(game.players[1].cards.length).toEqual(7);
            expect(game.activePlayerIndex).toBeGreaterThan(-1);
            expect(cardColors.includes(game.color)).toEqual(true);
            expect(game.withdrawPile.length).toEqual(100 - 14 - 1); // total - given to players - top card
        });

        it('should start game and set color based on the top card', () => {
            const game = buildMockGame();
            game.hasStarted = false;
            game.discardPile = [];
            game.activePlayerIndex = -1;
            game.color = '' as unknown as CardColor;
            game.withdrawPile = new Array(100)
                .fill(0)
                .map((_, i) => ({ id: `id-${i}`, behaviors: [], isWild: false, color: 'blue', value: '1' }));

            startGame(game);

            expect(game.hasStarted).toEqual(true);
            expect(game.discardPile.length).toEqual(1);
            expect(game.players[0].cards.length).toEqual(7);
            expect(game.players[1].cards.length).toEqual(7);
            expect(game.activePlayerIndex).toBeGreaterThan(-1);
            expect(game.color).toEqual('blue');
            expect(game.withdrawPile.length).toEqual(100 - 14 - 1); // total - given to players - top card
        });
    });
});
