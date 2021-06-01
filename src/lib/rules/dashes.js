import { codePoints, patterns } from '../constants';

const dashes = function dashes(string) {
  let formattedString = string;

  // Fix dash spaces between words
  {
    const PATTERN = `([${patterns.spaces}]?)([${codePoints.NDASH}|${codePoints.MDASH}}])([${patterns.spaces}]?)([${patterns.latin}])`;
    const REGEXP = new RegExp(PATTERN, 'gi');
    const REPLACEMENT = '—$4';
    formattedString = formattedString.replace(REGEXP, REPLACEMENT);
  }

  // Replace 3 Hyphens with Emdash
  {
    const REGEXP = new RegExp(/(---)/, 'gi');
    const REPLACEMENT = '—';
    formattedString = formattedString.replace(REGEXP, REPLACEMENT);
  }

  // Replace 2 Hyphens with Endash
  {
    const REGEXP = new RegExp(/(--)/, 'gi');
    const REPLACEMENT = '–';
    formattedString = formattedString.replace(REGEXP, REPLACEMENT);
  }

  // Replace spaced hyphen with an Emdash
  {
    const PATTERN = `\\b[${codePoints.SPACE}][-][${codePoints.SPACE}]`;
    const REGEXP = new RegExp(PATTERN, 'gi');
    const REPLACEMENT = '—';
    formattedString = formattedString.replace(REGEXP, REPLACEMENT);
  }

  return formattedString;
};

export default dashes;
