import BasePage from '../pages/aqa_project/base.page';
import { elementFinder } from '../../utils/element-finder';
import { browserPause } from '../../utils/helpers';
import { logAction } from '../../utils/reporter/allure.reporter';

export default class BaseActions {
  public basePage: BasePage;

  constructor() {
    this.basePage = new BasePage();
  }

  @logAction('Wait for page loading')
  async waitForPageLoad() {
    const spinner = await elementFinder.findElement(this.basePage['Spinner']);
    await spinner.waitForDisplayed({ reverse: true });
  }

  @logAction('Open "Sales portal"')
  async openSalesPortal() {
    await browser.url('https://anatoly-karpovich.github.io/aqa-course-project/#');
    await browser.maximizeWindow();
  }

  @logAction('Get token from browser cookies')
  async getToken() {
    const token = (await browser.getCookies('Authorization'))[0].value;
    return token;
  }

  @logAction('Click on toast close button')
  async closeToastMessage() {
    await this.basePage.waitForElemAndClick(this.basePage['Toast close button']);
  }

  async getCssProperty(element: string, cssProperty: string) {
    const elem = await this.basePage.waitForElement(element);
    const property = await elem.getCSSProperty(cssProperty);
    return property;
  }

  async chooseDropdownItem(dropdown: string, item: string) {
    await this.basePage.waitForElemAndClick(dropdown);
    await browserPause(200);
    await this.basePage.waitForElemAndClick(item);
  }

  async enableButton(selector: string) {
    return browser.execute(`$('button${selector}').removeAttr("disabled")`);
  }
}
