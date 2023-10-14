import { IProductResponse } from '../../api/types/api.product.types';

export class ProductsStorage {
  private static instance: ProductsStorage;
  public static products: IProductResponse[] = [];

  private constructor() {
    if (ProductsStorage.instance) {
      return ProductsStorage.instance;
    }
    ProductsStorage.instance = this;
  }

  public static addProduct(product: IProductResponse) {
    const productIndex = this.products.findIndex((p) => p._id === product._id);
    if (productIndex !== -1) this.updateProduct(product, productIndex);
    else this.products.push(product);
  }

  public static updateProduct(product: IProductResponse, productIndex: number = this.products.length - 1) {
    this.products[productIndex] = product;
  }

  public static getProduct(productIndex: number = this.products.length - 1) {
    return this.products[productIndex];
  }

  public static getAllProducts() {
    return this.products;
  }

  public static deleteProduct(productIndex: number = this.products.length - 1) {
    return this.products.splice(productIndex, 1);
  }
}

// export default new ProductsStorage;