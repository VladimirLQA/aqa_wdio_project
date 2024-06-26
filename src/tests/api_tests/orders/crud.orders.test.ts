import ApiCustomersAssertions from '../../../api-core/api_assertions/api-customers.assertions.js';
import ApiOrdersAssertions from '../../../api-core/api_assertions/api-orders.assertions.js';
import ApiProductsAssertions from '../../../api-core/api_assertions/api-products.assertions.js';
import { CREATE_ORDER_SCHEMA } from '../../../data/json_schemas/orders.schema.js';
import { DELIVERY, IHistory, IOrder, ORDER_HISTORY_ACTIONS, ORDER_STATUSES } from '../../../types/order.types.js';
import Utils from '../../../utils/utils.js';
import Expect from '../../../utils/chai-expect/expect-collection.js';
import { expect } from 'chai';
import { ApiActions } from '../../../api-core/api_actions/api-actions.index.js';
import { ICustomerFromResponse } from '../../../types/customers.types.js';
import { STATUS_CODES } from '../../../types/http.types.js';
import { IProductFromResponse } from '../../../types/products.types.js';
import { IResponse } from '../../../types/api-request.type.js';
import { getScheduleOrder } from '../../../data/orders/orders.data.js';

describe('[CRUD] ORDERS test', () => {
  let token: string, orderId: string, response: IResponse, totalPrice: number;
  let [product_01, product_02]: IProductFromResponse[] = [];
  let [customer]: ICustomerFromResponse[] = [];

  before(async () => {
    token = await ApiActions.signIn.signInAsAdminAndGetToken();
    [product_01, product_02] = await ApiActions.products.createProducts(2);
    [customer] = await ApiActions.customers.createCustomers(1);

    totalPrice = product_01.price + product_02.price;
  });

  after(async () => {
    await ApiActions.common.deleteCreatedEntities('orders', [orderId]);
    await ApiActions.common.deleteCreatedEntities('products', [product_01._id, product_02._id]);
    await ApiActions.common.deleteCreatedEntities('customers', [customer._id]);
  });

  context('[CRUD] test', () => {
    it('Should create order', async () => {
      response = await ApiActions.orders.createOrder(token, {
        customer: customer._id,
        products: [product_01._id, product_02._id],
      });

      ApiOrdersAssertions.verifyResponse(response, STATUS_CODES.CREATED, true, null);
      ApiOrdersAssertions.verifyResponseSchema(CREATE_ORDER_SCHEMA, response.data);

      Utils.sortByNameASC([product_01, product_02]).forEach((p, idx) => {
        ApiProductsAssertions.verifyProduct(p, Utils.sortByNameASC(response.data.Order.products)[idx]);
      });
      ApiCustomersAssertions.verifyCustomer(response.data.Order.customer, customer);
      Expect.toEqual({ actual: response.data.Order.total_price, expected: totalPrice });
      Expect.toEqual({ actual: response.data.Order.status, expected: ORDER_STATUSES.DRAFT });
      Expect.toEqual({
        actual: response.data.Order.history[0].action,
        expected: ORDER_HISTORY_ACTIONS.CREATED,
      });
      Expect.toBeNotEmpty({ actual: response.data.Order._id });
      orderId = response.data?.Order._id;
    });

    it('Should get created order by id', async () => {
      response = await ApiActions.orders.getOrderByID(token, orderId);

      ApiOrdersAssertions.verifyResponse(response, STATUS_CODES.OK, true, null);
    });

    it('Should get all orders', async () => {
      response = await ApiActions.orders.getAllOrders(token);

      ApiOrdersAssertions.verifyResponse(response, STATUS_CODES.OK, true, null);
      Expect.toBeNotEmpty({ actual: response.data.Orders });
      expect(response.data?.Orders).to.be.an('array');
    });

    it('Should schedule delivery', async () => {
      const delivery = getScheduleOrder({ condition: DELIVERY.DELIVERY });
      response = await ApiActions.orders.scheduleOrderDelivery(token, { _id: orderId, delivery });

      ApiOrdersAssertions.verifyResponse(response, STATUS_CODES.OK, true, null);
      ApiOrdersAssertions.verifyOrderSchedule(response.data?.Order.delivery, delivery);
      Expect.toBeTrue({
        actual: response.data?.Order.history.some((v: IHistory) => v.action === ORDER_HISTORY_ACTIONS.DELIVERY_SCHEDULED),
      });
    });

    it(`Should change status to ${ORDER_STATUSES.IN_PROCESS}`, async () => {
      response = await ApiActions.orders.updateOrderStatusToInProcess(token, orderId);

      ApiOrdersAssertions.verifyResponse(response, STATUS_CODES.OK, true, null);
      Expect.toEqual({ actual: response.data?.Order.status, expected: ORDER_STATUSES.IN_PROCESS });
      Expect.toBeTrue({
        actual: response.data?.Order.history.some((v: IHistory) => v.action === ORDER_HISTORY_ACTIONS.PROCESSED),
      });
      Expect.toBeTrue({
        actual: response.data?.Order.history.some((v: IHistory) => v.status === ORDER_STATUSES.IN_PROCESS),
      });
    });

    it(`Should receive all products in order`, async () => {
      response = await ApiActions.orders.receiveProductsInOrder(token, {
        orderId,
        productsId: [product_01._id, product_02._id],
      });

      ApiOrdersAssertions.verifyResponse(response, STATUS_CODES.OK, true, null);
      Expect.toEqual({ actual: response.data?.Order.status, expected: ORDER_STATUSES.RECEIVED });
      Expect.toBeTrue({
        actual: response.data?.Order.history.some((v: IHistory) => v.action === ORDER_HISTORY_ACTIONS.RECEIVED_ALL),
      });
      Expect.toBeTrue({
        actual: response.data?.Order.history.some((v: IHistory) => v.status === ORDER_STATUSES.RECEIVED),
      });
    });
  });
});
