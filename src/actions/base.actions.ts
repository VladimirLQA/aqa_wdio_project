import { BasePage } from '../pages/aqa_project/base.page';
import { elementFinder } from '../utils/element-finder';
import HomePage from '../pages/aqa_project/home.page';

export class BaseActions {
  public basePage: BasePage;

  constructor() {
    this.basePage = new BasePage();
  }

  public async waitForPageLoad() {
    const spinner = await elementFinder.findElement(this.basePage.Spinner);
    await spinner.waitForDisplayed({ reverse: true });
  }

  public async openSitePage() {
    await browser.url('https://anatoly-karpovich.github.io/aqa-course-project/?#');
    await browser.maximizeWindow();
  }

  public async verifyNotificationText(text: string) {
    await this.basePage.checkElementText(this.basePage.Toast, text);
  }
}
