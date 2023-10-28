import { BaseAssertions } from './base.assertions';
import CustomExpects from '../custome_expects/custome.expects';
import ProductsActions from '../actions/products/products.actions';
import { CommonPage } from '../pages/aqa_project/common.page';

export class CommonAssertions extends BaseAssertions {
  async verifyTableData(page: CommonPage) {
    let expected = await ProductsActions.getApiMappedData(page);
    const chipFilters = await ProductsActions.getListOfChipButtons(page);
    if (chipFilters) {
      expected = await ProductsActions.getTableDataAfterFilterAndSearch(expected, chipFilters);
    }
    const actual = await ProductsActions.getParsedTableData();
    await CustomExpects.expectToBe<number, number>({actual: actual.length, expected: expected.length,
      description: 'Verify amount of table data is equal to amount of data from server'});

    for (const obj of expected) {
      await CustomExpects.expectToContainEqual({actual: actual, expected: obj,
        description: 'Verify that data from server contain in table data'});
    }
  }

  async verifyDetailsModalData() {

  }
}


