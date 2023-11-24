import { COUNTRIES } from '../customers/customers.data';

export const CREATE_CUSTOMER_SCHEMA = {
  type: 'object',
  properties: {
    Customer: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
          description: 'The unique identifier for a customer',
        },
        email: { type: 'string' },
        flat: { type: 'integer' },
        house: { type: 'integer' },
        country: { type: 'string' },
        createdOn: { type: 'string' },
        notes: { type: 'string' },
        street: { type: 'string' },
        city: { type: 'string' },
        phone: { type: 'string' },
      },
      required: ['_id', 'email', 'flat', 'house', 'country', 'createdOn',
        'street', 'city', 'phone'],
    },
    IsSuccess: { type: 'boolean' },
    ErrorMessage: { type: ['string', 'null'] },
  },
  required: ['Customer', 'IsSuccess', 'ErrorMessage'],
};
