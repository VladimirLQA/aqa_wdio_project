import { getNewProduct } from '../../../data/products/product.data';
import { productData } from '../../../data/products/products-test.data';
import HomeActions from '../../../ui/actions/home.actions';
import AddNewProductActions from '../../../ui/actions/products/add-new-product.actions';
import ProductsActions from '../../../ui/actions/products/products.actions';
import SideBarActions from '../../../ui/actions/side-bar.actions';
import SignInActions from '../../../ui/actions/sign-in.actions';
import ProductsAssertions from '../../../ui/assertions/products_assertions/products.assertions';
import { IProduct } from '../../../ui/types/products.types';

describe('Notifications test on products page', () => {
  let productToCreate: IProduct;
  before('Up browser', async () => {
    await SignInActions.openSalesPortal();
  });

  beforeEach('Prepare to test', async () => {
    await SignInActions.signIn();
    await HomeActions.openProductsPage();
    await ProductsActions.openAddNewProductPage();
  });

  afterEach('Clear state after test', async () => {
    await SideBarActions.clickOnSignOutButton();
  });

  after('Tear down after test suite', async () => {
    await SignInActions.signIn();
    await HomeActions.openProductsPage();
  });

  context('Positive tests on input fields validation', async () => {
    let tempProductName: string;
    for (const product of productData.valid.name) {
      it(`Should create product with valid name: '${product.description}'`, async () => {
        productToCreate = getNewProduct({ name: product.name });
        tempProductName = productToCreate.name;

        await AddNewProductActions.fillProductInputs(productToCreate);
        await AddNewProductActions.clickOnSaveNewProductButton();
        await ProductsAssertions.verifyProductToastText('created');
      });
    }
  });
});
