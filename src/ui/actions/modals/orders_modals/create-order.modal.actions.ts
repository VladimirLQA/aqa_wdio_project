import ModalActions from '../../modal.actions';
import CreateOrderModalPage from '../../../pages/aqa_project/modals/orders_modals/create-order.modal.page';
import { logAction } from '../../../../utils/reporter/allure.reporter';

class CreateOrderModalActions extends ModalActions {
  @logAction('Click on "Add product" button')
  async clickOnAddProductButton() {
    await CreateOrderModalPage.waitForElemAndClick(CreateOrderModalPage['Add product button']);
  }

  @logAction('Click on "Create" button')
  async clickOnCreateButton() {
    await CreateOrderModalPage.waitForElemAndClick(CreateOrderModalPage['Create order button']);
  }

  @logAction('Click on "Cancel" button')
  async clickOnCancelButton() {
    await CreateOrderModalPage.waitForElemAndClick(CreateOrderModalPage['Cancel button']);
  }

  @logAction('Click on "Delete" product button')
  async clickOnDeleteProductButtonFromList(dataId: string) {
    await CreateOrderModalPage.waitForElemAndClick(CreateOrderModalPage['Delete product button'](dataId));
  }
}

export default new CreateOrderModalActions();
