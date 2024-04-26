import { ApiActions } from '../../../api-core/api_actions/api-actions.index.js';
import ApiProductsAssertions from '../../../api-core/api_assertions/api-products.assertions.js';
import { ControllersList } from '../../../api-core/controllers/contollers.index.js';
import { reqAsLoggedUser } from '../../../api-core/request/request-as-logged-user.js';
import { STATUS_CODES } from '../../../types/http.types.js';
import { generateProduct, productToastMessages } from '../../../data/products/product.data.js';
import { productData } from '../../../data/products/products-test.data.js';
import { VALIDATION_ERROR_MESSAGES } from '../../../types/common.types.js';
import { productsStorage } from '../../../utils/storages/storages.js';

describe('Product validation data', () => {
  let token: string;

  before(async () => {
    token = await ApiActions.signIn.signInAsAdminAndGetToken();
  });
  beforeEach(async () => {});

  after(async () => {
    for (const product of productsStorage.getAllEntities()) {
      await reqAsLoggedUser(ControllersList.products.delete, { data: { _id: product._id } });
    }
  });

  context('Tests with valid data', () => {
    for (const productName of productData.valid.name) {
      it(`Should create product with name: '${productName.description}'`, async () => {
        const response = await ApiActions.products.createProduct(token, generateProduct({ name: productName.name }));

        ApiProductsAssertions.verifyResponse(response, STATUS_CODES.CREATED, true, null);
        productsStorage.addEntity(response.data.Product);
      });
    }

    for (const productPrice of productData.valid.price) {
      it(`Should create product with price: '${productPrice.description}'`, async () => {
        const response = await ApiActions.products.createProduct(token, generateProduct({ price: productPrice.price }));

        ApiProductsAssertions.verifyResponse(response, STATUS_CODES.CREATED, true, null);
        productsStorage.addEntity(response.data.Product);
      });
    }

    for (const productAmount of productData.valid.amount) {
      it(`Should create product with amount: '${productAmount.amount}'`, async () => {
        const response = await ApiActions.products.createProduct(token, generateProduct({ amount: productAmount.amount }));

        ApiProductsAssertions.verifyResponse(response, STATUS_CODES.CREATED, true, null);
        productsStorage.addEntity(response.data.Product);
      });
    }

    for (const productManufacturer of productData.valid.manufacturer) {
      it(`Should create product with manufacturer: '${productManufacturer.manufacturer}'`, async () => {
        const response = await ApiActions.products.createProduct(token, generateProduct({ manufacturer: productManufacturer.manufacturer }));

        ApiProductsAssertions.verifyResponse(response, STATUS_CODES.CREATED, true, null);
        productsStorage.addEntity(response.data.Product);
      });
    }

    for (const productNotes of productData.valid.notes) {
      it(`Should create product with notes: '${productNotes.notes}'`, async () => {
        const response = await ApiActions.products.createProduct(token, generateProduct({ notes: productNotes.notes }));

        ApiProductsAssertions.verifyResponse(response, STATUS_CODES.CREATED, true, null);
        productsStorage.addEntity(response.data.Product);
      });
    }
  });

  context('Tests with invalid data', () => {
    for (const productName of productData.invalid.name) {
      it(`Should not create product with name: ${productName.description}`, async () => {
        const response = await ApiActions.products.createProduct(token, generateProduct({ name: productName.name }));

        ApiProductsAssertions.verifyResponse(response, STATUS_CODES.BAD_REQUEST, false, VALIDATION_ERROR_MESSAGES.INCORRECT_BODY);
      });
    }

    it('Should not create product with existed name', async () => {
      const product = generateProduct();
      const preparedProduct = await ApiActions.products.createProduct(token, product);
      const response = await ApiActions.products.createProduct(token, product);

      ApiProductsAssertions.verifyResponse(response, STATUS_CODES.CONFLICT, false, productToastMessages['already exist'](product.name));
      productsStorage.addEntity(preparedProduct.data.Product);
    });

    for (const productPrice of productData.invalid.price) {
      it(`Should not create product with price: ${productPrice.description}`, async () => {
        const response = await ApiActions.products.createProduct(token, generateProduct({ price: productPrice.price }));

        ApiProductsAssertions.verifyResponse(response, STATUS_CODES.BAD_REQUEST, false, VALIDATION_ERROR_MESSAGES.INCORRECT_BODY);
      });
    }

    for (const productAmount of productData.invalid.amount) {
      it(`Should not create product with amount: ${productAmount.description}`, async () => {
        const response = await ApiActions.products.createProduct(token, generateProduct({ amount: productAmount.amount }));

        ApiProductsAssertions.verifyResponse(response, STATUS_CODES.BAD_REQUEST, false, VALIDATION_ERROR_MESSAGES.INCORRECT_BODY);
      });
    }

    for (const productNotes of productData.invalid.notes) {
      it(`Should not create product with notes: ${productNotes.description}`, async () => {
        const response = await ApiActions.products.createProduct(token, generateProduct({ notes: productNotes.notes }));

        ApiProductsAssertions.verifyResponse(response, STATUS_CODES.BAD_REQUEST, false, VALIDATION_ERROR_MESSAGES.INCORRECT_BODY);
      });
    }

    for (const productManufacturer of productData.invalid.manufacturer) {
      it(`Should not create product with manufacturer: ${productManufacturer.description}`, async () => {
        const response = await ApiActions.products.createProduct(token, generateProduct({ manufacturer: productManufacturer.manufacturer }));
        console.log('data', response.data);
        console.log(response.status);

        ApiProductsAssertions.verifyResponse(response, STATUS_CODES.BAD_REQUEST, false, VALIDATION_ERROR_MESSAGES.INCORRECT_BODY);
      });
    }
  });
});
