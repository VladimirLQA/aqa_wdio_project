import { BasePage } from '../pages/aqa_project/base.page';
import { elementFinder } from '../../utils/element-finder';
import { browserPause } from '../../utils/helpers';

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

  public async closeToastMessage() {
    await this.basePage.waitForElemAndClick(this.basePage['Toast close button']);
  }

  public async getCssProperty(element: string, cssProperty: string) {
    const elem = await this.basePage.waitForElement(element);
    const property = await elem.getCSSProperty(cssProperty);
    return property;
  }

  public async chooseDropdownItem(dropdown: string, item: string) {
    await this.basePage.waitForElemAndClick(dropdown);
    await browserPause(200);
    await this.basePage.waitForElemAndClick(item);
  }

  async closeModalWindow() {
    await this.basePage.waitForElemAndClick(this.basePage['Modal close button']);
  }
}
