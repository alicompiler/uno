import { getServiceProvider } from '../Core/ServiceProvider';

const gamesTimersIds: Record<string, NodeJS.Timeout> = {};

// TODO: set from environment variables
const DESTROY_GAME_TIMEOUT = 1000 * 60 * 5;

const sp = getServiceProvider();

export const scheduleGameRemoval = (gameId: string) => {
    cancelGameRemoval(gameId);

    const timerId = setTimeout(() => {
        const gameRepository = sp.getGameRepository();
        gameRepository.removeById(gameId);
        console.log(`Game: ${gameId} has been cleaned up`);
    }, DESTROY_GAME_TIMEOUT);

    gamesTimersIds[gameId] = timerId;
};

export const cancelGameRemoval = (gameId: string) => {
    const timerId = gamesTimersIds[gameId];
    if (timerId) {
        clearTimeout(timerId);
    }
};
