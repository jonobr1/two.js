var keymap = require('@codemirror/next/view').keymap;
var highlightSpecialChars = require('@codemirror/next/view').highlightSpecialChars;
var multipleSelections = require('@codemirror/next/view').multipleSelections;
var indentOnInput = require('@codemirror/next/view').indentOnInput;
var Extension = require('@codemirror/next/state').Extension;
var history = require('@codemirror/next/history').history;
var historyKeymap = require('@codemirror/next/history').historyKeymap;
var foldGutter = require('@codemirror/next/fold').foldGutter;
var foldKeymap = require('@codemirror/next/fold').foldKeymap;
var lineNumbers = require('@codemirror/next/gutter').lineNumbers;
var defaultKeymap = require('@codemirror/next/commands').defaultKeymap;
var bracketMatching = require('@codemirror/next/matchbrackets').bracketMatching;
var closeBrackets = require('@codemirror/next/closebrackets').closeBrackets;
var closeBracketsKeymap = require('@codemirror/next/closebrackets').closeBracketsKeymap;
var commentKeymap = require('@codemirror/next/comment').commentKeymap;
var rectangularSelection = require('@codemirror/next/rectangular-selection').rectangularSelection;
var gotoLineKeymap = require('@codemirror/next/goto-line').gotoLineKeymap;
var highlightActiveLine = require('@codemirror/next/highlight-selection').highlightActiveLine;
var highlightSelectionMatches = require('@codemirror/next/highlight-selection').highlightSelectionMatches;
var defaultHighlighter = require('@codemirror/next/highlight').defaultHighlighter;
var lintKeymap = require('@codemirror/next/lint').lintKeymap;
var JavaScriptSupport = require('@codemirror/next/lang-javascript').javascript;

export default [
  lineNumbers(),
  highlightSpecialChars(),
  history(),
  foldGutter({
    openText: '▶',
    closedText: '▼'
  }),
  multipleSelections(),
  indentOnInput(),
  defaultHighlighter,
  bracketMatching(),
  closeBrackets(),
  rectangularSelection(),
  highlightActiveLine(),
  highlightSelectionMatches(),
  JavaScriptSupport(),
  keymap([
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...commentKeymap,
    ...gotoLineKeymap,
    ...lintKeymap
  ])
];
