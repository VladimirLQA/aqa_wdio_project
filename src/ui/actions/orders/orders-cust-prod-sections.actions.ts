import { logAction } from '../../../utils/reporter/allure.decorators.js';
import Utils from '../../../utils/utils.js';
import BaseActions from '../base.actions.js';
import CustomerModalActions from '../modals/orders_modals/edit-customer.modal.actions.js';
import ProductModalActions from '../modals/orders_modals/edit-products.modal.actions.js';
import { orderSection } from '../../pages/aqa_project/orders/order-products-customer-sections.page.js';

class CustomerProductsActions extends BaseActions {
  public readonly editCustomerModal = CustomerModalActions;
  public readonly editProductModal = ProductModalActions;

  @logAction('Click on customer details pencil button')
  async clickOnCustomerDetailsPencilButton() {
    await this.basePage.click(orderSection['Customer']['Edit customer pencil button']);
  }

  @logAction('Click on products pencil button')
  async clickOnProductsDetailsPencilButton() {
    await this.basePage.click(orderSection['Products']['Edit products pencil button']);
  }

  @logAction('Click on "Receive" button')
  async clickOnReceiveButton() {
    await this.basePage.click(orderSection['Products']['Receive button']);
  }

  @logAction('Click on "Save" received products button')
  async clickOnSaveReceivedProductsButton() {
    await this.basePage.click(orderSection['Products']['Save received products button']);
  }

  @logAction('Click on "Cancel" receiving products button')
  async clickOnCancelReceivingProductsButton() {
    await this.basePage.click(orderSection['Products']['Cancel receiving products button']);
  }

  @logAction('Click on "Select all" checkbox')
  async clickOnSelectAllCheckbox() {
    await this.basePage.click(orderSection['Products']['Select all ckeckbox']);
  }

  @logAction('Click on checkbox with specified product name')
  async clickOnCheckboxWithSpecifiedProductName(productName: string) {
    await this.basePage.click(
      orderSection['Products']['Checkbox with specified product name'](productName),
    );
  }

  @logAction('Click on all accordion buttons in product section')
  async clickOnAllAccordionButtonsInProductSection() {
    const buttons = await this.basePage.waitForElementsArray(
      orderSection['Products']['Accordion button'],
    );
    for (let b of buttons) {
      await this.basePage.click(b);
    }
    await Utils.browserPause(500);
  }

  @logAction('Click on accordion button in product section')
  async clickOnAccordionButtonByNameInProductSection(productName: string) {
    await this.basePage.click(
      orderSection['Products']['Accordion button with specified product name'](productName),
    );
  }
}

export default new CustomerProductsActions();
