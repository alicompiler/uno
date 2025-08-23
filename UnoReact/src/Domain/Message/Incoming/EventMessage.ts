import { type Event, EventType } from './IncomingMessage';

export const getEventMessage = (events: Event[], players: Record<string, string>): string => {
    return events.reduce((acc, e) => {
        switch (e.type) {
            case EventType.GameFinished:
                return acc + '\n' + `Game Finished, ${e.payload.winner.name} Won`;
            case EventType.Withdraw:
                const player = players[e.payload.playerId] ?? '-';
                return acc + '\n' + `Player: ${player} withdraw ${e.payload.count} cards`;
            case EventType.WithdrawPileReset:
                return acc + '\n' + 'Withdraw Pile Reset';
            default:
                return acc;
        }
    }, '');
};
