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
  status: 'Order Status',
  delivery: 'Delivery',
  condition: 'Delivery Type',
  finalDate: 'Delivery Date',
  total_price: 'Total Price',
  customer: 'Customer',
};

const apiKeysForMapping: { [key: string]: string[] } = {
  products: ['name', 'price', 'manufacturer'],
  customers: ['email', 'name', 'country'],
  orders: ['order number', 'customer', 'price', 'status'],
};

export { apiKeysForMapping, apiKeysMapper };
