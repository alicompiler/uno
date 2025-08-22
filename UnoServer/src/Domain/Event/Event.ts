export enum EventType {
    Withdraw = 'withdraw',
    SkipPlayer = 'skip-player',
    ReversePlayingDirection = 'reverse-playing-direction',
    ChangeColor = 'change-color',
    GameFinished = 'game-finished',
    WithdrawPileReset = 'withdraw-pile-reset',
}

export interface Event {
    type: EventType;
    payload: unknown;
}

export function createWithdrawEvent(playerId: string, count: number): Event {
    return {
        type: EventType.Withdraw,
        payload: {
            playerId,
            count,
        },
    };
}

export function createSkipPlayerEvent(nextPlayerId: string): Event {
    return {
        type: EventType.SkipPlayer,
        payload: {
            nextPlayerId,
        },
    };
}

export function createReverseEvent(newDirection: string): Event {
    return {
        type: EventType.ReversePlayingDirection,
        payload: {
            newDirection,
        },
    };
}

export function createChangeColorEvent(newColor: string): Event {
    return {
        type: EventType.ChangeColor,
        payload: {
            newColor,
        },
    };
}
