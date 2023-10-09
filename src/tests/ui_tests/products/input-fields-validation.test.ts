import SignInActions from '../../../ui/actions/sign-in.actions';
import HomeActions from '../../../ui/actions/home.actions';
import ProductsActions from '../../../ui/actions/products/products.actions';
import AddNewProductActions from '../../../ui/actions/products/add-new-product.actions';
import { productData } from '../../../data/products/product.data';
import ProductsAssertions from '../../../ui/assertions/products_assertions/products.assertions';
import { browserPause } from '../../../utils/helpers';

describe('', () => {
  before('', async () => {
    await SignInActions.openSitePage();
  });

  beforeEach('Prepare to test', async () => {
    await SignInActions.signIn();
    await HomeActions.openProductsPage();
    await ProductsActions.openAddNewProductPage();
  });

  afterEach('', async () => {
    await HomeActions.logOut();
  });

  after('', async () => {

  });

  context('Positive tests on input fields validation', async () => {

    for (const product of productData.valid.name) {
      it(`Should create product with valid name: '${product.name}'`, async () => {
        await AddNewProductActions.fillProductInputs(product);
        await AddNewProductActions.clickOnSaveNewProductButton();
        // await browserPause(2000)
        await ProductsAssertions.verifyProductToastText('created');
      });
    }
  });
});
