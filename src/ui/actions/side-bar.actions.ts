import { logAction } from '../../utils/reporter/allure.reporter';
import SidebarPage from '../pages/aqa_project/sidebar.page';
import BaseActions from './base.actions';

class SidebarActions extends BaseActions {
  @logAction('Click on "Sign out" button')
  async clickOnSignOutButton() {
    await SidebarPage.waitForElemAndClick(SidebarPage['User dropdown menu']);
    await SidebarPage.waitForElemAndClick(SidebarPage['Sign out button']);
    await this.waitForPageLoad();
  }

  @logAction('Click on "Home" button')
  async clickOnSidebarHomeButton() {
    await SidebarPage.waitForElemAndClick(SidebarPage['Home button']);
  }

  @logAction('Click on "Products" button')
  async clickOnSidebarProductsButton() {
    await SidebarPage.waitForElemAndClick(SidebarPage['Products button']);
  }

  @logAction('Click on "Orders" button')
  async clickOnSidebarOrdersButton() {
    await SidebarPage.waitForElemAndClick(SidebarPage['Orders button']);
  }

  @logAction('Click on "Customers" button')
  async clickOnSidebarCustomersButton() {
    await SidebarPage.waitForElemAndClick(SidebarPage['Customers button']);
  }

  @logAction('Click on "Customers" button')
  async clickOnSidebarCurrencyBuyButton() {
    await SidebarPage.waitForElemAndClick(SidebarPage["Currency 'Buy' button"]);
  }

  @logAction('Fill currency input')
  async fillValueInCurrencyInput(value: number) {
    await SidebarPage.waitForElemAndSetValue(SidebarPage['Currency input'], value);
  }
}

export default new SidebarActions();
