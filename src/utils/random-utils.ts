export function randomFloatBetween(min: number, max: number): number {
    return min + Math.random() * (max - min);
}

export function randomIntBetween(min: number, max: number): number {
    return Math.floor(randomFloatBetween(min, max));
}

export function randomBoolean(): boolean {
    return Math.random() < 0.5;
}

export function randomItem<T>(...items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
}
