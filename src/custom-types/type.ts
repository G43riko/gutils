export interface Type<T = object> {
    name?: string;

    new(...args: any[]): T;
}
