import BasePage from '../../base.page';

// TODO add independent modal page
class DeleteProductModalPage extends BasePage {
  readonly ['Delete button'] = '.modal-content > .modal-footer button:nth-of-type(1)';

  readonly ['Cancel button'] = '.modal-content > .modal-footer button:nth-of-type(2)';

  readonly ['Close modal button'] = '.modal-content > .modal-header > button';

  readonly ['Modal body text'] = '.modal-content > .modal-body-text > p';

  readonly ['Modal title'] = '.modal-content .modal-title';
}

export default new DeleteProductModalPage();
