import ModalPage from '../modal.page.js';

class CreateOrderModalPage extends ModalPage {
  readonly ['Customer dropdown'] = '#inputCustomerOrder';

  readonly ['Products dropdown'] = `(//select[@name="Product"])[last()]`;

  readonly ['Customer dropdown list'] = '#inputCustomerOrder > option';

  readonly ['Products dropdown list'] = '#inputCustomerOrder > option';

  readonly ['Add product button'] = '#add-product-btn';

  readonly ['Create order button'] = '#create-order-btn';

  readonly ['Cancel button'] = '#cancel-order-modal-btn';

  readonly ['Total price'] = '#total-price-order-modal';

  readonly ['Delete product button'] = (dataId: string) => `button[data-delete-id="${dataId}"]`;
}

export default new CreateOrderModalPage();
