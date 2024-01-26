import { COUNTRIES } from '../../ui/types/customers.types';
import { ORDER_STATUSES } from '../../ui/types/order.types';

export interface IApiOrderId {
  _id?: string;
}
export interface IApiOrdersRequest extends IApiOrderId {
  customer?: string;
  products?: string[];
}

export interface IApiCommentRequest extends IApiOrderId {
  comments: {
    text?: string;
    _id?: string;
  };
}

export interface IApiOrderStatusRequest extends IApiOrderId {
  status: ORDER_STATUSES;
}

export interface IApiOrderDeliveryRequest extends IApiOrderId {
  delivery: IDelivery;
}

export enum DELIVERY {
  DELIVERY = 'Delivery',
  PICK_UP = 'Pickup',
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

export interface IOrderData {
  orderId: string;
  customerId: string;
  productsId: string[];
}
