import { COUNTRIES } from '../../../types/customers.types.js';
import BaseActions from '../base.actions.js';
import DeliveryPage from '../../pages/aqa_project/orders/orders-delivery.page.js';
import { getScheduleOrderUI } from '../../../data/orders/orders.data.js';
import { DELIVERY, LOCATION_TYPE, IAddress, IDeliveryWithLocation } from '../../../types/order.types.js';

class DeliveryActions extends BaseActions {
  async clickOnCancelButton() {
    await DeliveryPage.click(DeliveryPage['Cancel button']);
  }

  async clickOnSaveDeliveryButton() {
    await DeliveryPage.click(DeliveryPage['Save delivery button']);
  }

  async chooseScheduleDeliveryType(type: DELIVERY) {
    await this.chooseDropdownItem(DeliveryPage['Delivery Type dropdown'], DeliveryPage['Dropdown option [last()]'](type));
  }

  async chooseLocationType(location: LOCATION_TYPE) {
    await this.chooseDropdownItem(DeliveryPage['Location dropdown'], DeliveryPage['Dropdown option [last()]'](location));
  }

  async clickOnDatePicker() {
    await DeliveryPage.click(DeliveryPage['Date picker']);
  }

  async clickOnActiveDayInDatePicker(date: string) {
    const day = +date.split('/').at(-1)!;
    await DeliveryPage.click(DeliveryPage['Date picker active day'](+day));
  }

  async chooseDate(day: string) {
    await this.clickOnDatePicker();
    await this.clickOnActiveDayInDatePicker(day);
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

  async chooseCountry(country: COUNTRIES | string) {
    await this.chooseDropdownItem(DeliveryPage['Country dropdown'], DeliveryPage['Dropdown option [last()]'](country));
  }

  async fillAddress(address: Partial<IAddress>) {
    await this.fillCityInputField(address!.city!);
    await this.fillFlatInputField(address!.flat!);
    await this.fillHouseInputField(address!.house!);
    await this.fillStreetInputField(address!.street!);
    await this.chooseCountry(address!.country!);
  }

  async scheduleOrder(schedule?: IDeliveryWithLocation) {
    const sch = { ...getScheduleOrderUI(), ...schedule };
    await this.chooseScheduleDeliveryType(sch.condition!);
    await this.chooseLocationType(sch.location);
    // await this.chooseLocationType(LOCATION_TYPE.HOME);

    await this.chooseDate(sch.finalDate);
    if (sch.location === LOCATION_TYPE.OTHER && sch.condition === DELIVERY.DELIVERY) {
      await this.fillAddress(sch!.address!);
    } else if (sch.condition === DELIVERY.PICK_UP) {
      await this.chooseCountry(sch.address?.country!);
    }
    await this.clickOnSaveDeliveryButton();
    await this.waitForPageLoad();
  }

  // shedule delivery with home location
  // shedule delivery with other location
  // shedule pickup
}

export default new DeliveryActions();
