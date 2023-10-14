import SignInActions from '../../../ui/actions/sign-in.actions';
import HomeActions from '../../../ui/actions/home.actions';
import ProductsActions from '../../../ui/actions/products/products.actions';
import AddNewProductActions from '../../../ui/actions/products/add-new-product.actions';
import { productData } from '../../../data/products/product.data';
import ProductsAssertions from '../../../ui/assertions/products_assertions/products.assertions';
import { browserPause } from '../../../utils/helpers';
import ProductsPage from '../../../ui/pages/aqa_project/products/products.page';
import { ProductsStorage } from '../../../utils/storages/products.storage';
import ApiProductsActions from '../../../api/api_actions/api.products.actions';
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
      await ProductsActions.createProductAPI();
      await HomeActions.openProductsPage();
      await ProductsActions.clickOnProductRowActionButton(ProductsStorage.getProduct().name, 'Details');
      await ProductsAssertions.verifyCreatedProductInDetailModal(ProductsStorage.getProduct());
      await ProductsActions.closeModalWindow();
    });
  })
});
