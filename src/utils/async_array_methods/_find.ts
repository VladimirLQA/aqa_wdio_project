import { FindAsyncCallback } from '../../types/array_callback_types';

export async function find<T>(array: T[], callback: FindAsyncCallback<T>): Promise<T | undefined> {
  for (let i = 0; i < array?.length; i++) {
    const result = await callback(array[i], i, array);
    if (result) {
      return array[i];
    }
  }
  return undefined;
}
