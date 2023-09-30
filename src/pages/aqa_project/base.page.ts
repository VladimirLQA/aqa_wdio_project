import { PageHandler } from "./page-handler.page";

export class BasePage extends PageHandler {
  get ["Spinner"]() {
    return ".spinner-border";
  }

  get ["Toast"]() {
    return ".toast-body";
  }
}