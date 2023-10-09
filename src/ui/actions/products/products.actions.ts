import { BaseActions } from '../base.actions';
import ProductsPage from '../../pages/aqa_project/products/products.page';
import DeleteProductModalActions from './modals/delete-product-modal.actions';
import { IProduct, ToastMessage } from '../../../types/products.type';
import { productToastMessages } from '../../../data/products/product.data';
import DetailsProductModalPage from '../../pages/aqa_project/products/modals/details-product-modal.page';
import { arrayAsyncMethods } from '../../../utils/async_array_methods/array-async-methods';
import { modalParser } from '../../../utils/helpers';

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
    const modalInfo = await arrayAsyncMethods.map(modalElements, element => element.getText());
    const parsedInfo = await modalParser(modalInfo);
    return parsedInfo;
  }

  public async clickOnProductRowActionButton(productName: string, action: string) {
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
}

export default new ProductsActions();
