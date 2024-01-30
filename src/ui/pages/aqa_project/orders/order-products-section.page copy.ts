class ProductsDetailsSectionPage {
  readonly ['Edit products pencil button'] = '#edit-products-pencil';
  readonly ['Accordion button'] = '#products-section button.accordion-button';
  readonly ['Receive label'] = (id: string) => `#heading${id} span.received-label`;
  readonly ['Product details body'] = '#products-accordion-section .accordion-body';
  readonly ['Accordion button with specified name'] = (productName: string) =>
    `//div[@id="products-accordion-section"]//button[normalize-space(text())="${productName}"]`;
}

export default new ProductsDetailsSectionPage();
