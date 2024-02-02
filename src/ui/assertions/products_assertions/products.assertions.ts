import Utils from '../../../utils/helpers.js';
import ProductsActions from '../../actions/products/products.actions.js';
import { IProduct, ToastMessage } from '../../types/products.types.js';
import { CommonAssertions } from '../common.assertions.js';
import Expect from '../../../utils/chai-expect/expect-collection.js';

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
  async verifyProductToastText(text: ToastMessage, name?: string) {
    await this.verifyElementText(this.basePage['Toast text'], await ProductsActions.getProductToastText(text, name));
    await this.baseActions.closeToastMessage();
    await Utils.browserPause(300);
  }
}

export default new ProductsAssertions();
