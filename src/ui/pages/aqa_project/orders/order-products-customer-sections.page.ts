class ProductsDetailsSectionPage {
  readonly ['Edit products pencil button'] = '#edit-products-pencil';
  readonly ['Accordion button'] = '#products-section button.accordion-button';
  readonly ['Receive label'] = (id: string) => `#heading${id} span.received-label`;
  readonly ['Product details body'] = '#products-accordion-section .accordion-body';
  readonly ['Accordion button with specified name'] = (productName: string) =>
    `//div[@id="products-accordion-section"]//button[normalize-space(text())="${productName}"]`;
  readonly ['Info whether product received'] = (productName: string) =>
    `//div[@id="products-accordion-section"]//button[normalize-space(text())="${productName}"]/following-sibling::span`;
}

class CustomerDetailsSectionPage {
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
