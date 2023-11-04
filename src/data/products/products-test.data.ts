import { MANUFACTURERS } from './product.data';
import { IProduct } from '../../ui/types/products.types';

interface ProductsTestData extends IProduct {
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
  invalid: {
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