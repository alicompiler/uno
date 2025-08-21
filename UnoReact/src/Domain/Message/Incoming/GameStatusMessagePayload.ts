import type { UnoCard } from '../../Card/UnoCard';

export interface GameStatus {
    id: string;

    players: { id: string; name: string; isAdmin: boolean }[];
    topCard?: UnoCard;
    withdrewPileCount: number;
    direction: 'rtl' | 'ltr';

    hasStarted: boolean;
}
