import SignInActions from '../../../ui/actions/sign-in.actions';
import HomeActions from '../../../ui/actions/home.actions';
import ProductsActions from '../../../ui/actions/products/products.actions';
import AddNewProductActions from '../../../ui/actions/products/add-new-product.actions';
import { getNewProduct, newProduct } from '../../../data/products/product.data';
import ProductsAssertions from '../../../ui/assertions/products_assertions/products.assertions';
import { IProduct } from '../../../types/products.type';
import DetailsProductModalPage from '../../../ui/pages/aqa_project/products/modals/details-product-modal.page';
import { browserPause, modalParser } from '../../../utils/helpers';
import { arrayAsyncMethods } from '../../../utils/async_array_methods/array-async-methods';

describe('', () => {
  let productToCreate: IProduct;
  before('Prepare to test', async () => {
    await SignInActions.openSitePage();
    await SignInActions.signIn();
    await HomeActions.openProductsPage();
  });

  afterEach('', async () => {
    await ProductsActions.deleteProduct(productToCreate.name);
    await ProductsAssertions.verifyProductToastText('deleted');
  });

  it('Should create product and validate in table of products', async () => {
    productToCreate = getNewProduct();
    await ProductsActions.openAddNewProductPage();
    await AddNewProductActions.createProduct(productToCreate, {price: 888});
    await ProductsAssertions.verifyProductToastText('created');
    await ProductsAssertions.verifyCreatedProductRow(productToCreate);
  });

  it('Should create product and validate in details modal window', async () => {
    productToCreate = getNewProduct();
    await ProductsActions.openAddNewProductPage();
    await AddNewProductActions.createProduct(productToCreate);
    await ProductsAssertions.verifyProductToastText('created');
    await ProductsActions.clickOnProductRowActionButton(productToCreate.name, 'Details');
    await ProductsAssertions.verifyCreatedProductInDetailModal(productToCreate);
    await ProductsActions.closeModalWindow();
  });
});
