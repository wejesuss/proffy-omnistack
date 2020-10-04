import { Request, Response } from 'express';
import { compare, hash } from 'bcrypt';

import db from '../database/connection';
import { getToken } from '../services';
import { generateRandomHex } from '../utils/generateRandomHex';
import sendMail from '../utils/sendMail';
import { baseForgotEmailText as baseText } from '../resources/mail/forgotPasswordEmail';
import getMyIPAddress from '../utils/getMyIpAddress';

interface UserProps {
    name: string;
    surname: string;
    email: string;
    password: string;
}

class SessionController {
    async login(req: Request, res: Response) {
        const { email, password }: UserProps = req.body;

        if (!email) {
            return res
                .status(400)
                .json({ error: 'do not forget to send the email address' });
        }

        if (!password) {
            return res
                .status(400)
                .json({ error: 'do not forget to send the password' });
        }

        const [user] = await db('users')
            .select(
                'id',
                'email',
                'name',
                'surname',
                'avatar',
                'whatsapp',
                'bio'
            )
            .where('email', '=', email);

        if (!user) {
            return res.status(400).json({ error: 'user not found' });
        }

        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: 'incorrect password' });
        }

        const token = getToken({
            id: user.id,
            email: user.email,
            name: user.name,
            surname: user.surname,
        });

        user.avatar = `http://${getMyIPAddress('Wi-Fi').address}:3333`;

        return res.json({ user, token });
    }

    async forgot(req: Request, res: Response) {
        const email: string = req.body.email;

        try {
            if (!email) {
                return res
                    .status(400)
                    .json({ error: 'do not forget to send the email address' });
            }

            const [user] = await db('users').where('email', '=', email);

            if (!user) {
                return res.status(400).json({ error: 'user not found' });
            }

            const token = generateRandomHex(24);

            if (!token) {
                return res
                    .status(500)
                    .json({ error: 'Error on creating token, try again' });
            }

            const now = new Date();
            const giveOneHourOfExpiration = now.getHours() + 1;
            now.setHours(giveOneHourOfExpiration);

            await db('users')
                .update({
                    passwordResetToken: token,
                    passwordResetExpires: now,
                })
                .where('id', '=', user.id);

            sendMail({
                email: {
                    baseText,
                    replacers: [email, token],
                    placeholder: '**',
                },
                options: {
                    from: 'proffy@contato.com',
                    to: email,
                    subject: 'Password Reset',
                },
            });

            return res.send();
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ error: 'unexpected error, try again' });
        }
    }

    async reset(req: Request, res: Response) {
        const { token, email, password: newPassword } = req.body;

        if (!token || !email || !newPassword) {
            return res.status(400).json({
                error: 'token, email and newPassword expected, send all values',
            });
        }

        const [user] = await db('users').where('email', '=', email);

        if (!user) {
            return res.status(400).json({ error: 'user not found' });
        }

        const trx = await db.transaction();

        try {
            const { passwordResetToken, passwordResetExpires } = user;

            if (token !== passwordResetToken) {
                await trx.rollback();
                return res.status(400).json({ error: 'invalid token' });
            }

            const now = new Date();
            const elapsedMoreThanOneHour = passwordResetExpires < now.getTime();

            if (elapsedMoreThanOneHour || !passwordResetExpires) {
                await trx.rollback();
                return res.status(400).json({ error: 'expired token' });
            }

            await trx('users')
                .update({
                    password: await hash(newPassword, 10),
                    passwordResetToken: null,
                    passwordResetExpires: null,
                })
                .where('id', '=', user.id);

            await trx.commit();

            return res.send();
        } catch (err) {
            console.error(err);
            await trx.rollback();
            return res
                .status(500)
                .json({ error: 'unexpected error, try again' });
        }
    }
}

export default new SessionController();
