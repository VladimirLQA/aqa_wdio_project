import BaseActions from '../../base.actions';
import FiltersProductModalPage from '../../../pages/aqa_project/products/modals/filters-product-modal.page';
import { manufacturersArray } from '../../../../data/products/product.data';

class FiltersProductModalActions extends BaseActions {
  public async clickOnApplyButton() {
    await this.basePage.waitForElemAndClick(FiltersProductModalPage['Apply button']);
  }

  public async clickOnClearFiltersButton() {
    await this.basePage.waitForElemAndClick(FiltersProductModalPage['Clear filters button']);
  }

  public async checkAllBoxesInFiltersModal() {
    await this.checkFiltersBox(manufacturersArray);
  }
}

export default new FiltersProductModalActions();
