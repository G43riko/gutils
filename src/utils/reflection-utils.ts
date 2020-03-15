
/**
 * Create class by name and list of parameters
 *
 * @param name - class name
 * @param args - constructor parameter
 * @returns created object
 */
export function createClass(name: any, args: any[]): any {
    const temp = Object.create(name.prototype);
    name.apply(temp, args);

    return temp;
}

export async function callFirstFunction(...functions: any[]): Promise<any> {
    for (const func of functions) {
        if (typeof func === "function") {
            return await func();
        }
    }
}
