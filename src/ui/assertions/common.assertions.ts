import { BaseAssertions } from './base.assertions';
import CustomExpects from '../custome_expects/custome.expects';
import { CommonPage } from '../pages/aqa_project/common.page';
import { CommonActions } from '../actions/common.actions';
import { IProduct } from '../types/products.types';
import DetailsModalPage from '../pages/aqa_project/modals/details-modal.page';

export class CommonAssertions extends BaseAssertions {
  private commonActions: CommonActions = new CommonActions();

  async verifyTableData(page: CommonPage) {
    let expected = await this.commonActions.getApiMappedData(page);
    const chipFilters = await this.commonActions.getListOfChipButtons(page);
    if (chipFilters) {
      expected = await this.commonActions.getTableDataAfterFilterAndSearch(expected, chipFilters);
    }
    const actual = await this.commonActions.getParsedTableData();
    await CustomExpects.expectToBe<number, number>({actual: actual.length, expected: expected.length,
      description: 'Verify amount of table data is equal to amount of data from server'});

    for (const obj of expected) {
      await CustomExpects.expectToContainEqual({actual: actual, expected: obj,
        description: 'Verify that data from server contain in table data'});
    }
  }

  async verifyCreatedEntityInDetailModal(createdEntity: IProduct) {
    const actualEntity = await DetailsModalPage.getParsedDetailsData();
    for (const key in createdEntity) {
      if(key !== 'createdOn' && key !== '_id'){
        await CustomExpects.expectToBe({actual: actualEntity[key], expected: createdEntity[key],
        description: `Verify created entity value in details modal by key: "${key}"`});
      }
    }
  }

}


