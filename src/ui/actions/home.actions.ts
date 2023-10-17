import BaseActions from './base.actions';
import HomePage from '../pages/aqa_project/home.page';
import SidebarPage from '../pages/aqa_project/sidebar.page';

class HomeActions extends BaseActions {
  public async openProductsPage() {
    await HomePage.waitForElemAndClick(HomePage['Products view details button']);
    await this.waitForPageLoad();
  }

  public async logOut() {
    await SidebarPage.waitForElemAndClick(SidebarPage['User dropdown menu']);
    await SidebarPage.waitForElemAndClick(SidebarPage['Sign out button']);
    await this.waitForPageLoad();
  }
}

export default new HomeActions();
