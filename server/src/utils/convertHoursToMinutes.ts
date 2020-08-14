export function convertHoursToMinutes(time: string): number {
    // eslint-disable-next-line prefer-const
    let [hour, minutes = 0] = time.split(':').map(Number);
    if (hour === 0) hour = 24;

    const timeInMinutes = hour * 60 + minutes;

    return timeInMinutes;
}
