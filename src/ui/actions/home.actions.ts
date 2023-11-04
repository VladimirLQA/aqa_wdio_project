import BaseActions from './base.actions';
import HomePage from '../pages/aqa_project/home.page';
import SidebarPage from '../pages/aqa_project/sidebar.page';
import { logAction } from '../../utils/reporter/allure.reporter';

class HomeActions extends BaseActions {

  @logAction('Click on products view details button')
  public async openProductsPage() {
    await HomePage.waitForElemAndClick(HomePage['Products view details button']);
    await this.waitForPageLoad();
  }

  @logAction('Click on "Sign out" button')
  public async clickOnSignOutButton() {
    await SidebarPage.waitForElemAndClick(SidebarPage['User dropdown menu']);
    await SidebarPage.waitForElemAndClick(SidebarPage['Sign out button']);
    await this.waitForPageLoad();
  }
}

export default new HomeActions();
