export const codePoints = {
  NDASH: '\u2013',
  MDASH: '\u2014',
  LSQUO: '\u2018',
  RSQUO: '\u2019',
  LDQUO: '\u201c',
  RDQUO: '\u201d',
  HELLIP: '\u2026',
  SPACE: '\u0020',
  NBSP: '\u00A0',
  ENSP: '\u2002',
  EMSP: '\u2003',
  EMSP13: '\u2004',
  EMSP14: '\u2005',
  NUMSP: '\u2007',
  PUNCSP: '\u2008',
  THINSP: '\u2009',
  HAIRSP: '\u200A',
  NNBSP: '\u202F',
  DASH: '\u2010',
};

export const patterns = {
  // Unicode blocks: Basic Latin, Latin-1 Supplement, Latin Extended-A, Latin Extended-B
  latin: '\u0000-\u007F\u0080-\u00FF\u0100-\u017F\u0180-\u024F',
  spaces: `${codePoints.SPACE}${codePoints.NBSP}${codePoints.ENSP}${codePoints.EMSP}${codePoints.PUNCSP}${codePoints.THINSP}${codePoints.HAIRSP}${codePoints.NNBSP}`,
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
