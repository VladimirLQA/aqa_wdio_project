import ApiProductsActions from '../../../api/api_actions/api-products.actions.js';
import ApiSignInActions from '../../../api/api_actions/api-sign-in.actions.js';
import ApiProductsAssertions from '../../../api/api_assertions/api-products.assertions.js';
import { IProductResponse } from '../../../api/type/api.product.type.js';
import { CREATE_PRODUCT_SCHEMA } from '../../../data/json_schemas/products.schema.js';
import { getNewProduct } from '../../../data/products/product.data.js';
import { IProduct } from '../../../ui/types/products.types.js';
import { AxiosResponse } from 'axios';
import Expect from '../../../utils/chai-expect/expect-collection.js';
import { expect } from 'chai';
import { ApiActions } from '../../../api/api_actions/api-actions.index.js';

describe('[CRUD] PRODUCTS test', () => {
  let token: string, id: string, createdProduct: IProductResponse | IProduct;
  let response: AxiosResponse;

  before(async () => {
    token = await ApiActions.signIn.signInAsAdminAndGetToken();
  });

  context('[CRUD] test', () => {
    it('Should create product', async () => {
      createdProduct = getNewProduct();

      response = await ApiActions.products.createProduct(token, createdProduct);

      ApiProductsAssertions.verifyResponse(response, 201, true, null);
      ApiProductsAssertions.verifyResponseSchema(CREATE_PRODUCT_SCHEMA, response.data);
      ApiProductsAssertions.verifyProduct(response.data.Product, createdProduct);
      id = response.data.Product._id;
    });

    it('Should get created product by id', async () => {
      response = await ApiActions.products.getProductByID(token, id);

      ApiProductsAssertions.verifyResponse(response, 200, true, null);
    });

    it('Should update product', async () => {
      const updatedProduct = getNewProduct();

      const response = await ApiActions.products.updateProduct(token, id, updatedProduct);

      ApiProductsAssertions.verifyResponse(response, 200, true, null);
      ApiProductsAssertions.verifyProduct(response.data.Product, updatedProduct);
    });

    it('Should get all products', async () => {
      response = await ApiActions.products.getAllProducts(token);

      ApiProductsAssertions.verifyResponse(response, 200, true, null);
      Expect.toBeNotEmpty({ actual: response.data.Products });
      expect(response.data.Products).to.be.an('array');
    });

    it('Should delete product by id', async () => {
      response = await ApiActions.products.deleteProduct(token, id);
      ApiProductsAssertions.verifyResponse(response, 204);

      response = await ApiActions.products.getProductByID(token, id);
      ApiProductsAssertions.verifyResponse(
        response,
        404,
        false,
        `Product with id '${id}' wasn't found`,
      );
    });
  });
});
