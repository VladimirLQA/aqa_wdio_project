import { IProduct, MANUFACTURERS } from '../../ui/types/products.types';

export interface ProductsTestData extends IProduct {
  description: string;
}

export const productData: Record<string, Record<keyof IProduct, Partial<ProductsTestData>[]>> = {
  valid: {
    name: [
      {
        name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        description: '40 symbols value',
      },
      {
        name: 'aaa',
        description: '3 symbols value',
      },
      {
        name: 'FFFF',
        description: 'Upper case only',
      },
      {
        name: 'One space',
        description: 'Value with 1 space',
      },
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
        description: 'Min value',
      },
      {
        amount: 999,
        description: 'Max value',
      },
      {
        amount: 36,
        description: 'Average value',
      },
    ],
    notes: [
      {
        notes: '',
        description: 'Empty value',
      },
      {
        notes: '1234567890aaAAaaaasdfhgsdfewjehfkwjhefjkhwekjrghsdjkghsFGDhvsidufwiuendfnaskdjfhgajkshdgaksjdhgkasjhdaaaaaaaaaaaaaaaaaasdfhgsdfewjehfkwjhefjkhwekjrghsdjkghsdkfhvsidufwiuendfnaskdjfhgajkshdgaksjdhgkasjhddfgsdgfhsdfbsdfgnghjrtwertgsdrsdrgwerwgerwyertrt',
        description: '250 symbols value',
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
        name: 'aaa',
        description: '3 symbols value',
      },
      {
        name: 'FFFF',
        description: 'Upper case only',
      },
      {
        name: 'One space',
        description: 'Value with 1 space',
      },
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
};