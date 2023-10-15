import { elementFinder } from './element-finder';
import { IProduct } from '../ui/types/products.type';

const isAttributeContainClass = async (element: string, className: string): Promise<boolean> => {
  const elem = await elementFinder.findElement(element);
  const classAttribute = await elem.getAttribute('class');
  return classAttribute.toLowerCase().includes(className);
};

const browserPause = async (timeout: number): Promise<void> => {
  await browser.pause(timeout);
};

const prepareProduct = (product: IProduct, ...args) => {
  return Object.assign(product, ...args);
};

const modalParser = async (modalData: string[]) => {
  return modalData.reduce((parsed, info) => {
    const [k, v] = info.split('\n');
    const clearedK = k.slice(0, -1); // remove semicolon
    parsed[clearedK] = v;
    return parsed;
  }, {} as IProduct);
};


export { isAttributeContainClass, browserPause, prepareProduct, modalParser };
