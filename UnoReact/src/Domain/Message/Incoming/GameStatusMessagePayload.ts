import type { CardColor, UnoCard } from '../../Card/UnoCard';

type CardCountIndicator = 'low' | 'few' | 'high';

export interface GameStatus {
    id: string;

    players: {
        id: string;
        name: string;
        isAdmin: boolean;
        cards: UnoCard[];
        isConnected: boolean;
        cardsCountIndicator: CardCountIndicator;
    }[];
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
