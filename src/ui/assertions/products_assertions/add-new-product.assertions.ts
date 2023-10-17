import { BaseAssertions } from '../base.assertions';
import ProductsActions from '../../actions/products/products.actions';
import { browserPause } from '../../../utils/helpers';

class AddNewProductAssertions extends BaseAssertions {
  public async verifyInputField(borderColorActual: string, borderColorExpected: string,
                                messageActual?: string, messageExpected?: string,
  ) {
    expect(borderColorActual).toBe(borderColorExpected);
    if (messageActual && messageExpected) {
      expect(messageActual).toBe(messageExpected);
    }
  }

  public async verifyToastMessage(text: string) {
    await this.verifyElementText(this.basePage['Toast body'], text);
    await this.baseActions.closeToastMessage();
    await browserPause(300);
  }
}

export default new AddNewProductAssertions();