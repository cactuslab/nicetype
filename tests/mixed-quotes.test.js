import quotes from '../src/lib/rules/quotes';

const TEST_CASES = [
  {
    name: 'Replace quotes in quotes',
    test: {
      '"\'Word quoted\'"': '“‘Word quoted’”',
    },
  },
  {
    name: 'Replace quotes that are empty',
    test: {
      '"\'\'"': '“‘’”',
    },
  },
  {
    name: 'Replace mixed nested quotes',
    test: {
      '"foo \'bar "baz" bar\' foo"': '“foo ‘bar “baz” bar’ foo”',
    },
  },
  {
    name: 'Replace double quotes inside single quotes',
    test: {
      '\'"Here I am", said Sam\'': '‘“Here I am”, said Sam’',
      '\'Test "test."\'': '‘Test “test.”’',
    },
  },
  {
    name: 'Replace multilevel nested quotes',
    test: {
      '\'x "x \'x "x \'x "x" x\' x" x\' x" x\'': '‘x “x ‘x “x ‘x “x” x’ x” x’ x” x’',
    },
  },
];

describe('Mixed quotes', () => {
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
