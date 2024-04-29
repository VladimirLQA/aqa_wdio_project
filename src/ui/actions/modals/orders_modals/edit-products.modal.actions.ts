import { logAction } from '../../../../utils/reporter/allure.decorators.js';
import { editModalsPages } from '../../../pages/aqa_project/modals/orders_modals/edit-products.modal.page.js';
import BaseActions from '../../base.actions.js';

class ProductModalActions extends BaseActions {
  async changeProductInOrder(productToFind: string, productToSelect: string) {
    const dropdownId = await this.getElementID(
      editModalsPages['Edit products']['Products dropdown with name'](productToFind),
    );
    await this.chooseDropdownItem(
      editModalsPages['Edit products']['Products dropdown with id'](dropdownId),
      editModalsPages['Edit products']['Products dropdown option with dropdown id'](
        dropdownId,
        productToSelect,
      ),
    );
  }

  async clickOnDeleteProductButtonInEditProductsModal(productName: string) {
    const dropdownId = await this.getElementID(
      editModalsPages['Edit products']['Products dropdown with name'](productName),
    );
    await this.basePage.click(
      editModalsPages['Edit products']['Delete product button with id'](dropdownId),
    );
  }

  @logAction('Click on "Save" button in "Edit products" modal')
  async clickOnSaveButton() {
    await this.basePage.click(editModalsPages['Edit products']['Save button']);
  }

  @logAction('Click on "Cancel" button in "Edit products" modal')
  async clickOnCancelButton() {
    await this.basePage.click(editModalsPages['Edit products']['Cancel button']);
  }
}

export default new ProductModalActions();
