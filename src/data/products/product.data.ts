import { faker } from '@faker-js/faker';
import { IProduct } from '../../ui/types/products.type';

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

const productData = {
  valid: {
    name: [
      { name: 'aaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaa' },
      { name: 'aaa' },
      { name: 'FF FF' },
      { name: '23423423' },
    ],
    price: [
      { price: 1 },
      { price: 99999 },
      { price: 332 },
    ],
    manufacturer: [
      { manufacturer: MANUFACTURERS.GOOGLE },
      { manufacturer: MANUFACTURERS.TESLA },
      { manufacturer: MANUFACTURERS.MICROSOFT },
    ],
    amount: [
      { amount: 0 },
      { amount: 999 },
      { amount: 36 },
    ],
    notes: [
      { notes: '' },
      { notes: 'aaaaaaaaaaaaAAaaaasdfhgsdfewjehfkwjhefjkhwekjrghsdjkghsFGDhvsidufwiuendfnaskdjfhgajkshdgaksjdhgkasjhdaaaaaaaaaaaaaaaaaasdfhgsdfewjehfkwjhefjkhwekjrghsdjkghsdkfhvsidufwiuendfnaskdjfhgajkshdgaksjdhgkasjhddfgsdgfhsdfbsdfgnghjrtwertgsdrsdrgwerwgerwyertrt' },
      { notes: '!@#$%^&&*()_-++=.?,\\}{po[]' },
    ],
  },
  invalid: {},
};

const actionButtonsTableRow = {
  details: 'Details',
  edit: 'Edit',
  delete: 'Delete',
};

export {
  inputError,
  newProduct,
  MANUFACTURERS,
  productData,
  actionButtonsTableRow,
  productToastMessages,
  getNewProduct,
  errorToastMessage,
  manufacturersArray
};