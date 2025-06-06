export const valueOrDefault = (
    value: string | number | null | undefined, defaultValue = '-'): string => String(value ?? defaultValue);

export const arrayOrDefault = (
    value: (string | number)[] | null | undefined,
    defaultValue = '-'): string => {
    if (value == null || value.length === 0) {
        return defaultValue;
    }
    return value.join(', ');
};
