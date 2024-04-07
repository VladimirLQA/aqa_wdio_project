import { CommonActions } from '../actions/common.actions.js';
import { CommonPage } from '../pages/aqa_project/common.page.js';
import DetailsModalPage from '../pages/aqa_project/modals/details-modal.page.js';
import { IProduct } from '../../types/products.types.js';
import { BaseAssertions } from './base.assertions.js';

export class CommonAssertions extends BaseAssertions {
  private commonActions: CommonActions = new CommonActions();

  async verifyTableData(page: CommonPage) {
    let expected = await this.commonActions.getApiMappedData(page);
    const chipFilters = await this.commonActions.getListOfChipButtons(page);
    if (chipFilters) {
      expected = await this.commonActions.getTableDataAfterFilterAndSearch(expected, chipFilters);
    }
    const actual = await this.commonActions.getParsedTableData();
    expect(actual.length).toBe(expected.length);

    for (const obj of expected) {
      expect(actual).toContainEqual(obj);
    }
  }

  async verifyCreatedEntityInDetailModal<T>(createdEntity: T) {
    const actualEntity = await DetailsModalPage.getParsedDetailsData();
    console.log('actualEntity', actualEntity);
    for (const key in createdEntity) {
      if (key !== 'createdOn' && key !== '_id') {
        expect(actualEntity[key]).toBe(String(createdEntity[key]));
      }
    }
  }
}
