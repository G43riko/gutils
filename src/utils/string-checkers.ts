const timeFormats: { [key: string]: string } = {
    HH: "(2[0-3]|[01]\\d)",
    H: "(2[0-3]|[01]?\\d)",
    mm: "([0-5]\\d)",
    m: "([0-5]?\\d)",
    MM: "(0\\d|1[0-2]|\\d)",
    M: "([1-9]|1[0-2])",
    ss: "([0-5]\\d)", // mm
    s: "([0-5]?\\d)", // ss
    YYYY: "([1-9]\\d{3,3})",
    YY: "(\\d{2,2})",
    DD: "([0-3]\\d)",
};

export class StringCheckers {
    public static isCamelCase(text: string): boolean {
        return new RegExp("^[A-Z]?[a-z]+([A-Z][a-z]*)*$", "g").test(text);
    }

    public static isUpperCamelCase(text: string): boolean {
        return new RegExp("^([A-Z][a-z]*)*$", "g").test(text);
    }

    public static isLowerCamelCase(text: string): boolean {
        return new RegExp("^[a-z]+([A-Z][a-z]*)*$", "g").test(text);
    }

    public static isLowerSnakeCase(text: string): boolean {
        return new RegExp("^[a-z]*(_[a-z]*)*$", "g").test(text);
    }

    public static isUpperSnakeCase(text: string): boolean {
        return new RegExp("^[A-Z]*(_[A-Z]*)*$", "g").test(text);
    }

    public static isSnakeCase(text: string): boolean {
        return new RegExp("^([a-z]*|[A-Z]*)(_[a-zA-Z]*)*$", "g").test(text);
    }

    public static isTimeFormat(text: string, format: string): boolean {
        for (const key in timeFormats) {
            if (timeFormats.hasOwnProperty(key)) {
                format = format.replace(key, timeFormats[key]);
            }
        }

        return new RegExp(`^${format}$`).test(text);
    }
}
