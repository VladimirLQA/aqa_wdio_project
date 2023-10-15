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

  public static addProduct(product: IProductResponse) {
    const productIndex = this.products.findIndex((p) => p.name === product.name);
    if (productIndex !== -1) this.updateProduct(product, productIndex);
    else this.products.push(product);
  }

  public static updateProduct(product: IProductResponse, productIndex: number = this.products.length - 1) {
    this.products[productIndex] = product;
  }

  public static getProduct(productName: string) {
    return this.products.find((product) => product.name === productName);
  }

  public static getAllProducts() {
    return this.products;
  }

  public static deleteProduct(productName: string) {
    const productIndex = this.products.findIndex((p) => p.name === productName)
    if(productIndex !== -1) return this.products.splice(productIndex, 1);
    else throw new Error('Product not found in storage');
  }
}
