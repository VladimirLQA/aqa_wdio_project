import { adminCredentials } from '../../credential.js';
import { logAction } from '../../utils/reporter/allure.reporter.js';
import SignInPage from '../pages/aqa_project/sign-in.page.js';
import { IUserCredentials } from '../types/user.types.js';
import BaseActions from './base.actions.js';

class SignInActions extends BaseActions {
  @logAction('Sign into "Sales Portal"')
  async signIn(credentials: IUserCredentials = adminCredentials) {
    await SignInPage.setValue(SignInPage['Email input'], credentials.username);
    await SignInPage.setValue(SignInPage['Password input'], credentials.password);
    await SignInPage.click(SignInPage['Login button']);
    await this.waitForPageLoad();
  }
}

export default new SignInActions();
