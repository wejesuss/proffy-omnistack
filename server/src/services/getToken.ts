import jwt from 'jsonwebtoken';

export function getToken(
    payload: string | Record<string, unknown> | Buffer = {},
    limit: number | string = 691200
): string {
    const secret = process.env.API_ACCESS_TOKEN || '';

    const token = jwt.sign(payload, secret, {
        expiresIn: limit,
    });

    return token;
}
