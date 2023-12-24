import ApiProductsActions from '../../../api/api_actions/api-products.actions';
import ApiSignInActions from '../../../api/api_actions/api-sign-in.actions';
import ApiProductsAssertions from '../../../api/api_assertions/api-products.assertions';
import ProductsController from '../../../api/controllers/products.controller';
import { reqAsLoggedUser } from '../../../api/request/request-as-logged-user';
import { IProductResponse } from '../../../api/type/api.product.type';
import { getNewProduct } from '../../../data/products/product.data';
import { productData } from '../../../data/products/products-test.data';
import { productsStorage } from '../../../utils/storages/storages';

describe('Smoke api test', () => {
  let token: string;

  before(async () => {
    token = await ApiSignInActions.signInAsAdminAndGetToken();
  });
  beforeEach(async () => {});

  after(async () => {
    for (const product of productsStorage.getAllEntities()) {
      await reqAsLoggedUser(ProductsController.delete, { data: { _id: product._id } });
    }
  });

  xit('....', async () => {
    const ids = (await ApiProductsActions.getAllProducts(token)).data.Products.map((product: IProductResponse) => product._id);

    for (const id of ids) {
      const response = await ApiProductsActions.deleteProduct(token, id);
      console.log(response.status);
    }
  });

  context('Tests with valid data', () => {
    for (const product of productData.valid.name) {
      it(`Should create product with name: '${product.description}'`, async () => {
        const response = await ApiProductsActions.createProduct(token, getNewProduct(product));
        await ApiProductsAssertions.verifyResponse(response, 201, true, null);

        productsStorage.addEntity(response.data.Product);
      });
    }

    for (const product of productData.valid.price) {
      it(`Should create product with price: '${product.description}'`, async () => {
        const response = await ApiProductsActions.createProduct(token, getNewProduct(product));
        await ApiProductsAssertions.verifyResponse(response, 201, true, null);

        productsStorage.addEntity(response.data.Product);
      });
    }

    for (const product of productData.valid.amount) {
      it(`Should create product with amount: '${product.amount}'`, async () => {
        const response = await ApiProductsActions.createProduct(token, getNewProduct(product));
        await ApiProductsAssertions.verifyResponse(response, 201, true, null);

        productsStorage.addEntity(response.data.Product);
      });
    }

    for (const product of productData.valid.manufacturer) {
      it(`Should create product with manufacturer: '${product.manufacturer}'`, async () => {
        const response = await ApiProductsActions.createProduct(token, getNewProduct(product));
        await ApiProductsAssertions.verifyResponse(response, 201, true, null);

        productsStorage.addEntity(response.data.Product);
      });
    }

    for (const product of productData.valid.notes) {
      it(`Should create product with notes: '${product.notes}'`, async () => {
        const response = await ApiProductsActions.createProduct(token, getNewProduct(product));
        await ApiProductsAssertions.verifyResponse(response, 201, true, null);

        productsStorage.addEntity(response.data.Product);
      });
    }
  });
});
