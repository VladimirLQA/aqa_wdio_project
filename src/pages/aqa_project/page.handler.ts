import { TIMEOUT_5 } from "../../utils/aqa_project_const";

export class PageHandler {
  // TODO: implement basic logic to carry out an action on pages
  public async findElement(selector: string): Promise<WebdriverIO.Element> {
    try {
      const element = await $(selector);
      return element;
    } catch (error: any) {
      throw new Error("Error while finding element");
    }
  }

  public async waitForElemAndSetValue(selector: string, text: string | number, timeout: number = TIMEOUT_5) {
    const elem = await this.findElement(selector);
    if (!elem) {
      throw new Error("Element not found");
    } else {
      await elem.waitForEnabled({ timeout, timeoutMsg: "Element is not enabled after 5 seconds" });
      await elem.setValue(text);
    }
  }
}
