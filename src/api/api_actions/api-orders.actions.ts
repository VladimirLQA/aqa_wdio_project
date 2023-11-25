import ProductsController from '../controllers/products.controller';
import { IProduct } from '../../ui/types/products.types';


// TODO refact for order controller
class ApiProductsActions {
  async createProduct(token: string, product: IProduct) {

    try {
      const response = await ProductsController.create({ token, data: product });
      return response;
    } catch (error: any) {
      throw new Error('Error during creating product');
    }
  }

  async getAllProducts(token: string) {
    try {
      const response = await ProductsController.get({ token });
      return response;
    } catch (error) {
      throw new Error('Error while getting all products');
    }
  }

  async deleteProduct(token: string, id: string) {
    try {
      const response = await ProductsController.delete({ token, data: { _id: id } });
      return response;
    } catch (error) {
      throw new Error('Error while deleting product');
    }
  }

  async updateProduct(token: string, id: string, newProduct?: Partial<IProduct>) {
    try {
      const { name, manufacturer, amount, price, notes } = (await this.getProductByID(token, id)).data.Product;
      const updatedProduct = {
        _id: id, name, manufacturer, amount, price, notes, ...newProduct,
      };

      const response = await ProductsController.update({ token, data: updatedProduct });
      return response;
    } catch (error) {
      throw new Error('Error while updating product');
    }
  }

  async getProductByID(token: string, id: string) {
    try {
      const response = await ProductsController.get({ token, data: { _id: id } });
      return response;
    } catch (error) {
      throw new Error('Error while getting product by id');
    }
  }
}

export default new ApiProductsActions();
