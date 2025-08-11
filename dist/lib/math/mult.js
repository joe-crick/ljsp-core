export function mult(...rest) {
    if (rest.length === 0) {
        return 1;
    }
    return rest.reduce((acc, cur) => {
        return acc * cur;
    });
}
