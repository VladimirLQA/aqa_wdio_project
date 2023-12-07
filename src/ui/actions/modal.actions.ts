import { logAction } from '../../utils/reporter/allure.reporter';
import ModalPage from '../pages/aqa_project/modals/modal.page';
import BaseActions from './base.actions';

export default class ModalActions extends BaseActions {
  modalPage: ModalPage = new ModalPage();

  @logAction('Click on modal close button')
  public async clickOnCloseModalButton() {
    await this.basePage.waitForElemAndClick(this.modalPage['Modal close button']);
  }
}
