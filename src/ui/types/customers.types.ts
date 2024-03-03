export interface ICustomer {
  email: string;
  country: string | COUNTRIES;
  street: string;
  flat: number;
  notes: string;
  name: string;
  city: string;
  house: number;
  phone: string;
}

export enum COUNTRIES {
  USA = 'USA',
  BELARUS = 'Belarus',
  GERMANY = 'Germany',
  GREAT_BRITAIN = 'Great Britain',
  CANADA = 'Canada',
  UKRAINE = 'Ukraine',
  FRANCE = 'France',
  RUSSIA = 'Russia',
}
