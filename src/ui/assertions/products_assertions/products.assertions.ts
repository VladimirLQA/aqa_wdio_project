import Utils from '../../../utils/helpers.js';
import ProductsActions from '../../actions/products/products.actions.js';
import { IProduct, ToastMessage } from '../../types/products.types.js';
import { CommonAssertions } from '../common.assertions.js';

class ProductsAssertions extends CommonAssertions {
  async verifyCreatedProductRow(expectedProduct: IProduct) {
    const actualProduct = await ProductsActions.getCreatedProductRow(expectedProduct.name);
    expect(actualProduct.name).toBe(expectedProduct.name);
    expect(actualProduct.price).toBe(`$${expectedProduct.price}`);
    expect(actualProduct.manufacturer).toBe(expectedProduct.manufacturer);
  }

  async verifyProductToastText(text: ToastMessage, name?: string) {
    await this.verifyElementText(this.basePage['Toast text'], await ProductsActions.getProductToastText(text, name));
    await this.baseActions.closeToastMessage();
    await Utils.browserPause(300);
  }
}

export default new ProductsAssertions();
