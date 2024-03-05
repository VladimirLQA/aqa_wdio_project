// @ts-nocheck
import { ControllersList } from '../../api/controllers/contollers.index.js';
import { reqAsLoggedUser } from '../../api/request/request-as-logged-user.js';
import { asyncForEach, asyncReduce } from '../../utils/async_array_methods/array-async-methods.js';
import { logAction } from '../../utils/reporter/allure.reporter.js';
import { CommonPage } from '../pages/aqa_project/common.page.js';
import FilterModalPage from '../pages/aqa_project/modals/filter-modal.page.js';
import {
  ActionButtons,
  IChipsFilterOptions,
  UnionFilterModalLabels,
} from '../types/common.types.js';
import BaseActions from './base.actions.js';
import FiltersModalActions from './modals/filters-modal.actions.js';
import Utils from '../../utils/helpers.js';

export class CommonActions extends BaseActions {
  commonPage: CommonPage = new CommonPage();

  async getListOfChipButtons(page: CommonPage): Promise<IChipsFilterOptions> {
    const chips = await Promise.all(
      await this.commonPage.waitForElementsArray(page['Chip buttons']),
    );
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
    const data = (await reqAsLoggedUser(ControllersList[page.pageName].get, {})).data[
      Utils.capitalize(page.pageName)
    ];
    const res = await asyncReduce(
      data,
      // @ts-ignore
      async (result: any[], entity: { [key: string]: string }) => {
        if (entity['price']) entity['price'] = `$${entity.price}`;
        else if (entity['total_price']) entity['total_price'] = `$${entity.total_price}`;

        result.push(await Utils.apiKeyMapper(entity, page.pageName));
        return result;
      },
      [],
    );

    return res;
  }

  async getTableDataAfterFilterAndSearch(
    tableData: Record<string, string>[],
    chipFilters: IChipsFilterOptions,
  ) {
    const { search, quickFilters } = chipFilters;
    const filteredAndSearchedData: Record<string, string>[] = [];
    await asyncForEach(tableData, async (entity) => {
      const isMatchQuickFilter: boolean = quickFilters?.some((filter) =>
        Object.values(entity).at(-1)?.includes(filter),
      );
      const isMatchSearch: boolean = Object.values(entity).some((value) =>
        // @ts-ignore
        value.toLowerCase().includes(search?.toLowerCase()),
      );
      if (search && quickFilters?.length) {
        if (isMatchQuickFilter && isMatchSearch) filteredAndSearchedData.push(entity);
      } else if (search) {
        if (isMatchSearch) filteredAndSearchedData.push(entity);
      } else if (quickFilters?.length) {
        if (isMatchQuickFilter) filteredAndSearchedData.push(entity);
      }
    });
    return filteredAndSearchedData;
    // const { search, quickFilters } = chipFilters;
    // const searchedAndFiltered = tableData.reduce((result, entiti) => {
    //   if (search && quickFilters && quickFilters.length) {
    //     if (
    //       Object.values(entiti).some((v) => v.toLowerCase().includes(search.toLowerCase())) &&
    //       quickFilters.includes(Object.values(entiti).at(-1))
    //     ) {
    //       result.push(entiti);
    //     }
    //   } else if (search) {
    //     if (Object.values(entiti).some((v) => v.toLowerCase().includes(search.toLowerCase()))) {
    //       result.push(entiti);
    //     }
    //   } else if (quickFilters && quickFilters.length) {
    //     console.log('if quickFilters, entiti values', Object.values(entiti).at(-1));
    //     if (quickFilters.includes(Object.values(entiti).at(-1))) {
    //       result.push(entiti);
    //     }
    //   }
    //   return result;
    // }, []);
    // return searchedAndFiltered;
  }
  // const { search, quickFilters } = chipFilters;
  // const filteredAndSearchedData: Record<string, string>[] = [];
  // await asyncForEach(tableData, async (entity) => {
  //   const isMatchQuickFilter: boolean = quickFilters?.some((filter) =>
  //     Object.values(entity).at(-1)?.includes(filter),
  //   );
  //   const isMatchSearch: boolean = Object.values(entity).some((value) =>
  //     // @ts-ignore
  //     value.toLowerCase().includes(search?.toLowerCase()),
  //   );
  //   if (search && quickFilters?.length) {
  //     if (isMatchQuickFilter && isMatchSearch) filteredAndSearchedData.push(entity);
  //   } else if (search) {
  //     if (isMatchSearch) filteredAndSearchedData.push(entity);
  //   } else if (quickFilters?.length) {
  //     if (isMatchQuickFilter) filteredAndSearchedData.push(entity);
  //   }
  // });
  // return filteredAndSearchedData;
  // }

  async getParsedTableData() {
    return (await this.basePage.browserExecute(` 
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
  `)) as Promise<[]>;
  }

  async clickOnFilterButton() {
    await this.basePage.click(this.commonPage['Filter button']);
  }

  async clearQuickAndSearchFilterChips(
    page: CommonPage,
    chipsToClose: 'search' | 'quick filters' | 'all',
  ) {
    const chips = await Promise.all(
      await this.commonPage.waitForElementsArray(page['Chip buttons']),
    );
    await asyncForEach(chips, async (chip) => {
      const actualFilters = await chip.getAttribute(`data-chip-${page.pageName}`);

      if (chipsToClose === 'all') await chip.$(page['Chip close button']).click();

      if (chipsToClose === 'search')
        if (actualFilters === 'search') await chip.$(page['Chip close button']).click();

      if (chipsToClose === 'quick filters')
        if (actualFilters !== 'search') await chip.$(page['Chip close button']).click();
    });
  }

  async checkQuickFiltersAndClickApplyButton(quickFilters: UnionFilterModalLabels[]) {
    await FiltersModalActions.checkFiltersBox(FilterModalPage, quickFilters);
    await FiltersModalActions.clickOnApplyButton();
  }

  async clickOnSearchButton(page: CommonPage) {
    await this.basePage.click(this.commonPage['Search button'](page.pageName));
  }

  async fillSearchInput(searchValue: string) {
    await this.basePage.setValue(this.commonPage['Search input'], searchValue);
  }

  async clickOnRowActionButton(value: string, action: ActionButtons) {
    await this.basePage.click(this.commonPage['Table row action button'](value, action));
  }

  async clickOnEditActionButton(value: string) {
    await this.clickOnRowActionButton(value, 'Edit');
    await this.waitForPageLoad();
  }

  async clickOnDeleteActionButton(value: string) {
    await this.clickOnRowActionButton(value, 'Delete');
    await this.waitForPageLoad();
  }

  async clickOnDetailsActionButton(value: string) {
    await this.clickOnRowActionButton(value, 'Details');
    await this.waitForPageLoad();
  }
}
