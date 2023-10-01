import { IProduct } from '../../types/products.type';
import ProductsActions from '../../actions/products/products.actions';

class ProductsAssertions {
  public async verifyCreatedProductRow(expectedProduct: IProduct) {
    const actualProduct = await ProductsActions.getCreatedProductRow(expectedProduct.name);
    expect(actualProduct.name).toBe(expectedProduct.name);
    expect(actualProduct.price).toBe(`$${expectedProduct.price}`);
    expect(actualProduct.manufacturer).toBe(expectedProduct.manufacturer);
  }
}

export default new ProductsAssertions();