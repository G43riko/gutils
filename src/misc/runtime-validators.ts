export const getAsString = (key: any): string => {
    if (typeof key !== "string") {
        throw new Error(`Variable with value ${key} is not a string`);
    }

    return key;
};
export const getAsNumber = (key: any): number => {
    if (typeof key !== "number") {
        throw new Error(`Variable with value ${key} is not a number`);
    }

    return key;
};
