import { Commands } from '../utils/path-commands.js';
import { TwoError } from '../utils/error.js';
import { _ } from '../utils/underscore.js';

import { Path } from '../path.js';
import { Anchor } from '../anchor.js';

/**
 * @name Two.Line
 * @class
 * @extends Two.Path
 * @param {Number} [x1=0] - The x position of the first vertex on the line.
 * @param {Number} [y1=0] - The y position of the first vertex on the line.
 * @param {Number} [x2=0] - The x position of the second vertex on the line.
 * @param {Number} [y2=0] - The y position of the second vertex on the line.
 */
export class Line extends Path {
  constructor(x1, y1, x2, y2) {
    const points = [new Anchor(x1, y1), new Anchor(x2, y2)];
    super(points);

    for (let prop in proto) {
      Object.defineProperty(this, prop, proto[prop]);
    }

    this.vertices[0].command = Commands.move;
    this.vertices[1].command = Commands.line;

    this.automatic = false;
  }

  static Properties = ['left', 'right'];
}

const proto = {
  left: {
    enumerable: true,
    get: function () {
      return this.vertices[0];
    },
    set: function (v) {
      if (_.isObject(v)) {
        this.vertices.splice(0, 1, v);
        this.vertices[0].command = Commands.move;
      } else {
        const error = new TwoError('Two.Line.left argument is not an object.');
        console.warn(error.name, error.message);
      }
    },
  },
  right: {
    enumerable: true,
    get: function () {
      return this.vertices[1];
    },
    set: function (v) {
      if (_.isObject(v)) {
        this.vertices.splice(1, 1, v);
        this.vertices[1].command = Commands.line;
      } else {
        const error = new TwoError('Two.Line.right argument is not an object.');
        console.warn(error.name, error.message);
      }
    },
  },
};
