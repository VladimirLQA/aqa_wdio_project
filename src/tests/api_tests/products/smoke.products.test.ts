import ProductsController from '../../../api/controllers/products.controller';
import { newProduct } from '../../../data/products/product.data';

describe('Smoke api test', () => {
  let token: string;
  before(async () => {
    token = await SignInController.login();
  });
  beforeEach(async () => {
  });
  after(async () => {
  });

  it('Create product', async () => {
    await ProductsController.create({ data: newProduct, token });

  });
});