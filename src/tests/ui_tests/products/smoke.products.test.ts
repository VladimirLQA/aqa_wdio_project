import SignInActions from '../../../ui/actions/sign-in.actions';
import HomeActions from '../../../ui/actions/home.actions';
import ProductsActions from '../../../ui/actions/products/products.actions';
import AddNewProductActions from '../../../ui/actions/products/add-new-product.actions';
import { errorToastMessage, getNewProduct } from '../../../data/products/product.data';
import ProductsAssertions from '../../../ui/assertions/products_assertions/products.assertions';
import { IProduct } from '../../../ui/types/products.type';
import ProductsController from '../../../api/controllers/products.controller';
import { reqAsLoggedUser } from '../../../api/request/request-as-logged-user';
import { ProductsStorage } from '../../../utils/storages/products.storage';
import AddNewProductPage from '../../../ui/pages/aqa_project/products/add-new-product.page';
import AddNewProductAssertions from '../../../ui/assertions/products_assertions/add-new-product.assertions';


describe('', () => {
  let productToCreate: IProduct;
  before('Prepare to test', async () => {
    await SignInActions.openSalesPortal();
    await SignInActions.signIn();
    await HomeActions.openProductsPage();
  });

  afterEach('', async () => {
    for (const product of ProductsStorage.getAllProducts()) {
      await reqAsLoggedUser(ProductsController.delete, { data: { name: product.name } });
    }
  });

  xit('Should create product and validate in table of products', async () => {
    productToCreate = getNewProduct({ price: 888 });
    await ProductsActions.openAddNewProductPage();
    await AddNewProductActions.createProduct(productToCreate);
    await ProductsAssertions.verifyProductToastText('created');
    await ProductsAssertions.verifyCreatedProductRow(productToCreate);
  });

  xit('Should create product and validate in details modal window', async () => {
    productToCreate = getNewProduct();
    await ProductsActions.openAddNewProductPage();
    await AddNewProductActions.createProduct(productToCreate);
    await ProductsAssertions.verifyProductToastText('created');
    await ProductsActions.clickOnProductRowActionButton(productToCreate.name, 'Details');
    await ProductsAssertions.verifyCreatedProductInDetailModal(productToCreate);
    await ProductsActions.closeModalWindow();
  });

  xit('Validate products in table', async () => {
    const tableData = await ProductsActions.getParsedTableData();
    const apiProducts = await reqAsLoggedUser(ProductsController.get, {});
    console.log(apiProducts);
  });

  it('Should get api error response after sending invalid data', async () => {
    productToCreate = getNewProduct({ name: '   sdsds  sd', price: 1111112, amount: 12312312, notes: '_+><>'});
    ProductsStorage.addProduct(productToCreate);
    await ProductsActions.openAddNewProductPage();
    await AddNewProductActions.fillProductInputs(productToCreate);
    await AddNewProductActions.enableButton(AddNewProductPage['Save New Product button']);
    await AddNewProductActions.clickOnSaveNewProductButton();
    await AddNewProductAssertions.verifyToastMessage(errorToastMessage);
  });

});
