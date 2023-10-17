import SignInActions from '../../../ui/actions/sign-in.actions';
import HomeActions from '../../../ui/actions/home.actions';
import ProductsActions from '../../../ui/actions/products/products.actions';
import AddNewProductActions from '../../../ui/actions/products/add-new-product.actions';
import { getNewProduct } from '../../../data/products/product.data';
import ProductsAssertions from '../../../ui/assertions/products_assertions/products.assertions';
import { IProduct } from '../../../ui/types/products.type';


describe('', () => {
  let productToCreate: IProduct;
  before('Prepare to test', async () => {
    await SignInActions.openSalesPortal();
    await SignInActions.signIn();
    await HomeActions.openProductsPage();
  });

  afterEach('', async () => {
    await ProductsActions.deleteProduct(productToCreate.name);
   await ProductsAssertions.verifyProductToastText('deleted');
  });

  it('Should create product and validate in table of products', async () => {
    productToCreate = getNewProduct();
    await ProductsActions.openAddNewProductPage();
    await AddNewProductActions.createProduct(productToCreate, {price: 888});
    await ProductsAssertions.verifyProductToastText('created');
    await ProductsAssertions.verifyCreatedProductRow(productToCreate);
  });

  it('Should create product and validate in details modal window', async () => {
    productToCreate = getNewProduct();
    await ProductsActions.openAddNewProductPage();
    await AddNewProductActions.createProduct(productToCreate);
    await ProductsAssertions.verifyProductToastText('created');
    await ProductsActions.clickOnProductRowActionButton(productToCreate.name, 'Details');
    await ProductsAssertions.verifyCreatedProductInDetailModal(productToCreate);
    await ProductsActions.closeModalWindow();
  });

  xit('Validate products in table', async () => {
     const a = await ProductsActions.getParsedTableData();
    console.log(a);
  });



  // [...head].map((th) => th.textContent).filter((c) => c !== 'Actions')
});
