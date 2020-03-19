import {PrettyPricePipe} from './pretty-price.pipe';

describe('PrettyPricePipe', () => {
  let pipe: PrettyPricePipe;

  beforeAll(() => {
    pipe = new PrettyPricePipe();
  });

  it('is created', () => {
    expect(pipe).toBeTruthy();
  });

  it('should display prices in localized format', () => {
    const price1 = 15.77777;
    const price2 = 0.0001;

    const expected1 = '15,78';
    const expected2 = '0,00';
    const expected3 = '0.00';

    let result1 = pipe.transform(price1);
    // Remove € sign and whitespace, since this messes up the test.
    result1 = result1.substring(2, result1.length);

    let result2 = pipe.transform(price2);
    result2 = result2.substring(2, result2.length);

    expect(result1).toBe(expected1);
    expect(result2).toEqual(expected2);
    expect(result2).not.toEqual(expected3);
  });

});
