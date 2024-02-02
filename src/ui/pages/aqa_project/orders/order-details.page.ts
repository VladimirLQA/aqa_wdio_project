import BasePage from '../base.page.js';
import CustomerDetailsSectionPage from './order-customer-section.page.js';
import ProductsDetailsSectionPage from './order-products-section.page.js';

class OrderDetailsPage extends BasePage {
  readonly customerSection: typeof CustomerDetailsSectionPage = CustomerDetailsSectionPage;
  readonly productsSection: typeof ProductsDetailsSectionPage = ProductsDetailsSectionPage;
  // TODO refact to add header section, bottom section

  readonly ['Page title'] = '#title h2';

  readonly ['Order number'] = '';

  readonly ['Process order button'] = '#process-order';

  readonly ['Refresh order button'] = '#refresh-order';

  readonly ['Cancel order button'] = '#cancel-order';

  readonly ['Create comment button'] = '#create-comment-btn';

  readonly ['Order details section tab button'] = (tabName: 'delivery' | 'history' | 'comments') => `#${tabName}-tab`;

  readonly ['Details order tab title'] = (tabName: 'delivery' | 'history' | 'comments') => `#order-details-tabs-content > #${tabName} h4`;

  readonly ['Delivery information body'] = '#delivery > .modal-body';

  readonly ['Schedule delivery button'] = '#delivery-btn';

  readonly ['Collapse button order history tab'] = (action: string) => `//span[text()="${action}"]/preceding-sibling::button`;

  readonly ['Comments input text area'] = '#textareaComments';

  readonly ['Error input text area'] = '#error-textareaComments';

  readonly ['Delete comment button'] = (substr: string) => `//p[contains(., "${substr}")]/following-sibling::button`;

  readonly ['Comment text'] = (substr: string) => `//p[contains(., "${substr}")]`;

  readonly ['Receive button'] = `#start-receiving-products`;

  readonly ['Cancel receiving button'] = `#cancel-receiving`;

  readonly ['Save received products button'] = `#save-received-products`;

  readonly ['Select all checkbox'] = `#selectAll`;

  readonly ['Check box by id'] = (id: number) => `#chekc${id}`;
}

export default new OrderDetailsPage();
