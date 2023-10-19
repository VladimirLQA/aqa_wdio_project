import BasePage from '../../base.page';

class DetailsProductModalPage extends BasePage {
  readonly ['Modal title'] = '#Product-details-modal-id h5.modal-title';

  readonly['Modal info by property'] =
    (property: string) =>
      `//div[@id='Product-details-modal-id']//p[./strong[text()='${property}:']]`;

  readonly['Modal data rows'] = '//div[@id="Product-details-modal-id"]//p';

  readonly['Edit product button'] = '//button[text()="Edit Product"]';

  readonly['Cancel button'] = '//button[text()="Edit Product"]';
}

export default new DetailsProductModalPage();