import { COUNTRIES } from '../../types/customers.types.js';
import { DELIVERY, IAddress, IDelivery, LOCATION_TYPE } from '../../types/order.types.js';
import BaseActions from '../base.actions.js';
import DeliveryPage from '../../pages/aqa_project/orders/orders-delivery.page.js';
import Utils from '../../../utils/helpers.js';

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
    await DeliveryPage.click(DeliveryPage['Date picker active day'](day));
  }

  async chooseDate(day: number) {
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

  // todo simplify method
  async chooseCountry(country: COUNTRIES) {
    switch (country) {
      case COUNTRIES.BELARUS:
        await this.chooseDropdownItem(DeliveryPage['Country dropdown'], DeliveryPage['Dropdown option [last()]'](COUNTRIES.BELARUS));
        break;
      case COUNTRIES.USA:
        await this.chooseDropdownItem(DeliveryPage['Country dropdown'], DeliveryPage['Dropdown option [last()]'](COUNTRIES.USA));
        break;
      case COUNTRIES.CANADA:
        await this.chooseDropdownItem(DeliveryPage['Country dropdown'], DeliveryPage['Dropdown option [last()]'](COUNTRIES.CANADA));
        break;
      case COUNTRIES.UKRAINE:
        await this.chooseDropdownItem(DeliveryPage['Country dropdown'], DeliveryPage['Dropdown option [last()]'](COUNTRIES.UKRAINE));
        break;
      case COUNTRIES.RUSSIA:
        await this.chooseDropdownItem(DeliveryPage['Country dropdown'], DeliveryPage['Dropdown option [last()]'](COUNTRIES.RUSSIA));
        break;
      case COUNTRIES.FRANCE:
        await this.chooseDropdownItem(DeliveryPage['Country dropdown'], DeliveryPage['Dropdown option [last()]'](COUNTRIES.FRANCE));
        break;
      case COUNTRIES.GERMANY:
        await this.chooseDropdownItem(DeliveryPage['Country dropdown'], DeliveryPage['Dropdown option [last()]'](COUNTRIES.GERMANY));
        break;
      case COUNTRIES.GREAT_BRITAIN:
        await this.chooseDropdownItem(DeliveryPage['Country dropdown'], DeliveryPage['Dropdown option [last()]'](COUNTRIES.GREAT_BRITAIN));
        break;
    }
  }

  async fillAddress(address: IAddress) {
    await this.fillCityInputField(address!.city);
    await this.fillFlatInputField(address!.flat);
    await this.fillHouseInputField(address!.house);
    await this.fillStreetInputField(address!.street);
    await this.chooseCountry(address?.country!);
  }


  // TODO deal with lag after choosing option in location dropdown
  async scheduleOrder(schedule: IDelivery & { location: LOCATION_TYPE }) {
    await this.chooseScheduleDeliveryType(schedule.condition!);
    await this.chooseLocationType(schedule.location);
    await Utils.browserPause(3000)
    await this.chooseLocationType(LOCATION_TYPE.HOME);
    await this.chooseDate(+schedule.finalDate!);
    await Utils.browserPause(5000);
    if (schedule.location === LOCATION_TYPE.OTHER && schedule.condition === DELIVERY.DELIVERY) {
      await this.fillAddress(schedule!.address!);
    } else if (schedule.condition === DELIVERY.PICK_UP) {
      await this.chooseCountry(schedule.address?.country!);

    }
    await this.clickOnSaveDeliveryButton();
    await this.waitForPageLoad();
  }

  // shedule delivery with home location
  // shedule delivery with other location
  // shedule pickup
}

export default new DeliveryActions();
