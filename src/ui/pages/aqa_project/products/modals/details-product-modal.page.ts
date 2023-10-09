import { BasePage } from '../../base.page';

class DetailsProductModalPage extends BasePage {
  get['Modal title']() {
    return '#Product-details-modal-id h5.modal-title';
  }

  get['Modal close button']() {
    return '#Product-details-modal-id button.btn-close';
  }

  get['Modal info by property']() {
    return (property: string) => `//div[@id='Product-details-modal-id']//p[./strong[text()='${property}:']]`;
  }

  get['Modal info']() {
    return '//div[@id="Product-details-modal-id"]//p';
  }

  get['']() {
    return '';
  }

  get['']() {
    return '';
  }

  get['']() {
    return '';
  }

  get['']() {
    return '';
  }
}

export default new DetailsProductModalPage();