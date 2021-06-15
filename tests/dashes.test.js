import dashes from '../src/lib/transformations/dashes';

const TEST_CASES = [
  {
    name: 'Replace two dashes with an en dash',
    test: {
      '--': '–', // en
      'Test -- text.': 'Test – text.', // en
      '-- --': '– –', // en, en
    },
  },
  {
    name: 'Replace three dashes with an em dash',
    test: {
      '---': '—', // em
      'Test --- text.': 'Test — text.', // em
      '--- ---': '— —', // em, em
    },
  },
  {
    name: 'Replace mixed single dashes combinations',
    test: {
      '--- -- --- -- -- ---': '— – — – – —', // Em, en, em, en, en, em
    },
  },
  {
    name: 'Retain spaced vertical pipes',
    test: {
      ' | ': ' | ',
    },
  },

  // (Typopo)
  {
    name: 'Replace spaced dash with an em dash',
    options: {
      replaceSpacedDashesWithEmDash: true,
    },
    test: {
      'and - she said': 'and—she said', // Em
      ' - she said': '—she said', // Em
      'Vertical | pipe': 'Vertical | pipe', // Don’t transform vertical pipes
    },
  },
  // (Typopo)
  {
    name: 'Replace spaced dash between words with em dash',
    options: {
      replaceSpacedDashesWithEmDash: true,
    },
    test: {
      'and - she said': 'and—she said',
      'and - she said': 'and—she said', // (NARROW NO-BREAK SPACE)
      'and- she said': 'and—she said',
      'and -she said': 'and—she said',
      'and-she said': 'and—she said',
    },
  },
];

describe('Dashes', () => {
  TEST_CASES.forEach((testCase) => {
    describe(`${testCase.name}`, () => {
      Object.keys(testCase.test).forEach((key, index) => {
        test(`${index}: ${key}`, () => {
          const options = testCase.options || {};
          expect(dashes(key, options)).toBe(testCase.test[key]);
        });
      });
    });
  });
});
