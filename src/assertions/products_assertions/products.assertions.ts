import { IProduct } from '../../types/products.type';
import ProductsActions from '../../actions/products/products.actions';
import { BaseAssertions } from '../base.assertions';

class ProductsAssertions extends BaseAssertions {
  public async verifyCreatedProductRow(expectedProduct: IProduct) {
    const actualProduct = await ProductsActions.getCreatedProductRow(expectedProduct.name);
    expect(actualProduct.name).toBe(expectedProduct.name);
    expect(actualProduct.price).toBe(`$${expectedProduct.price}`);
    expect(actualProduct.manufacturer).toBe(expectedProduct.manufacturer);
  }

  public async verifyProductToastText(text: string) {
    await this.verifyElementText(this.basePage['Toast body'], await ProductsActions.getProductToastText(text));
    await this.baseActions.closeToastMessage();
  }
}

export default new ProductsAssertions();