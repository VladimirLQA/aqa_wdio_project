import { faker } from '@faker-js/faker';
import { ICustomer, COUNTRIES } from '../../types/customers.types.js';

export const generateCustomer = (customerData?: Partial<ICustomer>) => {
  return {
    email: faker.internet.email(),
    country: COUNTRIES.CANADA,
    street: faker.string.alpha({ length: { min: 1, max: 40 } }),
    notes: faker.lorem.paragraph(3),
    flat: faker.number.int({ min: 1, max: 100 }),
    phone: `+380${faker.string.numeric({ length: 8 })}`,
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    city: faker.location.city(),
    house: faker.number.int({ min: 1, max: 300 }),
    ...customerData,
  };
};
