import { faker } from '@faker-js/faker';
import { InputFieldsData, IProduct, ProductInputs } from '../../types/products.type';

// const manufacturer = getRandomManufacturerBrand();
//
// function getRandomManufacturerBrand() {
//   const randomIndex = Math.floor(Math.random() * 8);
//   return arrayOfManufacturerBrands[randomIndex];
// }

enum MANUFACTURER {
  APPLE = 'Apple',
  SAMSUNG = 'Samsung',
  GOOGLE = 'Google',
  MICROSOFT = 'Microsoft',
  SONY = 'Sony',
  XIAOMI = 'Xiaomi',
  AMAZON = 'Amazon',
  TESLA = 'Tesla',
}

const newProduct: IProduct = {
  name: faker.commerce.product() + faker.number.int({ min: 1, max: 100 }),
  price: faker.number.int({ min: 50, max: 3000 }),
  amount: faker.number.int({ min: 10, max: 50 }),
  notes: faker.commerce.productDescription(),
  manufacturer: MANUFACTURER.XIAOMI,
};

const arrayOfManufacturerBrands: MANUFACTURER[] = [
  MANUFACTURER.GOOGLE,
  MANUFACTURER.APPLE,
  MANUFACTURER.AMAZON,
  MANUFACTURER.SONY,
  MANUFACTURER.TESLA,
  MANUFACTURER.MICROSOFT,
  MANUFACTURER.SAMSUNG,
  MANUFACTURER.XIAOMI,
];

const inputError = {
  nameField: 'Products\'s name should contain only 3-40 alphanumerical characters and one space between',
  priceField: 'Price should be in range 1-99999',
  amountField: 'Amount should be in range 0-999',
};

const productInputs = {
  positiveDataNameField: [
    { name: 'Pro', price: 12345, amount: 1 },
    { name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', price: 12345, amount: 1 },
    { name: 'aaa a', price: 12345, amount: 1 },
    { name: '23423423', price: 12345, amount: 1 },
  ],
};

export { inputError, arrayOfManufacturerBrands, newProduct, MANUFACTURER, productInputs };