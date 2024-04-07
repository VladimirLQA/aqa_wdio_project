import { asyncForEach } from '../../../../utils/async_array_methods/array-async-methods.js';
import utils from '../../../../utils/utils.js';
import { IInitObject } from '../../../../types/common.types.js';
import ModalPage from './modal.page.js';

class DetailsModalPage extends ModalPage {
  readonly ['Modal title'] = 'h5.modal-title';

  readonly ['Modal row name'] = (name: string) => `//strong[text()='${name}:']`;

  readonly ['Modal row value'] = (value: string) => `//p[./strong[text()='${value}:']]`;

  readonly ['Modal data rows'] = '//div[@class="modal-body"]//p';

  readonly ['Edit  button'] = 'div.modal-footer button.btn-primary';

  readonly ['Cancel button'] = 'div.modal-footer button.btn-secondary';

  readonly ['Close modal button'] = `button.btn-close`;

  async getParsedDetailsData() {
    const parsedData: IInitObject = {};
    await utils.browserPause(1000);
    const modalRowsData = await this.waitForElementsArray(this['Modal data rows']);
    const rows = await Promise.all(await modalRowsData.map((elem) => elem));

    await asyncForEach(rows, async (row) => {
      const [name, value] = (await row.getText()).split(':\n');
      parsedData[name.toLowerCase()] = value;
    });
    return parsedData;
  }
}

export default new DetailsModalPage();
