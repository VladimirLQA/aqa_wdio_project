import ApiSignInActions from '../../../api/api_actions/api-sign-in.actions';
import OrdersController from '../../../api/controllers/orders.controller';
import ApiProductsActions from '../../../api/api_actions/api-products.actions';
import { reqAsLoggedUser } from '../../../api/request/request-as-logged-user';
import ApiOrdersActions from '../../../api/api_actions/api-orders.actions';
import { IProductResponse } from '../../../api/type/api.product.type';


describe('Smoke customers test', () => {
  let token: string, orderId: string, productIds: string[] | string;

  before(async () => {
    token = await ApiSignInActions.signInAsAdminAndGetToken();
    // productIds = await ApiProductsActions.createProducts(3);

  });

  after(async () => {
    // for (const id of productIds) {
    //   await reqAsLoggedUser(ApiProductsActions.deleteProduct, { data: id })
    // }
  });

  context('Default flow', () => {

    it('//////////', async () => {


    });

  });
});


// const ids = (await ApiProductsActions.getAllProducts(token)).data.Products.map((product: IProductResponse) => product._id)
//
// for (const id of ids) {
//   const response = await ApiProductsActions.deleteProduct(token, id);
//   console.log(response.status);
// }