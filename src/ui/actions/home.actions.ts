import { logAction } from '../../utils/reporter/allure.reporter';
import HomePage from '../pages/aqa_project/home.page';
import BaseActions from './base.actions';

class HomeActions extends BaseActions {
  @logAction('Click on products view details button')
  async openProductsPage() {
    await HomePage.waitForElemAndClick(HomePage['Products view details button']);
    await this.waitForPageLoad();
  }

  @logAction('Click on orders view details button')
  async openOrdersPage() {
    await HomePage.waitForElemAndClick(HomePage['Orders view details button']);
    await this.waitForPageLoad();
  }
}

export default new HomeActions();
