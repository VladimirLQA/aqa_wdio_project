import { asyncMap, asyncReduce } from '../../../../utils/async_array_methods/array-async-methods.js';
import BasePage from '../base.page.js';
import { tabsSection } from './order-details-tabs-section.page.js';
import { orderSections } from './order-products-customer-sections.page.js';
import DeliveryPage from './orders-delivery.page.js';

class OrderDetailsPage extends BasePage {
  readonly orderSection = orderSections;
  readonly delivery = DeliveryPage;
  readonly tabsSection = tabsSection;

  readonly ['Page title'] = '#title h2';

  readonly ['Order number'] = '';

  readonly ['Process order button'] = '#process-order';

  readonly ['Refresh order button'] = '#refresh-order';

  readonly ['Cancel order button'] = '#cancel-order';

  readonly ['Receive button'] = `#start-receiving-products`;

  readonly ['Cancel receiving button'] = `#cancel-receiving`;

  readonly ['Save received products button'] = `#save-received-products`;

  readonly ['Select all checkbox'] = `#selectAll`;

  readonly ['Check box by id'] = (id: number) => `#chekc${id}`;

  async getSectionData(section: string) {
    const bodyData = await this.waitForElementsArrayToBeDisplayed(section);
    const parsedData = await asyncMap([...bodyData], async (elem: WebdriverIO.Element) => {
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
    return parsedData;
  }

  // async getParsedCustomerInSection() {
  //   const parsedData: IInitObject = {};
  //   const sectionRowsData = await this.waitForElementsArrayToBeDisplayed(this['Customer details']);
  //   const rows = await Promise.all(await sectionRowsData.map((elem) => elem));

  //   await asyncForEach(rows, async (row) => {
  //     const [name, value] = (await row.getText()).split('\n');
  //     if (name !== 'Created On') parsedData[name.toLowerCase()] = value;
  //   });
  //   return parsedData;
  // }

  // async getParsedProductInSection() {
  //   const products = await this.waitForElementsArrayToBeDisplayed(this['Product details body']);
  //   const parsedProducts = await asyncMap<WebdriverIO.ElementArray, IProduct[]>(products, async (p: WebdriverIO.Element) => {
  //     const prodicts = await p.$$('div.c-details');

  //     const a = await asyncReduce(
  //       prodicts,
  //       async (productData, row) => {
  //         const key = await (await row.$('span:nth-of-type(1)')).getText();
  //         const value = await (await row.$('span:nth-of-type(2)')).getText();
  //         productData[key] = value;
  //         return productData;
  //       },
  //       {},
  //     );

  //     return a;
  //   });

  //   console.log(parsedProducts);
  //   return parsedProducts;
  // }
}

export default new OrderDetailsPage();
