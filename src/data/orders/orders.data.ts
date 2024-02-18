import { faker } from '@faker-js/faker';
import { DELIVERY, IDelivery, LOCATION_TYPE } from '../../ui/types/order.types.js';
import { COUNTRIES } from '../customers/customers.data.js';

export const orderPageToastMessages = {
  deliverySaved: () => 'Delivery was successfully saved',
  orderProcessingStarted: () => 'Order processing was successfully started',
  productReceived: () => 'Products were successfully received',
  commentPosted: () => 'Comment was successfully posted',
  commentDeleted: () => 'Comment was successfully deleted',
  orderCreated: () => 'Order was successfully created',
};

export const comment: string = 'dream';

export const scheduleOrder = (schedule?: Partial<IDelivery>): IDelivery => {
  return {
    condition: DELIVERY.DELIVERY,
    finalDate: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(),
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

export const scheduleOrderUI = (schedule?: Partial<IDelivery & { location: LOCATION_TYPE }>): IDelivery & { location: LOCATION_TYPE } => {
  return {
    condition: DELIVERY.DELIVERY,
    finalDate: new Date(new Date().setDate(new Date().getDate() + 3)).getDate(),
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
