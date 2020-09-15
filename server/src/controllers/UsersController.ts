import { Request, Response } from 'express';
import { hash } from 'bcrypt';

import db from '../database/connection';

interface CreateUserProps {
    name: string;
    surname: string;
    email: string;
    password: string;
}

class UsersController {
    async login(req: Request, res: Response) {
        return;
    }

    async create(req: Request, res: Response) {
        const {
            email,
            name,
            password: originalPswd,
            surname,
        }: CreateUserProps = req.body;

        const trx = await db.transaction();

        try {
            if (!email || !name || !originalPswd || !surname) {
                await trx.rollback();
                return res
                    .status(400)
                    .json({ error: 'do not forget to send all values' });
            }

            const [id] = await trx('users')
                .select('id')
                .where('email', '=', email);

            if (id) {
                await trx.rollback();
                return res
                    .status(409)
                    .json({ error: 'email is already in use' });
            }

            const password = await hash(originalPswd, 10);
            const defaultValue = '';

            await trx('users').insert({
                email,
                password,
                name,
                surname,
                avatar: defaultValue,
                whatsapp: defaultValue,
                bio: defaultValue,
            });

            await trx.commit();

            return res.status(201).send();
        } catch (err) {
            console.error(err);
            await trx.rollback();

            return res
                .status(500)
                .json({ error: 'Unexpected error, try again!' });
        }
    }
}

export default new UsersController();
