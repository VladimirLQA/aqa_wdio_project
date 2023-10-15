import SignInActions from '../../../ui/actions/sign-in.actions';
import HomeActions from '../../../ui/actions/home.actions';
import ProductsActions from '../../../ui/actions/products/products.actions';
import ProductsAssertions from '../../../ui/assertions/products_assertions/products.assertions';
import { ProductsStorage } from '../../../utils/storages/products.storage';
import ProductsController from '../../../api/controllers/products.controller';

describe('', () => {
  before('', async () => {
    await SignInActions.openSalesPortal();
    await SignInActions.signIn();
  });

  after('', async () => {
    for (const product of ProductsStorage.getAllProducts()){
      await ProductsController.delete({token: await ProductsActions.getToken(), data: {_id: product._id}});
    }
  });

  context('WDIO - 6', () => {
    it('Should create product with created product via api', async () => {
      const product = await ProductsActions.createProductAPI();
      await HomeActions.openProductsPage();
      await ProductsActions.clickOnProductRowActionButton(product.name, 'Details');
      await ProductsAssertions.verifyCreatedProductInDetailModal(ProductsStorage.getProduct(product.name));
      await ProductsActions.closeModalWindow();
    });
  })
});
