import { asyncForEach } from '../../../../utils/async_array_methods/array-async-methods.js';
import { IInitObject } from '../../../types/common.types.js';
import BasePage from '../base.page.js';

class CustomerDetailsSectionPage extends BasePage {
  readonly ['Edit customer pencil button'] = '#edit-customer-pencil';
  readonly ['Customer details'] = '#customer-section div.modal-body div';

  async getParsedCustomerInSection() {
    const parsedData: IInitObject = {};
    const sectionRowsData = await this.waitForElementsArrayToBeDisplayed(this['Customer details']);
    const rows = await Promise.all(await sectionRowsData.map((elem) => elem));

    await asyncForEach(rows, async (row) => {
      const [name, value] = (await row.getText()).split('\n');
      if (name !== 'Created On') parsedData[name.toLowerCase()] = value;
    });
    return parsedData;
  }
}

export default new CustomerDetailsSectionPage();
