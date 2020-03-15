export type Optional<T> = {
    -readonly [P in keyof T]: T[P];
};

