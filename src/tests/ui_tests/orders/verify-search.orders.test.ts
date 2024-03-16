import SignInActions from '../../../ui/actions/sign-in.actions.js';
import HomeActions from '../../../ui/actions/home.actions.js';
import OrdersActions from '../../../ui/actions/orders/orders.actions.js';
import OrdersPage from '../../../ui/pages/aqa_project/orders/orders.page.js';
import { ORDER_STATUSES, orderStatusesArray } from '../../../ui/types/order.types.js';
import OrdersAssertions from '../../../ui/assertions/orders_assertions/orders.assertions.js';
import FiltersModalActions from '../../../ui/actions/modals/filters-modal.actions.js';

describe('ORDERS - Search orders page test', () => {
  before('Up browser and open orders page', async () => {
    await SignInActions.openSalesPortal();
    await SignInActions.signIn();
    await HomeActions.openOrdersPage();
  });

  afterEach('Clear chips', async () => {
    await OrdersActions.clearQuickAndSearchFilterChips(OrdersPage, 'all');
  });

  it('Should verify table data after search with filters', async () => {
    const quickFilters = [ORDER_STATUSES.RECEIVED];
    await OrdersActions.clickOnFilterButton();
    await OrdersActions.checkQuickFiltersAndClickApplyButton(quickFilters);
    const actualQuickFilters = (await OrdersActions.getListOfChipButtons(OrdersPage)).quickFilters;
    expect(quickFilters.every((filter) => actualQuickFilters!.includes(filter))).toBe(true);
    await OrdersAssertions.verifyTableData(OrdersPage);
  });

  it('Should verify table data after search with search value', async () => {
    await OrdersActions.fillSearchInput('65e39');
    await OrdersActions.clickOnSearchButton(OrdersPage);
    await OrdersAssertions.verifyElementText(OrdersPage['Chip buttons'], '65e39');
    await OrdersAssertions.verifyTableData(OrdersPage);
  });

  it('Should verify table data after search with search value and filters', async () => {
    await OrdersActions.clickOnFilterButton();
    await OrdersActions.checkQuickFiltersAndClickApplyButton([ORDER_STATUSES.RECEIVED]);
    await OrdersActions.fillSearchInput('er');
    await OrdersActions.clickOnSearchButton(OrdersPage);
    await OrdersAssertions.verifyTableData(OrdersPage);
  });

  it('Check all filters', async () => {
    await OrdersActions.clickOnFilterButton();
    await FiltersModalActions.checkAllBoxesInFiltersModal(orderStatusesArray);
    await FiltersModalActions.clickOnApplyButton();
    await OrdersActions.clickOnSearchButton(OrdersPage);
    await OrdersAssertions.verifyTableData(OrdersPage);
  });
});
