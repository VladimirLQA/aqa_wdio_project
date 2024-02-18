import { logAction } from '../../../../utils/reporter/allure.reporter.js';
import CreateOrderModalPage from '../../../pages/aqa_project/modals/orders_modals/create-order.modal.page.js';
import ModalActions from '../../modal.actions.js';

class CreateOrderModalActions extends ModalActions {
  @logAction('Click on "Add product" button')
  async clickOnAddProductButton() {
    await CreateOrderModalPage.click(CreateOrderModalPage['Add product button']);
  }

  @logAction('Click on "Create" button')
  async clickOnCreateButton() {
    await CreateOrderModalPage.click(CreateOrderModalPage['Create order button']);
  }

  @logAction('Click on "Cancel" button')
  async clickOnCancelButton() {
    await CreateOrderModalPage.click(CreateOrderModalPage['Cancel button']);
  }

  @logAction('Click on "Delete" product button')
  async clickOnDeleteProductButtonFromList(dataId: string) {
    await CreateOrderModalPage.click(CreateOrderModalPage['Delete product button'](dataId));
  }

  @logAction('Add products to order')
  async addProductsToOrder(products: string[]) {
    for (const [index, product] of products.entries()) {
      await this.chooseDropdownItem(
        CreateOrderModalPage['Products last dropdown'],
        CreateOrderModalPage['Dropdown option [last()]'](product),
      );
      if (index !== products.length - 1) await this.clickOnAddProductButton();
    }
  }
}

export default new CreateOrderModalActions();
