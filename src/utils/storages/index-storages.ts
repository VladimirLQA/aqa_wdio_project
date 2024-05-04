import { ICustomerFromResponse } from '../../types/customers.types.js';
import { IOrder } from '../../types/order.types.js';
import { IProductFromResponse } from '../../types/products.types.js';
import { Storage } from './abstract.storage.js';
import  { TokenStorage } from './token.storage.js';

const ProductsStorage = new Storage<IProductFromResponse>();
const CustomersStorage = new Storage<ICustomerFromResponse>();
const OrdersStorage = new Storage<IOrder>();
const UsersToken = new TokenStorage();

export { ProductsStorage, CustomersStorage, UsersToken, OrdersStorage };
