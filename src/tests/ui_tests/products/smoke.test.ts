import SignInActions from '../../../actions/sign-in.actions';
import HomeActions from '../../../actions/home.actions';
import ProductsActions from '../../../actions/products/products.actions';
import AddNewProductActions from '../../../actions/products/add-new-product.actions';
import { newProduct, toastText } from '../../../data/products/product.data';
import ProductsAssertions from '../../../assertions/products_assertions/products.assertions';
import BaseAssertions from '../../../assertions/base.assertions';

describe('', () => {
  before('Prepare to test', async () => {
    await SignInActions.openSitePage();
    await SignInActions.signIn();
  });

  after('', async () => {
    await ProductsActions.deleteProduct(newProduct.name);
    await ProductsAssertions.verifyProductToastText('deleted');
  });

  it('Should create product with valid data', async () => {
    await HomeActions.openProductsPage();
    await ProductsActions.openAddNewProductPage();
    await AddNewProductActions.createProduct(newProduct, newProduct.manufacturer);
    await ProductsAssertions.verifyProductToastText('created');
    await ProductsAssertions.verifyCreatedProductRow(newProduct);
  });
});
