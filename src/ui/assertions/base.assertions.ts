import BaseActions from '../actions/base.actions.js';
import PageHandler from '../pages/aqa_project/page-handler.page.js';
import BasePage from '../pages/aqa_project/base.page.js';
import Utils from '../../utils/helpers.js';

export class BaseAssertions {
  pageHandler: PageHandler = new PageHandler();
  basePage: BasePage = new BasePage();
  baseActions: BaseActions = new BaseActions();

  async verifyElementText(selector: string, text: string) {
    const actual = await this.pageHandler.waitForElemAndGetText(selector);
    expect(actual).toBe(text);
  }

  async verifyClickableButton(selector: string, expected: boolean) {
    const elem = await this.pageHandler.waitForElement(selector);
    const isClickable = await elem.waitUntil(async () => {
      return await elem.isClickable();
    });
    expect(isClickable).toBe(expected);
  }

  async verifyContainClass(selector: string, className: string, expected: boolean) {
    const elem = await this.pageHandler.waitForElement(selector);
    const classAttribute = await elem.getAttribute('class');
    const isContain = classAttribute.toLowerCase().includes(className);
    expect(isContain).toBe(expected);
  }

  public async verifyInputField(
    borderColorActual: string,
    borderColorExpected: string,
    messageActual?: string,
    messageExpected?: string,
  ) {
    expect(borderColorActual).toBe(borderColorExpected);
    if (messageActual && messageExpected) {
      expect(messageActual).toBe(messageExpected);
    }
  }

  public async verifyToastMessage(text: string) {
    await this.verifyElementText(this.basePage['Toast text'], text);
    await this.baseActions.closeToastMessage();
    await Utils.browserPause(300);
  }
}
