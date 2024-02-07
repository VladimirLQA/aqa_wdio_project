import OrderDetailsPage from '../../pages/aqa_project/orders/order-details.page';
import { COUNTRIES } from '../../types/customers.types';
import { DELIVERY, LOCATION_TYPE } from '../../types/order.types';
import BaseActions from '../base.actions';

class DeliveryActions extends BaseActions {
  async clickOnCancelButton() {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage.delivery['Cancel button']);
  }

  async clickOnSaveDeliveryButton() {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage.delivery['Save delivery button']);
  }

  async chooseHomeLocation() {
    await this.chooseDropdownItem(OrderDetailsPage.delivery['Location dropdown'], LOCATION_TYPE.HOME);
  }

  async chooseOtherLocation() {
    await this.chooseDropdownItem(OrderDetailsPage.delivery['Location dropdown'], LOCATION_TYPE.OTHER);
  }

  async chooseDeliveryType() {
    await this.chooseDropdownItem(OrderDetailsPage.delivery['Delivery Type dropdown'], DELIVERY.DELIVERY);
  }

  async choosePickUpType() {
    await this.chooseDropdownItem(OrderDetailsPage.delivery['Delivery Type dropdown'], DELIVERY.PICK_UP);
  }

  async clickOnDatePicker() {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage.delivery['Date picker']);
  }

  async chooseUSACountry() {
    await this.chooseDropdownItem(OrderDetailsPage.delivery['Country dropdown'], COUNTRIES.USA);
  }

  async fillCityInputField(text: string) {
    await this.fillInputField(OrderDetailsPage.delivery['City field'], text);
  }

  async fillStreetInputField(text: string) {
    await this.fillInputField(OrderDetailsPage.delivery['Street field'], text);
  }

  async fillFlatInputField(text: string) {
    await this.fillInputField(OrderDetailsPage.delivery['Flat field'], text);
  }

  async fillHouseInputField(text: string) {
    await this.fillInputField(OrderDetailsPage.delivery['House field'], text);
  }
}

export default new DeliveryActions();
