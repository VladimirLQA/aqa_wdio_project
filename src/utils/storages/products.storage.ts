import { IProductResponse } from '../../api/types/api.product.types';

export class ProductsStorage {
  private static instance: ProductsStorage;
  public static products: IProductResponse[] = [];

  constructor() {
    if (ProductsStorage.instance) {
      return ProductsStorage.instance;
    }
    ProductsStorage.instance = this;
  }

  public static addProduct<T>(product: T): void {
    const productIndex = this.findProductIndexByName(product.name);
    productIndex !== -1 ? this.updateProduct(product, product.name) : this.products.push(product);
  }

  public static updateProduct(product: IProductResponse, productName: string): void {
    const productIndex = this.findProductIndexByName(productName);
    productIndex !== -1 ? this.products[productIndex] = product : console.error('Product not found');
  }

  public static getProduct(productName: string) {
    const productIndex = this.findProductIndexByName(productName);
    return this.products[productIndex];
  }

  public static getAllProducts(): IProductResponse[] {
    return this.products;
  }

  public static deleteProduct(productName: string): void {
    const productIndex = this.findProductIndexByName(productName);
     productIndex !== -1
      ? this.products.splice(productIndex, 1)
      : console.error('Product not found in storage');
  }

  private static findProductIndexByName(productName: string): number {
    return this.products.findIndex((p) => p.name === productName);
  }
}
