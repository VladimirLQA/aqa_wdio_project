import ModalActions from '../../modal.actions';
import CreateOrderModalPage from '../../../pages/aqa_project/modals/orders_modals/create-order.modal.page';
import { logAction } from '../../../../utils/reporter/allure.reporter';

class CreateOrderModalActions extends ModalActions {
  @logAction('Click on customer dropdown')
  async clickOnCustomerDropdown() {
    await this.basePage.waitForElemAndClick(CreateOrderModalPage['Customer dropdown']);
  }

  @logAction('Click on customer in dropdown list')
  async clickOnCustomerFromDropdownList(customerName: string) {
    await this.basePage.waitForElemAndClick(CreateOrderModalPage['Dropdown option'](customerName));
  }

  @logAction('Click on products dropdown')
  async clickOnProductsDropdown() {
    await this.basePage.waitForElemAndClick(CreateOrderModalPage['Products dropdown']);
  }

  @logAction('Click on product in dropdown list')
  async clickOnProductFromDropdownList(product: string) {
    await this.basePage.waitForElemAndClick(CreateOrderModalPage['Dropdown option'](product));
  } 
  
  @logAction('Click on "Add product" button')
  async clickOnAddProductButton() {
    await this.basePage.waitForElemAndClick(CreateOrderModalPage['Add product button']);
  }

  @logAction('Click on "Create" button')
  async clickOnCreateButton() {
    await this.basePage.waitForElemAndClick(CreateOrderModalPage['Create order button']);
  }

  @logAction('Click on "Cancel" button')
  async clickOnCancelButton() {
    await this.basePage.waitForElemAndClick(CreateOrderModalPage['Cancel button']);
  }

  @logAction('Click on "Delete" product button')
  async clickOnDeleteProductButtonFromList(dataId: string) {
    await this.basePage.waitForElemAndClick(CreateOrderModalPage['Delete product button'](dataId));
  }
}

export default new CreateOrderModalActions();
