import { getNewProduct } from '../../data/products/product.data';
import ProductsController from '../controllers/products.controller';
import { IProduct } from '../../types/products.type';

class ApiProductsActions {
  public async createProduct(token: string, ...args) {
    const product = Object.assign(getNewProduct(), ...args);
    try {
      const response = await ProductsController.create({ token, data: product as IProduct });
      return response;
    } catch (error: any) {
      throw new Error('Error during creating product');
    }
  }
}

export default new ApiProductsActions();
