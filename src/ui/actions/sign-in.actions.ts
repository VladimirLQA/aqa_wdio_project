import BaseActions from './base.actions';
import { IUserCredentials } from '../types/user.types';
import SignInPage from '../pages/aqa_project/sign-in.page';
import { logAction } from '../../utils/reporter/allure.reporter';

class SignInActions extends BaseActions {
  @logAction('Sign into "Sales Portal"')
  public async signIn(credentials?: IUserCredentials) {
    await SignInPage.waitForElemAndSetValue(SignInPage['Email input'], credentials ? credentials.username : process.env.EMAIL);
    await SignInPage.waitForElemAndSetValue(SignInPage['Password input'], credentials ? credentials.password : process.env.PASSWORD);
    await SignInPage.waitForElemAndClick(SignInPage['Login button']);
    await this.waitForPageLoad();
  }
}

export default new SignInActions();
