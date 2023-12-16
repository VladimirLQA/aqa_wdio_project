import { ICustomerResponse } from '../../api/type/api.customers.type';
import { IProductResponse } from '../../api/type/api.product.type';
import { ICustomer } from '../../ui/types/customers.types';
import { IProduct } from '../../ui/types/products.types';

export type CombinedType<T> = T extends ICustomer | ICustomerResponse ? ICustomer & ICustomerResponse : IProduct & IProductResponse;

// type ElementType<T extends any[]> = T extends (infer U)[] ? U : never;

type GenericStorage<T> = T[];

export abstract class Storage<T> {
  protected storage: GenericStorage<T> = [];

  addEntity(entity: T): void {}
  updateEntity(updatedEntity: T, searchValue: string): void {}
  deleteEntity(searchValue: string): void {}
  getAllEntities(): T[] | void {}
  getEntity(searchValue: string): T | void {}
  protected findEntityIndex(searchValue: string): number | void {}
}
