/**
 * Creates a trans from a reducer function.
 *
 * @param reducer - The reducing function to transform.
 * @returns A trans function.
 *
 * @example
 * function basicReducer(accumulator, value, nextReducer) {
 * return nextReducer(accumulator, value);
 * }
 * const identityTransducer = trans(basicReducer);
 *
 * const numbers = [1, 2, 3];
 * const result = numbers.reduce(identityTransducer((acc, val) => {
 * acc.push(val);
 * return acc;
 * }, []), []); // result: [1, 2, 3]
 */
type NextReducer = (accumulator: any, value: any) => any;
export declare function trans(reducer: (accumulator: any, value: any, nextReducer: NextReducer) => any): (nextReducer: NextReducer) => (accumulator: any, value: any) => any;
/**
 * A builder class for composing transducers.
 */
export declare class Transducer {
    private transducerCreators;
    constructor();
    /**
     * Adds a trans-creating function or an already composed trans to the composition pipeline.
     *
     * @param fnOrTransducer - The function used in the trans's logic or an already composed trans.
     * @param reducer - The reducer function that defines the trans's behavior.
     * @returns The builder instance for chaining.
     *
     * @example
     * const double = (x) => x * 2;
     * const isEven = (x) => x % 2 === 0;
     *
     * const composedTransducer = new Transducer()
     * .add(isEven, (accumulator, value, nextReducer, fn) => fn(value) ? nextReducer(accumulator, value) : accumulator)
     * .add(double, (accumulator, value, nextReducer, fn) => nextReducer(accumulator, fn(value)))
     *
     * const numbers = [1, 2, 3, 4, 5, 6];
     * const actual = transducer.transform(numbers);
     *
     */
    add(fnOrTransducer: any, reducer?: Function): any;
    private addComposedTransducer;
    private addTransFunction;
    private addPlainMap;
    private isComposedTransducer;
    private isTransFunction;
    private isPlainMap;
    /**
     * Composes a List of transducers into a single transducer.
     *
     * This function takes the `transducerCreators` List from the instance and applies them in a right-to-left
     * order to a given `nextReducer`. The result is a new reducer that has been transformed by all the
     * transducer creators.
     *
     * @returns An object with a composer method that accepts a `nextReducer` and returns a composed reducer.
     */
    compose(): {
        composer: (nextReducer: NextReducer) => NextReducer;
    };
    /**
     * Applies the composed transducer to an array.
     *
     * @param arr - The array to transform.
     * @returns The transformed array.
     *
     * @example
     * const composedTransducer = new Transducer()
     * .add(filter(x => x % 2 === 0))
     * .add(map(x => x * 2))
     *
     * const numbers = [1, 2, 3, 4, 5, 6];
     * const result = composedTransducer.transform(numbers);
     */
    transform(arr: any[]): any;
}
/**
 * Creates a mapping trans.
 *
 * @param transformFn - The function to transform each value.
 * @returns A mapping trans.
 *
 * @example
 * const doubleTransducer = map((x) => x * 2);
 * const composedTransducer = new Transducer()
 * .add(map(x => x * 2))
 *
 * const numbers = [1, 2, 3, 4, 5, 6];
 * const result = composedTransducer.transform(numbers);
 */
export declare function map_t(transformFn: (value: any) => any): any;
/**
 * Creates a filtering trans.
 *
 * @param predicateFn - The function to determine if a value should be included.
 * @returns A filtering trans.
 *
 * @example
 * const composedTransducer = new Transducer()
 * .add(filter(x => x % 2 === 0))
 *
 * const numbers = [1, 2, 3, 4, 5, 6];
 * const result = composedTransducer.transform(numbers);
 */
export declare function filter_t(predicateFn: (value: any) => boolean): any;
/**
 * Creates a trans that removes elements that satisfy a predicate function.
 *
 * @param predicateFn - The function to determine if a value should be removed.
 * @returns A removing trans.
 *
 * @example
 * const removeEvens = remove((x) => x % 2 === 0);
 * const composedTransducer = new Transducer()
 * .add(removeEvens)
 *
 * const numbers = [1, 2, 3, 4, 5, 6];
 * const result = composedTransducer.transform(numbers);
 */
export declare function remove_t(predicateFn: (value: any) => boolean): any;
/**
 * Creates a trans that applies a function to each value and concatenates the results.
 *
 * @param transformFn - The function to transform each value and return a collection.
 * @returns A mapcat trans.
 *
 * @example
 * const splitAndFlatten = mapcat((str) => str.split(' '));
 * const composedTransducer = new Transducer()
 * .add(splitAndFlatten)
 *
 * const sentences = ['hello world', 'trans example'];
 * const result = composedTransducer.transform(sentences);
 */
export declare function mapcat_t(transformFn: (value: any) => Iterable<any> | null | undefined): any;
export {};
