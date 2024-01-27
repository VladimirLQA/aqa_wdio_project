import { adminCredentials } from '../../credential.js';
import { logAction } from '../../utils/reporter/allure.reporter.js';
import SignInPage from '../pages/aqa_project/sign-in.page.js';
import { IUserCredentials } from '../types/user.types.js';
import BaseActions from './base.actions.js';

class SignInActions extends BaseActions {
  @logAction('Sign into "Sales Portal"')
  public async signIn(credentials: IUserCredentials = adminCredentials) {
    await SignInPage.waitForElemAndSetValue(SignInPage['Email input'], credentials.username);
    await SignInPage.waitForElemAndSetValue(SignInPage['Password input'], credentials.password);
    await SignInPage.waitForElemAndClick(SignInPage['Login button']);
    await this.waitForPageLoad();
  }
}

export default new SignInActions();
