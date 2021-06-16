import quotes from '../src/lib/transformations/quotes';

const TEST_CASES = [
  {
    name: 'Replace at the start of line',
    test: {
      '"word".': '“word”.',
    },
  },
  {
    name: 'Replace at the end of line',
    test: {
      '"word."': '“word.”',
    },
  },
  {
    name: 'Replace quotes with whitespace',
    test: {
      'Word\t"word"\nword.': 'Word\t“word”\nword.',
    },
  },
  {
    name: 'Replace closing quotes before punctuation',
    test: {
      '"word".': '“word”.',
      '"word",': '“word”,',
      '"word";': '“word”;',
      '"word":': '“word”:',
      '"word"?': '“word”?',
      '"word"!': '“word”!',
    },
  },
  {
    name: 'Replace quotes after dashes',
    test: {
      'Test - "word"': 'Test - “word”', // Hyphen
      'Test-"word"': 'Test-“word”', // Hyphen
      'Test–"word"': 'Test–“word”', // En
      'Test—"word"': 'Test—“word”', // Em
    },
  },
  // Emdash replacement
  {
    name: 'Replace quoted words in dashes',
    test: {
      'With---"imaginary"---dashes.': 'With---“imaginary”---dashes.',
    },
  },
  {
    name: 'Replace quotes in parens',
    test: {
      '("")': '(“”)',
    },
  },
  {
    name: 'Replace quotes around slashes',
    test: {
      '"Foo"/"Bar"': '“Foo”/“Bar”',
    },
  },
];

describe('Double quotes', () => {
  TEST_CASES.forEach((testCase) => {
    describe(`${testCase.name}`, () => {
      Object.keys(testCase.test).forEach((key, index) => {
        test(`${index}: ${key}`, () => {
          expect(quotes(key)).toBe(testCase.test[key]);
        });
      });
    });
  });
});
