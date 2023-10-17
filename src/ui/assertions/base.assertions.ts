import { BaseActions } from '../actions/base.actions';
import  PageHandler from '../pages/aqa_project/page-handler.page';
import  BasePage  from '../pages/aqa_project/base.page';

export class BaseAssertions {
  public pageHandler: PageHandler = new PageHandler();
  public basePage: BasePage = new BasePage();
  public baseActions: BaseActions = new BaseActions();

  public async verifyElementText(selector: string, text: string) {
    const actual = await this.pageHandler.waitForElemAndGetText(selector);
    expect(actual).toBe(text);
  }
}
