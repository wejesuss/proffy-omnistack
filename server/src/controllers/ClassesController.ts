import { Request, Response } from 'express';

import db from '../database/connection';
import { convertHoursToMinutes } from '../utils/convertHoursToMinutes';

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

class ClassesController {
    async index(req: Request, res: Response) {
        const { subject, week_day, time } = req.query;

        if (!subject || !week_day || !time) {
            return res
                .status(400)
                .json({ error: 'Missing filters to search classes' });
        }

        const classSubject = subject as string;
        const classWeekDay = week_day as string;
        const classTime = time as string;

        try {
            const timeInMinutes = convertHoursToMinutes(classTime);

            const classes = await db('classes')
                .whereExists(function () {
                    this.select('class_schedule.*')
                        .from('class_schedule')
                        .whereRaw(
                            '`class_schedule`.`class_id` = `classes`.`id`'
                        )
                        .whereRaw('`class_schedule`.`week_day` = ??', [
                            Number(classWeekDay),
                        ])
                        .whereRaw('`class_schedule`.`from` <= ??', [
                            timeInMinutes,
                        ])
                        .whereRaw('`class_schedule`.`to` > ??', [
                            timeInMinutes,
                        ]);
                })
                .select('*')
                .where('subject', 'like', `%${classSubject}%`)
                .join('users', 'classes.user_id', '=', 'users.id')
                .select(['classes.*', 'users.*']);

            return res.json(classes);
        } catch (error) {
            console.error(error);
        }
    }

    async create(req: Request, res: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            cost,
            subject,
            schedule,
        } = req.body;

        const trx = await db.transaction();

        try {
            const [user_id] = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio,
            });

            const [class_id] = await trx('classes').insert({
                subject,
                cost,
                user_id,
            });

            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    week_day: scheduleItem.week_day,
                    from: convertHoursToMinutes(scheduleItem.from),
                    to: convertHoursToMinutes(scheduleItem.to),
                    class_id,
                };
            });

            await trx('class_schedule').insert(classSchedule);

            await trx.commit();

            return res.status(201).send();
        } catch (error) {
            await trx.rollback();
            console.error(error);

            return res
                .status(400)
                .json({ error: 'Unexpected error, try again!' });
        }
    }
}

export default new ClassesController();
