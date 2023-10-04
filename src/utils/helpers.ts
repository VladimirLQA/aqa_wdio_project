import { arrayOfManufacturerBrands } from '../data/products/product.data';

const isAttributeContainClass = async (element: WebdriverIO.Element, className: string): Promise<boolean> => {
  const classAttribute = await element.getAttribute('class');
  return classAttribute.toLowerCase().includes(className);
};

const browserPause = async (timeout: number): Promise<void> => {
  await browser.pause(timeout);
};

const getRandomManufacturerBrand = async () => {
  const randomIndex = Math.floor(Math.random() * arrayOfManufacturerBrands.length);
  return arrayOfManufacturerBrands[randomIndex];
};

export { getRandomManufacturerBrand, isAttributeContainClass, browserPause };
