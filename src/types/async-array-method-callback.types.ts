export type FindAsyncCallback<T> = (value: T, index?: number, array?: T[]) => Promise<boolean>;

export type MapAsyncCallback<T, U> = (value: T, index?: number, array?: readonly T[]) => Promise<U>;

export type ReduceAsyncCallback<T, U> = (accumulator: U, currentValue: T, currentIndex: number, array: T[]) => Promise<U>;

export type ForEachAsyncCallback<T> = (item: T, index: number, array: T[]) => Promise<void>;