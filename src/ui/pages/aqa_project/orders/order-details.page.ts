import {
  asyncMap,
  asyncReduce,
} from '../../../../utils/async_array_methods/array-async-methods.js';
import { HeaderDetailsTitles } from '../../../types/order.types.js';
import BasePage from '../base.page.js';
import { tabsSection } from './order-details-tabs-section.page.js';
import { orderSection } from './order-products-customer-sections.page.js';
import DeliveryPage from './orders-delivery.page.js';

class OrderDetailsPage extends BasePage {
  readonly customerProductSection = orderSection;
  readonly delivery = DeliveryPage;
  readonly tabsSection = tabsSection;

  readonly ['Page title'] = '#title h2';

  readonly ['Order number'] = '';

  readonly ['Process order button'] = '#process-order';

  readonly ['Confirm process modal button'] = `//button[@type='submit']`;

  readonly ['Cancel confirm process modal button'] = `button.btn-secondary`;

  readonly ['Refresh order button'] = '#refresh-order';

  readonly ['Cancel order button'] = '#cancel-order';

  readonly ['Receive button'] = `#start-receiving-products`;

  readonly ['Cancel receiving button'] = `#cancel-receiving`;

  readonly ['Save received products button'] = `#save-received-products`;

  readonly ['Select all checkbox'] = `#selectAll`;

  readonly ['Check box by id'] = (id: number) => `#chekc${id}`;

  readonly ['Header Order history info'] = (info: HeaderDetailsTitles) =>
    `//*[text()='${info}']//following-sibling::span`;

  async getSectionData(section: string) {
    const bodyData = await this.waitForElementsArray(section);
    return await asyncMap([...bodyData], async (elem: WebdriverIO.Element) => {
      const rows = await elem.$$('.c-details');

      const data = await asyncReduce(
        [...rows],
        async (productData, row) => {
          const key = await (await row.$('span:nth-of-type(1)')).getText();
          const value = await (await row.$('span:nth-of-type(2)')).getText();
          productData[key.toLowerCase()] = value;
          return productData;
        },
        {} as any,
      );

      return data;
    });
  }
}

export default new OrderDetailsPage();
