import { IProductResponse } from '../../api/type/api.product.type';
import { IProduct } from '../../ui/types/products.types';
import { CombinedType, Storage } from './abstract.storage';

class ProductsStorage extends Storage<IProduct & IProductResponse> {
  protected storage: (IProduct & IProductResponse)[] = [];

  addEntity(product: IProductResponse & IProduct): void {
    const productIndex = this.findEntityIndex(product.name);
    productIndex !== -1 ? this.updateEntity(product, product.name) : this.storage.push(product);
  }

  updateEntity(updatedProduct: IProduct & IProductResponse, productName: string): void {
    const productIndex = this.findEntityIndex(productName);
    productIndex !== -1 ? (this.storage[productIndex] = updatedProduct) : console.log('Product was not found');
  }

  deleteEntity(productName: string): void {
    const productIndex = this.findEntityIndex(productName);
    productIndex !== -1 ? this.storage.splice(productIndex, 1) : console.log('Product was not found');
  }

  getAllEntities() {
    return this.storage;
  }

  getEntity(productName: string) {
    const productIndex = this.findEntityIndex(productName);
    return productIndex !== -1 ? this.storage[productIndex] : console.log(`Product was not found`);
  }

  protected findEntityIndex(productName: string): number {
    return this.storage.findIndex((product) => product.name === productName);
  }
}

export default new ProductsStorage();
