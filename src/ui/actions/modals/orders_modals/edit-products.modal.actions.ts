import { logAction } from '../../../../utils/reporter/allure.reporter.js';
import { editModalsPages } from '../../../pages/aqa_project/modals/orders_modals/edit-products.modal.page.js';
import OrderDetailsPage from '../../../pages/aqa_project/orders/order-details.page.js';
import BaseActions from '../../base.actions.js';

class ProductModalActions extends BaseActions {
  async getDropdownByProductName(productName: string) {}

  // TODO first take dropdown id than change products
  async changeProductInOrder(productToFind: string, productToSelect: string) {
    await this.chooseDropdownItem(
      editModalsPages['Edit products']['Products dropdown with name'](productToFind),
      editModalsPages['Edit products']['Dropdown option'](productToSelect),
    );
  }

  @logAction('Click on "Save" button in "Edit products" modal')
  async clickOnSaveButton() {
    await editModalsPages['Edit products'].waitForElemAndClick(editModalsPages['Edit products']['Save button']);
  }

  @logAction('Click on "Cancel" button in "Edit products" modal')
  async clickOnCancelButton() {
    await editModalsPages['Edit products'].waitForElemAndClick(editModalsPages['Edit products']['Cancel button']);
  }
}

export default new ProductModalActions();
