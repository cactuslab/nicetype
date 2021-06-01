# Nicetype

Touch up copy by converting plain ASCII punctuation into “smart” Unicode equivalents. Transformations include:

* Straight to curly quotes.
* Hyphen-dashes to em and endashes
* Two, three or more dots to horizontal ellipsis

> Please note this plugin is intended for English locales.

---

Nicetype is an ES6 port of the abandoned [jsPrettify](http://code.google.com/archive/p/jsprettify) library.

While jsPrettify’s rules aren’t the most thorough—this is also it’s strength as it reduces false positives and the opportunity to conflict with the original input’s style.

## Installation

```
npm install --save nicetype
```

## Usage

```js
import nicetype from 'nicetype'

const exampleString = 'Fish \'n\' Chips';
console.log(nicetype.formatString(exampleString)); // 'Fish ’n’ Chips'

const exampleElement = document.createElement('div');
exampleElement.innerText = exampleString;
nicetype.formatElement(exampleElement, {
  // exclusionAttribute: String,
  // tagNameExclusions: []
}); // HTMLElement or Node (TEXT_NODE)
```

## API

### nicetype.formatString(string)

Returns transformed string

#### Parameters

**string**: `String` to transform

### nicetype.formatElement(element, options)

Applies transformations to an element’s and its childrens’ [text nodes](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType). If an element has the `exclusionAttribute` or a matching [tagName](https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName) found in the `tagNameExclusions`—that branch’s replacement will stop.

#### Parameters

* **element**: An `HTMLElement`
* **options**: Optional `Object` for customising defaults

  ```js
  {
    exclusionAttribute: 'data-nicetype-disable',
    tagNameExclusions: ['base', 'command', 'link', 'meta', 'noscript', 'script', 'style', 'title', 'audio', 'br', 'code', 'command', 'datalist', 'embed', 'hr', 'iframe', 'img', 'input', 'kbd', 'keygen', 'map', 'math', 'meter', 'object', 'output', 'picture', 'progress', 'ruby', 'samp', 'script', 'select', 'svg', 'template', 'textarea', 'video', 'wbr', 'area', 'audio', 'canvas', 'embed', 'iframe', 'img', 'math', 'object', 'picture', 'svg', 'video', 'input', 'keygen', 'label', 'meter', 'object', 'output', 'progress', 'select', 'textarea', 'script', 'template']
  }
  ```

### Roadmap

* Non-breaking space: Short words/widow prevention
* Add NVM
* TypeScript

### See Also

* [string-apostrophes](https://www.npmjs.com/package/string-apostrophes) ([comparison](https://codsen.com/os/string-apostrophes/#compared-to-others))
* [textr](https://www.npmjs.com/package/textr)
* [Richtypo (node.js)](https://github.com/sapegin/richtypo.js)
* [Typopo](https://github.com/surfinzap/typopo)
