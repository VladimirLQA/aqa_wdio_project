import { CommonActions } from '../common.actions';
import OrdersPage from '../../pages/aqa_project/orders/orders.page';
import { logAction } from '../../../utils/reporter/allure.reporter';


class OrdersActions extends CommonActions {

  @logAction('Click on details row button')
  async clickOnDetailsRowButton(orderNum: string, action: string) {
    await this.basePage.waitForElemAndClick(OrdersPage['Table row action button'](orderNum, action));
  }

  @logAction('Click on "Create order" button')
  async clickOnCreateOrderButton() {
    await this.basePage.waitForElemAndClick(OrdersPage['Create order button']);
  }

}

export default new OrdersActions();