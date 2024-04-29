import { logAction } from '../../utils/reporter/allure.decorators.js';
import ModalPage from '../pages/aqa_project/modals/modal.page.js';
import BaseActions from './base.actions.js';

export default class ModalActions extends BaseActions {
  modalPage: ModalPage = new ModalPage();

  @logAction('Click on modal close button')
  public async clickOnCloseModalButton() {
    await this.basePage.click(this.modalPage['Modal close button']);
  }
}
