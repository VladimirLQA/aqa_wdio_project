import { IProductResponse } from '../../api/type/api.product.type';

export class ProductsStorage {
  private static instance: ProductsStorage;
  public static products: IProductResponse[] = [];

  constructor() {
    if (ProductsStorage.instance) {
      return ProductsStorage.instance;
    }
    ProductsStorage.instance = this;
  }

  static addProduct<T>(product: T): void {
    const productIndex = this.findProductIndexByName(product.name);
    productIndex !== -1
      ? this.updateProduct(product, product.name)
      : this.products.push(product);
  }

  static updateProduct(product: IProductResponse, productName: string): void {
    const productIndex = this.findProductIndexByName(productName);
    productIndex !== -1
      ? this.products[productIndex] = product
      : console.error('Product not found');
  }

  static getProduct(productName: string) {
    const productIndex = this.findProductIndexByName(productName);
    return this.products[productIndex];
  }

  static getAllProducts(): IProductResponse[] {
    return this.products;
  }

  static deleteProduct(productName: string): void {
    const productIndex = this.findProductIndexByName(productName);
     productIndex !== -1
      ? this.products.splice(productIndex, 1)
      : console.error('Product not found in storage');
  }

  private static findProductIndexByName(productName: string): number {
    return this.products.findIndex((p) => p.name === productName);
  }
}
