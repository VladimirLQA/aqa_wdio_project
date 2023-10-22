import BaseActions from './base.actions';
import { IChipsFilterOptions, UnionFilterModalLabels } from '../types/common.types';
import FiltersModalPage from '../pages/aqa_project/products/modals/filters-product-modal.page';
import CommonPage from '../pages/aqa_project/common.page';
import { elementFinder } from '../../utils/element-finder';
import { asyncForEach, asyncReduce } from '../../utils/async_array_methods/array-async-methods';
import { reqAsLoggedUser } from '../../api/request/request-as-logged-user';
import ControllersList from '../../api/controllers/contollers-list';
import { apiKeyMapper, capitalize } from '../../utils/helpers';

class CommonActions extends BaseActions {
  public async checkFiltersBox(modalSelector: FiltersModalPage, labels: UnionFilterModalLabels[]) {
    for (const label of labels) {
      await this.basePage.waitForElemAndClick(modalSelector['Filter checkbox'](label));
    }
  }

  public async getListOfChipButtons<T>(page: T): Promise<IChipsFilterOptions> {
    const chips = await elementFinder.findArrayElements(CommonPage['Chip buttons']);
    if (chips.length) {
      const chipsFilters: IChipsFilterOptions = {
        quickFilters: [],
      };
      await asyncForEach(chips, async (chip) => {
        const actualFilters = await chip.getAttribute(`data-chip-${page.pageName}`);
        if (actualFilters === 'search') chipsFilters[actualFilters] = await chip.getText();
        else chipsFilters['quickFilters']?.push(await chip.getText());
      });
      return chipsFilters;
    }
  }

  public async getApiMappedData<T>(page: T) {
    const data = (await reqAsLoggedUser(ControllersList[page.pageName].get, {})).data[capitalize(page.pageName)];
    const res = await asyncReduce(data, async (result, entity) => {
      if (entity['price']) entity['price'] = `$${entity.price}`;

      result.push(await apiKeyMapper(entity, page.pageName));
      return result;
    }, []);

    return res;
  }

  public async getTableDataAfterFilterAndSearch(tableData: Record<string, string>[], chipFilters: IChipsFilterOptions) {
    const { search, quickFilters } = chipFilters;
    const filteredAndSearchedData = [];
    await asyncForEach(tableData, async (entity) => {
      const isMatchQuickFilter = quickFilters?.some(filter => Object.values(entity).at(-1).includes(filter));
      const isMatchSearch = Object.values(entity).some((value => value.toLowerCase().includes(search?.toLowerCase())));

      if (search && quickFilters && quickFilters.length) {
        if (isMatchQuickFilter && isMatchSearch) filteredAndSearchedData.push(entity);

      } else if (search) {
        if (isMatchSearch) filteredAndSearchedData.push(entity);

      } else if (quickFilters && quickFilters.length) {
        if (isMatchQuickFilter) filteredAndSearchedData.push(entity);
      }
    });
    return filteredAndSearchedData;
  }

  public async verifyTableData<T>(page: T) {
    let expected = await this.getApiMappedData(page);
    const chipFilters = await this.getListOfChipButtons(page);
    if (chipFilters) {
      expected = await this.getTableDataAfterFilterAndSearch(expected, chipFilters);
    }
    const actual = await this.getParsedTableData();
    expect(actual.length).toBe(expected.length);
    for (const obj of expected) {
      expect(actual).toContainEqual(obj);
    }
  }

}

export default new CommonActions();