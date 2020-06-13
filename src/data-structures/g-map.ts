export class GMap<T, S> extends Map<T, S> {
    public get(key: T, defaultValue?: S): S | undefined {
        return super.get(key) || defaultValue;
    }
    public getOrCreate(key: T, defaultValue: S): S | undefined {
        const result = super.get(key);
        if (result) {
            return result;
        }
        this.set(key, defaultValue);

        return defaultValue;
    }
}
