import BasePage from '../base.page.js';
import { editModalsPages } from '../modals/orders_modals/edit-products.modal.page.js';

class ProductsDetailsSectionPage {
  readonly editProductsModal = editModalsPages['Edit products'];

  readonly ['Edit products pencil button'] = '#edit-products-pencil';

  readonly ['Accordion button'] = '#products-section button.accordion-button';

  readonly ['Receive label'] = (id: string) => `#heading${id} span.received-label`;

  readonly ['Product details body'] = '#products-accordion-section .accordion-body';

  readonly ['Accordion button with specified product name'] = (productName: string) =>
    `//div[@id="products-accordion-section"]//button[normalize-space(text())="${productName}"]`;

  readonly ['Info whether product received'] = (productName: string) =>
    `${this['Accordion button with specified product name'](productName)}/following-sibling::span`;

  readonly ['Checkbox with specified product name'] = (productName: string) =>
    `${this['Accordion button with specified product name'](
      productName,
    )}/following-sibling::div/input`;

  readonly ['Receive button'] = `#start-receiving-products`;

  readonly ['Save received products button'] = `#save-received-products`;

  readonly ['Cancel receiving products button'] = `#cancel-receiving`;

  readonly ['Select all ckeckbox'] = `#selectAll`;
}

class CustomerDetailsSectionPage {
  readonly editCustomerModal = editModalsPages['Edit customer'];
  readonly ['Edit customer pencil button'] = '#edit-customer-pencil';
  readonly ['Customer details'] = '#customer-section div.modal-body';
}

export const orderSection = {
  Customer: new CustomerDetailsSectionPage(),
  Products: new ProductsDetailsSectionPage(),
};
