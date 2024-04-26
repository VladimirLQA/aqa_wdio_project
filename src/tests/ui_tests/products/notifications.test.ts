import { reqAsLoggedUser } from '../../../api-core/request/request-as-logged-user.js';
import { IProductFromResponse } from '../../../api-core/type/api.product.type.js';
import HomeActions from '../../../ui/actions/home.actions.js';
import ProductsActions from '../../../ui/actions/products/products.actions.js';
import SideBarActions from '../../../ui/actions/side-bar.actions.js';
import SignInActions from '../../../ui/actions/sign-in.actions.js';
import { IProduct } from '../../../types/products.types.js';
import ProductsController from '../../../api-core/controllers/products.controller.js';

describe('Notifications test on products page', () => {
  let productToCreate: IProduct, productsNames: string[];
  before('Up browser', async () => {
    await SignInActions.openSalesPortal();
  });

  beforeEach('Prepare to test', async () => {
    await SignInActions.signIn();
    await HomeActions.openProductsPage();
    await ProductsActions.clickOnAddProductButton();
  });

  afterEach('Clear state after test', async () => {
    await SideBarActions.clickOnSignOutButton();
  });

  after('Tear down after test suite', async () => {
    let ids: string[] = [];
    for (const productName of productsNames) {
      ids.push(
        (await reqAsLoggedUser(ProductsController.get, {})).data.Products.filter((product: IProductFromResponse) => product.name === productName).map(
          (el: IProductFromResponse) => el._id,
        ),
      );
    }
    for (const id of ids) {
      await reqAsLoggedUser(ProductsController.delete, { data: { _id: id } });
    }
  });

  // TODO implement test for each case of toast message, ex. 'created', 'updated', etc.
});
