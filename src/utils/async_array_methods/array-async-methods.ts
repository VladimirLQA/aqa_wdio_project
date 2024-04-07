import { FindAsyncCallback, ForEachAsyncCallback, ReduceAsyncCallback } from '../../types/async-array-method-callback.types.js';
import { MapAsyncCallback } from '../../types/async-array-method-callback.types.js';

export async function asyncFind<T>(array: T[], callback: FindAsyncCallback<T>): Promise<T | undefined> {
  for (let i = 0; i < array?.length; i++) {
    const result = await callback(array[i], i, array);
    if (result) {
      return array[i];
    }
  }
  return undefined;
}

export async function asyncMap<T, U>(array: T[], callback: MapAsyncCallback<T, U>): Promise<U[]> {
  const mappedArray = [];
  for (let i = 0; i < array.length; i++) {
    const result = await callback(array[i], i, array);
    mappedArray.push(result);
  }
  return mappedArray;
}

export async function asyncReduce<T extends U, U>(array: T[], asyncReducer: ReduceAsyncCallback<T, U>, initialValue?: U): Promise<U> {
  let accumulator: U = initialValue || array[0];
  for (let i = 0; i < array.length; i++) {
    accumulator = await asyncReducer(accumulator, array[i], i, array);
  }
  return accumulator;
}

export async function asyncForEach<T>(array: T[], asyncCallback: ForEachAsyncCallback<T>): Promise<void> {
  for (let index = 0; index < array.length; index++) {
    await asyncCallback(array[index], index, array);
  }
}
