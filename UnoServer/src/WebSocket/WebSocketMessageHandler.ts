import { getServiceProvider } from '../Core/ServiceProvider';
import { DrawCardActionHandler } from './Actions/DrawCardActionHandler';
import { PlayCardActionHandler } from './Actions/PlayCardActionHandler';
import { SkipNoCardActionHandler } from './Actions/SkipNoCardActionHandler';
import { StartGameActionHandler } from './Actions/StartGameActionHandler';
import { MessageType, IncomingMessage } from './Message/Incoming/IncomingMessage';
import { WebSocket } from 'ws';
import { Event } from '../Domain/Event/Event';
import { NextPlayerBehavior } from '../Domain/Card/Behaviors/NextPlayerBehavior';
import { GameStateEvent } from './Events/GameStateEvent';
import { UIEvents } from './Events/UIEvents';
import { WithdrawBehaviorForCurrentPlayer } from '../Domain/Card/Behaviors/WithdrawBehaviorForCurrentPlayer';

const sp = getServiceProvider();
const gameRepository = sp.getGameRepository();
let timerId: ReturnType<typeof setTimeout> | null = null;

export const handleWebSocketMessage = (data: string, gameId: string, playerId: string, ws: WebSocket) => {
    const message = JSON.parse(data) as IncomingMessage;

    switch (message.type) {
        case MessageType.StartGame:
            new StartGameActionHandler(gameId, playerId).handleAction(ws, message);
            setPlayerTimeout(gameId);
            break;

        case MessageType.PlayCard:
            new PlayCardActionHandler(gameId, playerId).handleAction(ws, message);
            setPlayerTimeout(gameId);
            break;

        case MessageType.DrawCard:
            new DrawCardActionHandler(gameId, playerId).handleAction(ws, message);
            break;

        case MessageType.SkipNoCard:
            new SkipNoCardActionHandler(gameId, playerId).handleAction(ws, message);
            setPlayerTimeout(gameId);
            break;
    }
};

// TODO: set from game settings
const PLAYER_TIMEOUT_IN_MS = 45 * 1000;
// TODD: set from game settings
const MAX_DRAW_COUNT = 1;

const setPlayerTimeout = (gameId: string) => {
    if (timerId) {
        clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
        const game = gameRepository.findById(gameId);
        if (!game || game.finished) {
            return;
        }

        const withdrawBehavior = new WithdrawBehaviorForCurrentPlayer(MAX_DRAW_COUNT - game.drawCount);
        const events: Event[] = [];
        let result = withdrawBehavior.execute(game);
        events.push(...result.events);

        const nextPlayerBehavior = new NextPlayerBehavior();
        result = nextPlayerBehavior.execute(result.game);
        events.push(...result.events);

        const gameStateEvent = new GameStateEvent();
        gameStateEvent.send(result.game);

        const uiEvents = new UIEvents(events);
        uiEvents.send(game);

        gameRepository.update(result.game);

        setPlayerTimeout(gameId);
    }, PLAYER_TIMEOUT_IN_MS);
};
