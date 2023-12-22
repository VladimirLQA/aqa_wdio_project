import { ICustomerResponse } from '../../api/type/api.customers.type';
import { IProductResponse } from '../../api/type/api.product.type';
import { Storage } from './abstract.storage';

export const productsStorage = new Storage<IProductResponse>();
export const customersStorage = new Storage<ICustomerResponse>();
// TODO implement orders storage
// export const ordersStorage = new Storage<ICustomerResponse>();
