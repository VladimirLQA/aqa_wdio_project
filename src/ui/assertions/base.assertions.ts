import BaseActions from '../actions/base.actions';
import PageHandler from '../pages/aqa_project/page-handler.page';
import BasePage from '../pages/aqa_project/base.page';

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
}
