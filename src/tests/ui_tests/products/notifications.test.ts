import { reqAsLoggedUser } from '../../../api/request/request-as-logged-user';
import { IProductResponse } from '../../../api/type/api.product.type';
import HomeActions from '../../../ui/actions/home.actions';
import ProductsActions from '../../../ui/actions/products/products.actions';
import SideBarActions from '../../../ui/actions/side-bar.actions';
import SignInActions from '../../../ui/actions/sign-in.actions';
import { IProduct } from '../../../ui/types/products.types';
import ProductsController from '../../../api/controllers/products.controller';

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
        (await reqAsLoggedUser(ProductsController.get, {})).data.Products.filter(
          (product: IProductResponse) => product.name === productName,
        ).map((el: IProductResponse) => el._id),
      );
    }
    for (const id of ids) {
      await reqAsLoggedUser(ProductsController.delete, { data: { _id: id } });
    }
  });

  // TODO implement test for each case of toast message, ex. 'created', 'updated', etc.
});
