import SignInActions from '../../../ui/actions/sign-in.actions';
import HomeActions from '../../../ui/actions/home.actions';
import ProductsActions from '../../../ui/actions/products/products.actions';
import AddNewProductActions from '../../../ui/actions/products/add-new-product.actions';
import { getNewProduct, newProduct } from '../../../data/products/product.data';
import ProductsAssertions from '../../../ui/assertions/products_assertions/products.assertions';

describe('', () => {
  const productToCreate = getNewProduct();
  before('Prepare to test', async () => {
    await SignInActions.openSitePage();
    await SignInActions.signIn();
  });

  after('', async () => {
    // await ProductsActions.deleteProduct(newProduct.name);
    // await ProductsAssertions.verifyProductToastText('deleted');
  });

  it('Should create product with valid data', async () => {
    await HomeActions.openProductsPage();
    await ProductsActions.openAddNewProductPage();
    await AddNewProductActions.createProduct(productToCreate, {price: 888});
    await ProductsAssertions.verifyProductToastText('created');
    await ProductsAssertions.verifyCreatedProductRow(productToCreate);
  });
});
