import { COUNTRIES } from '../../types/customers.types.js';
import { DELIVERY, IAddress, IDelivery, LOCATION_TYPE } from '../../types/order.types.js';
import BaseActions from '../base.actions.js';
import OrderTabsSectionActions from './orders-tabs-section.actions.js';
import DeliveryPage from '../../pages/aqa_project/orders/orders-delivery.page.js';

class DeliveryActions extends BaseActions {
  async clickOnCancelButton() {
    await DeliveryPage.click(DeliveryPage['Cancel button']);
  }

  async clickOnSaveDeliveryButton() {
    await DeliveryPage.click(DeliveryPage['Save delivery button']);
  }

  async chooseScheduleDeliveryType(type: DELIVERY) {
    if (type === DELIVERY.DELIVERY)
      await this.chooseDropdownItem(DeliveryPage['Delivery Type dropdown'], DeliveryPage['Dropdown option [last()]'](DELIVERY.DELIVERY));
    else
      await this.chooseDropdownItem(DeliveryPage['Delivery Type dropdown'], DeliveryPage['Dropdown option [last()]'](DELIVERY.PICK_UP));
  }

  async chooseLocationType(location: LOCATION_TYPE) {
    if (location === LOCATION_TYPE.HOME)
      await this.chooseDropdownItem(DeliveryPage['Location dropdown'], DeliveryPage['Dropdown option [last()]'](LOCATION_TYPE.HOME));
    else
      await this.chooseDropdownItem(DeliveryPage['Location dropdown'], DeliveryPage['Dropdown option [last()]'](LOCATION_TYPE.OTHER));
  }

  async clickOnDatePicker() {
    await DeliveryPage.click(DeliveryPage['Date picker']);
  }

  async clickOnActiveDayInDatePicker(day: number) {
    await DeliveryPage.click(DeliveryPage['Date picker pick day'](day));
  }

  async chooseDate(day: number) {
    await this.clickOnDatePicker();
    await this.clickOnActiveDayInDatePicker(day);
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

  // TODO deal with lag after choosing option in location dropdown
  // TODO add separate business logic methods for delivery, location, country dropdown
  async scheduleOrder(schedule: Partial<IDelivery & { location: LOCATION_TYPE }>) {
    await OrderTabsSectionActions.clickOnScheduleEditDeliveryButton();
    await this.chooseScheduleDeliveryType(schedule!.condition!);
    await this.chooseLocationType(schedule!.location!);
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
