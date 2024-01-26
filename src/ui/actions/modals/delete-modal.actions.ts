import ModalActions from '../modal.actions.js';
import DeleteModalPage from '../../pages/aqa_project/modals/delete-modal.page.js';

class DeleteProductModalActions extends ModalActions {
  public async clickOnDeleteButton() {
    await DeleteModalPage.waitForElemAndClick(DeleteModalPage['Delete button']);
    await this.waitForPageLoad();
  }
}

export default new DeleteProductModalActions();
