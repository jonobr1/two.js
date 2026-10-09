/**
 * Tests Two.js DOM utility helpers:
 * + dom.bind
 * + dom.unbind
 */

import { dom } from '../../src/utils/dom.js';

QUnit.module('DOM');

QUnit.test('dom.bind and dom.unbind', function (assert) {
  assert.expect(4);

  var elem = document.createElement('div');
  var calls = 0;
  var handler = function () {
    calls++;
  };

  assert.equal(dom.bind(elem, 'click', handler), dom, 'dom.bind returns dom.');
  elem.dispatchEvent(new Event('click'));
  assert.equal(calls, 1, 'dom.bind attaches the listener.');

  var result;
  try {
    result = dom.unbind(elem, 'click', handler);
  } catch (error) {
    result = error;
  }
  assert.equal(result, dom, 'dom.unbind does not throw and returns dom.');

  elem.dispatchEvent(new Event('click'));
  assert.equal(calls, 1, 'dom.unbind removes the listener.');
});
