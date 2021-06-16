import quotes from '../src/lib/transformations/quotes';

const TEST_CASES = [
  {
    name: 'Replace at the start of line',
    test: {
      '\'word\'.': '‘word’.',
    },
  },
  {
    name: 'Replace at the end of line',
    test: {
      '\'word.\'': '‘word.’',
    },
  },
  {
    name: 'Replace quotes with whitespace',
    test: {
      'Word\t\'word\'\nword.': 'Word\t‘word’\nword.',
    },
  },
  {
    name: 'Replace contractions',
    test: {
      'I\'m': 'I’m',
      'Fish \'n\' Chips': 'Fish ’n’ Chips',
      'Find \'em!': 'Find ’em!',
      'Just \'cause I wanna.': 'Just ’cause I wanna.',
      'Hers\'': 'Hers’',
      'Expo \'70': 'Expo ’70',
      '69\'ers': '69’ers',
      'iPhone6\'s': 'iPhone6’s',
      '1990\'s': '1990’s', // This is erroneous apostrophe use, but we’ll test for it anyway
      'don\'t': 'don’t',
      'Paul’s Diner': 'Paul’s Diner',
    },
  },
  {
    name: 'Replace apostrophes at word openings',
    test: {
      '\'Tis and \'twere.': '’Tis and ’twere.',
      '\'Tis the season': '’Tis the season',
      '\'sblood': '’sblood',
      '\'Twas the Night Before Christmas': '’Twas the Night Before Christmas',
      '\'Til The Season Comes \'Round Again': '’Til The Season Comes ’Round Again',
    },
  },
  {
    name: 'Replace with punctuation',
    test: {
      'foo \'bar\'.': 'foo ‘bar’.',
    },
  },
  {
    name: 'Replace contiguous single quote pairs',
    test: {
      '\'a\' \'b\' \'c\' \'d\' \'e\'': '‘a’ ‘b’ ‘c’ ‘d’ ‘e’',
    },
  },
  {
    name: 'Replace quoted contractions',
    test: {
      '\'It\'s a beautiful day!\'': '‘It’s a beautiful day!’',
    },
  },
  // Emdash replacement
  {
    name: 'Replace quoted words in dashes',
    test: {
      'With---\'imaginary\'---dashes.': 'With---‘imaginary’---dashes.',
    },
  },
  {
    name: 'Replace quotes in parens',
    test: {
      '(\'\')': '(‘’)',
    },
  },
  {
    name: 'Replace quotes around slashes',
    test: {
      '\'Foo\'/\'Bar\'': '‘Foo’/‘Bar’',
    },
  },
];

describe('Single quotes', () => {
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
