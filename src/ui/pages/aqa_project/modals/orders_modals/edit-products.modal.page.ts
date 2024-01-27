import ModalPage from '../modal.page';

class EditProductsModalPage extends ModalPage {
  readonly ['Products dropdown'] = `(//select[@name="Product"])[last()]`;

  readonly ['Products dropdown list'] = '#inputCustomerOrder > option';

  readonly ['Add product button'] = '#add-product-btn';

  readonly ['Save button'] = '#update-products-btn';

  readonly ['Cancel button'] = '#cancel-edit-products-modal-btn';

  readonly ['Total price'] = '#total-price-order-modal';

  readonly ['Delete product button'] = (dataId: string) => `button[data-delete-id="${dataId}"]`;
}

export default new EditProductsModalPage();
