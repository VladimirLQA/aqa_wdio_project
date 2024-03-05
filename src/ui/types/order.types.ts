import { ICustomerResponse } from '../../api/type/api.customers.type.js';
import { COUNTRIES } from './customers.types.js';
import { CreatedChangedOn } from './common.types.js';
import { IProductResponse } from '../../api/type/api.product.type.js';

export enum LOCATION_TYPE {
  HOME = 'Home',
  OTHER = 'Other',
}
export enum DELIVERY {
  DELIVERY = 'Delivery',
  PICK_UP = 'Pickup',
}

export enum ORDER_STATUSES {
  DRAFT = 'Draft',
  IN_PROCESS = 'In Process',
  PARTIALLY_RECEIVED = 'Partially Received',
  RECEIVED = 'Received',
  CANCELED = 'Canceled',
}

export enum ORDER_HISTORY_ACTIONS {
  CREATED = 'Order created',
  CUSTOMER_CHANGED = 'Customer changed',
  REQUIRED_PRODUCTS_CHANGED = 'Requested products changed',
  PROCESSED = 'Order processing started',
  DELIVERY_SCHEDULED = 'Delivery Scheduled',
  DELIVERY_EDITED = 'Delivery Edited',
  RECEIVED = 'Received',
  RECEIVED_ALL = 'All products received',
  CANCELED = 'Order canceled',
}

export interface IComment {
  createdOn: CreatedChangedOn;
  text: string;
  _id: string;
}

export interface IAddress {
  city: string;
  country: COUNTRIES;
  flat: number;
  house: number;
  street: string;
}

export interface IDelivery {
  condition: DELIVERY | null;
  finalDate: string | number;
  address: IAddress;
}

export interface IHistory {
  action: ORDER_HISTORY_ACTIONS;
  changedOn: CreatedChangedOn;
  customer: string;
  delivery: IDelivery | null;
  products: (Omit<IProductResponse, 'createdOn'> & { received: string })[];
  status: ORDER_STATUSES;
  total_price: number;
}

export interface IOrder {
  comments: [] | IComment[];
  createdOn: CreatedChangedOn;
  customer: ICustomerResponse;
  delivery: IDelivery;
  history: IHistory[];
  products: (Omit<IProductResponse, 'createdOn'> & { received: string })[];
  status: ORDER_STATUSES;
  total_price: number;
  _id: string;
}

export interface ScheduleInfo extends IAddress {
  location: LOCATION_TYPE;
  delivery: DELIVERY;
  finalDate: string;
}

export const orderStatusesArray = [
  ORDER_STATUSES.CANCELED,
  ORDER_STATUSES.DRAFT,
  ORDER_STATUSES.RECEIVED,
  ORDER_STATUSES.PARTIALLY_RECEIVED,
  ORDER_STATUSES.IN_PROCESS,
];
