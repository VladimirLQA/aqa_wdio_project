import SignInActions from '../../../ui/actions/sign-in.actions';
import HomeActions from '../../../ui/actions/home.actions';


describe('Smoke test on orders page', () => {

  before(async () => {
    await SignInActions.openSalesPortal();
    await SignInActions.signIn();
    await HomeActions.openOrdersPage();
  })

  after(async () => {

  })

  it('Create order', async () => {

  })
});