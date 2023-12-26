import { faker } from '@faker-js/faker';
import { IProduct, MANUFACTURERS } from '../../ui/types/products.types';

export const productToastMessages = {
  created: () => `Product was successfully created`,
  updated: () => `Product was successfully updated`,
  deleted: () => `Product was successfully deleted`,
  'assigned to order': () => `Not allowed to delete product, assigned to the order`,
  'already exist': (name?: string) => `Product with name '${name}' already exists`,
};

export const errorMessage = {
  'already exist': (name: string) => `Product with name '${name}' already exists`,
};

export const getNewProduct = (customProductParams?: Partial<IProduct>): IProduct => {
  return {
    name: faker.commerce.product() + faker.number.int({ min: 1, max: 100 }),
    price: faker.number.int({ min: 50, max: 3000 }),
    amount: faker.number.int({ min: 10, max: 50 }),
    notes: faker.commerce.productDescription(),
    manufacturer: MANUFACTURERS.TESLA,
    ...customProductParams,
  };
};

export const actionButtonsTableRow = {
  details: 'Details',
  edit: 'Edit',
  delete: 'Delete',
};

export { MANUFACTURERS };
