import ApiProductsAssertions from '../../../api/api_assertions/api-products.assertions.js';
import { CREATE_PRODUCT_SCHEMA } from '../../../data/json_schemas/products.schema.js';
import { generateProduct } from '../../../data/products/product.data.js';
import { IProduct, IProductFromResponse } from '../../../types/products.types.js';
import Expect from '../../../utils/chai-expect/expect-collection.js';
import { expect } from 'chai';
import { ApiActions } from '../../../api/api_actions/api-actions.index.js';
import { STATUS_CODES } from '../../../types/http.types.js';
import { IResponse } from '../../../types/api-request.type.js';

describe('[CRUD] PRODUCTS test', () => {
  let token: string, productID: string, createdProduct: IProductFromResponse | IProduct;
  let response: IResponse;

  before(async () => {
    token = await ApiActions.signIn.signInAsAdminAndGetToken();
  });

  context('[CRUD] test', () => {
    it('Should create product', async () => {
      createdProduct = generateProduct();

      response = await ApiActions.products.createProduct(token, createdProduct);

      ApiProductsAssertions.verifyResponse(response, STATUS_CODES.CREATED, true, null);
      ApiProductsAssertions.verifyResponseSchema(CREATE_PRODUCT_SCHEMA, response.data);
      ApiProductsAssertions.verifyProduct(response.data.Product, createdProduct);
      productID = response.data.Product._id;
    });

    it('Should get created product by id', async () => {
      response = await ApiActions.products.getProductByID(token, productID);

      ApiProductsAssertions.verifyResponse(response, STATUS_CODES.OK, true, null);
    });

    it('Should update product', async () => {
      const updatedProduct = generateProduct();

      const response = await ApiActions.products.updateProduct(token, productID, updatedProduct);

      ApiProductsAssertions.verifyResponse(response, STATUS_CODES.OK, true, null);
      ApiProductsAssertions.verifyProduct(response.data.Product, updatedProduct);
    });

    it('Should get all products', async () => {
      response = await ApiActions.products.getAllProducts(token);

      ApiProductsAssertions.verifyResponse(response, STATUS_CODES.OK, true, null);
      Expect.toBeNotEmpty({ actual: response.data.Products });
      expect(response.data.Products).to.be.an('array');
    });

    it('Should delete product by id', async () => {
      response = await ApiActions.products.deleteProduct(token, productID);
      ApiProductsAssertions.verifyResponse(response, STATUS_CODES.NO_CONTENT);

      response = await ApiActions.products.getProductByID(token, productID);
      ApiProductsAssertions.verifyResponse(response, STATUS_CODES.NOT_FOUND, false, `Product with id '${productID}' wasn't found`);
    });
  });
});
