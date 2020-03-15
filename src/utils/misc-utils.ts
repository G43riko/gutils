import { StringMap } from "../custom-types/string-map";

/**
 * Method parse cookies
 * @param cookies - cooke to parse
 */
export function parseCookies(cookies: string): StringMap<string> {
    const list: StringMap<string> = {};
    const data                    = cookies ? cookies.toString()
                                                     .split(";") : [];
    data.forEach((cookie) => {
        const parts     = cookie.split("=");
        const shiftPart = parts.shift();
        if (shiftPart) {
            list[shiftPart.trim()] = decodeURI(parts.join("="));
        }
    });

    return list;
}

/**
 * Method check if object is in array
 * @param obj - searched object
 * @param data - array of objects to be compare with searched object
 */
export function isIn(obj: any, ...data: any[]): boolean {
    if (Array.isArray(data[0])) {
        if (data[0].indexOf(obj) >= 0) {
            return true;
        }
    } else if (data.indexOf(obj) >= 0) {
        return true;
    }

    return false;
}

/**
 * Method parse JSON content with comments
 * @param content - stringify JSON
 */
export function parseJSONWithComments(content: string): any {
    return JSON.parse(content.replace(/\/\/.*\n/g, ""));
}

// TODO: should append cookies or add option to appending instead of replace cookies
// TODO: expires must be only in the end of cookies
export function setCookie(name: string, value: string | number | boolean, days: number): string {
    const d: Date = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const finalCookies = `${name}=${value};expires=${d.toUTCString()}`;
    if (typeof document !== "undefined") {
        document.cookie = finalCookies;
    }

    return `${name}=${value}`;
}

export function getCookie(cname: string, source = typeof document !== "undefined" ? document.cookie : ""): string {
    const name = cname + "=";
    const ca   = source.split(";");
    for (let c of ca) {
        while (c.charAt(0) === " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }

    return "";
}

export function parseParams(query     = typeof window !== "undefined" ? window.location.search.substring(1) : "",
                            separator = "&",
                            delimiter = "="): any {
    const queryString: any = {};
    const vars: string[]   = query.split(separator);
    for (const key of vars) {
        const pair = key.split(delimiter);
        if (typeof queryString[pair[0]] === "undefined") {
            queryString[pair[0]] = decodeURIComponent(pair[1]);
        } else if (typeof queryString[pair[0]] === "string") {
            queryString[pair[0]] = [queryString[pair[0]], decodeURIComponent(pair[1])];
        } else {
            queryString[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }

    return queryString;
}

export function objectToQueryParams(obj: StringMap<string>): string {
    // TODO: add url prefix
    let result = "";
    for (const objKey in obj) {
        if (obj.hasOwnProperty(objKey)) {
            result += `${result.length > 0 ? "&" : "?"}${objKey}=${obj[objKey]}`;
        }
    }

    return result;
}

export function serialize(obj: any): string {
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && typeof obj[key] === "function") {
            obj[key] = obj[key].toString();
        }
    }

    return JSON.stringify(obj);
}

export function parse(obj: string): any {
    const result = JSON.parse(obj);
    for (const i in result) {
        if (!result.hasOwnProperty(i) ||
            typeof result[i] !== "string" || !(result[i].indexOf("function (") === 0 ||
                result[i].match(/^\([_a-zA-Z0-9]+( *, *[_a-zA-Z0-9]+)*\) *=>/))
        ) {
            continue;
        }
        try {
            // tslint:disable-next-line no-eval
            eval("result[i] = " + result[i]);
        } catch (e) {
            result[i] = e;
        }
    }

    return result;
}

function map<S = any, T = S>(source: S, data: { attrS: keyof S, attrD?: keyof T, mapFunction: (src: any) => any }[]): T {
    const destination: any = {};

    data.forEach((item) => {
        if (item.mapFunction) {
            if (item.attrD) {
                destination[item.attrD] = item.mapFunction(source[item.attrS]);
            } else {
                destination[item.attrS] = item.mapFunction(source[item.attrS]);
            }

            return;
        }
        if (item.attrD) {
            destination[item.attrD] = source[item.attrS];
        } else {
            destination[item.attrS] = source[item.attrS];
        }
    });

    return destination;
}
