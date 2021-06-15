import { codePoints, patterns } from '../constants';

const DEFAULTS = {
  replaceSpacedDashesWithEmDash: false,
};

const dashes = function dashes(string, options) {
  // No nested keys, so can get away with a quick and dirty flat merge
  const opts = { ...DEFAULTS, ...options };

  let formattedString = string;

  // Replace three hyphens with em dash
  {
    const REGEXP = new RegExp(/(---)/, 'gi');
    const REPLACEMENT = '—';
    formattedString = formattedString.replace(REGEXP, REPLACEMENT);
  }

  // Replace two hyphens with en dash
  {
    const REGEXP = new RegExp(/(--)/, 'gi');
    const REPLACEMENT = '–';
    formattedString = formattedString.replace(REGEXP, REPLACEMENT);
  }

  // Replace spaced hyphen with an em dash
  if (opts.replaceSpacedDashesWithEmDash) {
    const PATTERN = `[${codePoints.SPACE}][${codePoints.HYPHEN}${codePoints['HYPHEN-MINUS']}][${codePoints.SPACE}]`;
    const REGEXP = new RegExp(PATTERN, 'gi');
    const REPLACEMENT = '—';
    formattedString = formattedString.replace(REGEXP, REPLACEMENT);
  }

  // Replace spaced dash between words with em dash
  if (opts.replaceSpacedDashesWithEmDash) {
    const PATTERN = `([${patterns.spaces}]?)([${codePoints.HYPHEN}${codePoints['HYPHEN-MINUS']}])([${patterns.spaces}]?)([${patterns.latin}])`;
    const REGEXP = new RegExp(PATTERN, 'gi');
    const REPLACEMENT = '—$4';
    formattedString = formattedString.replace(REGEXP, REPLACEMENT);
  }

  return formattedString;
};

export default dashes;
