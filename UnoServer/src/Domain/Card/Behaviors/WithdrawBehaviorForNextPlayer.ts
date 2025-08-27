import { Game, getNextPlayerIndex } from '../../Game/Game';
import { WithdrawBehaviorBase } from './WithdrawBehaviorBase';

export class WithdrawBehaviorForNextPlayer extends WithdrawBehaviorBase {
    constructor(
        count: number,
        private readonly steps: number
    ) {
        super(count);
    }

    protected getPlayerIndex(game: Game): number {
        return getNextPlayerIndex(game, this.steps);
    }
}
