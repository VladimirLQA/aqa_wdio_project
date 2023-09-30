import { arrayOfManufacturerBrands } from "../data/products/product.data";

export const isBgDanger = async (element: WebdriverIO.Element): Promise<boolean> => {
  let classAttribute = await element.getAttribute("class");
  return classAttribute.toLowerCase().includes("bg-danger");
};

export const browserPause = async (timeout: number): Promise<void> => {
  await browser.pause(timeout);
};

export function getRandomManufacturerBrand() {
  const randomIndex = Math.floor(Math.random() * arrayOfManufacturerBrands.length);
  return arrayOfManufacturerBrands[randomIndex];
}
