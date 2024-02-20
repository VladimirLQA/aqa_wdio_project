import { COUNTRIES } from '../../types/customers.types.js';
import { DELIVERY } from '../../types/order.types.js';
import { MANUFACTURERS } from '../../types/products.types.js';
import PageHandler from './page-handler.page.js';

export default class BasePage extends PageHandler {
  readonly ['Spinner'] = '.spinner-border';
  readonly ['Toast text'] = '.toast-body';
  readonly ['Toast close button'] = '.toast-container button';
  readonly ['Dropdown option [last()]'] = (option: MANUFACTURERS | COUNTRIES | DELIVERY | string) =>
    `(//option[text()="${option}"])[last()]`;
}
