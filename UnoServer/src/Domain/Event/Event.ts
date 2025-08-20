export enum EventType {
    Withdrew = 'withdrew',
    SkipPlayer = 'skip-player',
    ReversePlayingDirection = 'reverse-playing-direction',
    ChangeColor = 'change-color',
}

export interface Event {
    type: EventType;
    payload: unknown;
}

export function createWithdrewEvent(playerId: string, count: number): Event {
    return {
        type: EventType.Withdrew,
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
