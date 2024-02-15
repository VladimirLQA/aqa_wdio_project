class ElementFinder {
  async findElement(selector: string): Promise<WebdriverIO.Element> {
    try {
      const element = await $(selector);
      return element;
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
}

export default new ElementFinder();
