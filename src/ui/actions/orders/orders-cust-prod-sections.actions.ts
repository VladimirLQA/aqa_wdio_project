import { logAction } from '../../../utils/reporter/allure.reporter';
import OrderDetailsPage from '../../pages/aqa_project/orders/order-details.page';
import Utils from '../../../utils/helpers';
import BaseActions from '../base.actions';

class CustomerProductsActions extends BaseActions {
  @logAction('Click on customer details pencil button')
  async clickOnCustomerDetailsPencilbutton() {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage.orderSection['Customer']['Edit customer pencil button']);
  }

  @logAction('Click on products pencil button')
  async clickOnProductsPencilbutton() {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage.orderSection['Products']['Edit products pencil button']);
  }

  async clickOnAllAccordionButtonsInProductSection() {
    const buttons = await OrderDetailsPage.getArrayOfElements(OrderDetailsPage.orderSection['Products']['Accordion button']);
    for (let b of buttons) {
      b.click();
    }
    await Utils.browserPause(500);
  }

  async clickOnAccordionButtonByNameInProductSection(productName: string) {
    await OrderDetailsPage.waitForElemAndClick(
      OrderDetailsPage.orderSection['Products']['Accordion button with specified name'](productName),
    );
  }
}

export default new CustomerProductsActions();
