import ProductsController from '../../../api/controllers/products.controller';
import { reqAsLoggedUser } from '../../../api/request/request-as-logged-user';
import { IProductResponse } from '../../../api/type/api.product.type';
import { getNewProduct } from '../../../data/products/product.data';
import HomeActions from '../../../ui/actions/home.actions';
import DetailsModalActions from '../../../ui/actions/modals/details-modal.actions';
import AddNewProductActions from '../../../ui/actions/products/add-new-product.actions';
import ProductsActions from '../../../ui/actions/products/products.actions';
import SignInActions from '../../../ui/actions/sign-in.actions';
import ProductsAssertions from '../../../ui/assertions/products_assertions/products.assertions';
import { IProduct } from '../../../ui/types/products.types';

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
      console.log(id);
      await reqAsLoggedUser(ProductsController.delete, { data: { _id: id } });
    }
  });

  it('Should create product and validate in table of products', async () => {
    productToCreate = getNewProduct();
    productsNames.push(productToCreate.name);

    await ProductsActions.openAddNewProductPage();
    await AddNewProductActions.createProduct(productToCreate);
    await ProductsActions.closeToastMessage();
    await ProductsAssertions.verifyCreatedProductRow(productToCreate);
  });

  it('Should create product and validate in details modal window', async () => {
    productToCreate = getNewProduct();
    productsNames.push(productToCreate.name);

    await ProductsActions.openAddNewProductPage();
    await AddNewProductActions.createProduct(productToCreate);
    await ProductsActions.closeToastMessage();
    await ProductsActions.clickOnProductRowActionButton(productToCreate.name, 'Details');
    await ProductsAssertions.verifyCreatedEntityInDetailModal(productToCreate);
    await DetailsModalActions.clickOnCloseModalButton();
  });
});
