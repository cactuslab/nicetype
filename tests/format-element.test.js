import { default as formatElement, DEFAULTS as FORMAT_ELEMENT_DEFAULTS } from '../src/lib/format-element';
import formatString from '../src/lib/format-string';

const TEST_STRINGS = {
  MIXED: 'Let\'s go. "However without something to test, might nottin\' be working \'til \'99, and we\'ll be none the wiser, he said".',
  TITLE: 'The Emperor\'s New Groove',
  SUBTITLE: 'Emperor Kuzco is turned into a llama by his ex-administrator Yzma---and must now regain his throne.',
  TAGNAME_EXCLUSION: 'Lowercase æ: <kbd>OPTION</kbd> + <kbd>\'</kbd>',
}

describe('formatElement', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('Single element', () => {
    // For whatever reason JSDOM and `document.createElement('div')` failed to create childNodes which broke `formatElement`
    document.body.innerHTML = `<div>${TEST_STRINGS.MIXED}</div>`;
    const element = document.querySelector('div');

    formatElement(element);
    // JSDOM doesn’t support innerText so using textContent instead
    expect(element.textContent).toBe(formatString(TEST_STRINGS.MIXED));
  });

  test('Single empty element', () => {
    document.body.innerHTML = `<div></div>`;
    const element = document.querySelector('div');

    formatElement(element);
    expect(element.textContent).toBe('');
  });

  test('Text node', () => {
    const textNode = document.createTextNode(TEST_STRINGS.MIXED)

    formatElement(textNode);

    expect(textNode.nodeValue).toBe(formatString(TEST_STRINGS.MIXED));
  });

  test('Element with children', () => {
    document.body.innerHTML = [
      '<hgroup>',
        `<h1>${TEST_STRINGS.TITLE}</h1>`,
        `<h2>${TEST_STRINGS.SUBTITLE}</h2>`,
      '</hgroup>'
    ].join('');

    const hgroup = document.querySelector('hgroup');

    formatElement(hgroup);

    const h1 = hgroup.querySelector('h1');
    const h2 = hgroup.querySelector('h2');

    expect(h1.textContent).toBe(formatString(TEST_STRINGS.TITLE));
    expect(h2.textContent).toBe(formatString(TEST_STRINGS.SUBTITLE));
  });

  test('Element matches excluded tagName (`object`)', () => {
    document.body.innerHTML = [
      `<object>${TEST_STRINGS.MIXED}</object>`
    ].join('');

    const object = document.querySelector('object');

    formatElement(object);

    expect(object.innerHTML).toBe(TEST_STRINGS.MIXED);
  });

  test('Element with child that matches excluded tagName (`kbd`)', () => {
    document.body.innerHTML = [
      '<article>',
        `<h1>${TEST_STRINGS.TITLE}</h1>`,
        `<p>${TEST_STRINGS.TAGNAME_EXCLUSION}</p>`,
      '</article>',
    ].join('');

    const article = document.querySelector('article');

    formatElement(article);

    const h1 = article.querySelector('h1');
    const p = article.querySelector('p');

    expect(h1.textContent).toBe(formatString(TEST_STRINGS.TITLE));
    expect(p.innerHTML).toBe(TEST_STRINGS.TAGNAME_EXCLUSION);
  });

  test('Element with child that matches custom tagName exclusions (`[textarea, toLowerCase]`)', () => {
    document.body.innerHTML = [
      '<div>',
        `<customElement>${TEST_STRINGS.MIXED}</customElement>`,
      '</div>',
    ].join('');

    const div = document.querySelector('div');

    formatElement(div, {
      tagNameExclusions: ['textarea', 'customElement'],
    });

    const customElement = div.querySelector('customElement');

    expect(customElement.textContent).toBe(TEST_STRINGS.MIXED);
  });

  test('Element with children that have exclusion data attribute', () => {
    document.body.innerHTML = [
      '<hgroup>',
        `<h1>${TEST_STRINGS.TITLE}</h1>`,
        `<h2 ${FORMAT_ELEMENT_DEFAULTS.exclusionAttribute}>${TEST_STRINGS.SUBTITLE}</h2>`,
      '</hgroup>'
    ].join('');

    const hgroup = document.querySelector('hgroup');

    formatElement(hgroup);

    const h1 = hgroup.querySelector('h1');
    const h2 = hgroup.querySelector('h2');

    expect(h1.textContent).toBe(formatString(TEST_STRINGS.TITLE));
    expect(h2.textContent).toBe(TEST_STRINGS.SUBTITLE);
  });

  test('Element with children that have custom exclusion data attribute', () => {
    const EXCLUSION_ATTRIBUTE = 'data-js-nicetype-persist'

    document.body.innerHTML = [
      '<hgroup>',
        `<h1>${TEST_STRINGS.TITLE}</h1>`,
        `<h2 ${EXCLUSION_ATTRIBUTE}>${TEST_STRINGS.SUBTITLE}</h2>`,
      '</hgroup>'
    ].join('');

    const hgroup = document.querySelector('hgroup');

    formatElement(hgroup, {
      exclusionAttribute: EXCLUSION_ATTRIBUTE,
    });

    const h1 = hgroup.querySelector('h1');
    const h2 = hgroup.querySelector('h2');

    expect(h1.textContent).toBe(formatString(TEST_STRINGS.TITLE));
    expect(h2.textContent).toBe(TEST_STRINGS.SUBTITLE);
  });

  test('Quotes replaced around child tag', () => {
    document.body.innerHTML = [
      '<div>',
        '\'<em>foo</em>\'s',
      '</div>',
    ].join('');

    const div = document.querySelector('div');

    formatElement(div);

    expect(div.textContent).toBe(formatString('\'foo\'s'));
  });

  test('Preserves whitespace around child tags', () => {
    document.body.innerHTML = [
      '<div>',
        'a <em>b</em> c',
      '</div>',
    ].join('');

    const div = document.querySelector('div');

    formatElement(div);

    expect(div.textContent).toBe(formatString('a b c'));
  })

  test('Returns null with invalid input', () => {
    expect(formatElement()).toBeNull();
    expect(formatElement(null)).toBeNull();
    expect(formatElement('')).toBeNull();
  });
});
