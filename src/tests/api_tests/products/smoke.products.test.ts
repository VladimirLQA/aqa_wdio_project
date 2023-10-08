import ProductsController from '../../../api/controllers/products.controller'

describe('Smoke api test', () => {
  let token: string
  before(async () => {
    token = await SignInController.login()
  });
  beforeEach(async () => {});
  after(async () => {});

  it('Create product', async () => {
    await ProductsController.create()
  });
})