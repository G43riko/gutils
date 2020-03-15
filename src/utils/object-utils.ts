import { ObjectEntry } from "../custom-types/object-entry";

export function without<T extends object>(obj: T, items: (keyof T)[]): Omit<any, any> {
    return getObjectEntries(obj).filter((entry) => !items.includes(entry.key))
                                .reduce((prev, entry) => {
                                    prev[entry.key] = entry.value;
                                    return prev;
                                }, {} as T);
}

export function getObjectEntries<T extends object>(obj: T): ObjectEntry<T>[] {
    const result: ObjectEntry<T>[] = [];
    for (const objKey in obj) {
        if (obj.hasOwnProperty(objKey)) {
            result.push({
                key  : objKey,
                value: obj[objKey],
            })
        }
    }

    return result;
}

export function getNestedProperty(object: any, propertyPath: string, separator = "."): any {
    const propertyList = propertyPath.split(separator);

    return propertyList.reduce((currentNestedPropertyValue, propertyName) => {
        return currentNestedPropertyValue ? currentNestedPropertyValue[propertyName] : undefined;
    }, object);
}

export function roughSizeOfObject(object: any): number {
    const objectList   = [];
    const stack: any[] = [object];
    let bytes          = 0;
    while (stack.length) {
        const value: any = stack.pop();
        if (typeof value === "boolean") {
            bytes += 4;
        } else if (typeof value === "string") {
            bytes += value.length << 1;
        } else if (typeof value === "number") {
            bytes += 8;
        } else if (typeof value === "object" && objectList.indexOf(value) === -1) {
            objectList.push(value);
            for (const key in value) {
                if (value.hasOwnProperty(key)) {
                    stack.push(value[key]);
                }
            }
        }
    }

    return bytes;
}

export function size<T extends object>(object: T): number {
    let result = 0;
    for (const i in object) {
        if (object.hasOwnProperty(i)) {
            result++;
        }
    }

    return result;
}

export function isPlain<T extends object>(object: T): boolean {
    for (const index in object) {
        if (object.hasOwnProperty(index) && typeof object[index] === "object") {
            return false;
        }
    }

    return true;
}

/**
 *
 * @param list
 * @param propertyPath
 * @param separator
 * @param skipUndefined
 *
 * @example
 * ```
 * const items = [
 *    {
 *        person: {
 *            name: "Gabriel"
 *        }
 *    },
 *    {
 *        person: {
 *            name: "Ella"
 *        }
 *    },
 *    {
 *        person: {
 *            name: "Gabriel"
 *        }
 *    },
 *    {
 *        person: {
 *            name: "Joe"
 *        }
 *    }
 * ]
 *
 * console.log(makeFlat(items), "person.name");
 * // ["Gabriel", "Ella", "Gabriel", "Joe"]
 * console.log(makeFlat(items), "person_name", "_");
 * // ["Gabriel", "Ella", "Gabriel", "Joe"]
 * console.log(makeFlat(items), "person.name", ".", true);
 * // ["Gabriel", "Ella", "Joe"]
 * ```
 */
export function makeFlat(list: any[], propertyPath: string, separator = ".", skipUndefined = false): any {
    const propertyList = propertyPath.indexOf(separator) >= 0 ? propertyPath.split(separator) : [propertyPath];

    return list.reduce((acc, curr) => {
        const value = propertyList.reduce((propVal, propertyName) => propVal ? propVal[propertyName] : undefined, curr);
        if (typeof value === "undefined" && skipUndefined) {
            return acc;
        }
        acc.push(value);

        return acc;
    }, []);
}
