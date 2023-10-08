import { BasePage } from '../base.page';

class AddNewProductPage extends BasePage {
  get ['Page title']() {
    return '.page-title-text';
  }

  get ['Name input field']() {
    return `#inputName`;
  }

  get ['Price input field']() {
    return `#inputPrice`;
  }

  get ['Amount input field']() {
    return `#inputAmount`;
  }

  get ['Notes input field']() {
    return `#textareaNotes`;
  }

  get ['Save New Product button']() {
    return `#save-new-product`;
  }

  get ['Back button']() {
    return `#back-to-products-page`;
  }

  get ['Clear inputs button']() {
    return `#clear-inputs`;
  }

  get ['Manufacturer dropdown list']() {
    // maybe unnecessary
    return '#inputManufacturer > option';
  }

  get ['Manufacturer dropdown']() {
    return '#inputManufacturer';
  }

  get ['Manufacturer dropdown brand']() {
    return (brand: string) => `//option[text()="${brand}"]`;
  }

  get ['Price input field error']() {
    return '#error-inputPrice';
  }

  get ['Amount input field error']() {
    return '#error-inputAmount';
  }

  get ['Name input field error']() {
    return '#error-inputName';
  }
}

export default new AddNewProductPage();
