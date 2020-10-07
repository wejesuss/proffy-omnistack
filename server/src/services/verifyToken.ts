import jwt from 'jsonwebtoken';
import { API_ACCESS_TOKEN } from '../utils/config';

export function verifyToken<T = Record<string, unknown> | string>(
    token: string
): T {
    const secret = API_ACCESS_TOKEN;

    const payload = jwt.verify(token, secret);

    return (payload as unknown) as T;
}
