import Commands from './utils/path-commands.js';

import Vector from './vector.js';

/**
 * @class
 * @name Two.Anchor
 * @param {Number} [x=0] - The x position of the root anchor point.
 * @param {Number} [y=0] - The y position of the root anchor point.
 * @param {Number} [lx=0] - The x position of the left handle point.
 * @param {Number} [ly=0] - The y position of the left handle point.
 * @param {Number} [rx=0] - The x position of the right handle point.
 * @param {Number} [ry=0] - The y position of the right handle point.
 * @param {String} [command=Two.Commands.move] - The command to describe how to render. Applicable commands are {@link Two.Commands}
 * @extends Two.Vector
 * @description An object that holds 3 {@link Two.Vector}s, the anchor point and its corresponding handles: `left` and `right`. In order to properly describe the bezier curve about the point there is also a command property to describe what type of drawing should occur when Two.js renders the anchors.
 */
class Anchor extends Vector {

  x = 0
  y = 0
  controls = {
    left: new Vector(),
    right: new Vector()
  }
  command = Commands.move
  relative = true

  rx = 0
  ry = 0
  xAxisRotation = 0
  largeArcFlag = 0
  sweepFlag = 1

  constructor(x = 0, y = 0, lx = 0, ly = 0, rx = 0, ry = 0, command = Commands.move) {

    super(x, y);

    this.command = command;
    this.relative = true;

    this.controls.left.set(lx, ly);
    this.controls.right.set(rx, ry);

  }

  /**
   * @name Two.Anchor#copy
   * @function
   * @param {Two.Anchor} v - The anchor to apply values to.
   * @description Copy the properties of one {@link Two.Anchor} onto another.
   */
  copy(v) {

    this.x = v.x;
    this.y = v.y;

    if (typeof v.command === 'string') {
      this.command = v.command;
    }

    if (v.controls) {
      if (v.controls.left) {
        this.controls.left.copy(v.controls.left);
      }
      if (v.controls.right) {
        this.controls.right.copy(v.controls.right);
      }
    }

    if (typeof v.relative === 'boolean') {
      this.relative = v.relative;
    }

    if (typeof v.rx === 'number') {
      this.rx = v.rx;
    }
    if (typeof v.ry === 'number') {
      this.ry = v.ry;
    }
    if (typeof v.xAxisRotation === 'number') {
      this.xAxisRotation = v.xAxisRotation;
    }
    if (typeof v.largeArcFlag === 'number') {
      this.largeArcFlag = v.largeArcFlag;
    }
    if (typeof v.sweepFlag === 'number') {
      this.sweepFlag = v.sweepFlag;
    }

    return this;

  },

  /**
   * @name Two.Anchor#clone
   * @function
   * @returns {Two.Anchor}
   * @description Create a new {@link Two.Anchor}, set all its values to the current instance and return it for use.
   */
  clone() {
    return new Anchor().copy(this);
  },

  /**
   * @name Two.Anchor#toObject
   * @function
   * @returns {Object} - An object with properties filled out to mirror {@link Two.Anchor}.
   * @description Create a JSON compatible plain object of the current instance. Intended for use with storing values in a database.
   */
  toObject() {
    return {
      x: this.x,
      y: this.y,
      command: this.command,
      relative: this.relative,
      controls: {
        left: this.controls.left.toObject(),
        right: this.controls.right.toObject()
      },
      rx: this.rx,
      ry: this.ry,
      xAxisRotation: this.xAxisRotation,
      largeArcFlag: this.largeArcFlag,
      sweepFlag: this.sweepFlag
    };
  },

  /**
   * @name Two.Anchor#toString
   * @function
   * @returns {String} - A String with comma-separated values reflecting the various values on the current instance.
   * @description Create a string form of the current instance. Intended for use with storing values in a database. This is lighter to store than the JSON compatible {@link Two.Anchor#toObject}.
   */
  toString() {
    return JSON.stringify(this.toObject());
  }

}

export default Anchor;
