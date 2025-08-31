import { randomInt } from 'crypto';

export function generateGameKey(length: number = 6): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let key = '';

    for (let i = 0; i < length; i++) {
        key += chars[randomInt(0, chars.length)];
    }

    return key;
}
