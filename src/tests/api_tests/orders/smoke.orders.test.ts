import ApiCustomersActions from '../../../api/api_actions/api-customers.actions';
import ApiOrdersActions from '../../../api/api_actions/api-orders.actions';
import ApiProductsActions from '../../../api/api_actions/api-products.actions';
import ApiSignInActions from '../../../api/api_actions/api-sign-in.actions';
import CustomerController from '../../../api/controllers/customer.controller';
import ProductsController from '../../../api/controllers/products.controller';
import { reqAsLoggedUser } from '../../../api/request/request-as-logged-user';
import { ICustomerResponse } from '../../../api/type/api.customers.type';
import { IProductResponse } from '../../../api/type/api.product.type';
import { ICustomer } from '../../../ui/types/customers.types';
import { IProduct } from '../../../ui/types/products.types';
import CustomerStorage from '../../../utils/storages/customers.storage';
import ProductsStorage from '../../../utils/storages/products.storage';

describe('Smoke customers test', () => {
  let token: string, orderId: string, createdProducts: typeof ProductsStorage, createdCustomers: typeof CustomerStorage;
  let [prod1, prod2, prodToReplace, prodToAddFurther]: (IProductResponse | IProduct)[] = [];
  let [cust1, custReplace]: (ICustomer | ICustomerResponse)[] = [];

  // TODO typeeeeeeesssss
  before(async () => {
    token = await ApiSignInActions.signInAsAdminAndGetToken();
    createdProducts = await ApiProductsActions.createProducts(4);
    [prod1, prod2, prodToReplace, prodToAddFurther] = createdProducts.getAllEntities();

    createdCustomers = await ApiCustomersActions.createCustomers(2);
    [cust1, custReplace] = createdCustomers.getAllEntities();
  });

  after(async () => {
    for (const product of createdProducts.getAllEntities()) {
      await reqAsLoggedUser(ProductsController.delete, { data: { _id: product._id } });
    }
    for (const customer of createdCustomers.getAllEntities()) {
      await reqAsLoggedUser(CustomerController.delete, { data: { _id: customer._id } });
    }
  });

  context('Default flow', () => {
    it('//////////', async () => {
      const response = await ApiOrdersActions.createOrder(token, {
        customer: cust1._id,
        products: [prod1._id],
      });
      console.log(response.status);
      console.log(response.data);
    });
  });
});

// const ids = (await ApiProductsActions.getAllProducts(token)).data.Products.map((product: IProductResponse) => product._id)
//
// for (const id of ids) {
//   const response = await ApiProductsActions.deleteProduct(token, id);
//   console.log(response.status);
// }
