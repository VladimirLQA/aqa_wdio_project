import BaseActions from '../actions/base.actions';
import PageHandler from '../pages/aqa_project/page-handler.page';
import BasePage from '../pages/aqa_project/base.page';
import { TIMEOUT } from '../../utils/aqa_project_const';

export class BaseAssertions {
  public pageHandler: PageHandler = new PageHandler();
  public basePage: BasePage = new BasePage();
  public baseActions: BaseActions = new BaseActions();

  public async verifyElementText(selector: string, text: string) {
    const actual = await this.pageHandler.waitForElemAndGetText(selector);
    expect(actual).toBe(text);
  }

  public async isClickable(selector: string) {
    const elem = await this.pageHandler.waitForElement(selector);
    await elem.waitUntil(async () => {
      return await elem.isClickable();
    }, {
      timeout: TIMEOUT['5 seconds'],
      timeoutMsg: 'Element is not clickable after 5 seconds'
    });
  }
}
