import { expect } from 'chai';

type TExpect<T, U> = {
  actual?: T;
  expected?: U;
};

class Expect {
  toEqual<T, U>({ actual, expected }: TExpect<T, U>) {
    expect(actual).to.be.equal(expected);
  }

  toDeepEqual<T, U>({ actual, expected }: TExpect<T, U>) {
    expect(actual).to.deep.equal(expected);
  }

  toBeNotEmpty<T, U>({ actual }: TExpect<T, U>) {
    expect(actual).to.not.be.empty;
  }

  toBeEmpty<T, U>({ actual }: TExpect<T, U>) {
    expect(actual).to.be.empty;
  }

  toBeTrue<T, U>({ actual }: TExpect<T, U>) {
    expect(actual).to.be.true;
  }

  toBeFalse<T, U>({ actual }: TExpect<T, U>) {
    expect(actual).to.be.false;
  }
}

export default new Expect();
