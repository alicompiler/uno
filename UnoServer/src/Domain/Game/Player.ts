import { Card } from '../Card/Card';

export interface Player {
    id: string;
    name: string;
    cards: Card[];
    isAdmin: boolean;
}
