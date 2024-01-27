class ProductsOrderSectionPage {
  readonly ['Edit products pencil button'] = '#edit-products-pencil';
  readonly ['Accordion button'] = '#products-section button.accordion-button';
  readonly ['Receive label'] = (id: string) => `#heading${id} span.received-label`;
  readonly ['Customer details'] = '#products-accordion-section .accordion-body';
}

export default new ProductsOrderSectionPage();
