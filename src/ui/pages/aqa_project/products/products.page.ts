import  BasePage from '../base.page';

class ProductsPage extends BasePage {
  readonly ['Page header'] = '.page-header-flex h2';

  readonly ['Search input'] = "[type='search']";

  readonly ['Search button'] = '#search-products';

  readonly ['Filter button'] = '#filter';

  readonly ['Add product button'] = 'button.page-title-button';

  readonly ['Table row selector'] = (product: string) => `//tr[./td[text()="${product}"]]`;

  readonly ['Name by table row'] = (productName: string) => `${this['Table row selector'](productName)}/td[1]`;

  readonly ['Price by table row'] = (productName: string) => `${this['Table row selector'](productName)}/td[2]`;

  readonly ['Manufacturer by table row'] = (productName: string) => `${this['Table row selector'](productName)}/td[3]`;

  readonly ['Table row action button'] =
    (productName: string, actionButton: string) =>
      `${this['Table row selector'](productName)}/td/button[@title='${actionButton}']`;

  readonly ['Table of products'] = '#table-products';

  readonly ['Chip label'] = (chipName: string) => `.chip[data-chip-products='${chipName}']`;

  readonly ['Chip close btn'] = (chipName: string) => `.closebtn[data-chip-products='${chipName}']`;
}

export default new ProductsPage();
