export type FindAsyncCallback<T> = (value: T, index?: number, array?: T[]) => Promise<boolean>;

export type MapAsyncCallback<T, U> = (value: T, index?: number, array?: readonly T[]) => Promise<U>;