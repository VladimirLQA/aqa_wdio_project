import { faker } from '@faker-js/faker';
import { DELIVERY, IAddress, IDelivery, IDeliveryWithLocation, LOCATION_TYPE } from '../../types/order.types.js';
import utils from '../../utils/utils.js';
import { COUNTRIES } from '../../types/customers.types.js';

export const orderPageToastMessages = {
  deliverySaved: () => 'Delivery was successfully saved',
  orderProcessingStarted: () => 'Order processing was successfully started',
  productReceived: () => 'Products were successfully received',
  commentPosted: () => 'Comment was successfully posted',
  commentDeleted: () => 'Comment was successfully deleted',
  orderCreated: () => 'Order was successfully created',
  orderUpdated: () => 'Order was successfully updated',
};

export const getComment = () => faker.commerce.productDescription() + faker.number.int(100);
export const getScheduleOrder = (schedule?: Partial<IDelivery>): IDelivery => {
  return {
    condition: DELIVERY.DELIVERY,
    finalDate: utils.dateToYYYYMMDD(new Date(new Date().setDate(new Date().getDate() + 3)).toISOString()),
    address: {
      city: faker.location.city(),
      country: COUNTRIES.GREAT_BRITAIN,
      street: faker.location.street(),
      flat: faker.number.int({ min: 0, max: 999 }),
      house: faker.number.int({ min: 0, max: 9999 }),
    },
    ...schedule,
  };
};

export const getScheduleOrderUI = (schedule?: Partial<IDeliveryWithLocation>): IDeliveryWithLocation => {
  return {
    condition: DELIVERY.DELIVERY,
    finalDate: utils.dateToYYYYMMDD(new Date(new Date().setDate(new Date().getDate() + 3)).toString()),
    location: LOCATION_TYPE.HOME,
    address: {
      city: faker.location.city(),
      country: COUNTRIES.GREAT_BRITAIN,
      street: faker.location.street(),
      flat: faker.number.int({ min: 10, max: 200 }),
      house: +faker.location.buildingNumber(),
    },
    ...schedule,
  };
};

export const commentsForOrderStatus = {
  draft: 'draft - order status',
  received: 'received - order status',
  inProcess: 'in process - order status',
  partiallyReceived: 'partially received - order status',
};

export const DeliveryPageTitles = {
  schedule: 'Schedule Delivery',
  edit: 'Edit Delivery',
};

export const getShopAddress = (country: COUNTRIES | string) => {
  return {
    ...shopAddressByCountry[country as COUNTRIES],
    country,
  };
};

export const shopAddressByCountry: Record<COUNTRIES, Omit<IAddress, 'country'>> = {
  USA: {
    city: 'Jefferson City',
    street: 'John Daniel Drive',
    house: 381,
    flat: 2,
  },
  Canada: {
    city: 'Halifax',
    street: 'Higginsville Road',
    house: 563,
    flat: 24,
  },
  Belarus: {
    city: 'Vitebsk',
    street: 'Frunze',
    house: 22,
    flat: 20,
  },
  Ukraine: {
    city: 'Yalta',
    street: 'Leningradskaya',
    house: 55,
    flat: 1,
  },
  Germany: {
    city: 'Altendorf',
    street: 'Luebecker Strasse',
    house: 41,
    flat: 3,
  },
  France: {
    city: 'Le Bouscat',
    street: 'boulevard Aristide Briand',
    house: 99,
    flat: 56,
  },
  'Great Britain': {
    city: 'Mickletown',
    street: 'Winchester Rd',
    house: 20,
    flat: 44,
  },
  Russia: {
    city: 'Chelyabinsk',
    street: 'Grazhdanskaya',
    house: 14,
    flat: 101,
  },
};
