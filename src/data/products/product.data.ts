import { faker } from '@faker-js/faker';
import { IProduct } from '../../ui/types/products.types';

// const manufacturer = getRandomManufacturerBrand();
//
// function getRandomManufacturerBrand() {
//   const randomIndex = Math.floor(Math.random() * 8);
//   return arrayOfManufacturerBrands[randomIndex];
// }

enum MANUFACTURERS {
  APPLE = 'Apple',
  SAMSUNG = 'Samsung',
  GOOGLE = 'Google',
  MICROSOFT = 'Microsoft',
  SONY = 'Sony',
  XIAOMI = 'Xiaomi',
  AMAZON = 'Amazon',
  TESLA = 'Tesla',
}

const manufacturersArray = [
  MANUFACTURERS.GOOGLE,
  MANUFACTURERS.TESLA,
  MANUFACTURERS.MICROSOFT,
  MANUFACTURERS.APPLE,
  MANUFACTURERS.SAMSUNG,
  MANUFACTURERS.SONY,
  MANUFACTURERS.XIAOMI,
  MANUFACTURERS.AMAZON,
]

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

const getNewProduct = (customProductParams?: Partial<IProduct>): IProduct => {
  return {
    name: faker.commerce.product() + faker.number.int({ min: 1, max: 100 }),
    price: faker.number.int({ min: 50, max: 3000 }),
    amount: faker.number.int({ min: 10, max: 50 }),
    notes: faker.commerce.productDescription(),
    manufacturer: MANUFACTURERS.TESLA,
    ...customProductParams
  }
};

const inputError = {
  nameField: 'Products\'s name should contain only 3-40 alphanumerical characters and one space between',
  priceField: 'Price should be in range 1-99999',
  amountField: 'Amount should be in range 0-999',
};

const errorToastMessage = 'Incorrect request body';

const actionButtonsTableRow = {
  details: 'Details',
  edit: 'Edit',
  delete: 'Delete',
};

export {
  inputError,
  newProduct,
  MANUFACTURERS,
  actionButtonsTableRow,
  productToastMessages,
  getNewProduct,
  errorToastMessage,
  manufacturersArray
};