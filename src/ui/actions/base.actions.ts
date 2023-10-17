import  BasePage  from '../pages/aqa_project/base.page';
import { elementFinder } from '../../utils/element-finder';
import { browserPause } from '../../utils/helpers';

export class BaseActions {
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

  async closeModalWindow() {
    await this.basePage.waitForElemAndClick(this.basePage['Modal close button']);
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
}
