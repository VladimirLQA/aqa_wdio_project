import BaseActions from '../base.actions.js';
import { IProduct } from '../../types/products.types.js';
import AddNewProductPage from '../../pages/aqa_project/products/add-new-product.page.js';
import Utils from '../../../utils/utils.js';
import { MANUFACTURERS } from '../../types/products.types.js';

class AddNewProductActions extends BaseActions {
  async fillProductInputs<T extends IProduct>(product: T): Promise<void> {
    await this.fillInputField(AddNewProductPage['Name input field'], product.name);
    await this.fillInputField(AddNewProductPage['Price input field'], product.price);
    await this.fillInputField(AddNewProductPage['Amount input field'], product.amount);

    if (product.notes) {
      await this.fillInputField(AddNewProductPage['Notes input field'], product.notes);
    }
    await Utils.browserPause(200);
  }

  async clickOnSaveNewProductButton() {
    await this.basePage.click(AddNewProductPage['Save New Product button']);
    await this.waitForPageLoad();
  }

  async clickOnManufacturerDropdown() {
    await this.basePage.click(AddNewProductPage['Manufacturer dropdown']);
  }

  async clickOnManufacturerBrand(manufacturer: MANUFACTURERS) {
    await this.basePage.click(AddNewProductPage['Dropdown option [last()]'](manufacturer));
  }

  async createProduct(product: IProduct) {
    await this.fillProductInputs(product);
    await this.chooseDropdownItem(
      AddNewProductPage['Manufacturer dropdown'],
      AddNewProductPage['Dropdown option [last()]'](product.manufacturer),
    );
    await this.clickOnSaveNewProductButton();
    await this.waitForPageLoad();
  }

  async clickOnBackButton() {
    await this.basePage.click(AddNewProductPage['Back button']);
    await this.waitForPageLoad();
  }

  async clickOnClearAllButton() {
    await this.basePage.click(AddNewProductPage['Clear inputs button']);
  }
}

export default new AddNewProductActions();
