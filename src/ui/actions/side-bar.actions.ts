import { logAction } from '../../utils/reporter/allure.decorators.js';
import SidebarPage from '../pages/aqa_project/sidebar.page.js';
import BaseActions from './base.actions.js';

class SidebarActions extends BaseActions {
  @logAction('Click on "Sign out" button')
  async clickOnSignOutButton() {
    await this.basePage.click(SidebarPage['User dropdown menu']);
    await this.basePage.click(SidebarPage['Sign out button']);
    await this.waitForPageLoad();
  }

  @logAction('Click on "Home" button')
  async clickOnSidebarHomeButton() {
    await this.basePage.click(SidebarPage['Home button']);
  }

  @logAction('Click on "Products" button')
  async clickOnSidebarProductsButton() {
    await this.basePage.click(SidebarPage['Products button']);
  }

  @logAction('Click on "Orders" button')
  async clickOnSidebarOrdersButton() {
    await this.basePage.click(SidebarPage['Orders button']);
  }

  @logAction('Click on "Customers" button')
  async clickOnSidebarCustomersButton() {
    await this.basePage.click(SidebarPage['Customers button']);
  }

  @logAction('Click on "Customers" button')
  async clickOnSidebarCurrencyBuyButton() {
    await this.basePage.click(SidebarPage['Currency \'Buy\' button']);
  }

  @logAction('Fill currency input')
  async fillValueInCurrencyInput(value: number) {
    await this.basePage.setValue(SidebarPage['Currency input'], value);
  }
}

export default new SidebarActions();
