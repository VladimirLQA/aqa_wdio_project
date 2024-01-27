import ModalPage from '../modal.page';

class EditProductsModalPage extends ModalPage {
  readonly ['Customers dropdown'] = '#inputCustomerOrder';
  readonly ['Save button'] = '#update-customer-btn';
  readonly ['Cancel button'] = '#cancel-edit-customer-modal-btn';
}

export default new EditProductsModalPage();
