export function dissoc(obj, ...rest) {
    return Object.entries(obj).reduce((acc, [key, val]) => {
        if (!rest.includes(key)) {
            // @ts-ignore
            acc[key] = val;
        }
        return acc;
    }, {});
}
