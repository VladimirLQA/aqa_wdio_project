import { ApiActions } from '../../../api-core/api_actions/api-actions.index.js';
import ApiOrdersAssertions from '../../../api-core/api_assertions/api-orders.assertions.js';
import { CREATE_ORDER_SCHEMA } from '../../../data/json_schemas/orders.schema.js';
import { STATUS_CODES } from '../../../types/http.types.js';
import { DELIVERY, ORDER_STATUSES } from '../../../types/order.types.js';
import Expect from '../../../utils/chai-expect/expect-collection.js';
import { getScheduleOrder } from '../../../data/orders/orders.data.js';

describe('Order statuses test', () => {
  let orderIDs: string[] = [], productIDs: string[] = [], customerIDs: string[] = [], token: string;

  before(async () => {
    token = await ApiActions.signIn.signInAsAdminAndGetToken();
  });

  after(async () => {

    await ApiActions.common.deleteCreatedEntities('orders', orderIDs);
    await ApiActions.common.deleteCreatedEntities('products', productIDs);
    await ApiActions.common.deleteCreatedEntities('customers', customerIDs);
  });

  it('Should create order with draft status', async () => {
    const order = await ApiActions.orders.createOrderWithDraftStatus(token, {});
    const response = await ApiActions.orders.getOrderByID(token, order.orderId);

    ApiOrdersAssertions.verifyResponse(response, STATUS_CODES.OK, true, null);
    ApiOrdersAssertions.verifyResponseSchema(CREATE_ORDER_SCHEMA, response.data.Order);

    Expect.toEqual({ actual: response.data.Order.status, expected: ORDER_STATUSES.DRAFT });
    orderIDs.push(order.orderId);
    productIDs.push(...order.productsId);
    customerIDs.push(order.customerId);
  });

  it('Should create order with in process status', async () => {
    const delivery = getScheduleOrder({ condition: DELIVERY.DELIVERY });
    const order = await ApiActions.orders.createOrderWithInProcessStatus(token, {}, { delivery });
    const response = await ApiActions.orders.getOrderByID(token, order.orderId);

    ApiOrdersAssertions.verifyResponse(response, STATUS_CODES.OK, true, null);
    ApiOrdersAssertions.verifyResponseSchema(CREATE_ORDER_SCHEMA, response.data.Order);

    Expect.toEqual({ actual: response.data.Order.status, expected: ORDER_STATUSES.IN_PROCESS });
    orderIDs.push(order.orderId);
    productIDs.push(...order.productsId);
    customerIDs.push(order.customerId);
  });

  it('Should create order with canceled status', async () => {
    const order = await ApiActions.orders.createOrderWithCanceledStatus(token, {});
    const response = await ApiActions.orders.getOrderByID(token, order.orderId);

    ApiOrdersAssertions.verifyResponse(response, STATUS_CODES.OK, true, null);
    ApiOrdersAssertions.verifyResponseSchema(CREATE_ORDER_SCHEMA, response.data.Order);

    Expect.toEqual({ actual: response.data.Order.status, expected: ORDER_STATUSES.CANCELED });
    orderIDs.push(order.orderId);
    productIDs.push(...order.productsId);
    customerIDs.push(order.customerId);
  });

  it('Should create order with partially received status', async () => {
    const delivery = getScheduleOrder({ condition: DELIVERY.DELIVERY });
    const order = await ApiActions.orders.createOrderWithPartiallyReceivedStatus(token, {}, { delivery });
    const response = await ApiActions.orders.getOrderByID(token, order.orderId);

    ApiOrdersAssertions.verifyResponse(response, STATUS_CODES.OK, true, null);
    ApiOrdersAssertions.verifyResponseSchema(CREATE_ORDER_SCHEMA, response.data.Order);

    Expect.toEqual({ actual: response.data.Order.status, expected: ORDER_STATUSES.PARTIALLY_RECEIVED });
    orderIDs.push(order.orderId);
    productIDs.push(...order.productsId);
    customerIDs.push(order.customerId);
  });

  it('Should create order with received status', async () => {
    const delivery = getScheduleOrder({ condition: DELIVERY.DELIVERY });
    const order = await ApiActions.orders.createOrderWithReceivedStatus(token, {}, { delivery });
    const response = await ApiActions.orders.getOrderByID(token, order.orderId);

    ApiOrdersAssertions.verifyResponse(response, STATUS_CODES.OK, true, null);
    ApiOrdersAssertions.verifyResponseSchema(CREATE_ORDER_SCHEMA, response.data.Order);

    Expect.toEqual({ actual: response.data.Order.status, expected: ORDER_STATUSES.RECEIVED });
    orderIDs.push(order.orderId);
    productIDs.push(...order.productsId);
    customerIDs.push(order.customerId);
  });
});
