import { waitForElementDisplayed, waitForElementExist, waitForElementWithText } from './helpers.js';

export const url = 'https://the-internet.herokuapp.com/';

describe.only('Dynamic loading', async () => {
  const dlButton = `//li//a[@href="/dynamic_loading"]`;
  const example1Link = `//a[@href="/dynamic_loading/1"]`;
  const example2Link = `//a[@href="/dynamic_loading/2"]`;
  const finishH4 = `//div[@id='finish']/h4`;
  const startButton = `//div[@id='start']/button`;

  const expectedText = 'Hello World!';

  before(async () => {
    await browser.url(url);
    await browser.maximizeWindow();
  });

  it('Should display "Hello world!" text after clicking on "Start" button', async () => {
    await $(dlButton).click();
    await waitForElementExist(example1Link);
    await waitForElementExist(example2Link);

    await $(example1Link).click();
    await waitForElementDisplayed(startButton);

    await $(startButton).click();
    await waitForElementWithText(finishH4, expectedText);
  });
});