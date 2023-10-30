import SignInActions from '../../../ui/actions/sign-in.actions';
import HomeActions from '../../../ui/actions/home.actions';
import ProductsActions from '../../../ui/actions/products/products.actions';
import ProductsAssertions from '../../../ui/assertions/products_assertions/products.assertions';
import { ProductsStorage } from '../../../utils/storages/products.storage';
import ProductsController from '../../../api/controllers/products.controller';
import { reqAsLoggedUser } from '../../../api/request/request-as-logged-user';
import ProductsPage from '../../../ui/pages/aqa_project/products/products.page';
import DeleteModalActions from '../../../ui/actions/modals/delete-modal.actions';
import DetailsModalActions from '../../../ui/actions/modals/details-modal.actions';

describe('', () => {
  before('', async () => {
    await SignInActions.openSalesPortal();
    await SignInActions.signIn();
  });

  after('', async () => {
    for (const product of ProductsStorage.getAllProducts()) {
      await reqAsLoggedUser(ProductsController.delete, { data: { name: product.name } });
    }
  });

  context('WDIO - 6', () => {
    it('Should create product via api and verify in "Details modal window"', async () => {
      const product = await ProductsActions.createProductAPI();
      await HomeActions.openProductsPage();
      await ProductsActions.clickOnProductRowActionButton(product.name, 'Details');
      await ProductsAssertions.verifyCreatedEntityInDetailModal(ProductsStorage.getProduct(product.name));
      await DetailsModalActions.clickOnCloseModalButton();
    });
  });
});
