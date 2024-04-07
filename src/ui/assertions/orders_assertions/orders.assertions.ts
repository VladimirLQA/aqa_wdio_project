import Utils from '../../../utils/utils.js';
import OrderDetailsActions from '../../../ui/actions/orders/orders-details.actions.js';
import Expect from '../../../utils/chai-expect/expect-collection.js';
import OrdersActions from '../../actions/orders/orders.actions.js';
import OrderDetailsPage from '../../pages/aqa_project/orders/order-details.page.js';
import { ICustomer } from '../../../types/customers.types.js';
import { HeaderDetailsTitles, IDeliveryScheduleHistory, IDeliveryWithLocation, IOrder, ORDER_HISTORY_ACTIONS } from '../../../types/order.types.js';
import { IProduct } from '../../../types/products.types.js';
import ProductsAssertions from '../products_assertions/products.assertions.js';
import { CommonAssertions } from '../common.assertions.js';

class OrdersAssertions extends CommonAssertions {
  async verifyCustomerInCustomerDetailsSection<T extends ICustomer>(createdEntity: T) {
    const actualEntity = (await OrderDetailsPage.getSectionData(OrderDetailsPage.customerProductSection['Customer']['Customer details']))[0];
    for (const key in createdEntity) {
      if (key !== 'createdOn' && key !== '_id') {
        Expect.toEqual({ actual: actualEntity[key], expected: String(createdEntity[key]) });
      }
    }
  }

  async verifyCreatedOrderInTableRow<T extends IOrder>(createdOrder: T) {
    const tableOrder = await OrdersActions.getCreatedOrderRowInTable(createdOrder._id);
    Expect.toEqual({ actual: tableOrder.orderNumber, expected: createdOrder._id });
    if (createdOrder.delivery !== null) {
      Expect.toEqual({
        actual: tableOrder.delivery,
        expected: Utils.dateToYYYYMMDD(createdOrder.delivery.finalDate.toString()),
      });
    } else {
      Expect.toEqual({ actual: tableOrder.delivery, expected: '-' });
    }
    Expect.toEqual({ actual: tableOrder.name, expected: createdOrder.customer.name });
    Expect.toEqual({ actual: tableOrder.status, expected: createdOrder.status });
    Expect.toEqual({ actual: tableOrder.price, expected: `$${createdOrder.total_price}` });
  }

  async verifyProductsInProductsDetailsSection<T extends IProduct[]>(orderProducts: T) {
    const actualProducts = await OrderDetailsPage.getSectionData(OrderDetailsPage.customerProductSection['Products']['Product details body']);
    Utils.sortByNameASC(actualProducts).forEach((p, idx) => {
      ProductsAssertions.verifyProduct(p, Utils.sortByNameASC(orderProducts)[idx]);
    });
  }

  async verifyHeaderDetailsOnOrderDetailsPage(info: HeaderDetailsTitles, expected: string) {
    const actualInfo = await OrderDetailsPage.getText(OrderDetailsPage['Header Order history info'](info));
    Expect.toEqual({ actual: actualInfo, expected: expected });
  }

  async verifyDeliveryInOrderHistory(delivery: IDeliveryWithLocation, action: ORDER_HISTORY_ACTIONS, isPrev = false) {
    const scheduleHistory = await OrderDetailsActions.tabsSection.getParsedAction<IDeliveryScheduleHistory>(action);
    console.log('delivery', scheduleHistory);

    if (isPrev) {
      Expect.toEqual({ actual: scheduleHistory.city.previous, expected: delivery.address.city });
      Expect.toEqual({
        actual: scheduleHistory.country.previous,
        expected: delivery.address.country,
      });
      Expect.toEqual({
        actual: scheduleHistory['delivery date'].previous,
        expected: delivery.finalDate,
      });
      Expect.toEqual({
        actual: scheduleHistory['delivery type'].previous,
        expected: delivery.condition,
      });
      Expect.toEqual({
        actual: scheduleHistory.flat.previous,
        expected: delivery.address.flat.toString(),
      });
      Expect.toEqual({
        actual: scheduleHistory.house.previous,
        expected: delivery.address.house.toString(),
      });
      Expect.toEqual({
        actual: scheduleHistory.street.previous,
        expected: delivery.address.street,
      });
    } else {
      Expect.toEqual({ actual: scheduleHistory.city.updated, expected: delivery.address.city });
      Expect.toEqual({
        actual: scheduleHistory.country.updated,
        expected: delivery.address.country,
      });
      Expect.toEqual({
        actual: scheduleHistory['delivery date'].updated,
        expected: delivery.finalDate,
      });
      Expect.toEqual({
        actual: scheduleHistory['delivery type'].updated,
        expected: delivery.condition,
      });
      Expect.toEqual({
        actual: scheduleHistory.flat.updated,
        expected: delivery.address.flat.toString(),
      });
      Expect.toEqual({
        actual: scheduleHistory.house.updated,
        expected: delivery.address.house.toString(),
      });
      Expect.toEqual({ actual: scheduleHistory.street.updated, expected: delivery.address.street });
    }
  }
}

export default new OrdersAssertions();
