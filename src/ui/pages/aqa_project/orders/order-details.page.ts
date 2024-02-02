import { asyncMap, asyncReduce } from '../../../../utils/async_array_methods/array-async-methods.js';
import { ICustomer } from '../../../types/customers.types.js';
import { IProduct } from '../../../types/products.types.js';
import BasePage from '../base.page.js';
import CustomerDetailsSectionPage from './order-customer-section.page.js';
import ProductsDetailsSectionPage from './order-products-section.page.js';

class OrderDetailsPage extends BasePage {
  readonly customerSection: typeof CustomerDetailsSectionPage = CustomerDetailsSectionPage;
  readonly productsSection: typeof ProductsDetailsSectionPage = ProductsDetailsSectionPage;
  // TODO refact to add header section, bottom section

  readonly ['Page title'] = '#title h2';

  readonly ['Order number'] = '';

  readonly ['Process order button'] = '#process-order';

  readonly ['Refresh order button'] = '#refresh-order';

  readonly ['Cancel order button'] = '#cancel-order';

  readonly ['Create comment button'] = '#create-comment-btn';

  readonly ['Order details section tab button'] = (tabName: 'delivery' | 'history' | 'comments') => `#${tabName}-tab`;

  readonly ['Details order tab title'] = (tabName: 'delivery' | 'history' | 'comments') => `#order-details-tabs-content > #${tabName} h4`;

  readonly ['Delivery information body'] = '#delivery > .modal-body';

  readonly ['Schedule delivery button'] = '#delivery-btn';

  readonly ['Collapse button order history tab'] = (action: string) => `//span[text()="${action}"]/preceding-sibling::button`;

  readonly ['Comments input text area'] = '#textareaComments';

  readonly ['Error input text area'] = '#error-textareaComments';

  readonly ['Delete comment button'] = (substr: string) => `//p[contains(., "${substr}")]/following-sibling::button`;

  readonly ['Comment text'] = (substr: string) => `//p[contains(., "${substr}")]`;

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
