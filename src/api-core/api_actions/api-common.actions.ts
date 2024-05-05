import { reqAsLoggedUser } from '../request/request-as-logged-user.js';
import { ControllersList } from '../controllers/contollers.index.js';
import { ControllersIndexName } from '../controllers/contollers.index.js';
import ApiOrdersActions from './api-orders.actions.js';
import { IOrder } from '../../types/order.types.js';
import ApiCustomersActions from './api-customers.actions.js';
import { ICustomerFromResponse } from '../../types/customers.types.js';
import ApiProductsActions from './api-products.actions.js';
import { IProductFromResponse } from '../../types/products.types.js';
import ApiSignInActions from './api-sign-in.actions.js';

class ApiCommonActions {
  async deleteCreatedEntities(controller: ControllersIndexName, ids: string[]) {
    for (const id of ids) {
      await reqAsLoggedUser(ControllersList[controller as ControllersIndexName].delete, { data: { _id: id } });
    }
  }

  async globalTearDownOfCreatedEntities() {
    const token = await ApiSignInActions.signInAsAdminAndGetToken();

    const orderIDs = (await ApiOrdersActions.getAllOrders(token)).data.Orders.map(
      (order: IOrder) => order._id,
    );
    for (const id of orderIDs) {
      await ApiOrdersActions.deleteOrder(token, id);
    }

    const customerIDs = (await ApiCustomersActions.getAllCustomers(token)).data.Customers.map(
      (customer: ICustomerFromResponse) => customer._id,
    );
    for (const id of customerIDs) {
      await ApiCustomersActions.deleteCustomer(token, id);
    }

    const productIDs = (await ApiProductsActions.getAllProducts(token)).data.Products.map(
      (product: IProductFromResponse) => product._id,
    );

    for (const id of productIDs) {
      await ApiProductsActions.deleteProduct(token, id);
    }
  }
}

export default new ApiCommonActions();
