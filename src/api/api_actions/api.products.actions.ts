import { getNewProduct } from '../../data/products/product.data';
import ProductsController from '../controllers/products.controller';
import { IProduct } from '../../types/products.type';
import { prepareProduct } from '../../utils/helpers';

class ApiProductsActions {
  public async createProduct(token: string, product, ...args) {
    const p = prepareProduct(product, ...args);
    try {
      const response = await ProductsController.create({ token, data: p as IProduct });
      return response;
    } catch (error: any) {
      throw new Error('Error during creating product');
    }
  }
}

export default new ApiProductsActions();
