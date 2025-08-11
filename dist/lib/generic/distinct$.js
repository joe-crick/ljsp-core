export function distinct$(...rest) {
    const map = {};
    return rest.every((arg) => {
        //@ts-ignore
        return map.hasOwnProperty(arg) ? false : ((map[arg] = arg), true);
    });
}
