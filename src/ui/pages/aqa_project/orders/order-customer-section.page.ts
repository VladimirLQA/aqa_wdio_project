import { asyncForEach } from '../../../../utils/async_array_methods/array-async-methods.js';
import { IInitObject } from '../../../types/common.types.js';
import BasePage from '../base.page.js';

class CustomerDetailsSectionPage extends BasePage {
  readonly ['Edit customer pencil button'] = '#edit-customer-pencil';
  readonly ['Customer details'] = '#customer-section div.modal-body';
}

export default new CustomerDetailsSectionPage();
