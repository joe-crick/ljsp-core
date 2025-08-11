export function subs(str, start, end) {
    return str.substr(start, end ? end - 1 : undefined);
}
