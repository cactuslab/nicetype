import { codePoints, patterns } from '../constants';

const ellipsis = function ellipsis(string) {
  let formattedString = string;

  // Replace 3 and more dots/ellipses with an ellipsis
  {
    const PATTERN = `[${codePoints['HORIZONTAL ELLIPSIS']}\\.]{3,}`;
    const REGEXP = new RegExp(PATTERN, 'gi');
    const REPLACEMENT = codePoints['HORIZONTAL ELLIPSIS'];
    formattedString = formattedString.replace(REGEXP, REPLACEMENT);
  }

  // Replace combination of period/ellipsis with an ellipsis
  {
    const PATTERN = `\\.${codePoints['HORIZONTAL ELLIPSIS']}|${codePoints['HORIZONTAL ELLIPSIS']}{2,}|${codePoints['HORIZONTAL ELLIPSIS']}\\.`;
    const REGEXP = new RegExp(PATTERN, 'gi');
    const REPLACEMENT = codePoints['HORIZONTAL ELLIPSIS'];
    formattedString = formattedString.replace(REGEXP, REPLACEMENT);
  }

  // Replace two periods between words (spaces) with an ellipsis
  {
    const PATTERN = `[${patterns.spaces}]\\.{2}[${patterns.spaces}]`;
    const REGEXP = new RegExp(PATTERN, 'gi');
    const REPLACEMENT = `${codePoints.SPACE}${codePoints['HORIZONTAL ELLIPSIS']}${codePoints.SPACE}`;
    formattedString = formattedString.replace(REGEXP, REPLACEMENT);
  }

  // Fix spacing, when ellipsis is used around commas
  {
    const PATTERN = `,[${patterns.spaces}]?${codePoints['HORIZONTAL ELLIPSIS']}[${patterns.spaces}]?,`;
    const REGEXP = new RegExp(PATTERN, 'gi');
    const REPLACEMENT = `, ${codePoints['HORIZONTAL ELLIPSIS']},`;
    formattedString = formattedString.replace(REGEXP, REPLACEMENT);
  }

  return formattedString;
};

export default ellipsis;
