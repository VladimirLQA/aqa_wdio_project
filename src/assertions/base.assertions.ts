import { BaseActions } from '../actions/base.actions';
import { PageHandler } from '../pages/aqa_project/page-handler.page';
import { BasePage } from '../pages/aqa_project/base.page';

export class BaseAssertions {
  public pageHandler: PageHandler;
  public basePage: BasePage;
  public baseActions: BaseActions;

  constructor() {
    this.basePage = new BasePage();
    this.baseActions = new BaseActions();
    this.pageHandler = new PageHandler();
  }

  public async verifyElementText(selector: string, text: string) {
    const actual = await this.pageHandler.waitForElemAndGetText(selector);
    expect(actual).toBe(text);
  }
}

export default new BaseAssertions();
