import { BasePage } from '../base.page';

class ProductsPage extends BasePage {
  get ['Page header']() {
    return '.page-header-flex h2';
  }

  get ['Search input']() {
    return "[type='search']";
  }

  get ['Search button']() {
    return '#search-products';
  }

  get ['Filter button']() {
    return '#filter';
  }

  get ['Add product button']() {
    return 'button.page-title-button';
  }

  get ['Table row selector']() {
    return (product: string) => `//tr[./td[text()="${product}"]]`;
  }

  get ['Name by table row']() {
    return (productName: string) => `${this['Table row selector'](productName)}/td[1]`;
  }

  get ['Price by table row']() {
    return (productName: string) => `${this['Table row selector'](productName)}/td[2]`;
  }

  get ['Manufacturer by table row']() {
    return (productName: string) => `${this['Table row selector'](productName)}/td[3]`;
  }

  get ['Table row action button']() {
    return (productName: string, actionButton: string) => `${this['Table row selector'](productName)}/td/button[@title='${actionButton}']`;
  }

  get ['Table of products']() {
    return '#table-products';
  }
}

export default new ProductsPage();
