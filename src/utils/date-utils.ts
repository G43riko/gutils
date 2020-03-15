export function isValidDate<T extends number | string | Date>(obj: T): boolean {
    try {
        const date = new Date(obj);

        return !isNaN(date.getTime());
    } catch (e) {
        return false;
    }
}
