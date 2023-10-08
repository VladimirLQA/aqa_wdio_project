import { elementFinder } from './element-finder';

const isAttributeContainClass = async (element: string, className: string): Promise<boolean> => {
  const elem = await elementFinder.findElement(element);
  const classAttribute = await elem.getAttribute('class');
  return classAttribute.toLowerCase().includes(className);
};

const browserPause = async (timeout: number): Promise<void> => {
  await browser.pause(timeout);
};

export { isAttributeContainClass, browserPause };
