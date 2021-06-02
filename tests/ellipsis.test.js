import ellipsis from '../src/lib/transformations/ellipsis';

const TEST_CASES = [
  {
    name: 'Replace periods/ellipses with a single ellipsis',
    test: {
      'Sentence ... another sentence': 'Sentence … another sentence',
      'Sentence .... another sentence': 'Sentence … another sentence',
      'Sentence ..... another sentence': 'Sentence … another sentence',
      'Sentence ending...': 'Sentence ending…',
      'Sentence ending....': 'Sentence ending…',
      'Sentence ending.....': 'Sentence ending…',
      'Sentence ending….....': 'Sentence ending…',
      'Sentence ending….…': 'Sentence ending…',
      'Sentence ending.….....': 'Sentence ending…',

      /* false positives */
      'Sentence ending.': 'Sentence ending.',
      'Sentence ending..': 'Sentence ending..',
    },
  },
  {
    name: 'Replace combination of period/ellipsis with an ellipsis',
    test: {
      'Sentence ending…': 'Sentence ending…',
      'Sentence ending……': 'Sentence ending…',
      'Sentence ending….': 'Sentence ending…',
      'Sentence ending.…': 'Sentence ending…',
    },
  },
  {
    name: 'Replace two periods between words (spaces) with an ellipsis',
    test: {
      'Sentence .. another sentence': 'Sentence … another sentence',
    },
  },
  {
    name: 'Fix spacing, when ellipsis is used around commas',
    test: {
      'We sell apples, oranges, …, pens.': 'We sell apples, oranges, …, pens.', // neutral
      'We sell apples, oranges,…, pens.': 'We sell apples, oranges, …, pens.',
      'We sell apples, oranges,… , pens.': 'We sell apples, oranges, …, pens.',
      'We sell apples, oranges, … , pens.': 'We sell apples, oranges, …, pens.',
      'We sell apples, oranges, … , pens.': 'We sell apples, oranges, …, pens.', // nbsp
      'We sell apples, oranges, … , pens.': 'We sell apples, oranges, …, pens.', // hair_space
      'We sell apples, oranges, … , pens.': 'We sell apples, oranges, …, pens.', // narrow_nbsp
    },
  },
];

describe('Ellipsis', () => {
  TEST_CASES.forEach((testCase) => {
    describe(`${testCase.name}`, () => {
      Object.keys(testCase.test).forEach((key, index) => {
        test(`${index}: ${key}`, () => {
          expect(ellipsis(key)).toBe(testCase.test[key]);
        });
      });
    });
  });
});
