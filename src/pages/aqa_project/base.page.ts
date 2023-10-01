import { PageHandler } from './page-handler.page';

export class BasePage extends PageHandler {
  get ['Spinner']() {
    return '.spinner-border';
  }

  get ['Toast body']() {
    return '.toast-body';
  }

  get ['Toast close button']() {
    return '.toast-container button';
  }
}
