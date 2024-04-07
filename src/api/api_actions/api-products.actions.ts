import { generateProduct } from '../../data/products/product.data.js';
import { IProduct } from '../../types/products.types.js';
import { productsStorage } from '../../utils/storages/storages.js';
import ProductsController from '../controllers/products.controller.js';
import { reqAsLoggedUser } from '../request/request-as-logged-user.js';

class ApiProductsActions {
  async createProduct(token: string, product?: IProduct) {
    const productData = generateProduct(product);
    const response = await ProductsController.create({ token, data: productData });
    return response;
  }

  async getAllProducts(token: string) {
    const response = await ProductsController.getAll({ token });
    return response;
  }

  async deleteProduct(token: string, id: string) {
    const response = await ProductsController.delete({ token, data: { _id: id } });
    return response;
  }

  async updateProduct(token: string, id: string, newProduct?: Partial<IProduct>) {
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
  }

  async getProductByID(token: string, id: string) {
    const response = await ProductsController.get({ token, data: { _id: id } });
    return response;
  }

  async createProducts(count: number) {
    for (let i = 1; i <= count; i++) {
      const product = generateProduct();
      productsStorage.addEntity((await reqAsLoggedUser(ProductsController.create, { data: product })).data.Product);
    }
    return productsStorage.getAllEntities();
  }
}

export default new ApiProductsActions();
