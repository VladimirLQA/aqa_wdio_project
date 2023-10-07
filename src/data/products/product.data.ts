import { faker } from '@faker-js/faker';
import { IProduct } from '../../types/products.type';

// const manufacturer = getRandomManufacturerBrand();
//
// function getRandomManufacturerBrand() {
//   const randomIndex = Math.floor(Math.random() * 8);
//   return arrayOfManufacturerBrands[randomIndex];
// }

enum MANUFACTURERS {
  APPLE = "Apple",
  SAMSUNG = "Samsung",
  GOOGLE = "Google",
  MICROSOFT = "Microsoft",
  SONY = "Sony",
  XIAOMI = "Xiaomi",
  AMAZON = "Amazon",
  TESLA = "Tesla",
}

const productToastMessages = {
  created: () => `Product was successfully created`,
  updated: () => `Product was successfully updated`,
  deleted: () => `Product was successfully deleted`,
  'assigned to order': () => `Not allowed to delete product, assigned to the order`,
  'already exist': (name?: string) => `Product with name '${name}' already exists`,
};

const newProduct: IProduct = {
  name: faker.commerce.product() + faker.number.int({ min: 1, max: 100 }),
  price: faker.number.int({ min: 50, max: 3000 }),
  amount: faker.number.int({ min: 10, max: 50 }),
  notes: faker.commerce.productDescription(),
  manufacturer: MANUFACTURERS.TESLA,
};

const inputError = {
  nameField: 'Products\'s name should contain only 3-40 alphanumerical characters and one space between',
  priceField: 'Price should be in range 1-99999',
  amountField: 'Amount should be in range 0-999',
};

const productInputs = {
  positiveDataNameField: [
    { name: 'aaaaaaaaaaaaaaaaaA1aaaaaaaaaaaaaaaaaaaaa', price: 1, amount: 0  },
    { name: 'a a', price: 99999, amount: 999 },
    { name: 'a a', price: 12345, amount: 1 },
    { name: '23423423', price: 12345, amount: 1 },
  ],
};

const actionButtonsTableRow = {
  details: 'Details',
  edit: 'Edit',
  delete: 'Delete',
};

export { inputError, newProduct, MANUFACTURERS, productInputs, actionButtonsTableRow, productToastMessages };