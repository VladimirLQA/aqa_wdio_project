import BaseActions from '../base.actions';
import { IProduct } from '../../types/products.types';
import AddNewProductPage from '../../pages/aqa_project/products/add-new-product.page';
import { browserPause } from '../../../utils/helpers';
import { MANUFACTURERS } from '../../types/products.types';

class AddNewProductActions extends BaseActions {
  public async fillProductInputs<T extends IProduct>(product: T): Promise<void> {
    await this.fillInputField(AddNewProductPage['Name input field'], product.name);
    await this.fillInputField(AddNewProductPage['Price input field'], product.price);
    await this.fillInputField(AddNewProductPage['Amount input field'], product.amount);

    if (product.notes) {
      await this.fillInputField(AddNewProductPage['Notes input field'], product.notes);
    }
    await browserPause(200);
  }

  public async clickOnSaveNewProductButton() {
    await AddNewProductPage.waitForElemAndClick(AddNewProductPage['Save New Product button']);
    await this.waitForPageLoad();
  }

  public async clickOnManufacturerDropdown() {
    await AddNewProductPage.waitForElemAndClick(AddNewProductPage['Manufacturer dropdown']);
  }

  public async clickOnManufacturerBrand(manufacturer: MANUFACTURERS) {
    await AddNewProductPage.waitForElemAndClick(AddNewProductPage['Dropdown option'](manufacturer));
  }

  public async createProduct(product: IProduct) {
    await this.fillProductInputs(product);
    await this.chooseDropdownItem(AddNewProductPage['Manufacturer dropdown'], AddNewProductPage['Dropdown option'](product.manufacturer));
    await this.clickOnSaveNewProductButton();
    await this.waitForPageLoad();
  }

  public async clickOnBackButton() {
    await AddNewProductPage.waitForElemAndClick(AddNewProductPage['Back button']);
    await this.waitForPageLoad();
  }

  public async clickOnClearAllButton() {
    await AddNewProductPage.waitForElemAndClick(AddNewProductPage['Clear inputs button']);
  }
}

export default new AddNewProductActions();
