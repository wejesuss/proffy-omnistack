import { Request, Response } from 'express';

import db from '../database/connection';
import { JsonWebTokenError } from 'jsonwebtoken';
import { verifyToken } from '../services/verifyToken';
import { formatScheduleItems } from '../utils/formatScheduleItems';

interface DecryptedToken {
    id: number;
    email: string;
    name: string;
    surname: string;
}

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

interface EditProfileRequest {
    whatsapp: string;
    token: string;
    bio: string;
    cost: number;
    schedule: ScheduleItem[];
}

class UsersController {
    async edit(req: Request, res: Response) {
        const {
            whatsapp,
            token,
            bio,
            cost,
            schedule,
        }: EditProfileRequest = req.body;

        if (!token) {
            return res.status(400).json({ error: 'expected token' });
        }

        let user: DecryptedToken;
        const trx = await db.transaction();
        try {
            user = verifyToken(token);

            const [foundUser] = await trx('users').where('id', '=', user.id);

            if (!foundUser) {
                await trx.rollback();
                return res.status(400).json({ error: 'user not found' });
            }

            const [foundClass] = await trx('classes').where(
                'user_id',
                '=',
                user.id
            );

            if (foundClass && cost) {
                await trx('classes')
                    .update({
                        cost,
                    })
                    .where('id', '=', foundClass.id);
            }

            if (foundClass && schedule) {
                await trx('class_schedule')
                    .where('class_id', '=', foundClass.id)
                    .delete();

                const classSchedule = formatScheduleItems(
                    schedule,
                    foundClass.id
                );

                await trx('class_schedule').insert(classSchedule);
            }

            const newUserInfo = {
                whatsapp: whatsapp || foundUser.whatsapp,
                bio: bio || foundUser.bio,
            };

            await trx('users').update(newUserInfo);

            await trx.commit();

            return res.send();
        } catch (err) {
            console.error(err);
            await trx.rollback();
            if (err instanceof JsonWebTokenError) {
                return res.status(400).json({ error: 'invalid token' });
            }

            return res
                .status(500)
                .json({ error: 'unexpected error, try again' });
        }
    }
}

export default new UsersController();
