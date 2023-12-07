import PageHandler from './page-handler.page';
import { MANUFACTURERS } from '../../types/products.types';
import { COUNTRIES } from '../../types/customers.types';

export default class BasePage extends PageHandler {
  readonly ['Spinner'] = '.spinner-border';
  readonly ['Toast text'] = '.toast-body';
  readonly ['Toast close button'] = '.toast-container button';
  readonly ['Dropdown option'] = (option: MANUFACTURERS | COUNTRIES | string) => `(//option[text()="${option}"])[last()]`;
}
