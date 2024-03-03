import { CommonPage } from '../common.page.js';

class ProductsPage extends CommonPage {
  readonly pageName: string = 'products';

  readonly ['Page header'] = '.page-header-flex h2';

  readonly ['Add product button'] = 'button.page-title-button';

  readonly ['Name by table row'] = (productName: string) =>
    `${this['Table row selector'](productName)}/td[1]`;

  readonly ['Price by table row'] = (productName: string) =>
    `${this['Table row selector'](productName)}/td[2]`;

  readonly ['Manufacturer by table row'] = (productName: string) =>
    `${this['Table row selector'](productName)}/td[3]`;

  readonly ['Chip label'] = (chipName: string) => `.chip[data-chip-products='${chipName}']`;
}

export default new ProductsPage();
