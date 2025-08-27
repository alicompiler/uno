import { Game } from '../../Game/Game';
import { WithdrawBehaviorBase } from './WithdrawBehaviorBase';

export class WithdrawBehaviorForCurrentPlayer extends WithdrawBehaviorBase {
    protected getPlayerIndex(game: Game): number {
        return game.activePlayerIndex;
    }
}
