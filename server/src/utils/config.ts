import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({
    path: resolve(__dirname, '..', '..', '.env'),
});

export const EMAIL_PORT = Number(process.env.EMAIL_PORT);
export const AUTH_EMAIL_USER = String(process.env.AUTH_EMAIL_USER);
export const AUTH_EMAIL_PASS = String(process.env.AUTH_EMAIL_PASS);
export const API_ACCESS_TOKEN = String(process.env.API_ACCESS_TOKEN);
