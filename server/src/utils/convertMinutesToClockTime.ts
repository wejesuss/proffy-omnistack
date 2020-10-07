export function convertMinutesToClockTime(time: number): string {
    const fullTime = time / 60;
    const hours = Math.floor(fullTime);
    const minutes = (fullTime - hours) * 60;

    const strHours = `0${hours}`.slice(-2);
    const strMinutes = `0${minutes}`.slice(-2);

    const strTime = `${strHours}:${strMinutes}`;
    return strTime;
}
