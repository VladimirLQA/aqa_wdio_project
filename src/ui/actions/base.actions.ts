import BasePage from '../pages/aqa_project/base.page';
import { elementFinder } from '../../utils/element-finder';
import { browserPause } from '../../utils/helpers';


export default class BaseActions {
  public basePage: BasePage;
  constructor() {
    this.basePage = new BasePage();
  }

  // @logAction('Wait for page loading')
  public async waitForPageLoad() {
    const spinner = await elementFinder.findElement(this.basePage['Spinner']);
    await spinner.waitForDisplayed({ reverse: true });
  }

  // @logAction('Open "Sales portal"')
  public async openSalesPortal() {
    await browser.url('https://anatoly-karpovich.github.io/aqa-course-project/?#');
    await browser.maximizeWindow();
  }

  // @logAction('Get token from browser cookies')
  public async getToken() {
    const token = (await browser.getCookies('Authorization'))[0].value;
    return token;
  }

  // @logAction('Close toast')
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
          entities.push(Object.assign(...columnNames.map((k, i) => ({[k]: values[i]})))); 
        }
      }); 
      return entities; 
  `) as Promise<[]>;
  }

  public async enableButton(selector: string) {
    return browser.execute(`$('button${selector}').removeAttr("disabled")`);
  }

}
