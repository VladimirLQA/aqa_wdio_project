import SignInActions from '../../../ui/actions/sign-in.actions';
import HomeActions from '../../../ui/actions/home.actions';
import ProductsActions from '../../../ui/actions/products/products.actions';
import AddNewProductActions from '../../../ui/actions/products/add-new-product.actions';
import ProductsAssertions from '../../../ui/assertions/products_assertions/products.assertions';
import { productData } from '../../../data/products/products-test.data';
import { getNewProduct } from '../../../data/products/product.data';
import { ProductsStorage } from '../../../utils/storages/products.storage';
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
    await HomeActions.clickOnSignOutButton();
  });

  after('Tear down after test suite', async () => {
    await SignInActions.signIn();
    await HomeActions.openProductsPage();

    for (const product of ProductsStorage.getAllProducts()) {
      await ProductsActions.deleteProduct(product.name);
    }
  });

  context('Positive tests on input fields validation', async () => {
    let tempProductName: string;
    for (const product of productData.valid.name) {
      it(`Should create product with valid name: '${product.description}'`, async () => {
        productToCreate = getNewProduct({ name: product.name });
        await ProductsStorage.addProduct(productToCreate);
        tempProductName = productToCreate.name;

        await AddNewProductActions.fillProductInputs(productToCreate);
        await AddNewProductActions.clickOnSaveNewProductButton();
        await ProductsAssertions.verifyProductToastText('created');
      });
    }
  });

});
