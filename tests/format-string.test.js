import formatString from '../src/lib/format-string';

const TEST_CASES = [
  {
    name: 'Multiline',
    test: {
      '\'Foo\nbar\'': '‘Foo\nbar’',
    },
    name: 'Order of operations, mixed dashes and quotes',
    test: {
      'With---\'imaginary\'---dashes.': 'With—‘imaginary’—dashes.',
      'With---"imaginary"---dashes.': 'With—“imaginary”—dashes.',
    },
  },
];

describe('formatString', () => {
  TEST_CASES.forEach((testCase) => {
    describe(`${testCase.name}`, () => {

      Object.keys(testCase.test).forEach((key, index) => {
        test(`${index}: ${key}`, () => {
          expect(formatString(key)).toBe(testCase.test[key]);
        });
      })
    });
  });

  test('Returns null with invalid input', () => {
    expect(formatString()).toBeNull();
    expect(formatString(null)).toBeNull();
  });

  test('Empty string', () => {
    expect(formatString('')).toBe('');
  });
});
