import { randomBytes } from 'crypto';
export function generateRandomHex(length: number): string {
    const hex = randomBytes(length).toString('hex');

    return hex;
}
