import { ORDER_HISTORY_ACTIONS } from '../../../types/order.types.js';

class CommonTabsSectionPage {
  readonly ['Order details section tab button'] = (tabName: 'delivery' | 'history' | 'comments') =>
    `#${tabName}-tab`;

  readonly ['Tab title'] = (tabName: 'delivery' | 'history' | 'comments') =>
    `#order-details-tabs-content > #${tabName} h4`;
}

class OrderDetailsTabPage extends CommonTabsSectionPage {
  readonly ['Collapse button order history tab'] = (action: ORDER_HISTORY_ACTIONS | string) =>
    `//span[text()="${action}"]/preceding-sibling::button`;

  readonly ['"Order created" collapse button'] = `${this['Collapse button order history tab'](
    ORDER_HISTORY_ACTIONS.CREATED,
  )}`;

  readonly ['Action'] = (action: ORDER_HISTORY_ACTIONS | string) => `//span[text()="${action}"]`;

  readonly ['Action id'] = (action: ORDER_HISTORY_ACTIONS | string) =>
    `${this['Action'](action)}//..`;

  readonly ['Get action with id'] = (id: string) => `#${id} > span:nth-of-type(1)`;

  readonly ['Action data by actioin id'] = (id: string) =>
    `[aria-labelledby="${id}"] .his-col.fst-italic`;

  // previous updated - //*[@class="fw-bold his-col"]

  // property - //*[@class="his-col his-nested-row fst-italic"]

  // values - 1) //*[@class="his-col fst-italic"] 2) //*[@class="his-col fst-italic"]

  // const tat = {
  //   orderCreated: {
  //     orderStatus: {
  //       previous: "-",
  //       updated: "Draft"
  //     }
  //   }
  // };

  // const action = document.querySelector('#heading21 > span:nth-of-type(1)').innerText
  // 'Order created'

  // obj[action][data.at(0)][prev] = data.at(1);
  // obj[action][data.at(0)][updated] = data.at(2);

  // const [prev, updated] = [...document.querySelectorAll('[aria-labelledby="heading21"] .fw-bold.his-col')].map(c => c.innerText).filter(v => v);
  // ['Previous', 'Updated']

  // const data  = [...document.querySelectorAll('[aria-labelledby="heading21"] .his-col.fst-italic')].map(c => c.innerText).filter(v => v);
  //   if (data.length > 3) do the chunk
  //['Order Status', '-', 'Draft']
}

class CommentTabSectionPage extends CommonTabsSectionPage {
  readonly ['Create comment button'] = '#create-comment-btn';
  readonly ['Comments input text area'] = '#textareaComments';
  readonly ['Error input text area'] = '#error-textareaComments';
  readonly ['Delete comment button'] = (substr: string) =>
    `//p[contains(., "${substr}")]/following-sibling::button`;
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
