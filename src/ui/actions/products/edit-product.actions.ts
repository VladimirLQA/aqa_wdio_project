import Utils from '../../../utils/utils.js';
import EditProductPage from '../../pages/aqa_project/products/edit-product.page.js';
import { IProduct, MANUFACTURERS } from '../../../types/products.types.js';
import BaseActions from '../base.actions.js';

class EditProductActions extends BaseActions {
  public async fillProductInputs<T extends IProduct>(product: T): Promise<void> {
    await this.fillInputField(EditProductPage['Name input field'], product.name);
    await this.fillInputField(EditProductPage['Price input field'], product.price);
    await this.fillInputField(EditProductPage['Amount input field'], product.amount);

    if (product.notes) {
      await this.fillInputField(EditProductPage['Notes input field'], product.notes);
    }
    await Utils.browserPause(200);
  }

  public async clickOnSaveChangesButton() {
    await this.basePage.click(EditProductPage['Save changes button']);
    await this.waitForPageLoad();
  }

  public async clickOnManufacturerDropdown() {
    await this.basePage.click(EditProductPage['Manufacturer dropdown']);
  }

  public async clickOnManufacturerBrand(manufacturer: MANUFACTURERS) {
    await this.basePage.click(EditProductPage['Dropdown option [last()]'](manufacturer));
  }

  public async updateProduct(product: IProduct) {
    await this.fillProductInputs(product);
    await this.chooseDropdownItem(EditProductPage['Manufacturer dropdown'], EditProductPage['Dropdown option [last()]'](product.manufacturer));
    await this.clickOnSaveChangesButton();
    await this.waitForPageLoad();
  }

  public async clickOnBackButton() {
    await this.basePage.click(EditProductPage['Back button']);
    await this.waitForPageLoad();
  }

  public async clickOnDeleteProductButton() {
    await this.basePage.click(EditProductPage['Delete product button']);
  }
}

export default new EditProductActions();
