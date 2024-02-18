import { logAction } from '../../../utils/reporter/allure.reporter.js';
import Utils from '../../../utils/helpers.js';
import BaseActions from '../base.actions.js';
import CustomerModalActions from '../modals/orders_modals/edit-customer.modal.actions.js';
import ProductModalActions from '../modals/orders_modals/edit-products.modal.actions.js';
import { orderSections } from '../../pages/aqa_project/orders/order-products-customer-sections.page.js';

class CustomerProductsActions extends BaseActions {
  public readonly editCustomerModal = CustomerModalActions;
  public readonly editProductModal = ProductModalActions;

  @logAction('Click on customer details pencil button')
  async clickOnCustomerDetailsPencilbutton() {
    await orderSections['Customer'].click(orderSections['Customer']['Edit customer pencil button']);
  }

  @logAction('Click on products pencil button')
  async clickOnProductsPencilbutton() {
    await orderSections['Products'].click(orderSections['Products']['Edit products pencil button']);
  }

  @logAction('Click on "Receive" button')
  async clickOnReceiveButton() {
    await orderSections['Products'].click(orderSections['Products']['Receive button']);
  }

  @logAction('Click on "Save" received products button')
  async clickOnSaveReceivedProductsButton() {
    await orderSections['Products'].click(orderSections['Products']['Save received products button']);
  }

  @logAction('Click on "Cancel" receiving products button')
  async clickOnCancelReceivingProductsButton() {
    await orderSections['Products'].click(orderSections['Products']['Cancel receiving products button']);
  }

  @logAction('Click on "Select all" checkbox')
  async clickOnSelectAllCheckbox() {
    await orderSections['Products'].click(orderSections['Products']['Select all ckeckbox']);
  }

  @logAction('Click on checkbox with specified product name')
  async clickOnCheckboxWithSpecifiedProductName(productName: string) {
    await orderSections['Products'].click(orderSections['Products']['Checkbox with specified product name'](productName));
  }

  @logAction('Click on all accordion buttons in product section')
  async clickOnAllAccordionButtonsInProductSection() {
    const buttons = await orderSections['Products'].waitForElementsArray(orderSections['Products']['Accordion button']);
    for (let b of buttons) {
      orderSections['Products'].click(b);
    }
    await Utils.browserPause(500);
  }

  @logAction('Click on accordion button in product section')
  async clickOnAccordionButtonByNameInProductSection(productName: string) {
    await orderSections['Products'].click(orderSections['Products']['Accordion button with specified product name'](productName));
  }
}

export default new CustomerProductsActions();
