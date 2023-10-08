import { BasePage } from '../../base.page';


class DeleteProductModalPage extends BasePage {
  get ['Delete button']() {
    return '.modal-content > .modal-footer button:nth-of-type(1)';
  }

  get ['Cancel button']() {
    return '.modal-content > .modal-footer button:nth-of-type(2)';
  }

  get ['Close modal button']() {
    return '.modal-content > .modal-header > button';
  }

  get ['Modal body text']() {
    return '.modal-content > .modal-body-text > p';
  }

  get ['Modal title']() {
    return '.modal-content .modal-title';
  }
}

export default new DeleteProductModalPage();
