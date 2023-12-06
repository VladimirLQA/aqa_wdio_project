import FilterModalPage from '../../pages/aqa_project/modals/filter-modal.page';
import { UnionFilterModalLabels } from '../../types/common.types';
import ModalActions from '../modal.actions';

class FiltersModalActions extends ModalActions {
  async clickOnApplyButton() {
    await this.basePage.waitForElemAndClick(FilterModalPage['Apply button']);
  }

  async clickOnClearFiltersButton() {
    await this.basePage.waitForElemAndClick(FilterModalPage['Clear filters button']);
  }

  async checkAllBoxesInFiltersModal(labels: UnionFilterModalLabels[]) {
    await this.checkFiltersBox(FilterModalPage, labels);
  }

  async checkFiltersBox(modalSelector: typeof FilterModalPage, labels?: UnionFilterModalLabels[]) {
    for (const label of labels) {
      await this.basePage.waitForElemAndClick(modalSelector['Filter checkbox'](label));
    }
  }
}

export default new FiltersModalActions();
