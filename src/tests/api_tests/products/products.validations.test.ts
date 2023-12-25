import ApiProductsActions from '../../../api/api_actions/api-products.actions';
import ApiSignInActions from '../../../api/api_actions/api-sign-in.actions';
import ApiProductsAssertions from '../../../api/api_assertions/api-products.assertions';
import ProductsController from '../../../api/controllers/products.controller';
import { reqAsLoggedUser } from '../../../api/request/request-as-logged-user';
import { IProductResponse } from '../../../api/type/api.product.type';
import { errorMessage, getNewProduct } from '../../../data/products/product.data';
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

  xcontext('Tests with valid data', () => {
    for (const productName of productData.valid.name) {
      it(`Should create product with name: '${productName.description}'`, async () => {
        const response = await ApiProductsActions.createProduct(token, getNewProduct({ name: productName.name }));
        console.log(response.data);
        await ApiProductsAssertions.verifyResponse(response, 201, true, null);

        productsStorage.addEntity(response.data.Product);
      });
    }

    for (const productPrice of productData.valid.price) {
      it(`Should create product with price: '${productPrice.description}'`, async () => {
        const response = await ApiProductsActions.createProduct(token, getNewProduct({ price: productPrice.price }));
        await ApiProductsAssertions.verifyResponse(response, 201, true, null);

        productsStorage.addEntity(response.data.Product);
      });
    }

    for (const productAmount of productData.valid.amount) {
      it(`Should create product with amount: '${productAmount.amount}'`, async () => {
        const response = await ApiProductsActions.createProduct(token, getNewProduct({ amount: productAmount.amount }));
        await ApiProductsAssertions.verifyResponse(response, 201, true, null);

        productsStorage.addEntity(response.data.Product);
      });
    }

    for (const productManufacturer of productData.valid.manufacturer) {
      it(`Should create product with manufacturer: '${productManufacturer.manufacturer}'`, async () => {
        const response = await ApiProductsActions.createProduct(
          token,
          getNewProduct({ manufacturer: productManufacturer.manufacturer }),
        );
        await ApiProductsAssertions.verifyResponse(response, 201, true, null);

        productsStorage.addEntity(response.data.Product);
      });
    }

    for (const productNotes of productData.valid.notes) {
      it(`Should create product with notes: '${productNotes.notes}'`, async () => {
        const response = await ApiProductsActions.createProduct(token, getNewProduct({ notes: productNotes.notes }));
        await ApiProductsAssertions.verifyResponse(response, 201, true, null);

        productsStorage.addEntity(response.data.Product);
      });
    }
  });

  context('Tests with invalid data', () => {
    for (const productName of productData.invalid.name) {
      it(`Should not create product with name: ${productName.description}`, async () => {
        const response = await ApiProductsActions.createProduct(token, getNewProduct({ name: productName.name }));
        await ApiProductsAssertions.verifyResponse(response, 400, false, errorMessage['incorrect request body']());
      });
    }

    it('Should not create product with existed name', async () => {
      const product = getNewProduct();
      const preparedProduct = await ApiProductsActions.createProduct(token, product);
      const response = await ApiProductsActions.createProduct(token, product);
      await ApiProductsAssertions.verifyResponse(response, 409, false, errorMessage['already exist'](product.name));

      productsStorage.addEntity(preparedProduct.data.Product);
    });

    for (const productPrice of productData.invalid.price) {
      it(`Should not create product with price: ${productPrice.description}`, async () => {
        const response = await ApiProductsActions.createProduct(token, getNewProduct({ price: productPrice.price }));
        await ApiProductsAssertions.verifyResponse(response, 400, false, errorMessage['incorrect request body']());
      });
    }
  });
});
