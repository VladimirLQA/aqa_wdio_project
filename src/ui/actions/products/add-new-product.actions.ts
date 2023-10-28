import BaseActions from '../base.actions';
import { IProduct } from '../../types/products.types';
import AddNewProductPage from '../../pages/aqa_project/products/add-new-product.page';
import { browserPause } from '../../../utils/helpers';
import { ProductsStorage } from '../../../utils/storages/products.storage';

class AddNewProductActions extends BaseActions {
  public async fillProductInputs<T>(product: T): Promise<void> {
    await AddNewProductPage.waitForElemAndSetValue(AddNewProductPage['Name input field'], product.name);
    await AddNewProductPage.waitForElemAndSetValue(AddNewProductPage['Price input field'], product.price);
    await AddNewProductPage.waitForElemAndSetValue(AddNewProductPage['Amount input field'], product.amount);

    if (product.notes) {
      await AddNewProductPage.waitForElemAndSetValue(AddNewProductPage['Notes input field'], product.notes);
    }
    await browserPause(200);
  }

  public async fillProductInputField(inputField: string, inputValue: string) {
    await AddNewProductPage.waitForElemAndSetValue(inputField, inputValue);
  }

  public async clickOnSaveNewProductButton() {
    await AddNewProductPage.waitForElemAndClick(AddNewProductPage['Save New Product button']);
    await this.waitForPageLoad();
  }

  public async clickOnManufacturerDropdown() {
    await AddNewProductPage.waitForElemAndClick(AddNewProductPage['Manufacturer dropdown']);
  }

  public async clickOnManufacturerBrand(manufacturer: string) {
    await AddNewProductPage.waitForElemAndClick(AddNewProductPage['Manufacturer dropdown brand'](manufacturer));
  }

  public async createProduct(product: IProduct) {
    ProductsStorage.addProduct<IProduct>(product);
    await this.fillProductInputs(product);
    await this.chooseDropdownItem(AddNewProductPage['Manufacturer dropdown'], AddNewProductPage['Manufacturer dropdown brand'](product.manufacturer));
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
