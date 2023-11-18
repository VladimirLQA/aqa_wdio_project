import PageHandler from './page-handler.page';
import { MANUFACTURERS } from '../../../data/products/product.data';
import { COUNTRIES } from '../../../data/customers/customers.data';

export default class BasePage extends PageHandler {
   readonly ['Spinner'] = '.spinner-border';
   readonly ['Toast text'] = '.toast-body';
   readonly ['Toast close button'] = '.toast-container button';
   readonly ['Manufacturer dropdown brand'] = (option: MANUFACTURERS | COUNTRIES) => `//option[text()="${option}"]`;
}
