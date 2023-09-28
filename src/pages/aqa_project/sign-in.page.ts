import { credentials } from "../../data/aqa_project";
import { PageHandler } from "./page.handler";

class SignInPage extends PageHandler {
  get ["Email"]() {
    return "#emailinput";
  }

  get ["Password"]() {
    return "#passwordinput";
  }

  get ["Remember me check box"]() {
    return "#remembermecheckbox";
  }

  get ["Login button"]() {
    return ".btn-lg";
  }

  get ["Spinner"]() {
    return ".spinner-border";
  }

  get ["Image"]() {
    return ".img-fluid";
  }

  async login() {
    await this.waitForElemAndSetValue(this["Email"], credentials.login);
    await this.waitForElemAndSetValue(this["Password"], credentials.password);
    await (await this.findElement(this["Login button"])).click();
  }
}

export default new SignInPage();