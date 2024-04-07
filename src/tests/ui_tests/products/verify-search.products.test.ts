import { MANUFACTURERS } from '../../../data/products/product.data.js';
import HomeActions from '../../../ui/actions/home.actions.js';
import FiltersModalActions from '../../../ui/actions/modals/filters-modal.actions.js';
import ProductsActions from '../../../ui/actions/products/products.actions.js';
import SignInActions from '../../../ui/actions/sign-in.actions.js';
import ProductsAssertions from '../../../ui/assertions/products_assertions/products.assertions.js';
import ProductsPage from '../../../ui/pages/aqa_project/products/products.page.js';
import { manufacturersArray } from '../../../types/products.types.js';

describe('WDIO - 7', () => {
  before('Up browser and open products page', async () => {
    await SignInActions.openSalesPortal();
    await SignInActions.signIn();
    await HomeActions.openProductsPage();
  });

  afterEach('Clear chips', async () => {
    await ProductsActions.clearQuickAndSearchFilterChips(ProductsPage, 'all');
  });

  it('Should verify table data after search with filters', async () => {
    const quickFilters = [MANUFACTURERS.APPLE, MANUFACTURERS.AMAZON, MANUFACTURERS.XIAOMI];
    await ProductsActions.clickOnFilterButton();
    await ProductsActions.checkQuickFiltersAndClickApplyButton(quickFilters);
    const actualQuickFilters = (await ProductsActions.getListOfChipButtons(ProductsPage)).quickFilters;
    expect(quickFilters.every((filter) => actualQuickFilters!.includes(filter))).toBe(true);
    await ProductsAssertions.verifyTableData(ProductsPage);
  });

  it('Should verify table data after search with search value', async () => {
    await ProductsActions.fillSearchInput('app');
    await ProductsActions.clickOnSearchButton(ProductsPage);
    await ProductsAssertions.verifyElementText(ProductsPage['Chip buttons'], 'app');
    await ProductsAssertions.verifyTableData(ProductsPage);
  });

  it('Should verify table data after search with search value and filters', async () => {
    await ProductsActions.clickOnFilterButton();
    await ProductsActions.checkQuickFiltersAndClickApplyButton([MANUFACTURERS.TESLA]);
    await ProductsActions.fillSearchInput('6');
    await ProductsActions.clickOnSearchButton(ProductsPage);
    await ProductsAssertions.verifyTableData(ProductsPage);
  });

  it('check all filters', async () => {
    await ProductsActions.clickOnFilterButton();
    await FiltersModalActions.checkAllBoxesInFiltersModal(manufacturersArray);
    await FiltersModalActions.clickOnApplyButton();
    await ProductsActions.clickOnSearchButton(ProductsPage);
    await ProductsAssertions.verifyTableData(ProductsPage);
  });
});
