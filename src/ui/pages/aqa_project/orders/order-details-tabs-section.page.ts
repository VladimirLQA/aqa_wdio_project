import { ORDER_HISTORY_ACTIONS } from '../../../../types/order.types.js';

class CommonTabsSectionPage {
  readonly ['Order details section tab button'] = (tabName: 'delivery' | 'history' | 'comments') => `#${tabName}-tab`;

  readonly ['Tab title'] = (tabName: 'delivery' | 'history' | 'comments') => `#order-details-tabs-content > #${tabName} h4`;
}

class OrderHistoryTabPage extends CommonTabsSectionPage {
  readonly ['Collapse button order history tab'] = (action: ORDER_HISTORY_ACTIONS | string) => `//span[text()="${action}"]/preceding-sibling::button`;

  readonly ['"Order created" collapse button'] = `${this['Collapse button order history tab'](ORDER_HISTORY_ACTIONS.CREATED)}`;

  readonly ['Action'] = (action: ORDER_HISTORY_ACTIONS | string) => `//span[text()="${action}"]`;

  readonly ['Action id'] = (action: ORDER_HISTORY_ACTIONS | string) => `${this['Action'](action)}//..`;

  readonly ['Get action with id'] = (id: string) => `#${id} > span:nth-of-type(1)`;

  readonly ['Action data by actioin id'] = (id: string) => `[aria-labelledby="${id}"] .his-col.fst-italic`;
}

class CommentTabSectionPage extends CommonTabsSectionPage {
  readonly ['Create comment button'] = '#create-comment-btn';
  readonly ['Comments input text area'] = '#textareaComments';
  readonly ['Error input text area'] = '#error-textareaComments';
  readonly ['Delete comment button'] = (substr: string) => `${this['Comment by text'](substr)}/following-sibling::button`;

  readonly ['Comment by text'] = (substr: string) => `//p[contains(., "${substr}")]`;
}

class DeliveryTabPage extends CommonTabsSectionPage {
  readonly ['Delivery information body'] = '#delivery > .modal-body';
  readonly ['Schedule delivery button'] = '#delivery-btn';
}

export const tabsSection = {
  'Order history': new OrderHistoryTabPage(),
  Comment: new CommentTabSectionPage(),
  Delivery: new DeliveryTabPage(),
  Common: new CommonTabsSectionPage(),
};
