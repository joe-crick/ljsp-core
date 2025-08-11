import { cond, ELSE } from "../conditional";
export function trans(reducer) {
    return function __trans$(nextReducer) {
        return (accumulator, value) => reducer(accumulator, value, nextReducer);
    };
}
const FUNCTION = "function";
const UNDEFINED = "undefined";
const trans$ = "__trans$";
/**
 * A builder class for composing transducers.
 */
export class Transducer {
    constructor() {
        this.transducerCreators = [];
    }
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
    add(fnOrTransducer, reducer) {
        // prettier-ignore
        return cond(this.isPlainMap(fnOrTransducer), () => this.addPlainMap(reducer, fnOrTransducer), this.isTransFunction(fnOrTransducer), () => this.addTransFunction(fnOrTransducer), this.isComposedTransducer(fnOrTransducer), () => this.addComposedTransducer(fnOrTransducer), ELSE, () => {
            throw new Error("Invalid arguments for add method.");
        });
    }
    addComposedTransducer(fnOrTransducer) {
        this.transducerCreators.push(fnOrTransducer.composer);
        return this;
    }
    addTransFunction(fnOrTransducer) {
        this.transducerCreators.push(fnOrTransducer);
        return this;
    }
    addPlainMap(reducer, fnOrTransducer) {
        const _reducer = typeof reducer === UNDEFINED ? defaultReducer : reducer;
        this.transducerCreators.push((nextReducer) => trans((acc, val, next) => _reducer(acc, val, next, fnOrTransducer))(nextReducer));
        return this;
    }
    isComposedTransducer(fnOrTransducer) {
        return !!fnOrTransducer && Object.prototype.hasOwnProperty.call(fnOrTransducer, "composer");
    }
    isTransFunction(fnOrTransducer) {
        return typeof fnOrTransducer === FUNCTION && fnOrTransducer.name === trans$;
    }
    isPlainMap(fnOrTransducer) {
        return typeof fnOrTransducer === FUNCTION && fnOrTransducer.name !== trans$;
    }
    /**
     * Composes a List of transducers into a single transducer.
     *
     * This function takes the `transducerCreators` List from the instance and applies them in a right-to-left
     * order to a given `nextReducer`. The result is a new reducer that has been transformed by all the
     * transducer creators.
     *
     * @returns An object with a composer method that accepts a `nextReducer` and returns a composed reducer.
     */
    compose() {
        return {
            composer: (nextReducer) => {
                return this.transducerCreators.reduceRight((composedReducer, transducerCreator) => transducerCreator(composedReducer), nextReducer);
            }
        };
    }
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
    transform(arr) {
        const composed = this.compose();
        const composedReducer = composed.composer((acc, val) => {
            acc.push(val);
            return acc;
        });
        return arr.reduce(composedReducer, []);
    }
}
function defaultReducer(accumulator, value, nextReducer, fn) {
    return nextReducer(accumulator, fn(value));
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
export function map_t(transformFn) {
    return new Transducer()
        .add(transformFn, (accumulator, value, nextReducer, fn) => nextReducer(accumulator, fn(value)))
        .compose();
}
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
export function filter_t(predicateFn) {
    return new Transducer()
        .add(predicateFn, (accumulator, value, nextReducer, fn) => fn(value) ? nextReducer(accumulator, value) : accumulator)
        .compose();
}
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
export function remove_t(predicateFn) {
    return new Transducer()
        .add(predicateFn, (accumulator, value, nextReducer, fn) => !fn(value) ? nextReducer(accumulator, value) : accumulator)
        .compose();
}
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
export function mapcat_t(transformFn) {
    return new Transducer()
        .add(transformFn, (accumulator, value, nextReducer, fn) => {
        const transformed = fn(value);
        if (transformed && typeof transformed[Symbol.iterator] === "function") {
            for (const item of transformed) {
                accumulator = nextReducer(accumulator, item);
            }
        }
        return accumulator;
    })
        .compose();
}
