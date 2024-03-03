import { logAction } from '../../../../utils/reporter/allure.reporter.js';
import CreateOrderModalPage from '../../../pages/aqa_project/modals/orders_modals/create-order.modal.page.js';
// import ModalActions from '../../modal.actions.js';
import BaseActions from '../../base.actions.js';

class CreateOrderModalActions extends BaseActions {
  @logAction('Click on "Add product" button')
  async clickOnAddProductButton() {
    await this.basePage.click(CreateOrderModalPage['Add product button']);
  }

  @logAction('Click on "Create" button')
  async clickOnCreateButton() {
    await this.basePage.click(CreateOrderModalPage['Create order button']);
  }

  @logAction('Click on "Cancel" button')
  async clickOnCancelButton() {
    await this.basePage.click(CreateOrderModalPage['Cancel button']);
  }

  @logAction('Click on "Delete" product button')
  async clickOnDeleteProductButtonFromList(dataId: string) {
    await this.basePage.click(CreateOrderModalPage['Delete product button'](dataId));
  }

  @logAction('Add products to order')
  async addProductsToOrder(products: string[]) {
    for (const [index, product] of products.entries()) {
      await this.chooseDropdownItem(
        CreateOrderModalPage['Products last dropdown'],
        this.basePage['Dropdown option [last()]'](product),
      );
      if (index !== products.length - 1) await this.clickOnAddProductButton();
    }
  }
}

export default new CreateOrderModalActions();
