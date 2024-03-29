import ProductsController from '../../../api/controllers/products.controller.js';
import { reqAsLoggedUser } from '../../../api/request/request-as-logged-user.js';
import { IProductResponse } from '../../../api/type/api.product.type.js';
import { getNewProduct } from '../../../data/products/product.data.js';
import HomeActions from '../../../ui/actions/home.actions.js';
import AddNewProductActions from '../../../ui/actions/products/add-new-product.actions.js';
import ProductsActions from '../../../ui/actions/products/products.actions.js';
import SignInActions from '../../../ui/actions/sign-in.actions.js';
import ProductsAssertions from '../../../ui/assertions/products_assertions/products.assertions.js';
import { IProduct } from '../../../ui/types/products.types.js';

describe('Smoke tests with creating product', () => {
  let productToCreate: IProduct,
    productsNames: string[] = [];
  before('Prepare to test', async () => {
    await SignInActions.openSalesPortal();
    await SignInActions.signIn();
    await HomeActions.openProductsPage();
  });

  after('Tear down', async () => {
    let ids: string[] = [];
    for (const productName of productsNames) {
      ids.push(
        (await reqAsLoggedUser(ProductsController.get, {})).data.Products.filter(
          (product: IProductResponse) => product.name === productName,
        ).map((el: IProductResponse) => el._id),
      );
    }
    for (const id of ids) {
      await reqAsLoggedUser(ProductsController.delete, { data: { _id: id } });
    }
  });

  it('Should create product and verify in table of products', async () => {
    productToCreate = getNewProduct();
    productsNames.push(productToCreate.name);

    await ProductsActions.clickOnAddProductButton();
    await AddNewProductActions.createProduct(productToCreate);
    await ProductsAssertions.verifyCreatedProductRow(productToCreate);
  });

  it('Should validate created product in details modal window', async () => {
    await ProductsActions.clickOnRowActionButton(productToCreate.name, 'Details');
    await ProductsAssertions.verifyCreatedEntityInDetailModal(productToCreate);
  });

  // TODO implement tests for update, delete + verify for each
});
