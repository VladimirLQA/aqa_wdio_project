import Expect from '../../../utils/chai-expect/expect-collection.js';
import OrdersActions from '../../actions/orders/orders.actions.js';
import CustomerDetailsSectionPage from '../../pages/aqa_project/orders/order-customer-section.page.js';
import { ICustomer } from '../../types/customers.types.js';
import { IOrder } from '../../types/order.types.js';
import { IProduct } from '../../types/products.types.js';
import { CommonAssertions } from '../common.assertions.js';

class OrdersAssertions extends CommonAssertions {
  async verifyCustomerInCustomerDetailsSection<T extends ICustomer>(createdEntity: T) {
    const actualEntity = await CustomerDetailsSectionPage.getParsedCustomerInSection();
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
      Expect.toEqual({ actual: tableOrder.delivery, expected: createdOrder.delivery });
    } else {
      Expect.toEqual({ actual: tableOrder.delivery, expected: '-' });
    }
    Expect.toEqual({ actual: tableOrder.name, expected: createdOrder.customer.name });
    Expect.toEqual({ actual: tableOrder.status, expected: createdOrder.status });
    Expect.toEqual({ actual: tableOrder.price, expected: `$${createdOrder.total_price}` });
  }
  // Utils.sortByNameASC([product_01, product_02]).forEach((p, idx) => {
  //   ApiProductsAssertions.verifyProduct(p, Utils.sortByNameASC(response.data.Order.products)[idx]);
  // });
  async verifyProductsInProductsDetailsSection<T extends IProduct[]>(orderProducts: T) {}
}

export default new OrdersAssertions();
