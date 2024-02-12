import { logAction } from '../../../utils/reporter/allure.reporter.js';
import OrderDetailsPage from '../../pages/aqa_project/orders/order-details.page.js';
import Utils from '../../../utils/helpers.js';
import BaseActions from '../base.actions.js';
import CustomerModalActions from '../modals/orders_modals/edit-customer.modal.actions.js';
import ProductModalActions from '../modals/orders_modals/edit-products.modal.actions.js';

class CustomerProductsActions extends BaseActions {
  public readonly editCustomerModal = CustomerModalActions;
  public readonly editProductModal = ProductModalActions;

  @logAction('Click on customer details pencil button')
  async clickOnCustomerDetailsPencilbutton() {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage.orderSection['Customer']['Edit customer pencil button']);
  }

  @logAction('Click on products pencil button')
  async clickOnProductsPencilbutton() {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage.orderSection['Products']['Edit products pencil button']);
  }

  @logAction('Click on "Receive" button')
  async clickOnReceiveButton() {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage.orderSection['Products']['Receive button']);
  }

  @logAction('Click on "Save" received products button')
  async clickOnSaveReceivedProductsButton() {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage.orderSection['Products']['Save received products button']);
  }

  @logAction('Click on "Cancel" receiving products button')
  async clickOnCancelReceivingProductsButton() {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage.orderSection['Products']['Cancel receiving products button']);
  }

  @logAction('Click on "Select all" checkbox')
  async clickOnSelectAllCheckbox() {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage.orderSection['Products']['Select all ckeckbox']);
  }

  @logAction('Click on checkbox with specified product name')
  async clickOnCheckboxWithSpecifiedProductName(productName: string) {
    await OrderDetailsPage.waitForElemAndClick(
      OrderDetailsPage.orderSection['Products']['Checkbox with specified product name'](productName),
    );
  }

  async clickOnAllAccordionButtonsInProductSection() {
    const buttons = await OrderDetailsPage.getArrayOfElements(OrderDetailsPage.orderSection['Products']['Accordion button']);
    for (let b of buttons) {
      b.click();
    }
    await Utils.browserPause(500);
  }

  async clickOnAccordionButtonByNameInProductSection(productName: string) {
    await OrderDetailsPage.waitForElemAndClick(
      OrderDetailsPage.orderSection['Products']['Accordion button with specified product name'](productName),
    );
  }
}

export default new CustomerProductsActions();
