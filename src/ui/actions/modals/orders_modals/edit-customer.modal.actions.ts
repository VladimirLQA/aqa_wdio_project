import { logAction } from '../../../../utils/reporter/allure.reporter.js';
import { editModalsPages } from '../../../pages/aqa_project/modals/orders_modals/edit-products.modal.page.js';
import BaseActions from '../../base.actions.js';

class CustomerModalActions extends BaseActions {
  @logAction('Click on "Save" button in "Edit customer" modal')
  async clickOnSaveButton() {
    await editModalsPages['Edit customer'].waitForElemAndClick(editModalsPages['Edit customer']['Save button']);
  }

  @logAction('Click on "Cancel" button in "Edit customer" modal')
  async clickOnCancelButton() {
    await editModalsPages['Edit customer'].waitForElemAndClick(editModalsPages['Edit customer']['Cancel button']);
  }
}

export default new CustomerModalActions();
