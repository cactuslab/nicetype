// https://en.wikipedia.org/wiki/Dash#Common_dashes_and_their_Unicode_code_points
// https://en.wikipedia.org/wiki/Quotation_mark#Unicode_code_point_table
// https://en.wikipedia.org/wiki/Whitespace_character#Unicode
export const codePoints = {
  'QUOTATION MARK': '\u0022',
  APOSTROPHE: '\u0027',
  //
  'HYPHEN-MINUS': '\u002D',
  'SOFT HYPHEN': '\u00AD',
  HYPHEN: '\u2010',
  'NON-BREAKING HYPHEN': '\u2011',
  'FIGURE DASH': '\u2012',
  'EN DASH': '\u2013',
  'EM DASH': '\u2014',
  'HORIZONTAL BAR': '\u2015',
  'SWUNG DASH': '\u2053',
  //
  'LEFT SINGLE QUOTATION MARK': '\u2018',
  'RIGHT SINGLE QUOTATION MARK': '\u2019',
  'LEFT DOUBLE QUOTATION MARK': '\u201c',
  'RIGHT DOUBLE QUOTATION MARK': '\u201d',
  //
  'HORIZONTAL ELLIPSIS': '\u2026',
  //
  SPACE: '\u0020',
  'NO-BREAK SPACE': '\u00A0',
  'EN SPACE': '\u2002',
  'EM SPACE': '\u2003',
  'THREE-PER-EM SPACE': '\u2004',
  'FOUR-PER-EM SPACE': '\u2005',
  'FIGURE SPACE': '\u2007',
  'PUNCTUATION SPACE': '\u2008',
  'THIN SPACE': '\u2009',
  'HAIR SPACE': '\u200A',
  'NARROW NO-BREAK SPACE': '\u202F',
};

export const patterns = {
  // Unicode blocks: Basic Latin, Latin-1 Supplement, Latin Extended-A, Latin Extended-B
  latin: '\u0000-\u007F\u0080-\u00FF\u0100-\u017F\u0180-\u024F',
  spaces: `${codePoints.SPACE}${codePoints['NO-BREAK SPACE']}${codePoints['EN SPACE']}${codePoints['EM SPACE']}${codePoints['PUNCTUATION SPACE']}${codePoints['THIN SPACE']}${codePoints['HAIR SPACE']}${codePoints['NARROW NO-BREAK SPACE']}`,
  dashes: `${codePoints['HYPHEN-MINUS']}${codePoints['EN DASH']}${codePoints['EM DASH']}${codePoints.HYPHEN}`,
  singleQuotes: '‚\'‘’ʼ‛´`′',
};

// http://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-1950641247
export const nodeTypes = {
  ELEMENT: 1,
  ATTRIBUTE: 2,
  TEXT: 3,
  CDATA_SECTION: 4,
  ENTITY_REFERENCE: 5,
  ENTITY: 6,
  PROCESSING_INSTRUCTION: 7,
  COMMENT: 8,
  DOCUMENT: 9,
  DOCUMENT_TYPE: 10,
  DOCUMENT_FRAGMENT: 11,
  NOTATION: 12,
};

// https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories
const PHRASING_CONTENT_EXCLUSIONS = [
  'base', 'command', 'link', 'meta', 'noscript', 'script', 'style', 'title',
];
const FLOW_CONTENT_EXCLUSIONS = [
  'audio', 'br', 'code', 'command', 'datalist', 'embed', 'hr', 'iframe', 'img', 'input', 'kbd', 'keygen', 'map', 'math', 'meter', 'object', 'output', 'picture', 'progress', 'ruby', 'samp', 'script', 'select', 'svg', 'template', 'textarea', 'video', 'wbr',
  // EXCLUSIONS:
  'area',
];
const EMBEDDED_CONTENT_EXCLUSIONS = [
  'audio', 'canvas', 'embed', 'iframe', 'img', 'math', 'object', 'picture', 'svg', 'video',
];
const FORM_ASSOCIATED_CONTENT_EXCLUSIONS = [
  // 'button', 'fieldset',
  'input', 'keygen', 'label', 'meter', 'object', 'output', 'progress', 'select', 'textarea',
];
const SCRIPT_SUPPORTING_CONTENT_EXCLUSIONS = [
  'script', 'template',
];

export const tagNameExclusions = [
  ...PHRASING_CONTENT_EXCLUSIONS,
  ...FLOW_CONTENT_EXCLUSIONS,
  ...EMBEDDED_CONTENT_EXCLUSIONS,
  ...FORM_ASSOCIATED_CONTENT_EXCLUSIONS,
  ...SCRIPT_SUPPORTING_CONTENT_EXCLUSIONS,
];
