import BaseActions from './base.actions';
import { IChipsFilterOptions } from '../types/common.types';
import { CommonPage } from '../pages/aqa_project/common.page';
import { elementFinder } from '../../utils/element-finder';
import { asyncForEach, asyncReduce } from '../../utils/async_array_methods/array-async-methods';
import { reqAsLoggedUser } from '../../api/request/request-as-logged-user';
import ControllersList from '../../api/controllers/contollers.index';
import { apiKeyMapper, capitalize } from '../../utils/helpers';

export class CommonActions extends BaseActions {

  async getListOfChipButtons(page: CommonPage): Promise<IChipsFilterOptions> {
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

  async getApiMappedData(page: CommonPage) {
    const data = (await reqAsLoggedUser(ControllersList[page.pageName].get, {})).data[capitalize(page.pageName)];
    const res = await asyncReduce(data, async (result, entity) => {
      if (entity['price']) entity['price'] = `$${entity.price}`;

      result.push(await apiKeyMapper(entity, page.pageName));
      return result;
    }, []);

    return res;
  }

  async getTableDataAfterFilterAndSearch(tableData: Record<string, string>[], chipFilters: IChipsFilterOptions) {
    const { search, quickFilters } = chipFilters;
    const filteredAndSearchedData = [];
    await asyncForEach(tableData, async (entity) => {
      const isMatchQuickFilter = quickFilters?.some(filter => Object.values(entity).at(-1).includes(filter));
      const isMatchSearch = Object.values(entity).some((value => value.toLowerCase().includes(search?.toLowerCase())));

      if (search && quickFilters?.length) {
        if (isMatchQuickFilter && isMatchSearch) filteredAndSearchedData.push(entity);

      } else if (search) {
        if (isMatchSearch) filteredAndSearchedData.push(entity);

      } else if (quickFilters?.length) {
        if (isMatchQuickFilter) filteredAndSearchedData.push(entity);
      }
    });
    return filteredAndSearchedData;
  }

}