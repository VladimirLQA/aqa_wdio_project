import { BaseActions } from '../../base.actions';
import DeleteProductModalPage from '../../../pages/aqa_project/products/modals/delete-product-modal.page';


class DeleteProductModalActions extends BaseActions {
  public async clickOnDeleteButton() {
    await DeleteProductModalPage.waitForElemAndClick(DeleteProductModalPage['Delete button']);
    await this.waitForPageLoad();
  }
}

export default new DeleteProductModalActions();