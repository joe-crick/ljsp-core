type Function = (...args: any) => any;
type ResolverFn = (...args: any) => string;
export declare function memoize(fn: Function, cacheKey?: ResolverFn): any;
export {};
