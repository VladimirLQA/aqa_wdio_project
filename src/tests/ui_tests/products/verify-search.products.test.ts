import SignInActions from '../../../ui/actions/sign-in.actions';
import HomeActions from '../../../ui/actions/home.actions';
import ProductsActions from '../../../ui/actions/products/products.actions';
import { ProductsStorage } from '../../../utils/storages/products.storage';
import ProductsController from '../../../api/controllers/products.controller';
import { reqAsLoggedUser } from '../../../api/request/request-as-logged-user';
import { MANUFACTURERS } from '../../../data/products/product.data';
import ProductsPage from '../../../ui/pages/aqa_project/products/products.page';
import ProductsAssertions from '../../../ui/assertions/products_assertions/products.assertions';
import FilterModalPage from '../../../ui/pages/aqa_project/modals/filter-modal.page';
import FiltersModalActions from '../../../ui/actions/modals/filters-modal.actions';

describe('WDIO - 7', () => {
  before('Up browser and open products page', async () => {
    await SignInActions.openSalesPortal();
    await SignInActions.signIn();
    await HomeActions.openProductsPage();
  });

  it('Should verify table data after search with filters', async () => {
    await ProductsActions.clickOnFiltersButton();
    await FiltersModalActions.checkFiltersBox(FilterModalPage, [MANUFACTURERS.APPLE, MANUFACTURERS.AMAZON, MANUFACTURERS.XIAOMI]);
    await FiltersModalActions.clickOnApplyButton();
    await ProductsAssertions.verifyTableData(ProductsPage);

  });


  // todo add actions and finish tests
  it('Should verify table data after search with search value', async () => {
    await ProductsActions.clickOnFiltersButton();
    await FiltersModalActions.checkFiltersBox(FilterModalPage, [MANUFACTURERS.APPLE, MANUFACTURERS.AMAZON, MANUFACTURERS.XIAOMI]);
    await FiltersModalActions.clickOnApplyButton();
    await ProductsAssertions.verifyTableData(ProductsPage);

  });

  it('Should verify table data after search with search value and filters', async () => {
    await ProductsActions.clickOnFiltersButton();
    await FiltersModalActions.checkFiltersBox(FilterModalPage, [MANUFACTURERS.APPLE, MANUFACTURERS.AMAZON, MANUFACTURERS.XIAOMI]);
    await FiltersModalActions.clickOnApplyButton();
    await ProductsAssertions.verifyTableData(ProductsPage);

  });

});
