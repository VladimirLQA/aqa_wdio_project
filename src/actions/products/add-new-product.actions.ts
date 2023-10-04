import { BaseActions } from '../base.actions';
import { IProduct } from '../../types/products.type';
import AddNewProductPage from '../../pages/aqa_project/products/add-new-product.page';
import { browserPause } from '../../utils/helpers';

class AddNewProductActions extends BaseActions {
  public async fillProductInputs(product: IProduct) {
    await AddNewProductPage.waitForElemAndSetValue(AddNewProductPage['Name input'], product.name);
    await AddNewProductPage.waitForElemAndSetValue(AddNewProductPage['Price input'], product.price);
    await AddNewProductPage.waitForElemAndSetValue(AddNewProductPage['Amount input'], product.amount);

    if (product.notes) {
      await AddNewProductPage.waitForElemAndSetValue(AddNewProductPage['Notes input'], product.notes);
    }
    await browserPause(200);
  }

  public async fillProductInputField(inputField: string, inputValue: string) {
    await AddNewProductPage.waitForElemAndSetValue(inputField, inputValue);
  }

  public async clickOnSaveNewProductButton() {
    await AddNewProductPage.waitForElemAndClick(AddNewProductPage['Save New Product button']);
  }

  public async chooseManufacturerDropdownItem(manufacturer: string) {
    await this.clickOnManufacturerDropdown();
    await browserPause(200);
    await this.clickOnManufacturerBrand(manufacturer);
  }

  public async clickOnManufacturerDropdown() {
    await AddNewProductPage.waitForElemAndClick(AddNewProductPage['Manufacturer dropdown']);
  }

  public async clickOnManufacturerBrand(manufacturer: string) {
    await AddNewProductPage.waitForElemAndClick(AddNewProductPage['Manufacturer dropdown element'](manufacturer));
  }

  public async createProduct(product: IProduct, manufacturer: string) {
    await this.fillProductInputs(product);
    await this.chooseManufacturerDropdownItem(manufacturer);
    await this.clickOnSaveNewProductButton();
    await this.waitForPageLoad();
  }
}

export default new AddNewProductActions();
