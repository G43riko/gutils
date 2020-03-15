export interface ObjectEntry<T, E extends keyof T = keyof T, S extends T[E] = T[E]> {
    key: E,
    value: S;
}
