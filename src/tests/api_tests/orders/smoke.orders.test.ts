import ApiCustomersActions from '../../../api/api_actions/api-customers.actions';
import ApiOrdersActions from '../../../api/api_actions/api-orders.actions';
import ApiProductsActions from '../../../api/api_actions/api-products.actions';
import ApiSignInActions from '../../../api/api_actions/api-sign-in.actions';
import ApiCustomersAssertions from '../../../api/api_assertions/api-customers.assertions';
import ApiOrdersAssertions from '../../../api/api_assertions/api-orders.assertions';
import ApiProductsAssertions from '../../../api/api_assertions/api-products.assertions';
import CustomerController from '../../../api/controllers/customer.controller';
import OrdersController from '../../../api/controllers/orders.controller';
import ProductsController from '../../../api/controllers/products.controller';
import { reqAsLoggedUser } from '../../../api/request/request-as-logged-user';
import { ICustomerResponse } from '../../../api/type/api.customers.type';
import { IProductResponse } from '../../../api/type/api.product.type';
import { CREATE_ORDER_SCHEMA } from '../../../data/json_schemas/orders.schema';
import { customersStorage, productsStorage } from '../../../utils/storages/storages';

describe('Smoke customers test', () => {
  let token: string, orderId: string, createdProducts: typeof productsStorage, createdCustomers: typeof customersStorage;
  let [prod1, prod2, prodToReplace, prodToAddFurther]: IProductResponse[] = [];
  let [cust1, custReplace]: ICustomerResponse[] = [];

  before(async () => {
    token = await ApiSignInActions.signInAsAdminAndGetToken();
    createdProducts = await ApiProductsActions.createProducts(2);
    [prod1, prod2, prodToReplace, prodToAddFurther] = createdProducts.getAllEntities();

    createdCustomers = await ApiCustomersActions.createCustomers(2);
    [cust1, custReplace] = createdCustomers.getAllEntities();
  });

  after(async () => {
    await reqAsLoggedUser(OrdersController.deleteOrder, { data: { _id: orderId } });

    for (const product of createdProducts.getAllEntities()) {
      await reqAsLoggedUser(ProductsController.delete, { data: { _id: product._id } });
    }
    for (const customer of createdCustomers.getAllEntities()) {
      await reqAsLoggedUser(CustomerController.delete, { data: { _id: customer._id } });
    }
  });

  context('Default flow', () => {
    it('Should create order', async () => {
      const response = await ApiOrdersActions.createOrder(token, {
        customer: cust1._id,
        products: [prod1._id],
      });

      await ApiOrdersAssertions.verifyResponse(response, 201, true, null);
      await ApiOrdersAssertions.verifyResponseSchema(CREATE_ORDER_SCHEMA, response.data);

      orderId = response.data.Order._id;
    });

    it('Should get created order by id', async () => {
      const response = await ApiOrdersActions.getOrderByID(token, orderId);

      await ApiOrdersAssertions.verifyResponse(response, 200, true, null);
      await ApiOrdersAssertions.verifyResponseSchema(CREATE_ORDER_SCHEMA, response.data);

      await ApiCustomersAssertions.verifyCustomer(response.data?.Order.customer, cust1);
      await ApiProductsAssertions.verifyProduct(response.data?.Order.products[0], prod1);
    });
  });
});

// const ids = (await ApiProductsActions.getAllProducts(token)).data.Products.map((product: IProductResponse) => product._id)
//
// for (const id of ids) {
//   const response = await ApiProductsActions.deleteProduct(token, id);
//   console.log(response.status);
// }
