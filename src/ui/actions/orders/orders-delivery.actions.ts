import { COUNTRIES } from '../../types/customers.types.js';
import { DELIVERY, IAddress, IDelivery, LOCATION_TYPE } from '../../types/order.types.js';
import BaseActions from '../base.actions.js';
import OrderTabsSectionActions from './orders-tabs-section.actions.js';
import Utils from '../../../utils/helpers.js';
import DeliveryPage from '../../pages/aqa_project/orders/orders-delivery.page.js';

class DeliveryActions extends BaseActions {
  async clickOnCancelButton() {
    await DeliveryPage.click(DeliveryPage['Cancel button']);
  }

  async clickOnSaveDeliveryButton() {
    await DeliveryPage.click(DeliveryPage['Save delivery button']);
  }

  async chooseHomeLocation() {
    await this.chooseDropdownItem(DeliveryPage['Location dropdown'], LOCATION_TYPE.HOME);
  }

  async chooseOtherLocation() {
    await this.chooseDropdownItem(DeliveryPage['Location dropdown'], LOCATION_TYPE.OTHER);
  }

  async chooseDeliveryType() {
    await this.chooseDropdownItem(DeliveryPage['Delivery Type dropdown'], DELIVERY.DELIVERY);
  }

  async choosePickUpType() {
    await this.chooseDropdownItem(DeliveryPage['Delivery Type dropdown'], DELIVERY.PICK_UP);
  }

  async clickOnDatePicker() {
    await DeliveryPage.click(DeliveryPage['Date picker']);
  }

  async clicknOnActiveDayInDatePicker(day: number) {
    await DeliveryPage.click(DeliveryPage['Date picker pick day'](day));
  }

  async chooseDate(day: number) {
    await this.clickOnDatePicker();
    await this.clicknOnActiveDayInDatePicker(day);
  }

  async chooseUSACountry() {
    await this.chooseDropdownItem(DeliveryPage['Country dropdown'], DeliveryPage['Country dropdown list'](COUNTRIES.USA));
  }

  async fillCityInputField(text: string) {
    await this.fillInputField(DeliveryPage['City field'], text);
  }

  async fillStreetInputField(text: string) {
    await this.fillInputField(DeliveryPage['Street field'], text);
  }

  async fillFlatInputField(text: number) {
    await this.fillInputField(DeliveryPage['Flat field'], text);
  }

  async fillHouseInputField(text: number) {
    await this.fillInputField(DeliveryPage['House field'], text);
  }

  async fillAddress(address: IAddress) {
    await this.fillCityInputField(address!.city);
    await this.fillFlatInputField(address!.flat);
    await this.fillHouseInputField(address!.house);
    await this.fillStreetInputField(address!.street);
    await this.chooseDropdownItem(DeliveryPage['Country dropdown'], DeliveryPage['Dropdown option [last()]'](address?.country!));
  }

  async scheduleOrder(schedule: Partial<IDelivery & { location: LOCATION_TYPE }>) {
    await OrderTabsSectionActions.clickOnScheduleEditDeliveryButton();
    await this.chooseDropdownItem(DeliveryPage['Delivery Type dropdown'], DeliveryPage['Dropdown option [last()]'](schedule!.condition!));
    await Utils.browserPause(3000);

    await this.chooseDropdownItem(DeliveryPage['Location dropdown'], DeliveryPage['Dropdown option [last()]'](schedule!.location!));
    await Utils.browserPause(5000);
    await this.chooseDate(+schedule!.finalDate!);
    if (schedule.location === LOCATION_TYPE.OTHER && schedule.condition === DELIVERY.DELIVERY) {
      await this.fillAddress(schedule!.address!);
    } else if (schedule.condition === DELIVERY.PICK_UP) {
      await this.chooseDropdownItem(
        DeliveryPage['Country dropdown'],
        DeliveryPage['Dropdown option [last()]'](schedule!.address?.country!),
      );
    }
    await this.clickOnSaveDeliveryButton();
    await this.waitForPageLoad();
  }

  // shedule delivery with home location
  // shedule delivery with other location
  // shedule pickup
}

export default new DeliveryActions();
