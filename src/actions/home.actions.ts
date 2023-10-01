import { BaseActions } from './base.actions';
import HomePage from '../pages/aqa_project/home.page';

class HomeActions extends BaseActions {
  public async openProductsPage() {
    await HomePage.waitForElemAndClick(HomePage['Products view details button']);
    await this.waitForPageLoad();
  }
}

export default new HomeActions();
