import { reqAsLoggedUser } from '../../../api-core/request/request-as-logged-user.js';
import { generateProduct } from '../../../data/products/product.data.js';
import HomeActions from '../../../ui/actions/home.actions.js';
import AddNewProductActions from '../../../ui/actions/products/add-new-product.actions.js';
import ProductsActions from '../../../ui/actions/products/products.actions.js';
import SignInActions from '../../../ui/actions/sign-in.actions.js';
import ProductsAssertions from '../../../ui/assertions/products_assertions/products.assertions.js';
import { IProduct } from '../../../types/products.types.js';

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
    // for (const productName of productsNames) {
    //   ids.push(
    //     (await reqAsLoggedUser(ProductsController.get, {})).data.Products.filter(
    //       (product: IProductFromResponse) => product.name === productName,
    //     ).map((el: IProductFromResponse) => el._id),
    //   );
    // }
    // for (const id of ids) {
    //   await reqAsLoggedUser(ProductsController.delete, { data: { _id: id } });
    // }
  });

  it('Should create product and verify in table of products', async () => {
    productToCreate = generateProduct();
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
