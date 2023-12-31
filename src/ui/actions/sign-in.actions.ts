import { adminCredentials } from '../../../credential';
import { logAction } from '../../utils/reporter/allure.reporter';
import SignInPage from '../pages/aqa_project/sign-in.page';
import { IUserCredentials } from '../types/user.types';
import BaseActions from './base.actions';

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
