import Logger from '../../../utils/logger/logger.js';
import { TIMEOUT } from '../../../utils/aqa_project_const.js';
import { asyncFind } from '../../../utils/async_array_methods/array-async-methods.js';
import { logAction } from '../../../utils/reporter/allure.reporter.js';
import Utils from '../../../utils/helpers.js';

export default class PageHandler {
  async findElement(selector: string | WebdriverIO.Element): Promise<WebdriverIO.Element> {
    try {
      if (Utils.isWebElement(selector)) {
        return selector;
      } else {
        const element = await $(selector);
        return element;
      }
    } catch (error: any) {
      throw new Error(`Error while finding element by selector: ${selector}`);
    }
  }

  async findArrayElements(selector: string): Promise<WebdriverIO.ElementArray> {
    try {
      const elements = await $$(selector);
      return elements;
    } catch (error) {
      throw new Error(`Error while finding array of elements by selector: ${selector}`);
    }
  }

  async waitForElement(
    selector: string | WebdriverIO.Element,
    reverse = false,
    timeout = TIMEOUT['5 seconds'],
  ): Promise<WebdriverIO.Element> {
    const elem = await this.findElement(selector);
    await elem.waitForDisplayed({
      reverse,
      timeout,
      timeoutMsg: `Element with selector ${selector} was not displayed`,
    });
    return elem;
  }

  async waitForElementsArray(
    selector: string,
    reverse = false,
    timeout = TIMEOUT['5 seconds'],
  ): Promise<WebdriverIO.ElementArray> {
    const elements = await this.findArrayElements(selector);
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
      {
        timeout,
        timeoutMsg: `Error during waiting for array of elements with selector "${selector}"`,
      },
    );
    return elements;
  }

  @logAction('Set {text} into element with selector {selector}')
  async setValue(selector: string, text: string | number, timeout = TIMEOUT['5 seconds']) {
    try {
      const elem = await this.waitForElement(selector);
      await elem.waitForEnabled({ timeout, timeoutMsg: 'Element is not enabled after 5 seconds' });
      await elem.setValue(text);
      Logger.log(`Successfully set "${text}" into element with selector ${selector}`);
    } catch (error) {
      Logger.log(`Failed to set "${text}" into element with selector ${selector}`, 'error');
      throw new Error(
        `Error while setting text "${text}" into element with selector "${selector}"`,
      );
    }
  }

  @logAction('Click on element with selector {selector}')
  async click(selectorElement: WebdriverIO.Element | string, timeout = TIMEOUT['5 seconds']) {
    try {
      const elem = await this.waitForElement(selectorElement);
      await elem.waitForEnabled({
        timeout,
        timeoutMsg: 'Element is not enabled after 5 seconds',
      });
      await elem.click();
      Logger.log(`Successfully click on element with selector ${Utils.getElementSelector(elem)}`);
    } catch (error) {
      Logger.log(
        `Failed to click on element with selector ${Utils.getElementSelector(selectorElement)}`,
        'error',
      );
      throw new Error(
        `Error while clicking on element with selector ${Utils.getElementSelector(
          selectorElement,
        )}`,
      );
    }
  }

  @logAction('Get text from element with selector {selector}')
  async getText(selector: string) {
    try {
      const elem = await this.waitForElement(selector);
      const text = await elem.getText();
      Logger.log(`Successfully get text "${text}" from element with selector ${selector}`);
      return text;
    } catch (error) {
      Logger.log(`Failed to get text from element with selector ${selector}`, 'error');
      throw new Error(`Error while getting text from selector "${selector}"`);
    }
  }

  @logAction('Clear value from element with selector {selector}')
  async clear(selector: string) {
    try {
      const element = await this.waitForElement(selector);
      if (element) {
        await element.clearValue();
        Logger.log(`Successfully cleared value from element with selector ${selector}`);
      }
    } catch (error) {
      Logger.log(`Failed to clear value from element with selector ${selector}`, 'error');
      throw new Error(`Error while clearing value from element with selector "${selector}"`);
    }
  }

  @logAction('Get element attribute {attribute} from element with selector {selector}')
  async getElementAttribute(selector: string, attribute: string) {
    try {
      const elem = await this.waitForElement(selector);
      const attr = await elem.getAttribute(attribute);
      Logger.log(
        `Successfully get element attribute ${attribute} from element with selector ${selector}`,
      );
      return attr;
    } catch (error) {
      Logger.log(`Failed to get element attribute from element with selector ${selector}`, 'error');
      throw new Error(
        `Error while getting element attribute from element with selector "${selector}"`,
      );
    }
  }

  @logAction('Get element css property {cssProperty} from element with selector {selector}')
  async getElementCssProperty(selector: string, cssProperty: string) {
    try {
      const elem = await this.waitForElement(selector);
      const property = await elem.getCSSProperty(cssProperty);
      Logger.log(
        `Successfully get element css property "${cssProperty}" from element with selector "${selector}"`,
      );
      return property;
    } catch (error) {
      Logger.log(
        `Failed to get element css property from element with selector "${selector}"`,
        'error',
      );
      throw new Error(
        `Error while getting element css property from element with selector "${selector}"`,
      );
    }
  }

  @logAction('Browser execute script {script}')
  async browserExecute(script: string) {
    try {
      const executionResult = await browser.execute(script);
      if (executionResult) return executionResult;
      Logger.log(`Successfully execute script "${script}"`);
    } catch (error) {
      Logger.log(`Failed to execute script "${script}"`, 'error');
      throw new Error(`Error while executing script "${script}"`);
    }
  }

  async waitForElementAndScroll(selector: string, timeout = TIMEOUT['5 seconds']) {
    try {
      const element = await this.waitForElement(selector, false, timeout);
      await element.waitForExist({ timeout });
      await element.scrollIntoView({ block: 'center' });
      await element.waitForClickable({ timeout });
      return element;
    } catch (error) {
      throw new Error(`Error while scrolling to element with selector ${selector}`);
    }
  }

  async isDisplayedInViewport(selector: string) {
    const element = await this.findElement(selector);
    const isScrolledIntoView = await element.isDisplayedInViewport();
    return isScrolledIntoView;
  }

  async waitForDropdownAndSelectValue(
    dropdownSelector: string,
    optionsSelector: string,
    text: string | number,
  ) {
    const options = await this.waitForElementsArray(optionsSelector);
    await this.click(dropdownSelector);
    const option = await asyncFind(
      [...options],
      async (el: WebdriverIO.Element) => (await el.getText()) === text,
    );
    if (option) await this.click(option);
  }
}
