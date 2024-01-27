import { getNewProduct } from '../../data/products/product.data.js';
import { IProduct } from '../../ui/types/products.types.js';
import { productsStorage } from '../../utils/storages/storages.js';
import ProductsController from '../controllers/products.controller.js';
import { reqAsLoggedUser } from '../request/request-as-logged-user.js';

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
        _id: id,
        name,
        manufacturer,
        amount,
        price,
        notes,
        ...newProduct,
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

  async createProducts(count: number) {
    for (let i = 1; i <= count; i++) {
      const product = getNewProduct();
      productsStorage.addEntity((await reqAsLoggedUser(ProductsController.create, { data: product })).data.Product);
    }
    return productsStorage.getAllEntities();
  }
}

export default new ApiProductsActions();
