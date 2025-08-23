import { ChangePlayerBehavior } from './ChangePlayerBehavior';

export class SkipPlayerBehavior extends ChangePlayerBehavior {
    getStep(): number {
        return 2;
    }
}
