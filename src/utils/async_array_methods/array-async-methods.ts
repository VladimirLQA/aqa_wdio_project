import { FindAsyncCallback, ForEachAsyncCallback, ReduceAsyncCallback } from '../../ui/types/array_callback_types';
import { MapAsyncCallback } from '../../ui/types/array_callback_types';

export async function find<T>(array: T[], callback: FindAsyncCallback<T>): Promise<T | undefined> {
  for (let i = 0; i < array?.length; i++) {
    const result = await callback(array[i], i, array);
    if (result) {
      return array[i];
    }
  }
  return undefined;
}

export async function map<T, U>(array: T[], callback: MapAsyncCallback<T, U>): Promise<U[]> {
  const mappedArray = [];
  for (let i = 0; i < array.length; i++) {
    const result = await callback(array[i], i, array);
    mappedArray.push(result);
  }
  return mappedArray;
}

export async function myReduce<T, U>(array: T[], asyncReducer: ReduceAsyncCallback<T, U>, initialValue?: U): Promise<U> {
  let accumulator = initialValue || array[0];
  for (let i = 0; i < array.length; i++) {
    accumulator = await asyncReducer(accumulator, array[i], i, array);
  }
  return accumulator;
}

export async function forEach<T>(array: T[], asyncCallback: ForEachAsyncCallback<T>): Promise<void> {
  for (let index = 0; index < array.length; index++) {
    await asyncCallback(array[index], index, array);
  }
}
