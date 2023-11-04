import ProductsPage from '../../pages/aqa_project/products/products.page';
import { IProduct, ToastMessage } from '../../types/products.types';
import { getNewProduct, productToastMessages } from '../../../data/products/product.data';
import ApiProductsActions from '../../../api/api_actions/api.products.actions';
import ApiProductsAssertions from '../../../api/api_assertions/api.products.assertions';
import { ProductsStorage } from '../../../utils/storages/products.storage';
import { ActionButtons } from '../../types/common.types';
import { IProductResponse } from '../../../api/types/api.product.types';
import { logAction } from '../../../utils/reporter/allure.reporter';
import { CommonActions } from '../common.actions';
import ModalActions from '../modal.actions';
import DeleteModalActions from '../modals/delete-modal.actions';

class ProductsActions extends CommonActions {

  @logAction('Wait for page loading')
  public async openAddNewProductPage() {
    await ProductsPage.waitForElemAndClick(ProductsPage['Add product button']);
    await this.waitForPageLoad();
  }


  public async getCreatedProductRow(productName: string) {
    return {
      name: await ProductsPage.waitForElemAndGetText(ProductsPage['Name by table row'](productName)),
      price: await ProductsPage.waitForElemAndGetText(ProductsPage['Price by table row'](productName)),
      manufacturer: await ProductsPage.waitForElemAndGetText(ProductsPage['Manufacturer by table row'](productName)),
    };
  }

  @logAction('Click on product row action button')
  public async clickOnProductRowActionButton(productName: string, action: ActionButtons) {
    await ProductsPage.waitForElemAndClick(ProductsPage['Table row action button'](productName, action));
    await this.waitForPageLoad();
  }

  @logAction('Click on delete product button')
  public async deleteProduct(productName: string) {
    await this.clickOnProductRowActionButton(productName, 'Delete');
    await DeleteModalActions.clickOnDeleteButton();
    await this.waitForPageLoad();
  }

  public async getProductToastText(text: ToastMessage, name?: string) {
    const toastMessage = productToastMessages[text];
    return toastMessage(name) || (text === 'already exist' && !name ? `Name was not provided` : 'Text was not provided');
  }

  public async createProductAPI(customParams?: Partial<IProduct>) {
    const product = getNewProduct(customParams);
    const token = await this.getToken();
    const response = await ApiProductsActions.createProduct(token, product);
    await ApiProductsAssertions.verifyResponse(response, 201, true, null);
    ProductsStorage.addProduct<IProductResponse>(response.data.Product);
    return response.data.Product;
  }

  @logAction('Click on filters button')
  public async clickOnFiltersButton() {
    await this.basePage.waitForElemAndClick(ProductsPage['Filter button']);
  }

  @logAction('Click on search button')
  public async clickOnSearchButton() {
    await this.basePage.waitForElemAndClick(ProductsPage['Search button']);
  }

  @logAction('Fill search input')
  public async fillSearchInput(searchValue: string) {
    await this.basePage.waitForElemAndSetValue(ProductsPage['Search input'], searchValue);
  }
}

export default new ProductsActions();
