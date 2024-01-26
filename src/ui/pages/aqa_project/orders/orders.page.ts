import { CommonPage } from '../common.page.js';

class OrdersPage extends CommonPage {
  readonly pageName: string = 'orders';

  readonly ['Page title'] = '.page-header-flex h2';

  readonly ['Create order button'] = 'button.page-title-button';

  readonly ['Order number by table row'] = (orderNum: string) => `${this['Table row selector'](orderNum)}/td[1]`;

  readonly ['Name by table row'] = (orderNum: string) => `${this['Table row selector'](orderNum)}/td[2]`;

  readonly ['Email by table row'] = (orderNum: string) => `${this['Table row selector'](orderNum)}/td[3]`;

  readonly ['Price by table row'] = (orderNum: string) => `${this['Table row selector'](orderNum)}/td[4]`;

  readonly ['Delivery by table row'] = (orderNum: string) => `${this['Table row selector'](orderNum)}/td[5]`;

  readonly ['Status by table row'] = (orderNum: string) => `${this['Table row selector'](orderNum)}/td[6]`;

  readonly ['Chip label'] = (chipName: string) => `.chip[data-chip-orders='${chipName}']`;
}

export default new OrdersPage();
