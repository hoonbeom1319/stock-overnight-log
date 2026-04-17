export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const getRatio = (value: number, max: number) => {
    if (!Number.isFinite(value) || !Number.isFinite(max) || max <= 0) {
        return 0;
    }
    return clamp(value / max, 0, 1);
};
