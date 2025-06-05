export const valueOrDefault = (
    value: string | number | null | undefined, defaultValue = '-'): string => String(value ?? defaultValue);