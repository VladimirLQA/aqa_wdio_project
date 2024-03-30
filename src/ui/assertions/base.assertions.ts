import BaseActions from '../actions/base.actions.js';
import BasePage from '../pages/aqa_project/base.page.js';
import Utils from '../../utils/utils.js';
import Expect from '../../utils/chai-expect/expect-collection.js';
import { asyncFind } from '../../utils/async_array_methods/array-async-methods.js';

export class BaseAssertions {
  basePage: BasePage = new BasePage();
  baseActions: BaseActions = new BaseActions();

  // encapsulation for actual values
  async verifyElementText(selector: WebdriverIO.Element | string, text: string) {
    const actual = await this.basePage.getText(selector);
    Expect.toEqual({ actual: actual, expected: text });
  }

  async verifyIsClickableButton(selector: string, expected: boolean) {
    const elem = await this.basePage.waitForElement(selector);
    const isClickable = await elem.isClickable();
    Expect.toEqual({ actual: isClickable, expected });
  }

  async verifyIsElementContainClass(selector: string, className: string, expected: boolean) {
    const elem = await this.basePage.waitForElement(selector);
    const classAttribute = await elem.getAttribute('class');
    const isContain = classAttribute.toLowerCase().includes(className);
    Expect.toEqual({ actual: isContain, expected });
  }

  async verifyAndCloseToast(text: string) {
    const notifications = await this.basePage.findArrayElements(this.basePage['Toast text']);
    const expectedNotification = await asyncFind<WebdriverIO.Element>(
      [...notifications],
      async (notification) => (await this.basePage.getText(notification)) === text,
    );
    if (!expectedNotification) throw new Error(`Toast message with text ${text} was not found`);

    const actualText = await this.basePage.getText(expectedNotification);
    Expect.toEqual({ actual: actualText, expected: text });
    await this.baseActions.closeToastMessage();
  }

  async verifyElementIsDisplayed(selector: string, expected: boolean) {
    const elem = await this.basePage.findElement(selector);
    const isVisible = await elem.isDisplayed();
    Expect.toEqual({ actual: isVisible, expected: expected });
  }

  async elementIsDisplayedAndContainText(selector: string, text: string): Promise<boolean> {
    await Utils.browserPause(500);
    const isVisible = await this.basePage.isDisplayed(selector);
    const actual = (await this.basePage.getText(selector)).trim();
    return isVisible && actual === text;
  }
}
