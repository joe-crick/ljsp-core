/**
 * List comprehension. Takes an Array of one or more
 * Arrays (`set`), and yields an Array of evaluations
 * of the Cartesian product of the Arrays in `set`.
 */
export function ffor(set, fn) {
    return set.reduce((acc, cur) => {
        return acc.flatMap((outer) => {
            return cur.map((inner) => {
                return fn(outer, inner);
            });
        });
    });
}
