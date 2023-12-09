import { CommonActions } from '../actions/common.actions';
import { CommonPage } from '../pages/aqa_project/common.page';
import DetailsModalPage from '../pages/aqa_project/modals/details-modal.page';
import { IProduct } from '../types/products.types';
import { BaseAssertions } from './base.assertions';

export class CommonAssertions extends BaseAssertions {
  private commonActions: CommonActions = new CommonActions();

  async verifyTableData(page: CommonPage) {
    let expected = await this.commonActions.getApiMappedData(page);
    console.log('expected ========', expected);
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

  async verifyCreatedEntityInDetailModal(createdEntity: IProduct) {
    const actualEntity = await DetailsModalPage.getParsedDetailsData();
    for (const key in createdEntity) {
      if (key !== 'createdOn' && key !== '_id') {
        expect(actualEntity[key]).toBe(createdEntity[key].toString());
      }
    }
  }
}
