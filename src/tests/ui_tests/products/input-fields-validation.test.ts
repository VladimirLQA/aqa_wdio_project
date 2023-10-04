import SignInActions from '../../../actions/sign-in.actions';
import HomeActions from '../../../actions/home.actions';
import ProductsActions from '../../../actions/products/products.actions';
import AddNewProductActions from '../../../actions/products/add-new-product.actions';
import AddNewProductPage from '../../../pages/aqa_project/products/add-new-product.page';
import { isAttributeContainClass } from '../../../utils/helpers';
import { productInputs } from '../../../data/products/product.data'

describe('', () => {
  before('Prepare to test', async () => {
    await SignInActions.openSitePage();
    await SignInActions.signIn();
    await HomeActions.openProductsPage();
    await ProductsActions.openAddNewProductPage();
  });

  after('', async () => {
    // await ProductsActions.deleteProduct(newProduct.name);
    // await ProductsAssertions.verifyProductToastText('deleted');
  });

  context('Positive tests on input fields validation', async () => {

    for (const product of productInputs.positiveDataNameField) {
      it(`Should create product with name: '${product.name}'`, async () => {
        await AddNewProductActions.fillProductInputField(AddNewProductPage['Name input field'], product.name);
        const isValidInput = await isAttributeContainClass(AddNewProductPage['Name input field'], 'is-valid');
        expect(isValidInput).toBe(false);
      });
    }
  });
});
