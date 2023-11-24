import ApiSignInActions from '../../../api/api_actions/api-sign-in.actions';
import ApiProductsActions from '../../../api/api_actions/api-products.actions';
import { getNewProduct, MANUFACTURERS } from '../../../data/products/product.data';
import ApiProductsAssertions from '../../../api/api_assertions/api-products.assertions';
import { CREATE_PRODUCT_SCHEMA } from '../../../data/json_schemas/products.schema';
import { IProductResponse } from '../../../api/type/api.product.type';
import { IProduct } from '../../../ui/types/products.types';


describe('Smoke products test', () => {
  let token: string, id: string, createdProduct: IProductResponse | IProduct;

  before(async () => {
    token = await ApiSignInActions.signInAsAdminAndGetToken();
  });

  context('Default flow', () => {

    it('Should create product', async () => {
      createdProduct = getNewProduct();

      const response = await ApiProductsActions.createProduct(token, createdProduct);
      await ApiProductsAssertions.verifyResponse(response, 201, true, null);
      await ApiProductsAssertions.verifyResponseSchema(CREATE_PRODUCT_SCHEMA, response.data);

      id = response.data.Product._id;
    });

    it('Should get created product by id', async () => {
      const response = await ApiProductsActions.getProductByID(token, id);
      await ApiProductsAssertions.verifyResponse(response, 200, true, null);
      await ApiProductsAssertions.verifyResponseSchema(CREATE_PRODUCT_SCHEMA, response.data);
      await ApiProductsAssertions.verifyProduct(response.data.Product, createdProduct);
    });

    it('Should update product by id', async () => {
      const forUpdate = {
        name: 'Updated name', notes: 'Updated notes', amount: 1, price: 1, manufacturer: MANUFACTURERS.AMAZON,
      };

      const response = await ApiProductsActions.updateProduct(token, id, forUpdate);
      await ApiProductsAssertions.verifyResponse(response, 200, true, null);
      await ApiProductsAssertions.verifyProduct(response.data.Product, forUpdate);
    });

    it('Should delete product by id', async () => {
      const response = await ApiProductsActions.deleteProduct(token, id);
      await ApiProductsAssertions.verifyResponse(response, 204);
    });

    it('Should verify that product is deleted from server', async () => {
      const response = await ApiProductsActions.getProductByID(token, id);
      await ApiProductsAssertions.verifyResponse(response, 404, false , `Product with id '${id}' wasn't found`);
    });
  });
});