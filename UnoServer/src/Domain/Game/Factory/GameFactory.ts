import { ChangeColorBehavior } from '../../Card/Behaviors/ChangeColorBehavior';
import { NextPlayerBehavior } from '../../Card/Behaviors/NextPlayerBehavior';
import { Card, CardColor, cardColors, CardValue } from '../../Card/Card';
import { CardBehavior } from '../../Card/CardBehavior';
import { Game } from '../Game';
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
