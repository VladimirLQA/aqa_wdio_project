// TODO impolement actions for edit product page

import { browserPause } from '../../../utils/helpers';
import EditProductPage from '../../pages/aqa_project/products/edit-product.page';
import { IProduct, MANUFACTURERS } from '../../types/products.types';
import BaseActions from '../base.actions';

class EditProductActions extends BaseActions {
  public async fillProductInputs<T extends IProduct>(product: T): Promise<void> {
    await this.fillInputField(EditProductPage['Name input field'], product.name);
    await this.fillInputField(EditProductPage['Price input field'], product.price);
    await this.fillInputField(EditProductPage['Amount input field'], product.amount);

    if (product.notes) {
      await this.fillInputField(EditProductPage['Notes input field'], product.notes);
    }
    await browserPause(200);
  }

  public async clickOnSaveChangesButton() {
    await EditProductPage.waitForElemAndClick(EditProductPage['Save changes button']);
    await this.waitForPageLoad();
  }

  public async clickOnManufacturerDropdown() {
    await EditProductPage.waitForElemAndClick(EditProductPage['Manufacturer dropdown']);
  }

  public async clickOnManufacturerBrand(manufacturer: MANUFACTURERS) {
    await EditProductPage.waitForElemAndClick(EditProductPage['Dropdown option'](manufacturer));
  }

  public async updateProduct(product: IProduct) {
    await this.fillProductInputs(product);
    await this.chooseDropdownItem(EditProductPage['Manufacturer dropdown'], EditProductPage['Dropdown option'](product.manufacturer));
    await this.clickOnSaveChangesButton();
    await this.waitForPageLoad();
  }

  public async clickOnBackButton() {
    await EditProductPage.waitForElemAndClick(EditProductPage['Back button']);
    await this.waitForPageLoad();
  }

  public async clickOnDeleteProductButton() {
    await EditProductPage.waitForElemAndClick(EditProductPage['Delete product button']);
  }
}

export default new EditProductActions();
