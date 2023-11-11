import  BasePage from './base.page';

class HomePage extends BasePage {
  readonly uniqueElement = '.carousel-inner';

  readonly ['Orders view details button'] = '#orders-from-home';

  readonly ['Products view details button'] = '#products-from-home';

  readonly ['Customers view details button'] = '#customers-from-home';
}

export default new HomePage();
