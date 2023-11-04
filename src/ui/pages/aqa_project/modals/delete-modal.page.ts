import ModalPage from './modal.page';

class DeleteModalPage extends ModalPage {
  readonly ['Delete button'] = 'button.btn-danger[type="submit"]';

  readonly ['Cancel button'] = 'div.modal-footer button.btn-secondary';

  readonly ['Modal body text'] = 'div.modal-body-text > p';

  readonly ['Modal title'] = 'h5.modal-title';

  readonly ['Close modal button'] = `button.btn-close`;
}

export default new DeleteModalPage();
