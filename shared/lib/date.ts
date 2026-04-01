export function toUnixSeconds(date: Date): number {
    return Math.floor(date.getTime() / 1000);
}

export function toKstDateString(unixSeconds: number): string {
    const date = new Date(unixSeconds * 1000);
    const kstTime = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    return kstTime.toISOString().slice(0, 10);
}
