import { ICustomerFromResponse } from '../../types/customers.types.js';
import { IOrder } from '../../types/order.types.js';
import { IProductFromResponse } from '../../types/products.types.js';
import { Storage } from './abstract.storage.js';

export const productsStorage = new Storage<IProductFromResponse>();
export const customersStorage = new Storage<ICustomerFromResponse>();
export const ordersStorage = new Storage<IOrder>();
