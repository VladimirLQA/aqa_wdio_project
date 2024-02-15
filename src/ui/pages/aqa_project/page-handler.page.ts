import { TIMEOUT } from '../../../utils/aqa_project_const.js';
import { asyncFind } from '../../../utils/async_array_methods/array-async-methods.js';
import Expect from '../../../utils/chai-expect/expect-collection.js';
import ElementFinder from '../../../utils/element-finder.js';
import Utils from '../../../utils/helpers.js';

export default class PageHandler {
  async waitForElement(selector: string, reverse: boolean = false, timeout: number = TIMEOUT['5 seconds']): Promise<WebdriverIO.Element> {
    const elem = await ElementFinder.findElement(selector);
    await elem.waitForDisplayed({
      reverse,
      timeout,
      timeoutMsg: `Element with selector ${selector} was not displayed`,
    });
    return elem;
  }

  async waitForElementsArray(
    selector: string,
    reverse: boolean = false,
    timeout: number = TIMEOUT['5 seconds'],
    // @ts-ignore
  ): Promise<WebdriverIO.ElementArray> {
    const elements = await ElementFinder.findArrayElements(selector);
    // @ts-ignore
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
      { timeout, timeoutMsg: `Error during waiting for array of elements with selector "${selector}"` },
    );
    return elements;
  }

  async waitForElementAndScroll(selector: string, timeout: number = TIMEOUT['5 seconds']) {
    try {
      const element = await this.waitForElement(selector, false, timeout);
      await element.waitForExist({ timeout });
      await element.scrollIntoView({ block: 'center' });
      await element.waitForClickable({ timeout });
      const isScrolled = await this.isDisplayedInViewport(selector, timeout);
      Expect.toBeTrue({ actual: isScrolled });
      return element;
    } catch (error) {
      throw new Error(`Error while scrolling to element with selector ${selector}`);
    }
  }

  async waitForElemAndSetValue(selector: string, text: string | number, timeout: number = TIMEOUT['5 seconds']): Promise<void> {
    try {
      const elem = await this.waitForElementAndScroll(selector);
      await elem.waitForEnabled({ timeout, timeoutMsg: 'Element is not enabled after 5 seconds' });
      await elem.setValue(text);
    } catch (error) {
      throw new Error(`Error while setting text "${text}" into element with selector "${selector}"`);
    }
  }

  async waitForElemAndClick(item: WebdriverIO.Element | string, timeout: number = TIMEOUT['5 seconds']): Promise<void> {
    try {
      if (typeof item === 'string') {
        const elem = await this.waitForElement(item);
        await elem.waitForEnabled({ timeout, timeoutMsg: 'Element is not enabled after 5 seconds' });
        await elem.click();
      } else {
        await item.waitForEnabled({ timeout, timeoutMsg: 'Element is not enabled after 5 seconds' });
        await item.click();
      }
    } catch (error) {
      throw new Error(`Error while clicking on element with selector ${item}`);
    }
  }

  async waitForDropdownAndSelectValue(
    dropdownSelector: string,
    optionsSelector: string,
    text: string | number,
    timeout = TIMEOUT['5 seconds'],
  ) {
    const options = await this.waitForElementsArray(optionsSelector);
    await this.waitForElemAndClick(dropdownSelector);
    const option = await asyncFind([...options], async (el: WebdriverIO.Element) => (await el.getText()) === text);
    if (option) await this.waitForElemAndClick(option);
  }

  async waitForElemAndGetText(selector: string): Promise<string> {
    try {

      const elem = await this.waitForElementAndScroll(selector);
      const text = await elem.getText();
      return text;
    } catch (error) {
      throw new Error(`Error while getting text from selector "${selector}"`)
    }
  }

  async isDisplayedInViewport(selector: string, timeout = TIMEOUT['5 seconds']) {
    const element = await ElementFinder.findElement(selector);
    const isScrolledIntoView = await element.isDisplayedInViewport();
    return isScrolledIntoView;
  }
}
