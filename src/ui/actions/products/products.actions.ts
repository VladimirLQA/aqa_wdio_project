import ProductsPage from '../../pages/aqa_project/products/products.page';
import { IProduct, ToastMessage } from '../../types/products.types';
import { getNewProduct, productToastMessages } from '../../../data/products/product.data';
import ApiProductsActions from '../../../api/api_actions/api-products.actions';
import ApiProductsAssertions from '../../../api/api_assertions/api-products.assertions';
import { ProductsStorage } from '../../../utils/storages/products.storage';
import { ActionButtons } from '../../types/common.types';
import { IProductResponse } from '../../../api/type/api.product.type';
import { logAction } from '../../../utils/reporter/allure.reporter';
import { CommonActions } from '../common.actions';
import DeleteModalActions from '../modals/delete-modal.actions';


class ProductsActions extends CommonActions {

  @logAction('Wait for page loading')
  async openAddNewProductPage() {
    await ProductsPage.waitForElemAndClick(ProductsPage['Add product button']);
    await this.waitForPageLoad();
  }

  @logAction('Get created product row "name, price, manufacturer"')
  async getCreatedProductRow(productName: string) {
    return {
      name: await ProductsPage.waitForElemAndGetText(ProductsPage['Name by table row'](productName)),
      price: await ProductsPage.waitForElemAndGetText(ProductsPage['Price by table row'](productName)),
      manufacturer: await ProductsPage.waitForElemAndGetText(ProductsPage['Manufacturer by table row'](productName)),
    };
  }

  @logAction('Click on product row action button')
  async clickOnProductRowActionButton(productName: string, action: ActionButtons) {
    await ProductsPage.waitForElemAndClick(ProductsPage['Table row action button'](productName, action));
    await this.waitForPageLoad();
  }

  @logAction('Click on delete product button')
  async deleteProduct(productName: string) {
    await this.clickOnProductRowActionButton(productName, 'Delete');
    await DeleteModalActions.clickOnDeleteButton();
    await this.waitForPageLoad();
  }

  async getProductToastText(text: ToastMessage, name?: string) {
    const toastMessage = productToastMessages[text];
    return toastMessage(name) || (text === 'already exist' && !name ? `Name was not provided` : 'Text was not provided');
  }

  async createProductAPI(customParams?: Partial<IProduct>) {
    const product = getNewProduct(customParams);
    const token = await this.getToken();
    const response = await ApiProductsActions.createProduct(token, product);
    await ApiProductsAssertions.verifyResponse(response, 201, true, null);
    ProductsStorage.addProduct<IProductResponse>(response.data.Product);
    return response.data.Product;
  }

}

export default new ProductsActions();
