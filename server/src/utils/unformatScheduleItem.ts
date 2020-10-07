import { convertMinutesToClockTime } from './convertMinutesToClockTime';

interface ScheduleItem {
    id: number;
    week_day: number;
    from: number;
    to: number;
    class_id: number;
}

interface ClassSchedule {
    id: number;
    week_day: number;
    from: string;
    to: string;
    class_id: number;
}

export function unformatScheduleItem(
    schedule: ScheduleItem[]
): ClassSchedule[] {
    return schedule.map((classSchedule) => {
        return {
            ...classSchedule,
            from: convertMinutesToClockTime(classSchedule.from),
            to: convertMinutesToClockTime(classSchedule.to),
        };
    });
}
