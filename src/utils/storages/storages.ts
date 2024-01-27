import { ICustomerResponse } from '../../api/type/api.customers.type.js';
import { IProductResponse } from '../../api/type/api.product.type.js';
import { IOrder } from '../../ui/types/order.types.js';
import { Storage } from './abstract.storage.js';

export const productsStorage = new Storage<IProductResponse>();
export const customersStorage = new Storage<ICustomerResponse>();
export const ordersStorage = new Storage<IOrder>();
