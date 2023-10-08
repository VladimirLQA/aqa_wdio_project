import { BasePage } from './base.page';

class SignInPage extends BasePage {
  get ['Email input']() {
    return '#emailinput';
  }

  get ['Password input']() {
    return '#passwordinput';
  }

  get ['Remember me check box']() {
    return '#remembermecheckbox';
  }

  get ['Login button']() {
    return '.btn-lg';
  }

  get ['Spinner']() {
    return '.spinner-border';
  }

  get ['Image']() {
    return '.img-fluid';
  }
}

export default new SignInPage();
