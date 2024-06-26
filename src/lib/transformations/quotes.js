import { codePoints, patterns } from '../constants';

function replaceSingleQuotePairs(string) {
  // We replace single-quoted expressions by looking for pairs with the shortest distance between them: we grab an open quote, any intervening text, and a close quote.

  // Original pattern from jsPrettify:
  // "(^|[\\(\\s\"-])'([\\s\\S]*?)'($|[\\)\\s\".,;:?!-])"
  const REGEXP = new RegExp(/(^|[(\W"-])'([\s\S]*?)'($|[)\W".,;:?!-])/, 'gi');
  const REPLACEMENT = `$1${codePoints['LEFT SINGLE QUOTATION MARK']}$2${codePoints['RIGHT SINGLE QUOTATION MARK']}$3`;

  return string.replace(REGEXP, REPLACEMENT);
}

const quotes = function quotes(string) {
  let formattedString = string;

  // ’n’ contractions (Typopo)
  // https://github.com/surfinzap/typopo/blob/master/src/lib/punctuation/single-quotes.js
  {
    const REGEXP = new RegExp(`([${patterns.singleQuotes}])(n)([${patterns.singleQuotes}])`, 'gi');
    const REPLACEMENT = `${codePoints['RIGHT SINGLE QUOTATION MARK']}$2${codePoints['RIGHT SINGLE QUOTATION MARK']}`;

    formattedString = formattedString.replace(REGEXP, REPLACEMENT);
  }

  // Common contractions (Typopo)
  // https://github.com/surfinzap/typopo/blob/master/src/lib/punctuation/single-quotes.js
  {
    const CONTRACTIONS = 'cause|em|mid|midst|mongst|prentice|round|sblood|ssdeath|sfoot|sheart|shun|slid|slife|slight|snails|strewth|til|tis|twas|tween|twere|twill|twixt|twould';
    const REGEXP = new RegExp(`([${patterns.singleQuotes}])(${CONTRACTIONS})`, 'gi');
    const REPLACEMENT = `${codePoints['RIGHT SINGLE QUOTATION MARK']}$2`;

    formattedString = formattedString.replace(REGEXP, REPLACEMENT);
  }

  // Single Quote Pairs (JS Prettify)
  // We run the regexp until the string stops changing to handle nested quotes and adjacent quotes.
  let old;

  do {
    old = formattedString;
    formattedString = replaceSingleQuotePairs(formattedString);
  } while (old !== formattedString);

  // Right Single Quotes (JS Prettify)
  {
    const REGEXP = new RegExp(/'/, 'gi');
    const REPLACEMENT = codePoints['RIGHT SINGLE QUOTATION MARK'];
    formattedString = formattedString.replace(REGEXP, REPLACEMENT);
  }

  // Right Double Quotes (JS Prettify)
  {
    // Original pattern from jsPrettify:
    // "($|[\\)\\s/.,;:?!\\u2019])

    // eslint-disable-next-line no-useless-escape
    const PATTERN = `${codePoints['QUOTATION MARK']}($|[)\\s${patterns.dashes}/.,;:?!${codePoints['RIGHT SINGLE QUOTATION MARK']}\])`;
    const REGEXP = new RegExp(PATTERN, 'gi');
    const REPLACEMENT = `${codePoints['RIGHT DOUBLE QUOTATION MARK']}$1`;
    formattedString = formattedString.replace(REGEXP, REPLACEMENT);
  }

  // Left Double Quotes (JS Prettify)
  {
    // Original pattern from jsPrettify:
    // (^|[\\(\\s-/\\u2018])"
    // (^|[\(\s-/\u2018])

    // eslint-disable-next-line no-useless-escape
    const PATTERN = `(^|[(\\s${patterns.dashes}/${codePoints['LEFT SINGLE QUOTATION MARK']}])${codePoints['QUOTATION MARK']}`;
    const REGEXP = new RegExp(PATTERN, 'gi');

    const REPLACEMENT = `$1${codePoints['LEFT DOUBLE QUOTATION MARK']}`;
    formattedString = formattedString.replace(REGEXP, REPLACEMENT);
  }

  return formattedString;
};

export default quotes;
