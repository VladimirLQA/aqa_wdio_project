import { MANUFACTURERS } from './product.data';

export const productData = {
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