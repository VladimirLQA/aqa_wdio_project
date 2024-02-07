class CommonTabsSectionPage {
  readonly ['Order details section tab button'] = (tabName: 'delivery' | 'history' | 'comments') => `#${tabName}-tab`;
  readonly ['Tab title'] = (tabName: 'delivery' | 'history' | 'comments') => `#order-details-tabs-content > #${tabName} h4`;
}

class OrderDetailsTabPage extends CommonTabsSectionPage {
  readonly ['Collapse button order history tab'] = (action: string) => `//span[text()="${action}"]/preceding-sibling::button`;
}

class CommentTabSectionPage extends CommonTabsSectionPage {
  readonly ['Create comment button'] = '#create-comment-btn';
  readonly ['Comments input text area'] = '#textareaComments';
  readonly ['Error input text area'] = '#error-textareaComments';
  readonly ['Delete comment button'] = (substr: string) => `//p[contains(., "${substr}")]/following-sibling::button`;
  readonly ['Comment text'] = (substr: string) => `//p[contains(., "${substr}")]`;
}

class DeliveryTabPage extends CommonTabsSectionPage {
  readonly ['Delivery information body'] = '#delivery > .modal-body';
  readonly ['Schedule delivery button'] = '#delivery-btn';
}

export const tabsSection = {
  'Order details': new OrderDetailsTabPage(),
  Comment: new CommentTabSectionPage(),
  Delivery: new DeliveryTabPage(),
  Common: new CommonTabsSectionPage(),
};
