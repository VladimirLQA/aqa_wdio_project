import BasePage from '../base.page.js';
import { editModalsPages } from '../modals/orders_modals/edit-products.modal.page.js';

class ProductsDetailsSectionPage extends BasePage {
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
    `${this['Accordion button with specified product name'](productName)}/following-sibling::div/input`;

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

export const orderSections = {
  Customer: new CustomerDetailsSectionPage(),
  Products: new ProductsDetailsSectionPage(),
};

// async getParsedProductInSection() {
//   const sectionRowsData = await this.waitForElementsArrayToBeDisplayed(this['Product details body']);
//   const rows = await Promise.all(await sectionRowsData.map((elem) => elem.getText()));

//   return rows.map((item) => {
//     const data = item.split('\n');

//     return data.reduce((product: TProduct<IProduct>, currentElement: string, idx: number, array: string[]) => {
//       if (idx % 2 === 0) {
//         const key = currentElement.toLocaleLowerCase();
//         const value = array[idx + 1];
//         product[key] = value;
//       }
//       return product;
//     }, {} as TProduct<IProduct>);
//   });
// }
