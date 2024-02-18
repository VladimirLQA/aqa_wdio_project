import { productToastMessages } from '../../../data/products/product.data.js';
import { logAction } from '../../../utils/reporter/allure.reporter.js';
import ProductsPage from '../../pages/aqa_project/products/products.page.js';
import { ActionButtons } from '../../types/common.types.js';
import { ToastMessage } from '../../types/products.types.js';
import { CommonActions } from '../common.actions.js';
import DeleteModalActions from '../modals/delete-modal.actions.js';

class ProductsActions extends CommonActions {
  @logAction('Click on "Add product" button')
  async clickOnAddProductButton() {
    await ProductsPage.click(ProductsPage['Add product button']);
    await this.waitForPageLoad();
  }

  async getCreatedProductRow(productName: string) {
    return {
      name: await ProductsPage.getText(ProductsPage['Name by table row'](productName)),
      price: await ProductsPage.getText(ProductsPage['Price by table row'](productName)),
      manufacturer: await ProductsPage.getText(ProductsPage['Manufacturer by table row'](productName)),
    };
  }

  async getProductToastText(text: ToastMessage, name?: string) {
    const toastMessage = productToastMessages[text];
    return toastMessage(name) || (text === 'already exist' && !name ? `Name was not provided` : 'Text was not provided');
  }
}

export default new ProductsActions();
