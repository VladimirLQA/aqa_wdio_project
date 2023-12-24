import { TIMEOUT } from '../../../utils/aqa_project_const';
import { elementFinder } from '../../../utils/element-finder';
import { browserPause } from '../../../utils/helpers';

export default class PageHandler {
  async waitForElement(selector: string, reverse = false, timeout: number = TIMEOUT['5 seconds']): Promise<WebdriverIO.Element> {
    const elem = await elementFinder.findElement(selector);
    await elem.waitForDisplayed({
      reverse,
      timeout,
      timeoutMsg: `Element with selector ${selector} was not found`,
    });
    return elem;
  }

  async waitForElementsArrayToBeDisplayed(
    selector: string,
    reverse = false,
    timeout: number = TIMEOUT['5 seconds'],
  ): Promise<WebdriverIO.ElementArray> {
    const elements = await elementFinder.findArrayElements(selector);
    await browser.waitUntil(
      async () => {
        for (const elem of elements) {
          await elem.waitForDisplayed({
            reverse,
            timeout,
          });
        }
        return true;
      },
      { timeout, timeoutMsg: `Error during waiting for array of elements with selector ${selector}` },
    );
    return elements;
  }

  async getArrayOfElements(selector: string) {
    const elements = await elementFinder.findArrayElements(selector);
    return elements;
  }

  async waitForElementAndScroll(selector: string, timeout: number = TIMEOUT['5 seconds']) {
    try {
      const element = await this.waitForElement(selector);
      await element.waitForExist({ timeout });
      await element.scrollIntoView({ block: 'center' });
      return element;
    } catch (error) {
      throw error;
    }
  }

  async waitForElemAndSetValue(selector: string, text: string | number, timeout: number = TIMEOUT['5 seconds']): Promise<void> {
    const elem = await this.waitForElementAndScroll(selector);
    await elem.waitForEnabled({ timeout, timeoutMsg: 'Element is not enabled after 5 seconds' });
    await elem.setValue(text);
    await browserPause(200);
  }

  async waitForElemAndClick(selector: string, timeout: number = TIMEOUT['5 seconds']): Promise<void> {
    const elem = await this.waitForElementAndScroll(selector);
    await elem.waitForEnabled({ timeout, timeoutMsg: 'Element is not enabled after 5 seconds' });
    await elem.click();
  }

  async waitForElemAndGetText(selector: string): Promise<string> {
    const elem = await this.waitForElementAndScroll(selector);
    const text = await elem.getText();
    return text;
  }
}
