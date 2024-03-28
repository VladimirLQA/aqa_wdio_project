import ModalPage from '../modal.page.js';

class EditProductsModalPage extends ModalPage {
  readonly ['Products dropdown option with dropdown id'] = (id: string, productName: string) =>
    `${this['Products dropdown with id'](id)}//option[text()="${productName}"]`;

  readonly ['Products dropdown with id'] = (id: string) => `//select[@id="${id}"]`;

  readonly ['Products dropdown with name'] = (productName: string) =>
    `(//select[@name="Product"])//option[@selected][text()="${productName}"]/ancestor::select`;

  readonly ['Products dropdown list'] = '#inputCustomerOrder > option';

  readonly ['Add product button'] = '#add-product-btn';

  readonly ['Save button'] = '#update-products-btn';

  readonly ['Cancel button'] = '#cancel-edit-products-modal-btn';

  readonly ['Total price'] = '#total-price-order-modal';

  readonly ['Delete product button with id'] = (dataId: string) =>
    `button[data-delete-id="${dataId}"]`;
}

class EditCustomerModalPage extends ModalPage {
  readonly ['Customers dropdown'] = '#inputCustomerOrder';
  readonly ['Customers dropdown options'] = `${this['Customers dropdown']} > option`;
  readonly ['Customer dropdown label in modal'] = `#div-inputCustomerOrder > label`;
  readonly ['Save button'] = '#update-customer-btn';
  readonly ['Cancel button'] = '#cancel-edit-customer-modal-btn';
}

export const editModalsPages = {
  'Edit customer': new EditCustomerModalPage(),
  'Edit products': new EditProductsModalPage(),
};
