

const test = [
  {
    '_id': '65314f3d9677ff11e3a3e920',
    'name': '1234',
    'amount': 123,
    'price': 123,
    'manufacturer': 'Apple',
    'createdOn': '2023-10-19T15:46:00.000Z',
    'notes': '123',
  },
  {
    '_id': '65314f329677ff11e3a3e919',
    'name': '123',
    'amount': 123,
    'price': 123,
    'manufacturer': 'Apple',
    'createdOn': '2023-10-19T15:45:00.000Z',
    'notes': '123',
  },
  {
    '_id': '652eb95c9677ff11e3a3e817',
    'name': 'Chips45',
    'amount': 34,
    'price': 2204,
    'manufacturer': 'Tesla',
    'createdOn': '2023-10-17T16:42:00.000Z',
    'notes': 'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design',
  },
];




const a = (obj, f) => {
  const res = Object.fromEntries(Object.entries(obj).filter(([k, v]) => f(k)))
  return res;
};

const select = (obj, ...props) => a(obj, k => props.includes(k));
const omit = (obj, ...props) => a(obj, k => !props.includes(k));

console.log(omit(test[0], 'name', 'manufacturer', 'price') );
