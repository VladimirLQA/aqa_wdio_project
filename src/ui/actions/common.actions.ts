import { ControllersList } from '../../api/controllers/contollers.index.js';
import { reqAsLoggedUser } from '../../api/request/request-as-logged-user.js';
import { asyncForEach, asyncReduce } from '../../utils/async_array_methods/array-async-methods.js';
import { elementFinder } from '../../utils/element-finder.js';
import { logAction } from '../../utils/reporter/allure.reporter.js';
import { CommonPage } from '../pages/aqa_project/common.page.js';
import FilterModalPage from '../pages/aqa_project/modals/filter-modal.page.js';
import { ActionButtons, IChipsFilterOptions, UnionFilterModalLabels } from '../types/common.types.js';
import BaseActions from './base.actions.js';
import FiltersModalActions from './modals/filters-modal.actions.js';
import Utils from '../../utils/helpers.js';

export class CommonActions extends BaseActions {
  commonPage: CommonPage = new CommonPage();

  async getListOfChipButtons(page: CommonPage): Promise<IChipsFilterOptions> {
    const chips = await Promise.all(await elementFinder.findArrayElements(page['Chip buttons']));
    const chipsFilters: IChipsFilterOptions = {
      quickFilters: [],
    };
    if (chips.length) {
      await asyncForEach(chips, async (chip) => {
        const actualFilters = await chip.getAttribute(`data-chip-${page.pageName}`);

        if (actualFilters === 'search') chipsFilters[actualFilters] = await chip.getText();
        else chipsFilters['quickFilters']?.push(await chip.getText());
      });
    }

    return chipsFilters;
  }

  async getApiMappedData(page: CommonPage) {
    const data = (await reqAsLoggedUser(ControllersList[page.pageName].get, {})).data[Utils.capitalize(page.pageName)];
    const res = await asyncReduce(
      data,
      async (result: any[], entity: { [key: string]: string }) => {
        if (entity['price']) entity['price'] = `$${entity.price}`;

        result.push(await Utils.apiKeyMapper(entity, page.pageName));
        return result;
      },
      [],
    );

    return res;
  }

  async getTableDataAfterFilterAndSearch(tableData: Record<string, string>[], chipFilters: IChipsFilterOptions) {
    const { search, quickFilters } = chipFilters;
    const filteredAndSearchedData: Record<string, string>[] = [];
    await asyncForEach(tableData, async (entity) => {
      const isMatchQuickFilter = quickFilters?.some((filter) => Object.values(entity).at(-1)!.includes(filter));
      // @ts-ignore
      const isMatchSearch = Object.values(entity).some((value) => value.toLowerCase().includes(search?.toLowerCase()));

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

  async getParsedTableData() {
    return browser.execute(` 
      const entities = []; 
      const columnNames = [...document.querySelectorAll('th')].reduce((res,e,i,arr) => {
        if(i < arr.length-2) res.push(e.innerText)
        return res;}, []);

      document.querySelectorAll('table > tbody > tr').forEach(i => {
        if(i.style.display !== 'none') {
          const values = [...i.querySelectorAll('td')].reduce((res,e,i,arr) => {
            if(i < arr.length-2) res.push(e.innerText)
            return res;}, []);
          entities.push(Object.assign(...columnNames.map((k, i) => ({[k]: values[i]})))); 
        }
      }); 
      return entities; 
  `) as Promise<[]>;
  }

  @logAction('Click on filters button')
  async clickOnFiltersButton() {
    await this.basePage.waitForElemAndClick(this.commonPage['Filter button']);
  }

  async clearQuickAndSearchFilterChips(page: CommonPage, chipsToClose: 'search' | 'quick filters' | 'all') {
    const chips = await Promise.all(await elementFinder.findArrayElements(page['Chip buttons']));
    await asyncForEach(chips, async (chip) => {
      const actualFilters = await chip.getAttribute(`data-chip-${page.pageName}`);

      if (chipsToClose === 'all') await chip.$(page['Chip close button']).click();

      if (chipsToClose === 'search') if (actualFilters === 'search') await chip.$(page['Chip close button']).click();

      if (chipsToClose === 'quick filters') if (actualFilters !== 'search') await chip.$(page['Chip close button']).click();
    });
  }

  @logAction('Check quick filters')
  async checkQuickFilters(quickFilters: UnionFilterModalLabels[]) {
    await this.clickOnFiltersButton();
    await FiltersModalActions.checkFiltersBox(FilterModalPage, quickFilters);
    await FiltersModalActions.clickOnApplyButton();
  }

  @logAction('Click on search button')
  async clickOnSearchButton(page: CommonPage) {
    await this.basePage.waitForElemAndClick(this.commonPage['Search button'](page.pageName));
  }

  @logAction('Fill search input')
  async fillSearchInput(searchValue: string) {
    await this.basePage.waitForElemAndSetValue(this.commonPage['Search input'], searchValue);
  }

  async clickOnRowActionButton(value: string, action: ActionButtons) {
    await this.basePage.waitForElemAndClick(this.commonPage['Table row action button'](value, action));
    await this.waitForPageLoad();
  }

  @logAction('Click on "edit" button in table')
  async clickOnEditActionButton(value: string) {
    await this.clickOnRowActionButton(value, 'Edit');
    await this.waitForPageLoad();
  }

  @logAction('Click on "delete" button in table')
  async clickOnDeleteActionButton(value: string) {
    await this.clickOnRowActionButton(value, 'Delete');
    await this.waitForPageLoad();
  }

  @logAction('Click on "details" button in table')
  async clickOnDetailsActionButton(value: string) {
    await this.clickOnRowActionButton(value, 'Details');
    await this.waitForPageLoad();
  }
}
