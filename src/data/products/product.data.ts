import { faker } from '@faker-js/faker';
import { IProduct, MANUFACTURERS } from '../../types/products.types.js';

export const productToastMessages = {
  created: () => `Product was successfully created`,
  updated: () => `Product was successfully updated`,
  deleted: () => `Product was successfully deleted`,
  'assigned to order': () => `Not allowed to delete product, assigned to the order`,
  'already exist': (name?: string) => `Product with name '${name}' already exists`,
};

export const generateProduct = (productData?: Partial<IProduct>) => {
  return {
    name: faker.commerce.product() + faker.number.int({ min: 1, max: 100 }),
    price: faker.number.int({ min: 50, max: 3000 }),
    amount: faker.number.int({ min: 10, max: 50 }),
    notes: faker.commerce.productDescription(),
    manufacturer: MANUFACTURERS.TESLA,
    ...productData,
  };
};

export const actionButtonsTableRow = {
  details: 'Details',
  edit: 'Edit',
  delete: 'Delete',
};
