import { FindAsyncCallback } from '../../types/array_callback_types';
import { MapAsyncCallback } from '../../types/array_callback_types';

async function find<T>(array: T[], callback: FindAsyncCallback<T>): Promise<T | undefined> {
  for (let i = 0; i < array?.length; i++) {
    const result = await callback(array[i], i, array);
    if (result) {
      return array[i];
    }
  }
  return undefined;
}

async function map<T, U>(array: T[], callback: MapAsyncCallback<T, U>): Promise<U[]> {
  const mappedArray = [];
  for (let i = 0; i < array.length; i++) {
    const result = await callback(array[i], i, array);
    mappedArray.push(result);
  }
  return mappedArray;
}

const arrayAsyncMethods = {
  find: find,
  map: map,
};

export { arrayAsyncMethods };
