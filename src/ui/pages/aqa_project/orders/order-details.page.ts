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

  readonly ['Details section tab title'] =
    (tabName: 'delivery' | 'history' | 'comments') => `#order-details-tabs-content > #${tabName} h4`;

  readonly ['Delivery information body'] = '#delivery > .modal-body';

  readonly ['Edit delivery button'] = '#delivery-btn';

  readonly ['Collapse button order history tab'] =
    (action: string) => `//span[text()="${action}"]/preceding-sibling::button`;

  readonly ['Comments input text area'] = '#textareaComments';

  readonly ['Error input text area'] = '#error-textareaComments';

  readonly ['Delete comment button'] = (substr: string) => `//p[contains(., "${substr}")]/following-sibling::button`;

  readonly ['Comment text'] = (substr: string) => `//p[contains(., "${substr}")]`;
}

export default new OrderDetailsPage();