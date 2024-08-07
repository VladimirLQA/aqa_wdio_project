import { ICustomer } from '../types/customers.types.js';
// import Utils from './utils.js';
//
// const test1 = {
//   customer: {
//     _id: '65e4c2d417a8b30528db45f0',
//     email: 'Samara_Bahringer@gmail.com',
//     name: 'Foster Casper',
//     country: 'Canada',
//     city: 'Daronville',
//     street: 'Commercial Road',
//     house: 24,
//     flat: 49,
//     phone: '+38835936970',
//     createdOn: '2024-03-03T18:35:00.000Z',
//     notes:
//       'Tantum denego denuncio cinis tergeo adnuo cohors ullus vorago. Substantia cubitum utilis. Thymum creo sulum acsi acervus cursus uberrime tubineus.',
//   },
//   delivery: {
//     address: {
//       country: 'Canada',
//       city: 'Daronville',
//       street: 'Commercial Road',
//       house: 24,
//       flat: 49,
//     },
//     finalDate: '2024-03-06T00:00:00.000Z',
//     condition: 'Delivery',
//   },
//   total_price: 123,
// };
//
// export const rebuildObj = <T extends { customer?: ICustomer; delivery?: { finalDate: string } }>(obj: T) => {
//   const { customer, delivery } = obj;
//
//   if (customer && delivery) {
//     delete obj.customer;
//     delete obj.delivery;
//   }
//   const dateToWeb = Utils.dateToYYYYMMDD(delivery!.finalDate);
//
//   return { ...obj, Name: customer?.name, Delivery: dateToWeb };
// };
//
// // console.log(rebuildObj(test1));
//
// function getStringInDoubleQuotes(input: string) {
//   const matches = input.match(/"([^"]*)"/);
//   if (matches && matches.length > 1) return matches[1]; // The first capturing group contains the string inside double quotes
// }
//
// console.log(getStringInDoubleQuotes('Hello "my" love'));

export type Prettify<T> =  { [k in keyof T]: T[k] };

type AO = Omit<ICustomer, 'email' | 'name' | 'notes'>;

type Customer = Prettify<AO>;

