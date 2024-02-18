import BaseActions from '../base.actions.js';
import { IProduct } from '../../types/products.types.js';
import AddNewProductPage from '../../pages/aqa_project/products/add-new-product.page.js';
import Utils from '../../../utils/helpers.js';
import { MANUFACTURERS } from '../../types/products.types.js';

class AddNewProductActions extends BaseActions {
  public async fillProductInputs<T extends IProduct>(product: T): Promise<void> {
    await this.fillInputField(AddNewProductPage['Name input field'], product.name);
    await this.fillInputField(AddNewProductPage['Price input field'], product.price);
    await this.fillInputField(AddNewProductPage['Amount input field'], product.amount);

    if (product.notes) {
      await this.fillInputField(AddNewProductPage['Notes input field'], product.notes);
    }
    await Utils.browserPause(200);
  }

  public async clickOnSaveNewProductButton() {
    await AddNewProductPage.click(AddNewProductPage['Save New Product button']);
    await this.waitForPageLoad();
  }

  public async clickOnManufacturerDropdown() {
    await AddNewProductPage.click(AddNewProductPage['Manufacturer dropdown']);
  }

  public async clickOnManufacturerBrand(manufacturer: MANUFACTURERS) {
    await AddNewProductPage.click(AddNewProductPage['Dropdown option'](manufacturer));
  }

  public async createProduct(product: IProduct) {
    await this.fillProductInputs(product);
    await this.chooseDropdownItem(AddNewProductPage['Manufacturer dropdown'], AddNewProductPage['Dropdown option'](product.manufacturer));
    await this.clickOnSaveNewProductButton();
    await this.waitForPageLoad();
  }

  public async clickOnBackButton() {
    await AddNewProductPage.click(AddNewProductPage['Back button']);
    await this.waitForPageLoad();
  }

  public async clickOnClearAllButton() {
    await AddNewProductPage.click(AddNewProductPage['Clear inputs button']);
  }
}

export default new AddNewProductActions();
