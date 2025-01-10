// File: src/ts/utils/mathUtils.ts
export const lerp = (start: number, end: number, amt: number): number => {
    return (1 - amt) * start + amt * end;
};

export const clamp = (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max);
};

export const mapRange = (value: number, a1: number, a2: number, b1: number, b2: number): number => {
    return b1 + (value - a1) * (b2 - b1) / (a2 - a1);
};
