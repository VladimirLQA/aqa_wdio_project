import { faker } from '@faker-js/faker';
import { IProduct, MANUFACTURERS } from '../../ui/types/products.types';

export interface ProductsTestData extends IProduct {
  description: string;
}
// Record<string, Record<keyof IProduct, Partial<ProductsTestData>[]>>
export const productData: any = {
  valid: {
    name: [
      {
        name: faker.string.alpha(40),
        description: '40 symbols value',
      },
      {
        name: faker.string.alpha(3),
        description: '3 symbols value',
      },
      {
        name: faker.string.alpha({ casing: 'upper', length: 4 }),
        description: 'Upper case only',
      },
      {
        name: faker.string.alpha(3) + ' ' + faker.string.alpha(4),
        description: 'Value with 1 space',
      },
      // {
      //   name: faker.number.int({ min: 100, max: 333 }),
      //   description: 'only digits',
      // },
    ],
    price: [
      {
        price: 1,
        description: 'Min value',
      },
      {
        price: 99999,
        description: 'Max value',
      },
      {
        price: 332,
        description: 'Average value',
      },
    ],
    manufacturer: [
      {
        manufacturer: MANUFACTURERS.GOOGLE,
        description: 'One of the default value',
      },
      {
        manufacturer: MANUFACTURERS.TESLA,
        description: 'One of the default value',
      },
    ],
    amount: [
      {
        amount: 0,
        description: 'Min value - 0',
      },
      {
        amount: 999,
        description: 'Max value - 999',
      },
      {
        amount: 36,
        description: 'Average value',
      },
    ],
    notes: [
      {
        notes: '',
        description: 'Empty string',
      },
      {
        notes: faker.string.alpha({ length: 250, casing: 'mixed' }),
        description: '250 symbols value: string (upper, lower)',
      },
      {
        notes: '!@#$%^&&*()_-++=.?,\\}{po[]',
        description: 'Special characters except "<>"',
      },
    ],
  },
  invalid: {
    name: [
      {
        name: '',
        description: 'Empty value',
      },
      {
        name: faker.string.alpha(3) + '  ' + faker.string.alpha(2),
        description: 'Value with two spaces in a row',
      },
      {
        name: faker.string.alpha(2),
        description: '2 symbols value',
      },
      {
        name: faker.string.alpha(41),
        description: '41 symbols value',
      },
      {
        name: 'Назва продукту',
        description: 'cyrillic name',
      },
    ],
    price: [
      { price: 0, description: '0 value' },
      { price: 100000, description: '6 digits value' },
      { price: faker.number.float({ min: 2, max: 11 }), description: 'Float value with two values after period' },
      { price: -2, description: 'negative value' },
      { price: '1', description: 'string value' },
    ],
    manufacturer: [
      { manufacturer: MANUFACTURERS.GOOGLE },
      { manufacturer: MANUFACTURERS.TESLA },
      { manufacturer: MANUFACTURERS.MICROSOFT },
    ],
    amount: [{ amount: 0 }, { amount: 999 }, { amount: 36 }],
    notes: [
      { notes: '' },
      {
        notes:
          'aaaaaaaaaaaaAAaaaasdfhgsdfewjehfkwjhefjkhwekjrghsdjkghsFGDhvsidufwiuendfnaskdjfhgajkshdgaksjdhgkasjhdaaaaaaaaaaaaaaaaaasdfhgsdfewjehfkwjhefjkhwekjrghsdjkghsdkfhvsidufwiuendfnaskdjfhgajkshdgaksjdhgkasjhddfgsdgfhsdfbsdfgnghjrtwertgsdrsdrgwerwgerwyertrt',
      },
      { notes: '!@#$%^&&*()_-++=.?,\\}{po[]' },
    ],
  },
};
