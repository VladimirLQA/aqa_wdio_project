// import ModalActions from '../modal.actions.js';
import DeleteModalPage from '../../pages/aqa_project/modals/delete-modal.page.js';
import BaseActions from '../base.actions';

class DeleteProductModalActions extends BaseActions {
  public async clickOnDeleteButton() {
    await this.basePage.click(DeleteModalPage['Delete button']);
    await this.waitForPageLoad();
  }
}

export default new DeleteProductModalActions();
