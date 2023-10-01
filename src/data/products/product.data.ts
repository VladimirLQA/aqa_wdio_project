import { faker } from '@faker-js/faker';
import { IProduct } from '../../types/products.type';

// const manufacturer = getRandomManufacturerBrand();
//
// function getRandomManufacturerBrand() {
//   const randomIndex = Math.floor(Math.random() * 8);
//   return arrayOfManufacturerBrands[randomIndex];
// }

export enum MANUFACTURER {
  APPLE = 'Apple',
  SAMSUNG = 'Samsung',
  GOOGLE = 'Google',
  MICROSOFT = 'Microsoft',
  SONY = 'Sony',
  XIAOMI = 'Xiaomi',
  AMAZON = 'Amazon',
  TESLA = 'Tesla',
}

export const newProduct: IProduct = {
  name: faker.commerce.product() + faker.number.int({ min: 1, max: 100 }),
  price: faker.number.int({ min: 50, max: 3000 }),
  amount: faker.number.int({ min: 10, max: 50 }),
  notes: faker.commerce.productDescription(),
  manufacturer: MANUFACTURER.XIAOMI,
};

export const arrayOfManufacturerBrands: MANUFACTURER[] = [
  MANUFACTURER.GOOGLE,
  MANUFACTURER.APPLE,
  MANUFACTURER.AMAZON,
  MANUFACTURER.SONY,
  MANUFACTURER.TESLA,
  MANUFACTURER.MICROSOFT,
  MANUFACTURER.SAMSUNG,
  MANUFACTURER.XIAOMI,
];

export const productToastText = async (text: string) => `Product was successfully ${text}`;
