import { logAction } from "../../../utils/reporter/allure.reporter";
import BasePage from "../../pages/aqa_project/base.page";
import OrderDetailsPage from "../../pages/aqa_project/orders/order-details.page";



class OrdersDetailsActions extends BasePage {

    @logAction('Click on refresh order button')
    async clickOnRefreshOrderButton() {
        await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage['Refresh order button']);
    } 

    @logAction('Click on cancel order button')
    async clickOnCancelOrderButton() {
        await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage['Cancel order button']);
    } 
        
    @logAction('....')
    async clickOnCustomerDetailsPencil() {
        await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage['Edit customer pencil button']);
    } 
    
    @logAction('....')
    async clickOnRequestedProductsPencil() {
        await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage['Edit products pencil button']);
    } 

    @logAction('....')
    async clickOnDetailsOrderTab(tabName: 'delivery' | 'history' | 'comments') {
        await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage['Details order tab title'](tabName));
    } 
}

export default new OrdersDetailsActions();