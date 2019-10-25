export const isNullOrUndefined = (value: any): boolean => {
    return value === null || value === undefined;
};

export const isEmpty = (value: any): boolean => {
    return isNullOrUndefined(value) || value === '' || value === 0 || value.length === 0 ||
        (value instanceof Map ? value.size === 0 : typeof value === 'object' && Object.values(value).length === 0);
};
