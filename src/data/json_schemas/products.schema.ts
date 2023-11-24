export const CREATE_PRODUCT_SCHEMA = {
  type: 'object',
  properties: {
    Product: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
          description: 'The unique identifier for an product',
        },
        name: { type: 'string' },
        amount: { type: 'integer' },
        price: { type: 'integer' },
        manufacturer: { type: 'string' },
        createdOn: { type: 'string' },
        notes: { type: 'string' },
      },
      required: ['_id', 'name', 'amount', 'price', 'manufacturer', 'createdOn'],
    },
    IsSuccess: { type: 'boolean' },
    ErrorMessage: { type: ['string', 'null'] },
  },
  required: ['Product', 'IsSuccess', 'ErrorMessage'],
};
