import { COUNTRIES } from '../../types/customers.types.js';
import { DELIVERY } from '../../types/order.types.js';
import { MANUFACTURERS } from '../../types/products.types.js';
import PageHandler from './page-handler.page.js';

export default class BasePage extends PageHandler {
  readonly ['Modal close button'] = 'button.btn-close';

  readonly ['Spinner'] = '.spinner-border';

  readonly ['Toast text'] = '.toast-body';

  readonly ['Toast close button'] = '.toast-container button';

  readonly ['Dropdown option [last()]'] = (option: MANUFACTURERS | COUNTRIES | DELIVERY | string) =>
    `(//option[text()="${option}"])[last()]`;

  readonly ['Chip buttons'] = '#chip-buttons .chip';

  readonly ['Chip close button'] = '#chip-buttons .closebtn';

  readonly ['Table page'] = (pageName: string) => `#table-${pageName}`;

  readonly ['Chip label'] = (pageName: string, chipName: string) =>
    `.chip[data-chip-${pageName}='${chipName}']`;

  readonly ['Filter button'] = '#filter';

  readonly ['Search input'] = "[type='search']";

  readonly ['Search button'] = (pageName: string) => `#search-${pageName}`;

  readonly ['Table row selector'] = (searchValue: string) => `//tr[./td[text()="${searchValue}"]]`;

  readonly ['Table row action button'] = (searchValue: string, actionButton: string) =>
    `${this['Table row selector'](searchValue)}/td/button[@title='${actionButton}']`;
}
