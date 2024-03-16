const apiKeysMapper: { [key: string]: string } = {
  _id: 'Order Number',
  email: 'Email',
  name: 'Name',
  country: 'Country',
  city: 'City',
  address: 'Address',
  house: 'House',
  flat: 'Flat',
  street: 'Street',
  phone: 'Phone',
  createdOn: 'Created On',
  notes: 'Notes',
  manufacturer: 'Manufacturer',
  price: 'Price',
  amount: 'Amount',
  status: 'Status',
  delivery: 'Delivery',
  condition: 'Delivery Type',
  finalDate: 'Delivery Date',
  total_price: 'Price',
  customer: 'Customer',
};

const apiKeysForMapping: { [key: string]: string[] } = {
  products: ['name', 'price', 'manufacturer'],
  customers: ['email', 'name', 'country'],
  orders: ['_id', 'total_price', 'customer', 'status', 'delivery'],
};

export { apiKeysForMapping, apiKeysMapper };
