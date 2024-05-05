import { IDelivery } from '../../types/order.types.js';
import { ApiBaseAssertions } from './api-base.assertions.js';
import Expect from '../../utils/chai-expect/expect-collection.js';
import Utils from '../../utils/utils.js';

class ApiOrdersAssertions extends ApiBaseAssertions {
  verifyOrderSchedule(actual: IDelivery, expected: IDelivery) {
    Expect.toEqual({ actual: actual.condition, expected: expected.condition });
    Expect.toEqual({ actual: Utils.dateToYYYYMMDD(actual.finalDate), expected: Utils.dateToYYYYMMDD(expected.finalDate) });
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
