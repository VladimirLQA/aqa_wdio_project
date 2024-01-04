// TODO implement page

import BasePage from '../base.page';

class EditProductPage extends BasePage {
  readonly ['Page title'] = '.page-title-text';

  readonly ['Name input field'] = `#inputName`;

  readonly ['Price input field'] = `#inputPrice`;

  readonly ['Amount input field'] = `#inputAmount`;

  readonly ['Notes input field'] = `#textareaNotes`;

  readonly ['Save changes button'] = `#save-product-changes`;

  readonly ['Back button'] = `#back-to-products-page`;

  readonly ['Delete product button'] = `#delete-product-btn`;

  readonly ['Manufacturer dropdown list'] = '#inputManufacturer > option';

  readonly ['Manufacturer dropdown'] = '#inputManufacturer';

  readonly ['Price input field error'] = '#error-inputPrice';

  readonly ['Amount input field error'] = '#error-inputAmount';

  readonly ['Name input field error'] = '#error-inputName';
}

export default new EditProductPage();
