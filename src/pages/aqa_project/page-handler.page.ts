import { TIMEOUT } from '../../utils/aqa_project_const';
import { elementFinder } from '../../utils/element-finder';
import { browserPause } from '../../utils/helpers';

export class PageHandler {
  // TODO: implement basic logic to carry out an action on pages
  public async waitForElement(selector: string, timeout: number = TIMEOUT['5 seconds']) {
    const elem = await elementFinder.findElement(selector);
    await elem.waitForDisplayed({ timeout });
    return elem;
  }

  public async waitForElemAndSetValue(selector: string, text: string | number, timeout: number = TIMEOUT['5 seconds']): Promise<void> {
    const elem = await this.waitForElement(selector);
    await elem.waitForEnabled({ timeout, timeoutMsg: 'Element is not enabled after 5 seconds' });
    await elem.setValue(text);
    await browserPause(200);
  }

  public async waitForElemAndClick(selector: string, timeout: number = TIMEOUT['5 seconds']): Promise<void> {
    const elem = await this.waitForElement(selector);
    await elem.waitForEnabled({ timeout, timeoutMsg: 'Element is not enabled after 5 seconds' });
    await elem.click();
  }

  public async waitForElemAndGetText(selector: string): Promise<string> {
    const elem = await this.waitForElement(selector);
    const text = await elem.getText();
    return text;
  }
}
