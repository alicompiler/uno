import { Game } from '../Domain/Game/Game';

export const buildMockGame = (): Game => {
    return {
        id: '',
        activePlayerIndex: 0,
        color: 'blue',
        direction: 'ltr',
        discardPile: [],
        drawCount: 0,
        finished: false,
        hasStarted: true,
        players: [
            { id: 'p1', cards: [{ id: 'abc', isWild: true, behaviors: [] }], isAdmin: false, name: 'Player 1' },
            { id: 'p2', cards: [{ id: 'abc', isWild: true, behaviors: [] }], isAdmin: false, name: 'Player 2' },
        ],
        withdrawPile: [{ id: 'test-card', isWild: true, behaviors: [] }],
    };
};

export const assertNotChanged = (oldGame: Game, newGame: Game, skipKeys: (keyof Game)[]) => {
    const keys = Object.keys(newGame) as (keyof Game)[];

    keys.filter((key) => !skipKeys.includes(key)).forEach((key) => {
        if (!Array.isArray(newGame[key]) && !Array.isArray(oldGame[key])) {
            expect(newGame[key]).toEqual(oldGame[key]);
        } else if (Array.isArray(newGame[key]) && Array.isArray(oldGame[key])) {
            expect(newGame[key].length).toEqual(oldGame[key].length);
        } else {
            expect(false).toEqual(true);
        }
    });
};
