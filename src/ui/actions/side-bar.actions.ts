import { logAction } from '../../utils/reporter/allure.reporter.js';
import SidebarPage from '../pages/aqa_project/sidebar.page.js';
import BaseActions from './base.actions.js';

class SidebarActions extends BaseActions {
  @logAction('Click on "Sign out" button')
  async clickOnSignOutButton() {
    await SidebarPage.click(SidebarPage['User dropdown menu']);
    await SidebarPage.click(SidebarPage['Sign out button']);
    await this.waitForPageLoad();
  }

  @logAction('Click on "Home" button')
  async clickOnSidebarHomeButton() {
    await SidebarPage.click(SidebarPage['Home button']);
  }

  @logAction('Click on "Products" button')
  async clickOnSidebarProductsButton() {
    await SidebarPage.click(SidebarPage['Products button']);
  }

  @logAction('Click on "Orders" button')
  async clickOnSidebarOrdersButton() {
    await SidebarPage.click(SidebarPage['Orders button']);
  }

  @logAction('Click on "Customers" button')
  async clickOnSidebarCustomersButton() {
    await SidebarPage.click(SidebarPage['Customers button']);
  }

  @logAction('Click on "Customers" button')
  async clickOnSidebarCurrencyBuyButton() {
    await SidebarPage.click(SidebarPage["Currency 'Buy' button"]);
  }

  @logAction('Fill currency input')
  async fillValueInCurrencyInput(value: number) {
    await SidebarPage.setValue(SidebarPage['Currency input'], value);
  }
}

export default new SidebarActions();
