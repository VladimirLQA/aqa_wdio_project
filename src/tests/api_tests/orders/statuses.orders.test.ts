import { ApiActions } from '../../../api-core/api_actions/api-actions.index.js';
import ApiOrdersAssertions from '../../../api-core/api_assertions/api-orders.assertions.js';
import { CREATE_ORDER_SCHEMA } from '../../../data/json_schemas/orders.schema.js';
import { IResponse } from '../../../types/api-request.type.js';
import { STATUS_CODES } from '../../../types/http.types.js';
import { ORDER_STATUSES } from '../../../types/order.types.js';
import Expect from '../../../utils/chai-expect/expect-collection.js';

describe.only('Order statuses test', () => {
  let orderIDs: string[], productIDs: string[], customerIDs: string[], response: IResponse, token: string;

  before(async () => {
    token = await ApiActions.signIn.signInAsAdminAndGetToken();
  });
  after(async () => {});

  it('Create order with draft status', async () => {
    const order = await ApiActions.orders.createOrderWithDraftStatus(token, {});
    response = await ApiActions.orders.getOrderByID(token, order.orderId);

    ApiOrdersAssertions.verifyResponse(response, STATUS_CODES.OK, true, null);
    ApiOrdersAssertions.verifyResponseSchema(CREATE_ORDER_SCHEMA, response.data.Order);

    Expect.toEqual({ actual: response.data.Order.status, expected: ORDER_STATUSES.DRAFT });
  });
  // TODO
});
