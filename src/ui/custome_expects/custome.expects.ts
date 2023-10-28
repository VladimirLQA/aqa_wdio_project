import allure from '@wdio/allure-reporter';


interface ICustomExpect<T, U> {
  actual?: T,
  expected?: U,
  description?: string,
}

class CustomExpect {

  async expectToBe<T, U>({ actual, expected, description }: ICustomExpect<T, U>): Promise<void> {
    await allure.step(`${description ? description : 'Test'}. Expected value to be: '${expected}'`, async () => {
      expect(actual).toBe(expected);
    });
  }

  async expectToContainEqual<T, U>({ actual, expected, description }: ICustomExpect<T, U>): Promise<void> {
    await allure.step(`${description ? description : 'Test'}. Expected value is: '${JSON.stringify(expected)}'`,
      async () => {
        expect(actual).toContainEqual(expected);
      });
  }
}

export default new CustomExpect();