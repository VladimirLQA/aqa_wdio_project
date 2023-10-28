import BaseActions from './base.actions';
import HomePage from '../pages/aqa_project/home.page';
import SidebarPage from '../pages/aqa_project/sidebar.page';
import { logAction } from '../../utils/reporter/allure.reporter';

class HomeActions extends BaseActions {

  // @logAction('Open products page')
  public async openProductsPage() {
    await HomePage.waitForElemAndClick(HomePage['Products view details button']);
    await this.waitForPageLoad();
  }

  // @logAction('Log out')
  public async logOut() {
    await SidebarPage.waitForElemAndClick(SidebarPage['User dropdown menu']);
    await SidebarPage.waitForElemAndClick(SidebarPage['Sign out button']);
    await this.waitForPageLoad();
  }
}

export default new HomeActions();
