// @ts-nocheck
import { asyncForEach } from '../../../../utils/async_array_methods/array-async-methods';
import { IInitObject } from '../../../types/common.types';
import ModalPage from './modal.page';

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
    const modalRowsData = await this.waitForElementsArrayToBeDisplayed(this['Modal data rows']);
    await asyncForEach(modalRowsData, async (row) => {
      const [name, value] = (await row.getText()).split(':\n');
      parsedData[name.toLowerCase()] = value;
    });
    return parsedData;
  }
}

export default new DetailsModalPage();
