import SignInActions from '../../../ui/actions/sign-in.actions';
import HomeActions from '../../../ui/actions/home.actions';
import ProductsActions from '../../../ui/actions/products/products.actions';
import { MANUFACTURERS } from '../../../data/products/product.data';
import ProductsPage from '../../../ui/pages/aqa_project/products/products.page';
import ProductsAssertions from '../../../ui/assertions/products_assertions/products.assertions';

describe('WDIO - 7', () => {
  before('Up browser and open products page', async () => {
    await SignInActions.openSalesPortal();
    await SignInActions.signIn();
    await HomeActions.openProductsPage();
  });

  afterEach('Clear chips', async () => {
    await ProductsActions.clearQuickAndSearchFilterChips(ProductsPage, 'all');
  })

  it('Should verify table data after search with filters', async () => {

    const quickFilters = [MANUFACTURERS.APPLE, MANUFACTURERS.AMAZON, MANUFACTURERS.XIAOMI];
    await ProductsActions.checkQuickFilters(quickFilters)
    const actualQuickFilters = (await ProductsActions.getListOfChipButtons(ProductsPage)).quickFilters;
    expect(quickFilters.every((filter) => actualQuickFilters.includes(filter))).toBe(true);
    await ProductsAssertions.verifyTableData(ProductsPage);

  });

  it('Should verify table data after search with search value', async () => {
    await ProductsActions.fillSearchInput('app');
    await ProductsActions.clickOnSearchButton();
    await ProductsAssertions.verifyElementText(ProductsPage['Chip buttons'], 'app');
    await ProductsAssertions.verifyTableData(ProductsPage);

  });

  it('Should verify table data after search with search value and filters', async () => {

    await ProductsActions.checkQuickFilters([MANUFACTURERS.TESLA])
    await ProductsActions.fillSearchInput('6');
    await ProductsActions.clickOnSearchButton();
    await ProductsAssertions.verifyTableData(ProductsPage);

  });

});
