import { ICustomerResponse } from '../../api/type/api.customers.type';
import { IProductResponse } from '../../api/type/api.product.type';
import { ICustomer } from '../../ui/types/customers.types';
import { IProduct } from '../../ui/types/products.types';

type UnionEntities = ICustomer | ICustomerResponse | IProduct | IProductResponse;

export type ExtractedType<T, U> = U extends T ? U : never;
// export type CustomerStorageGeneric = ExtractedType<UnionEntities, ICustomer | ICustomerResponse>;

export type CustomerStorageGeneric = Extract<UnionEntities, ICustomer | ICustomerResponse>;

export abstract class Storage<T> {
  protected storage: T[] = [];
  private static instance: Storage<any>;

  constructor() {
    if (Storage.instance) return Storage.instance;
    Storage.instance = this;
  }

  protected abstract addEntity(entity: T): void;
  protected abstract updateEntity(updatedEntity: T, searchValue: string): void;
  protected abstract findEntityIndex(searchValue: string): number | void;
  //   static deleteEntity(searchValue: string): void {}
  //   static getAllEntities<T>() {}
  //   static getEntity<T>(searchValue: string): T | void {}
}

// export interface Storage<T, U> {
//   storage: (U | T)[];
//   addEntity(entity: U | T): void;
//   updateEntity(updatedEntity: T | U, searchValue: string): void;
//   findEntityIndex(searchValue: string): number;
//   deleteEntity(searchValue: string): void;
//   getAllEntities(): (U | T)[];
//   getEntity(searchValue: string): T | U | void;
// }
