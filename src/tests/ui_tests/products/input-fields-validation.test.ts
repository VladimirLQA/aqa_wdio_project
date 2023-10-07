import SignInActions from '../../../actions/sign-in.actions';
import HomeActions from '../../../actions/home.actions';
import ProductsActions from '../../../actions/products/products.actions';
import AddNewProductActions from '../../../actions/products/add-new-product.actions';
import { productInputs } from '../../../data/products/product.data';
import ProductsAssertions from '../../../assertions/products_assertions/products.assertions';
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

    for (const product of productInputs.positiveDataNameField) {
      it(`Should create product with valid name: '${product.name}'`, async () => {
        await AddNewProductActions.fillProductInputs(product);
        await AddNewProductActions.clickOnSaveNewProductButton();
        // await browserPause(2000)
        await ProductsAssertions.verifyProductToastText('created');
      });
    }
  });
});
