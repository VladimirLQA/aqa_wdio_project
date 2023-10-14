import ProductsController from '../../../api/controllers/products.controller';
import { getNewProduct, productData } from '../../../data/products/product.data';
import ApiSignInActions from '../../../api/api_actions/api.sign-in.actions';
import ApiProductsActions from '../../../api/api_actions/api.products.actions';
import ApiProductsAssertions from '../../../api/api_assertions/api.products.assertions';
import { CREATE_PRODUCT_SCHEMA } from '../../../data/json_schemas/products.schema';

describe('Smoke api test', () => {
  let token: string;
  let productsArchive = [];

  before(async () => {
    token = await ApiSignInActions.signInAsAdminAndGetToken();
  });
  beforeEach(async () => {
  });
  after(async () => {
    for (const id of productsArchive) {
      await ProductsController.delete({ data: { _id: id }, token });
    }

  });

  context('Tests with valid data', () => {
    it('Should create product', async () => {
      const response = await ApiProductsActions.createProduct(token, getNewProduct());
      await ApiProductsAssertions.verifyResponse(response, 201, true, null);
      await ApiProductsAssertions.verifyResponseSchema(CREATE_PRODUCT_SCHEMA, response.data);
      productsArchive.push(response.data.Product._id);
    });

    for (const product of productData.valid.name) {
      it(`Should create product with name: '${product.name}'`, async () => {
        const response = await ApiProductsActions.createProduct(token, getNewProduct(product));
        await ApiProductsAssertions.verifyResponse(response, 201, true, null);
        productsArchive.push(response.data.Product._id);
      });
    }

    for (const product of productData.valid.price) {
      it(`Should create product with price: '${product.price}'`, async () => {
        const response = await ApiProductsActions.createProduct(token, getNewProduct(product), );
        await ApiProductsAssertions.verifyResponse(response, 201, true, null);
        productsArchive.push(response.data.Product._id);
      });
    }

    for (const product of productData.valid.amount) {
      it(`Should create product with amount: '${product.amount}'`, async () => {
        const response = await ApiProductsActions.createProduct(token, getNewProduct(product), );
        await ApiProductsAssertions.verifyResponse(response, 201, true, null);
        productsArchive.push(response.data.Product._id);
      });
    }

    for (const product of productData.valid.manufacturer) {
      it(`Should create product with manufacturer: '${product.manufacturer}'`, async () => {
        const response = await ApiProductsActions.createProduct(token, getNewProduct(product), );
        await ApiProductsAssertions.verifyResponse(response, 201, true, null);
        productsArchive.push(response.data.Product._id);
      });
    }

    for (const product of productData.valid.notes) {
      it(`Should create product with notes: '${product.notes}'`, async () => {
        const response = await ApiProductsActions.createProduct(token, getNewProduct(product), );
        await ApiProductsAssertions.verifyResponse(response, 201, true, null);
        productsArchive.push(response.data.Product._id);
      });
    }
  });
});