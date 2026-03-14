export function toKstDateString(timestampInSeconds: number) {
    return new Date(timestampInSeconds * 1000).toLocaleDateString('en-CA', {
        timeZone: 'Asia/Seoul'
    });
}

export function toUnixSeconds(date: Date) {
    return Math.floor(date.getTime() / 1000);
}
