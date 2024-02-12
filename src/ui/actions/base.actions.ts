import { property } from 'lodash';
import { elementFinder } from '../../utils/element-finder.js';
import Utils from '../../utils/helpers.js';
import { logAction } from '../../utils/reporter/allure.reporter.js';
import BasePage from '../pages/aqa_project/base.page.js';

export default class BaseActions {
  public basePage: BasePage;

  constructor() {
    this.basePage = new BasePage();
  }

  @logAction('Wait for page is loaded')
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

  async getElementID(element: string) {
    const elem = await this.basePage.waitForElement(element);
    const id = await elem.getAttribute('id');
    return id;
  }

  async chooseDropdownItem(dropdown: string, item: string) {
    await this.basePage.waitForElemAndClick(dropdown);
    await Utils.browserPause(200);
    await this.basePage.waitForElemAndClick(item);
  }

  @logAction('Enable button')
  async enableButton(selector: string) {
    return browser.execute(`$('button${selector}').removeAttr("disabled")`);
  }

  async fillInputField(inputField: string, inputValue: string | number) {
    await this.basePage.waitForElemAndSetValue(inputField, inputValue);
  }
}
