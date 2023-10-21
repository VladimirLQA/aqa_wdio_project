import { IProduct, ToastMessage } from '../../types/products.type';
import ProductsActions from '../../actions/products/products.actions';
import { BaseAssertions } from '../base.assertions';
import { browserPause } from '../../../utils/helpers';

class ProductsAssertions extends BaseAssertions {
  public async verifyCreatedProductRow(expectedProduct: IProduct) {
    const actualProduct = await ProductsActions.getCreatedProductRow(expectedProduct.name);
    expect(actualProduct.name).toBe(expectedProduct.name);
    expect(actualProduct.price).toBe(`$${expectedProduct.price}`);
    expect(actualProduct.manufacturer).toBe(expectedProduct.manufacturer);
  }

  public async verifyProductToastText(text: ToastMessage, name?: string) {
    await this.verifyElementText(this.basePage['Toast body'], await ProductsActions.getProductToastText(text, name));
    await this.baseActions.closeToastMessage();
    await browserPause(300);
  }

  async verifyCreatedProductInDetailModal(productToCreate: IProduct) {
    const a = await ProductsActions.getParsedProductModalInfo();
    expect(a['Name']).toBe(productToCreate.name);
    expect(+a['Amount']).toBe(productToCreate.amount);
    expect(+a['Price']).toBe(productToCreate.price);
    expect(a['Manufacturer']).toBe(productToCreate.manufacturer);
    expect(a['Notes']).toBe(productToCreate.notes);
  }
}

export default new ProductsAssertions();