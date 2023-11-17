import BasePage from '../base.page';


class OrderDetailsPage extends BasePage {
  readonly ['Page title'] = '#title h2';

  readonly ['Order number'] = '';

  readonly ['Process order button'] = '#process-order';

  readonly ['Refresh order button'] = '#refresh-order';

  readonly ['Cancel order button '] = '#cancel-order';

  readonly ['Edit customer pencil button'] = '#edit-customer-pencil';

  readonly ['Edit products pencil button'] = '#edit-products-pencil';

  readonly ['Create comment button'] = '#create-comment-btn';

  readonly ['Order details section tab button'] = (tabName: 'delivery' | 'history' | 'comments') => `#${tabName}-tab`;

}