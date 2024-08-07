/*
Разработать метод для выбора элемента в дропдауте "клавиатурой":
  selectDropdownValueWithKeys(dropdownSelector: string, optionsSelector: string, value: string)
  со следующими шагами:
    - кликнуть на дропдаун
    - дождаться появления элементов дропдауна на экране
    - Найти сколько раз надо нажать "вниз"
    - столько раз нажать стрелку ВНИЗ на клавиатуре, чтобы добраться до нужного элемента
    - нажать кнопку "Enter" на клавиатуре

    Рекоммендации:
      - import { Key } from 'webdriverio'
      - Сверху импорт "ключей", в них есть и ArrowDown и Enter
      - browser.keys() для отправки "кликов" по клавиатуре

 */

import { url } from './dynamic-loading.test.js';
import { Key } from 'webdriverio';
import {
  findElement,
  pressKey,
  selectDropdownValueSendingKeys,
  selectDropdownValueWithKeys,
} from './helpers.js';

describe('Dropdown', () => {
  const dropDownLink = `//a[@href="/dropdown"]`;
  const dropdownSelector = `//select[@id="dropdown"]`;
  const dropdownOptions = `//select[@id="dropdown"]/option`;
  const expectedOptionText = 'Option 2';
  const keyPresessLink = `//a[@href="/key_presses"]`;

  before(async () => {
    await browser.url(url);
    await browser.maximizeWindow();
  });

  it('Should select "option 2"', async () => {
    await $(dropDownLink).click();
    await selectDropdownValueSendingKeys(dropdownSelector, dropdownOptions, expectedOptionText);
    await browser.pause(3000)
    const selectedOption = await $(dropdownSelector).getValue();
    // //
    expect(selectedOption).toBe(expectedOptionText);
  });
});