import Utils from '../../utils/helpers.js';
import { logAction } from '../../utils/reporter/allure.reporter.js';
import BasePage from '../pages/aqa_project/base.page.js';

export default class BaseActions {
  basePage: BasePage = new BasePage();

  @logAction('Wait for page is loaded')
  async waitForPageLoad() {
    try {
      await this.basePage.waitForElement(this.basePage['Spinner'], true);
    } catch (error) {
      throw new Error(`Error while waiting page load`);
    }
  }

  @logAction('Open "Sales portal"')
  async openSalesPortal() {
    try {
      await browser.url('https://anatoly-karpovich.github.io/aqa-course-project/#');
      await browser.maximizeWindow();
    } catch (error) {
      throw new Error(`Error while opening "Sales portal"`);
    }
  }

  @logAction('Get token from browser cookies')
  async getToken() {
    const token = (await browser.getCookies('Authorization'))[0].value;
    return token;
  }

  async closeToastMessage() {
    await this.basePage.click(this.basePage['Toast close button']);
  }

  async getCssProperty(element: string, cssProperty: string) {
    const property = await this.basePage.getElementCssProperty(element, cssProperty);
    return property;
  }

  async getElementID(elementSelector: string) {
    const id = await this.basePage.getElementAttribute(elementSelector, 'id');
    return id;
  }

  @logAction('Choose dropdown option {optionSelector} in dropdown with selector {selector}')
  async chooseDropdownItem(dropdownSelector: string, optionSelector: string) {
    await this.basePage.click(dropdownSelector);
    await Utils.browserPause(200);
    await this.basePage.click(optionSelector);
  }

  @logAction('Enable button with selector {selector}')
  async enableButton(selector: string) {
    return this.basePage.browserExecute(`$('button${selector}').removeAttr("disabled")`);
  }

  async fillInputField(inputField: string, inputValue: string | number) {
    await this.basePage.setValue(inputField, inputValue);
  }
}
