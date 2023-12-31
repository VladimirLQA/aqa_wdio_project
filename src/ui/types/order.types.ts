import { ICustomerResponse } from '../../api/type/api.customers.type';
import { COUNTRIES } from './customers.types';
import { CreatedChangedOn } from './common.types';
import { IProductResponse } from '../../api/type/api.product.type';

export enum DELIVERY {
  DELIVERY = "Delivery",
  PICK_UP = "Pickup",
}

export enum ORDER_STATUSES {
  DRAFT = "Draft",
  IN_PROCESS = "In Process",
  PARTIALLY_RECEIVED = "Partially Received",
  RECEIVED = "Received",
  CANCELED = "Canceled",
}

export enum ORDER_HISTORY_ACTIONS {
  CREATED = "Order created",
  CUSTOMER_CHANGED = "Customer changed",
  REQUIRED_PRODUCTS_CHANGED = "Requested products changed",
  PROCESSED = "Order processing started",
  DELIVERY_SCHEDULED = "Delivery Scheduled",
  DELIVERY_EDITED = "Delivery Edited",
  RECEIVED = "Received",
  RECEIVED_ALL = "All products received",
  CANCELED = "Order canceled",
}



export interface IComment {
  createdOn: CreatedChangedOn,
  text: string,
  _id: string
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
  finalDate: string;
  address: IAddress;
}

export interface IHistory {
  action: ORDER_HISTORY_ACTIONS;
  changedOn: CreatedChangedOn;
  customer: string;
  delivery: IDelivery | null;
  products: (Omit<IProductResponse, 'createdOn'> & {received: string})[];
  status: ORDER_STATUSES;
  total_price: number;
}

export interface IOrder {
  comments: [] | IComment[];
  createdOn: CreatedChangedOn;
  customer: ICustomerResponse;
  delivery: IDelivery;
  history: IHistory[];
  products: Pick<IHistory, 'products'>;
  status: ORDER_STATUSES;
  total_price: number;
  _id: string;
}