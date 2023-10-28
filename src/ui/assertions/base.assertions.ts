import BaseActions from '../actions/base.actions';
import PageHandler from '../pages/aqa_project/page-handler.page';
import BasePage from '../pages/aqa_project/base.page';
import { TIMEOUT } from '../../utils/aqa_project_const';
import { elementFinder } from '../../utils/element-finder';
import CustomeExpects from '../custome_expects/custome.expects';

export class BaseAssertions {
  pageHandler: PageHandler = new PageHandler();
  basePage: BasePage = new BasePage();
  baseActions: BaseActions = new BaseActions();

  async verifyElementText(selector: string, text: string) {
    const actual = await this.pageHandler.waitForElemAndGetText(selector);
    await CustomeExpects.expectToBe<string, string>({actual: actual, expected: text,
    description: 'Verify element text'});
  }

  async verifyClickableButton(selector: string, expected: boolean) {
    const elem = await this.pageHandler.waitForElement(selector);
    const isClickable = await elem.waitUntil(async () => {
      return await elem.isClickable();
    });
    await CustomeExpects.expectToBe<boolean, boolean>({actual: isClickable, expected: expected,
      description: 'Verify button is clickable or not'});
  }

  async verifyContainClass(selector: string, className: string, expected: boolean): Promise<boolean> {
    const elem = await this.pageHandler.waitForElement(selector);
    const classAttribute = await elem.getAttribute('class');
    const isContain = classAttribute.toLowerCase().includes(className);
    await CustomeExpects.expectToBe<boolean, boolean>({actual: isContain, expected: expected,
      description: 'Verify element contain class or not'});
  }
}
