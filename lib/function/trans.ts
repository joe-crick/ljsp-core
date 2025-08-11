import { cond, ELSE } from "../conditional";

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
export function trans(reducer: (accumulator: any, value: any, nextReducer: NextReducer) => any) {
  return function __trans$(nextReducer: NextReducer) {
    return (accumulator: any, value: any) => reducer(accumulator, value, nextReducer);
  };
}

const FUNCTION = "function";
const UNDEFINED = "undefined";
const trans$ = "__trans$";

/**
 * A builder class for composing transducers.
 */
export class Transducer {
  private transducerCreators: Array<(nextReducer: NextReducer) => NextReducer>;

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
  add(fnOrTransducer: any, reducer?: Function) {
    // prettier-ignore
    return cond(
      this.isPlainMap(fnOrTransducer), () => this.addPlainMap(reducer, fnOrTransducer),
      this.isTransFunction(fnOrTransducer), () => this.addTransFunction(fnOrTransducer),
      this.isComposedTransducer(fnOrTransducer), () => this.addComposedTransducer(fnOrTransducer),
      ELSE, () => {
        throw new Error("Invalid arguments for add method.");
      }
    );
  }

  private addComposedTransducer(fnOrTransducer: { composer: (nextReducer: NextReducer) => NextReducer }) {
    this.transducerCreators.push(fnOrTransducer.composer);
    return this;
  }

  private addTransFunction(fnOrTransducer: (nextReducer: NextReducer) => NextReducer) {
    this.transducerCreators.push(fnOrTransducer);
    return this;
  }

  private addPlainMap(reducer: Function | undefined, fnOrTransducer: any) {
    const _reducer = typeof reducer === UNDEFINED ? defaultReducer : (reducer as Function);
    this.transducerCreators.push((nextReducer: NextReducer) =>
      trans((acc: any, val: any, next: NextReducer) => _reducer(acc, val, next, fnOrTransducer))(nextReducer)
    );
    return this;
  }

  private isComposedTransducer(fnOrTransducer: any) {
    return !!fnOrTransducer && Object.prototype.hasOwnProperty.call(fnOrTransducer, "composer");
  }

  private isTransFunction(fnOrTransducer: any) {
    return typeof fnOrTransducer === FUNCTION && fnOrTransducer.name === trans$;
  }

  private isPlainMap(fnOrTransducer: any) {
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
      composer: (nextReducer: NextReducer): NextReducer => {
        return this.transducerCreators.reduceRight(
          (composedReducer, transducerCreator) => transducerCreator(composedReducer),
          nextReducer
        );
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
  transform(arr: any[]) {
    const composed = this.compose();
    const composedReducer = composed.composer((acc: any[], val: any) => {
      acc.push(val);
      return acc;
    });
    return arr.reduce(composedReducer, [] as any[]);
  }
}

function defaultReducer(accumulator: any, value: any, nextReducer: NextReducer, fn: (value: any) => any) {
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
export function map_t(transformFn: (value: any) => any) {
  return new Transducer()
    .add(transformFn, (accumulator: any, value: any, nextReducer: NextReducer, fn: (v: any) => any) =>
      nextReducer(accumulator, fn(value))
    )
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
export function filter_t(predicateFn: (value: any) => boolean) {
  return new Transducer()
    .add(predicateFn, (accumulator: any, value: any, nextReducer: NextReducer, fn: (v: any) => boolean) =>
      fn(value) ? nextReducer(accumulator, value) : accumulator
    )
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
export function remove_t(predicateFn: (value: any) => boolean) {
  return new Transducer()
    .add(predicateFn, (accumulator: any, value: any, nextReducer: NextReducer, fn: (v: any) => boolean) =>
      !fn(value) ? nextReducer(accumulator, value) : accumulator
    )
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
export function mapcat_t(transformFn: (value: any) => Iterable<any> | null | undefined) {
  return new Transducer()
    .add(
      transformFn,
      (accumulator: any, value: any, nextReducer: NextReducer, fn: (v: any) => Iterable<any> | null | undefined) => {
        const transformed = fn(value);
        if (transformed && typeof (transformed as any)[Symbol.iterator] === "function") {
          for (const item of transformed as Iterable<any>) {
            accumulator = nextReducer(accumulator, item);
          }
        }
        return accumulator;
      }
    )
    .compose();
}
