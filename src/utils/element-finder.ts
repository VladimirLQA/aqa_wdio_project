const findElement = async (selector: string): Promise<WebdriverIO.Element> => {
  try {
    const element = await $(selector);
    return element;
  } catch (error: any) {
    throw new Error(`Error while finding element by selector: ${selector}`);
  }
};

const findArrayElements = async (selector: string): Promise<WebdriverIO.Element[]> => {
  try {
    const elements = await $$(selector);
    return elements;
  } catch (error) {
    throw new Error(`Error while finding array of elements by selector: ${selector}`);
  }
};

export const elementFinder = { findElement, findArrayElements };
