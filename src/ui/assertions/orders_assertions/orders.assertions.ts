import Utils from '../../../utils/helpers.js';
import Expect from '../../../utils/chai-expect/expect-collection.js';
import OrdersActions from '../../actions/orders/orders.actions.js';
import CustomerDetailsSectionPage from '../../pages/aqa_project/orders/order-customer-section.page.js';
import OrderDetailsPage from '../../pages/aqa_project/orders/order-details.page.js';
import { ICustomer } from '../../types/customers.types.js';
import { IOrder } from '../../types/order.types.js';
import { IProduct } from '../../types/products.types.js';
import { CommonAssertions } from '../common.assertions.js';
import ProductsAssertions from '../products_assertions/products.assertions.js';

class OrdersAssertions extends CommonAssertions {
  async verifyCustomerInCustomerDetailsSection<T extends ICustomer>(createdEntity: T) {
    const actualEntity = (await OrderDetailsPage.getSectionData(OrderDetailsPage.customerSection['Customer details']))[0];
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

  async verifyProductsInProductsDetailsSection<T extends IProduct[]>(orderProducts: T) {
    const actualProducts = await OrderDetailsPage.getSectionData(OrderDetailsPage.productsSection['Product details body']);
    console.log(actualProducts);
    Utils.sortByNameASC(orderProducts).forEach((p, idx) => {
      ProductsAssertions.verifyProduct(p, Utils.sortByNameASC(actualProducts)[idx]);
    });
  }
}

export default new OrdersAssertions();
