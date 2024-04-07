import { ICustomerResponse } from '../../types/customers.types.js';
import { IOrder } from '../../types/order.types.js';
import { IProductFromResponse } from '../../types/products.types.js';
import { Storage } from './abstract.storage.js';

export const productsStorage = new Storage<IProductFromResponse>();
export const customersStorage = new Storage<ICustomerResponse>();
export const ordersStorage = new Storage<IOrder>();
