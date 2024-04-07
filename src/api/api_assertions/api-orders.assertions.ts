import { IDelivery, ORDER_STATUSES } from '../../types/order.types.js';
import { ApiBaseAssertions } from './api-base.assertions.js';
import Expect from '../../utils/chai-expect/expect-collection.js';

class ApiOrdersAssertions extends ApiBaseAssertions {
  verifyOrderSchedule(actual: IDelivery, expected: IDelivery) {
    Expect.toEqual({ actual: actual.condition, expected: expected.condition });
    Expect.toEqual({ actual: actual.finalDate, expected: expected.finalDate });
    Expect.toDeepEqual({ actual: actual.address, expected: expected.address });
  }

  // verify order
  // verify delivery
  // verify history
  // verify products
  // verify total_price
  // ...
}

export default new ApiOrdersAssertions();
