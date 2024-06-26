import FilterModalPage from '../../pages/aqa_project/modals/filter-modal.page.js';
import { UnionFilterModalLabels } from '../../../types/common.types.js';
import BaseActions from '../base.actions.js';

class FiltersModalActions extends BaseActions {
  async clickOnApplyButton() {
    await this.basePage.click(FilterModalPage['Apply button']);
  }

  async clickOnClearFiltersButton() {
    await this.basePage.click(FilterModalPage['Clear filters button']);
  }

  async checkAllBoxesInFiltersModal(labels: UnionFilterModalLabels[]) {
    await this.checkFiltersBox(FilterModalPage, labels);
  }

  async checkFiltersBox(modalSelector: typeof FilterModalPage, labels: UnionFilterModalLabels[]) {
    for (const label of labels) {
      await this.basePage.click(modalSelector['Filter checkbox'](label));
    }
  }
}

export default new FiltersModalActions();
