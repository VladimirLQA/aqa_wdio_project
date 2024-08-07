import { asyncForEach } from '../../utils/async_array_methods/array-async-methods.js';
import { Key } from 'webdriverio';

export const timeouts = {
  TIMEOUT_5_SEC: 5_000,
  TIMEOUT_10_SEC: 10_000,
  TIMEOUT_15_SEC: 15_000,
};

export type ElOrSelector = WebdriverIO.Element | string;
export type ElArrayOrSelector = WebdriverIO.ElementArray | string;

export interface Options {
  timeout?: number;
  reverse?: boolean;
  timeoutMsg?: string,
}

export const isElement =
        (elOrSelector: ElOrSelector): elOrSelector is WebdriverIO.Element =>
                typeof elOrSelector !== 'string' && (elOrSelector as WebdriverIO.Element).elementId !== undefined;

export const isElementArray =
        (elOrSelector: ElArrayOrSelector): elOrSelector is WebdriverIO.ElementArray =>
                typeof elOrSelector !== 'string' && Array.isArray(elOrSelector) &&
                elOrSelector.length > 0 && (elOrSelector[0] as WebdriverIO.Element).elementId !== undefined;

export const findElement = async (selector: ElOrSelector): Promise<WebdriverIO.Element> => {
  try {
    if (isElement(selector)) {
      return selector;
    } else {
      const element = await $(selector);
      return element;
    }
  } catch (error: any) {
    throw new Error(`Error while finding element by selector: ${selector}`);
  }
};

export const findElementsArray = async (selector: ElArrayOrSelector): Promise<WebdriverIO.ElementArray> => {
  try {
    if (isElementArray(selector)) {
      return selector;
    } else {
      const element = await $$(selector);
      return element;
    }
  } catch (error: any) {
    throw new Error(`Error while finding element by selector: ${selector}`);
  }
};

export type TKey = keyof typeof Key | string;

export const pressKey = async (key: TKey | TKey[]) => await browser.keys(key);

export const waitForElementExist = async (elOrSelector: ElOrSelector, opt?: Options) => {
  const timeout = opt?.timeout ?? timeouts.TIMEOUT_10_SEC;
  const reverse = opt?.reverse ?? false;
  const timeoutMsg = opt?.timeoutMsg ?? 'Default msg';

  try {
    const element = await findElement(elOrSelector);
    await element.waitForExist({
      reverse, timeout, timeoutMsg,
    });
  } catch (e) {
    throw e;
  }
};

export const waitForElementDisplayed = async (el: ElOrSelector, opt?: Options) => {
  const timeout = opt?.timeout ?? timeouts.TIMEOUT_10_SEC;
  const reverse = opt?.reverse ?? false;
  const timeoutMsg = opt?.timeoutMsg ?? 'Default msg';

  try {
    const element = $(el);
    await element.waitForDisplayed({
      timeout, reverse, timeoutMsg,
    });
  } catch (e) {
    throw e;
  }
};

export const waitForElementWithText = async (elOrSelector: ElOrSelector, text: string, opt?: Options) => {
  const timeout = opt?.timeout ?? timeouts.TIMEOUT_10_SEC;
  const timeoutMsg = opt?.timeoutMsg ?? 'Default msg waitForElementWithText';

  const element = await findElement(elOrSelector);
  const ao = await browser.waitUntil(async () => {
    // await waitForElementDisplayed(elOrSelector);
    return await element.isDisplayed() && await element.getText() === 'text';
  }, {
    timeout, timeoutMsg,
  });
  return ao;
};

// Разработать метод для выбора элемента в дропдауте "клавиатурой":
// selectDropdownValueWithKeys(dropdownSelector: string, optionsSelector: string, value: string)
// со следующими шагами:
//         - кликнуть на дропдаун
// - дождаться появления элементов дропдауна на экране
// - Найти сколько раз надо нажать "вниз"
// - столько раз нажать стрелку ВНИЗ на клавиатуре, чтобы добраться до нужного элемента
// - нажать кнопку "Enter" на клавиатуре
//
// Рекоммендации:
//         - import { Key } from 'webdriverio'
// - Сверху импорт "ключей", в них есть и ArrowDown и Enter
// - browser.keys() для отправки "кликов" по клавиатуре
export const selectDropdownValueWithKeys = async (dropdownSelector: string, optionsSelector: string, value: string) => {
  let idx, keys = [];
  const dropdown = await findElement(dropdownSelector);
  const options = await findElementsArray(optionsSelector);

  await dropdown.click();
  await asyncForEach([...options], async (o, i) => {
    if (await o.getText() === value) idx = i;
  });

  if (!idx) throw new Error(`Option with text '${value}' was not found`);

  for (let i = 0; i < idx; i++) {
    keys.push('ArrowDown');
  }
  keys.push('Enter');

  await browser.keys(keys);
};

/**
 * Select dropdown value by sending Keys.ArrowDown and Key.Enter
 *
 * @param {string} dropDownSelector
 * @param {string} elementsSelector
 * @param {string} value
 * @memberof Page
 */
export const selectDropdownValueSendingKeys = async (dropDownSelector: string, elementsSelector: string, value: string) => {
  // const dropdown = await findElement(dropDownSelector);
  // const options = await findElementsArray(elementsSelector);
  await $(dropDownSelector).click();
  const elements = await $$(elementsSelector);

  // await dropdown.click();
  const values = await Promise.all([...elements].map((e) => e.getText()));
  const index = values.indexOf(value);

  if (index === -1) throw new Error(`Unable to find dropdown element with text ${value}`);

  const keys = Array(index + 1).fill(Key.ArrowDown);
  await browser.keys([...keys, Key.Enter]);
};
