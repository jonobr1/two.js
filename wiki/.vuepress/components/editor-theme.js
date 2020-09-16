var EditorView = require('@codemirror/next/view').EditorView;
var Extension = require('@codemirror/next/state').Extension;
var Highlighter = require('@codemirror/next/highlight').highlighter;

var black = '#555';
var grey = '#eee';
var white = '#fff';

var red = 'rgb(255, 64, 64)';
var orange = 'rgb(255, 128, 0)';
var blue = 'rgb(0, 200, 255)';
var green = 'rgb(0, 191, 168)';
var purple = 'rgb(153, 102, 255)';
var yellow = 'rgb(255, 244, 95)';

var theme = EditorView.theme({
  wrap: {
    caretColor: '#000',
    color: black,
    backgroundColor: white,
    outline: 'none !important',
    '& ::selection': { backgroundColor: yellow },
  },

  'content, scroller': {
    fontFamily: '"Anonymous Pro", monospace',
    fontSize: '1em',
    lineHeight: '1.5em',
  },

  activeLine: { backgroundColor: '#fffcd8' },
  selectionMatch: { backgroundColor: '#fffbbf' },

  'matchingBracket, nonmatchingBracket': {
    color: black,
    backgroundColor: '#30bfaf44'
  },

  gutters: {
    backgroundColor: 'white',
    borderRight: '1px solid rgb(221, 221, 221)'
  },
  'gutterElement-lineNumber': {
    padding: '0px 3px 0px 16px !important'
  },
  'gutterElement-foldGutter span': {
    display: 'block',
    marginTop: '-3px'
  }

});

var highlighter = Highlighter({
  invalid: { color: black },
  comment: { color: 'gray', fontStyle: 'italic' },
  keyword: { color: '#7a52cc' },
  'name, deleted': { color: '#0096bf' },
  'name definition': { color: '#009fda' },
  'string, inserted, regexp': { color: orange },
  propertyName: { color: black },
  bool: { color: '#2aa89a' },
  'typeName, className, number, changed': { color: red }
});

export default [theme, highlighter];
