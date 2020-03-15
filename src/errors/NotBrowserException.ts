function getText(text?: string): string {
    return text ? `: ${text}` : "";
}

export class NotBrowserException extends Error {
    public constructor(text?: string) {
        super(`App is not running in browser${getText(text)}!`);

        Object.setPrototypeOf(this, NotBrowserException.prototype);
    }
}
