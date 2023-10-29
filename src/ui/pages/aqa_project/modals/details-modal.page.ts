import { ModalPage } from './modal.page';
import { asyncForEach } from '../../../../utils/async_array_methods/array-async-methods';

class DetailsModalPage extends ModalPage {
  readonly ['Modal title'] = 'h5.modal-title';

  readonly ['Modal row name'] = (name: string) => `//strong[text()='${name}:']`;

  readonly ['Modal row value'] = (value: string) => `//p[./strong[text()='${value}:']]`;

  readonly ['Modal data rows'] = '//div[@class="modal-body"]//p';

  readonly ['Edit  button'] = 'div.modal-footer button.btn-primary';

  readonly ['Cancel button'] = 'div.modal-footer button.btn-secondary';

  readonly ['Close modal button'] = `button.btn-close`;


  async getParsedDetailsData() {
    const parsedData = {};
    const modalRowsData = await this.waitForElements(this['Modal data rows']);
    await asyncForEach(modalRowsData, async (row) => {
      const [name, value] = (await row.getText()).split('\n');
      const clearedName = name.slice(0, -1).toLowerCase();
      parsedData[clearedName] = value;
    });
    return parsedData;
  }
}

export default new DetailsModalPage();
