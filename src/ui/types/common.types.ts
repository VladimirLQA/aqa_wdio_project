import { COUNTRIES } from './customers.types.js';
import { ORDER_STATUSES } from './order.types.js';
import { MANUFACTURERS } from './products.types.js';

export type ActionButtons = 'Delete' | 'Details' | 'Edit';

export type UnionFilterModalLabels = MANUFACTURERS | ORDER_STATUSES | COUNTRIES;

export type CreatedChangedOn = string;

export interface IChipsFilterOptions {
  search?: string;
  quickFilters?: string[];
}

export enum VALIDATION_ERROR_MESSAGES {
  CUSTOMER_NAME = `Customer's name should contain only 1-40 alphabetical characters and one space between`,
  CITY = `City's name should contain only 1-20 alphabetical characters and one space between`,
  ADDRESS = `Address should contain only 1-20 alphanumerical characters and one space between`,
  STREET = `Street should contain only 1-40 alphanumerical characters and one space between`,
  HOUSE = 'House number should be in range 1-999',
  FLAT = 'Flat number should be in range 1-9999',
  EMAIL = 'Invalid Email Address',
  PHONE = 'Mobile Number should be at least 10 characters and start with a +',
  NOTES = 'Notes should be in range 0-250 and without < or > symbols',
  PRODUCTS_NAME = "Products's name should contain only 3-40 alphanumerical characters and one space between",
  AMOUNT = 'Amount should be in range 0-999',
  PRICE = 'Price should be in range 1-99999',
  COUNTRY = 'No such country is defined',
  MANUFACTURER = 'No such manufacturer is defined',
  CUSTOMER = 'Incorrect Customer',
  PRODUCT = 'Incorrect Customer',
  DELIVERY = 'Incorrect Delivery',
  INCORRECT_BODY = 'Incorrect request body',
  COMMENT_NOT_FOUND = 'Comment was not found',
}

export interface IInitObject {
  [key: string]: string;
}
