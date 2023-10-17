import { TIMEOUT } from '../../../utils/aqa_project_const';
import { elementFinder } from '../../../utils/element-finder';
import { browserPause } from '../../../utils/helpers';

export default class PageHandler {

  public async waitForElement(selector: string, timeout: number = TIMEOUT['5 seconds']): Promise<WebdriverIO.Element> {
    const elem = await elementFinder.findElement(selector);
    await elem.waitForDisplayed({ timeout });
    return elem;
  }

  public async waitForElements(selector: string, timeout: number = TIMEOUT['5 seconds']): Promise<WebdriverIO.Element[]> {
    const elements = await elementFinder.findArrayElements(selector);
    return elements;
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
