import BaseActions from '../base.actions';
import ProductsPage from '../../pages/aqa_project/products/products.page';
import DeleteProductModalActions from './modals/delete-product-modal.actions';
import { IProduct, ToastMessage } from '../../types/products.type';
import { getNewProduct, productToastMessages } from '../../../data/products/product.data';
import DetailsProductModalPage from '../../pages/aqa_project/products/modals/details-product-modal.page';
import { asyncMap } from '../../../utils/async_array_methods/array-async-methods';
import { modalParser } from '../../../utils/helpers';
import ApiProductsActions from '../../../api/api_actions/api.products.actions';
import ApiProductsAssertions from '../../../api/api_assertions/api.products.assertions';
import { ProductsStorage } from '../../../utils/storages/products.storage';
import { ActionButtons } from '../../types/common.types';
import { IProductResponse } from '../../../api/types/api.product.types';

class ProductsActions extends BaseActions {
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

  public async getParsedProductModalInfo(): Promise<IProduct> {
    const modalElements = await DetailsProductModalPage.waitForElements(DetailsProductModalPage['Modal info']);
    const modalInfo = await asyncMap(modalElements, element => element.getText());
    const parsedInfo = await modalParser(modalInfo);
    return parsedInfo;
  }

  public async clickOnProductRowActionButton(productName: string, action: ActionButtons) {
    await ProductsPage.waitForElemAndClick(ProductsPage['Table row action button'](productName, action));
    await this.waitForPageLoad();
  }

  public async deleteProduct(productName: string) {
    await this.clickOnProductRowActionButton(productName, 'Delete');
    await DeleteProductModalActions.clickOnDeleteButton();
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

  public async clickOnFiltersButton() {
    await this.basePage.waitForElemAndClick(ProductsPage['Filter button']);
  }

  public async clickOnSearchButton() {
    await this.basePage.waitForElemAndClick(ProductsPage['Search button']);
  }

  public async fillSearchInput(searchValue: string) {
    await this.basePage.waitForElemAndSetValue(ProductsPage['Search input'], searchValue);
  }
}

export default new ProductsActions();
