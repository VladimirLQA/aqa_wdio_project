import BasePage from '../pages/aqa_project/base.page';
import { elementFinder } from '../../utils/element-finder';
import { browserPause, omit, sortByNameASC } from '../../utils/helpers';
import FiltersProductModalPage from '../pages/aqa_project/products/modals/filters-product-modal.page';
import { MANUFACTURERS } from '../../data/products/product.data';
import { asyncMap } from '../../utils/async_array_methods/array-async-methods';

export default class BaseActions {
  public basePage: BasePage = new BasePage();

  public async waitForPageLoad() {
    const spinner = await elementFinder.findElement(this.basePage['Spinner']);
    await spinner.waitForDisplayed({ reverse: true });
  }

  public async openSalesPortal() {
    await browser.url('https://anatoly-karpovich.github.io/aqa-course-project/?#');
    await browser.maximizeWindow();
  }

  public async getToken() {
    const token = (await browser.getCookies('Authorization'))[0].value;
    return token;
  }

  public async closeToastMessage() {
    await this.basePage.waitForElemAndClick(this.basePage['Toast close button']);
  }

  public async getCssProperty(element: string, cssProperty: string) {
    const elem = await this.basePage.waitForElement(element);
    const property = await elem.getCSSProperty(cssProperty);
    return property;
  }

  public async chooseDropdownItem(dropdown: string, item: string) {
    await this.basePage.waitForElemAndClick(dropdown);
    await browserPause(200);
    await this.basePage.waitForElemAndClick(item);
  }

  public async closeModalWindow() {
    await this.basePage.waitForElemAndClick(this.basePage['Modal close button']);
  }

  public async getParsedTableData() {
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
          entities.push(Object.assign(...columnNames.map((k, i) => ({[k.toLowerCase()]: values[i]})))); 
        }
      }); 
      return entities; 
  `) as Promise<[]>;
  }

  public async enableButton(selector: string) {
    return browser.execute(`$('button${selector}').removeAttr("disabled")`);
  }

  public async checkFiltersBox(labels: MANUFACTURERS[] = [MANUFACTURERS.SAMSUNG]) {
    for (const label of labels) {
      await this.basePage.waitForElemAndClick(FiltersProductModalPage['Filter checkbox'](label));
    }
  }

  public async filterAndSortProducts<T>(array: T[], uniqueValue: string) {
    const sorted: T[] = sortByNameASC<T>(array);
    return [...sorted].filter((product) => product.manufacturer === uniqueValue);
  }

  public async getParsedAPIData<T>(array: T[], uniqueValue: string) {
    const filtered = await this.filterAndSortProducts<T>(array, uniqueValue);
    return await asyncMap(filtered, async (product) => {
       return await omit(product, 'createdOn', '_id', 'notes', 'amount');
    });
  }
}
