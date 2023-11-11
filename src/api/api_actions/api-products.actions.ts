import ProductsController from '../controllers/products.controller';
import { IProduct } from '../../ui/types/products.types';

class ApiProductsActions {
  public async createProduct(token: string, product: IProduct) {

    try {
      const response = await ProductsController.create({ token, data: product });
      return response;
    } catch (error: any) {
      throw new Error('Error during creating product');
    }
  }
}

export default new ApiProductsActions();
