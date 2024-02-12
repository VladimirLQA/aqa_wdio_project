import ModalPage from '../modal.page.js';

class EditProductsModalPage extends ModalPage {
  readonly ['Products dropdown'] = `(//select[@name="Product"])[last()]`;

  readonly ['Products dropdown with name'] = (productName: string) =>
    `(//select[@name="Product"])//option[@selected][text()="${productName}"]/ancestor::select`;

  readonly ['Products dropdown list'] = '#inputCustomerOrder > option';

  readonly ['Add product button'] = '#add-product-btn';

  readonly ['Save button'] = '#update-products-btn';

  readonly ['Cancel button'] = '#cancel-edit-products-modal-btn';

  readonly ['Total price'] = '#total-price-order-modal';

  readonly ['Delete product button'] = (dataId: string) => `button[data-delete-id="${dataId}"]`;
}

class EditCustomerModalPage extends ModalPage {
  readonly ['Customers dropdown'] = '#inputCustomerOrder';
  readonly ['Save button'] = '#update-customer-btn';
  readonly ['Cancel button'] = '#cancel-edit-customer-modal-btn';
}

export const editModalsPages = {
  'Edit customer': new EditCustomerModalPage(),
  'Edit products': new EditProductsModalPage(),
};
