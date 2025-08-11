export function rightDiff(left, right) {
    return right.filter((x) => !left.includes(x));
}
