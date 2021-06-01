import { nodeTypes, tagNameExclusions } from './constants';
import formatString from './format-string';

const DEFAULTS = {
  exclusionAttribute: 'data-js-nicetype-disable',
  tagNameExclusions,
};

const hasExclusionAttribute = (element, attribute) => element.hasAttribute(attribute);

const isValidElement = (element, options) => (
  element.nodeType === nodeTypes.ELEMENT
  && !options.tagNameExclusions.map((tagName) => tagName.toLowerCase()).includes(element.tagName.toLowerCase())
  && !hasExclusionAttribute(element, options.exclusionAttribute)
);

/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["node"] }] */
const formatElement = function formatElement(node, options = {}) {
  if (!(node instanceof Element || node instanceof Node)) {
    return null;
  }

  // No nested keys, so can get awat with a quick and dirty flat merge
  const opts = { ...DEFAULTS, ...options };

  if (node.nodeType === nodeTypes.TEXT) {
    node.data = formatString(node.data);
  } else if (node.nodeType === nodeTypes.ELEMENT && isValidElement(node, opts)) {
    if (node.hasChildNodes()) {
      const children = Array.from(node.childNodes)
        .filter((childNode) => childNode.nodeType === nodeTypes.TEXT || isValidElement(childNode, opts));

      children.forEach((childNode) => formatElement(childNode, opts));
    }
  }

  return node;
};

export { formatElement as default, DEFAULTS };
