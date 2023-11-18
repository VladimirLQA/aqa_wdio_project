import BasePage from '../base.page';

class AddNewProductPage extends BasePage {
  readonly ['Page title'] = '.page-title-text';

  readonly ['Name input field'] = `#inputName`;

  readonly ['Price input field'] = `#inputPrice`;

  readonly ['Amount input field'] = `#inputAmount`;

  readonly ['Notes input field'] = `#textareaNotes`;

  readonly ['Save New Product button'] = `#save-new-product`;

  readonly ['Back button'] = `#back-to-products-page`;

  readonly ['Clear inputs button'] = `#clear-inputs`;

  readonly ['Manufacturer dropdown list'] = '#inputManufacturer > option';

  readonly ['Manufacturer dropdown'] = '#inputManufacturer';

  readonly ['Price input field error'] = '#error-inputPrice';

  readonly ['Amount input field error'] = '#error-inputAmount';

  readonly ['Name input field error'] = '#error-inputName';
}

export default new AddNewProductPage();
