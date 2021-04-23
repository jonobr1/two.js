import Commands from '../utils/path-commands.js';
import _ from '../utils/underscore.js';

import Path from '../path.js';
import Anchor from '../anchor.js';

/**
 * @name Two.Line
 * @class
 * @extends Two.Path
 * @param {Number} [x1=0] - The x position of the first vertex on the line.
 * @param {Number} [y1=0] - The y position of the first vertex on the line.
 * @param {Number} [x2=0] - The x position of the second vertex on the line.
 * @param {Number} [y2=0] - The y position of the second vertex on the line.
 */
function Line(x1, y1, x2, y2) {

  Path.call(this, [
      new Anchor(x1, y1),
      new Anchor(x2, y2)
  ]);

  this.vertices[0].command = Commands.move;
  this.vertices[1].command = Commands.line;

  this.automatic = false;

}

_.extend(Line.prototype, Path.prototype, {

  constructor: Line

});

Path.MakeObservable(Line.prototype);

export default Line;
