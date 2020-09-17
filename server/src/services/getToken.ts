import jwt from 'jsonwebtoken';
import { API_ACCESS_TOKEN } from '../utils/config';

export function getToken(
    payload: string | Record<string, unknown> | Buffer = {},
    limit: number | string = 691200
): string {
    const secret = API_ACCESS_TOKEN;

    const token = jwt.sign(payload, secret, {
        expiresIn: limit,
    });

    return token;
}
