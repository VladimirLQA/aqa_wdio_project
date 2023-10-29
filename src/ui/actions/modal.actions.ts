import BaseActions from './base.actions';

export default class ModalActions extends BaseActions {
  public async clickOnCloseModalButton() {
    await this.basePage.waitForElemAndClick(this.basePage['Modal close button']);
  }
}