import { convertHoursToMinutes } from './convertHoursToMinutes';

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

type ClassSchedule = Array<Record<keyof ScheduleItem | 'class_id', number>>;

export function formatScheduleItems(
    schedule: ScheduleItem[],
    class_id: number
): ClassSchedule {
    return schedule.map((scheduleItem: ScheduleItem) => {
        return {
            week_day: scheduleItem.week_day,
            from: convertHoursToMinutes(String(scheduleItem.from)),
            to: convertHoursToMinutes(String(scheduleItem.to)),
            class_id,
        };
    });
}
