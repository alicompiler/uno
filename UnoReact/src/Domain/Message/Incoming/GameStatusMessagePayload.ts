import type { CardColor, UnoCard } from '../../Card/UnoCard';

export interface GameStatus {
    id: string;

    players: { id: string; name: string; isAdmin: boolean; cards: UnoCard[]; isConnected: boolean }[];
    topCard?: UnoCard;
    withdrawPileCount: number;
    direction: 'rtl' | 'ltr';

    hasStarted: boolean;

    activePlayer: { id: string; name: string };

    myCards: UnoCard[];

    drawCount: number;
    color: CardColor;
    finished: boolean;
}
