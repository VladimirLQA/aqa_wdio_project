// @ts-nocheck
import { productData } from '../../../../data/products/products-test.data.js';
import { asyncForEach, asyncMap, asyncReduce } from '../../../../utils/async_array_methods/array-async-methods.js';
import { IInitObject } from '../../../types/common.types.js';
import { IProduct } from '../../../types/products.types.js';
import BasePage from '../base.page.js';

type TProduct<T extends {}> = {
  [K in keyof T as string]: T[K];
};

class ProductsDetailsSectionPage extends BasePage {
  readonly ['Edit products pencil button'] = '#edit-products-pencil';
  readonly ['Accordion button'] = '#products-section button.accordion-button';
  readonly ['Receive label'] = (id: string) => `#heading${id} span.received-label`;
  readonly ['Product details body'] = '#products-accordion-section .accordion-body';
  readonly ['Accordion button with specified name'] = (productName: string) =>
    `//div[@id="products-accordion-section"]//button[normalize-space(text())="${productName}"]`;
}

export default new ProductsDetailsSectionPage();

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
