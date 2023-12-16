import { faker } from '@faker-js/faker';
import { ICustomer, COUNTRIES } from '../../ui/types/customers.types';

export const getNewCustomer = (customProductParams?: Partial<ICustomer>) => {
  return {
    email: faker.internet.email(),
    country: COUNTRIES.CANADA,
    street: faker.location.street(),
    notes: faker.lorem.paragraph(3),
    flat: faker.number.int({ min: 1, max: 100 }),
    phone: faker.phone.number('+38#########'),
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    city: faker.location.city(),
    house: faker.number.int({ min: 1, max: 300 }),
    ...customProductParams,
  };
};

export { COUNTRIES };
