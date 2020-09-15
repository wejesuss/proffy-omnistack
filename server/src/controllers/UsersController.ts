import { Request, Response } from 'express';
import { compare, hash } from 'bcrypt';

import db from '../database/connection';
import { getToken } from '../services';

interface UserProps {
    name: string;
    surname: string;
    email: string;
    password: string;
}

interface User {
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    avatar: string;
    whatsapp: string;
    bio: string;
}

class UsersController {
    async login(req: Request, res: Response) {
        const { email, password }: UserProps = req.body;

        if (!email) {
            return res
                .status(400)
                .json('error: do not forget to send the email address');
        }

        if (!password) {
            return res
                .status(400)
                .json('error: do not forget to send the password');
        }

        const [user]: User[] = await db('users')
            .select('*')
            .where('email', '=', email);

        if (!user) {
            return res.status(400).json('error: user does not exists');
        }

        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json('error: incorrect password');
        }

        user.password = (undefined as unknown) as string;

        const token = getToken({
            id: user.id,
            email: user.email,
            name: user.name,
            surname: user.surname,
        });

        return res.json({ user, token });
    }

    async create(req: Request, res: Response) {
        const {
            email,
            name,
            password: originalPswd,
            surname,
        }: UserProps = req.body;

        const trx = await db.transaction();

        try {
            if (!email || !name || !originalPswd || !surname) {
                await trx.rollback();
                return res
                    .status(400)
                    .json('error: do not forget to send all values');
            }

            const [id] = await trx('users')
                .select('id')
                .where('email', '=', email);

            if (id) {
                await trx.rollback();
                return res.status(409).json('error: email is already in use');
            }

            const password = await hash(originalPswd, 10);
            const defaultValue = '';

            const [user_id] = await trx('users').insert({
                email,
                password,
                name,
                surname,
                avatar: defaultValue,
                whatsapp: defaultValue,
                bio: defaultValue,
            });

            await trx.commit();

            const key = getToken({ email, name, surname, id: user_id });

            return res.status(201).json({ user_id, key });
        } catch (err) {
            console.error(err);
            await trx.rollback();

            return res.status(500).json('error: Unexpected error, try again!');
        }
    }
}

export default new UsersController();
