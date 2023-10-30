import BaseActions from './base.actions';
import ModalPage from '../pages/aqa_project/modals/modal.page';

export default class ModalActions extends BaseActions {
  modalPage: ModalPage = new ModalPage();

  public async clickOnCloseModalButton() {
    await this.basePage.waitForElemAndClick(this.modalPage['Modal close button']);
  }
}