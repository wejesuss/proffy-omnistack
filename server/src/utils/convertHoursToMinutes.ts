export function convertHoursToMinutes(time: string): number {
    const [hour, minutes = 0] = time.split(':').map(Number);

    const timeInMinutes = hour * 60 + minutes;

    return timeInMinutes;
}
