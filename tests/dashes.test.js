import dashes from '../src/lib/transformations/dashes';

const TEST_CASES = [
  {
    name: 'Replace endashes',
    test: {
      '--': '–',
      'Test -- text.': 'Test – text.',
      '-- --': '– –',
    },
  },
  {
    name: 'Replace emdashes',
    test: {
      '---': '—',
      'Test --- text.': 'Test — text.',
      '--- ---': '— —',
    },
  },
  {
    name: 'Replace mixed dashes',
    test: {
      '--- -- --- -- -- ---': '— – — – – —',
    },
  },
  // (Typopo)
  {
    name: 'Replace spaced hyphen with emdash',
    test: {
      'and - she said': 'and—she said',
      ' - she said': ' - she said', // false positive; no change at the beginning of paragraph
    },
  },
  // (Typopo)
  {
    name: 'Fix dash spaces between words',
    test: {
      'and — she said': 'and—she said',
      'and — she said': 'and—she said', // (NARROW NO-BREAK SPACE)
      'and— she said': 'and—she said',
      'and —she said': 'and—she said',
      'and—she said': 'and—she said',
    },
  },
];

describe('Dashes', () => {
  TEST_CASES.forEach((testCase) => {
    describe(`${testCase.name}`, () => {
      Object.keys(testCase.test).forEach((key, index) => {
        test(`${index}: ${key}`, () => {
          expect(dashes(key)).toBe(testCase.test[key]);
        });
      });
    });
  });
});
