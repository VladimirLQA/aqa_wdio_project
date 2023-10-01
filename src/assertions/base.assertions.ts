import { BaseActions } from '../actions/base.actions';

class BaseAssertions extends BaseActions {
  public async verifyToastText(text: string) {
    await this.basePage.checkElementText(this.basePage['Toast body'], text);
    await this.closeToastMessage();
  }
}

export default new BaseAssertions();
