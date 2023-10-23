import { MANUFACTURERS } from '../../data/products/product.data';
import { ORDER_STATUS } from '../../data/orders/orders.data';
import { COUNTRIES } from '../../data/customers/customers.data';

type ActionButtons = 'Delete' | 'Details' | 'Edit';

type UnionFilterModalLabels = MANUFACTURERS | ORDER_STATUS | COUNTRIES;

interface IChipsFilterOptions {
  search?: string;
  quickFilters?: string[];
}

export { ActionButtons, UnionFilterModalLabels, IChipsFilterOptions };