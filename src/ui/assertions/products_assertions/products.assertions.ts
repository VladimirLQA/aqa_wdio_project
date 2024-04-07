import Utils from '../../../utils/utils.js';
import ProductsActions from '../../actions/products/products.actions.js';
import { IProduct, ProductToastMessage } from '../../../types/products.types.js';
import Expect from '../../../utils/chai-expect/expect-collection.js';
import { BaseAssertions } from '../base.assertions.js';
import { CommonAssertions } from '../common.assertions.js';

class ProductsAssertions extends CommonAssertions {
  async verifyCreatedProductRow(expectedProduct: IProduct) {
    const actualProduct = await ProductsActions.getCreatedProductRow(expectedProduct.name);
    Expect.toEqual({ actual: actualProduct.name, expected: expectedProduct.name });
    Expect.toEqual({ actual: actualProduct.price, expected: `$${expectedProduct.price}` });
    Expect.toEqual({ actual: actualProduct.manufacturer, expected: expectedProduct.manufacturer });
  }

  verifyProduct(actualProduct: IProduct, expectedProduct: IProduct) {
    Expect.toEqual({ actual: actualProduct.name, expected: expectedProduct.name });
    Expect.toEqual({ actual: actualProduct.price, expected: `$${expectedProduct.price}` });
    Expect.toEqual({ actual: actualProduct.manufacturer, expected: expectedProduct.manufacturer });
    Expect.toEqual({ actual: actualProduct.notes, expected: expectedProduct.notes });
  }
  async verifyProductToastText(text: ProductToastMessage, name?: string) {
    const productToastText = await ProductsActions.getProductToastText(text, name);
    await this.verifyAndCloseToast(productToastText);
  }
}

export default new ProductsAssertions();
