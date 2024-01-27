import BasePage from './base.page.js';

class SignInPage extends BasePage {
  readonly ['Email input'] = '#emailinput';
  readonly ['Password input'] = '#passwordinput';
  readonly ['Remember me check box'] = '#remembermecheckbox';
  readonly ['Login button'] = '.btn-lg';
  readonly ['Spinner'] = '.spinner-border';
  readonly ['Image'] = '.img-fluid';
}

export default new SignInPage();
