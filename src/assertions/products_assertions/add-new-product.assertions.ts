import { BaseAssertions } from '../base.assertions';

class AddNewProductAssertions extends BaseAssertions {
  public async verifyInputField(borderColorActual: string, borderColorExpected: string,  messageActual?: string, messageExpected?: string) {
    expect(borderColorActual).toBe(borderColorExpected);
    if(messageActual && messageExpected) {
      expect(messageActual).toBe(messageExpected);
    }
  }
}

export default new AddNewProductAssertions();