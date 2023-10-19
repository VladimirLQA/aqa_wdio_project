import SignInActions from '../../../ui/actions/sign-in.actions';
import HomeActions from '../../../ui/actions/home.actions';
import ProductsActions from '../../../ui/actions/products/products.actions';
import ProductsAssertions from '../../../ui/assertions/products_assertions/products.assertions';
import { ProductsStorage } from '../../../utils/storages/products.storage';
import ProductsController from '../../../api/controllers/products.controller';
import { reqAsLoggedUser } from '../../../api/request/request-as-logged-user';
import FiltersProductModalActions from '../../../ui/actions/products/modals/filters-product-modal.actions';
import { MANUFACTURERS } from '../../../data/products/product.data';
import { browserPause } from '../../../utils/helpers';

describe('', () => {
  before('', async () => {
    await SignInActions.openSalesPortal();
    await SignInActions.signIn();
    await HomeActions.openProductsPage();
  });

  after('', async () => {
    for (const product of ProductsStorage.getAllProducts()) {
      await reqAsLoggedUser(ProductsController.delete, { data: { name: product.name } });
    }
  });

  context('WDIO - 7', () => {
    it('Should verify table data after search with filters', async () => {
      await ProductsActions.clickOnFiltersButton();
      await FiltersProductModalActions.checkAllBoxesInFiltersModal();
      await FiltersProductModalActions.clickOnApplyButton();
      await ProductsActions.getParsedTableData();
      await
    });
  });
});
