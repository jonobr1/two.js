/**
 * @externs
 * @fileoverview Externs for two.js.
 */

var console;

/** @record */
function TwoConstructionParams() {};
/** @type {?string} */
TwoConstructionParams.prototype.type;
/** @type {?number} */
TwoConstructionParams.prototype.width;
/** @type {?number} */
TwoConstructionParams.prototype.height;
/** @type {?boolean} */
TwoConstructionParams.prototype.autostart;
/** @type {?boolean} */
TwoConstructionParams.prototype.fullscreen;
/** @type {?number} */
TwoConstructionParams.prototype.ratio;

/**
 * @constructor
 * @param {TwoConstructionParams} params
 */
function Two(params) {};

/** @type {string} */
Two.prototype.type;

/** @type {number} */
Two.prototype.framecount;

/** @type {number} */
Two.prototype.timeDelta;


/** @type {number} */
Two.prototype.width;

/** @type {number} */
Two.prototype.height;

/** @type {boolean} */
Two.prototype.playing;

/** @type {?} */
Two.prototype.renderer;

/** @type {Two.Group} */
Two.prototype.scene;

/**
 * @param {?} domElement
 * @return {Two}
 */
Two.prototype.appendTo = function(domElement) {};

Two.prototype.play = function() {};

Two.prototype.pause = function() {};

Two.prototype.update = function() {};

Two.prototype.render = function() {};

/** @param {... Two.Path|Two.Group} objects */
Two.prototype.add = function(objects) {};

/** @param {... Two.Path|Two.Group} objects */
Two.prototype.remove = function(objects) {};

Two.prototype.clear = function() {};

/**
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @return {Two.Line}
 */
Two.prototype.makeLine = function(x1, y1, x2, y2) {};

/**
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @return {Two.Rectangle}
 */
Two.prototype.makeRectangle = function(x, y, width, height) {};

/**
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {number} radius
 * @return {Two.RoundedRectangle}
 */
Two.prototype.makeRoundedRectangle = function(x, y, width, height, radius) {};

/**
 * @param {number} x
 * @param {number} y
 * @param {number} radius
 * @return {Two.Ellipse}
 */
Two.prototype.makeCircle = function(x, y, radius) {};

/**
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @return {Two.Ellipse}
 */
Two.prototype.makeEllipse = function(x, y, width, height) {};

/**
 * @param {number} ox
 * @param {number} oy
 * @param {number} or
 * @param {number} ir
 * @param {number} sides
 * @return {Two.Star}
 */
Two.prototype.makeStar = function(ox, oy, or, ir, sides) {};

/**
 * @param {number} ox
 * @param {number} oy
 * @param {number} r
 * @param {number} sides
 * @return {Two.Polygon}
 */
Two.prototype.makePolygon = function(ox, oy, r, sides) {};

/**
 * @param {number} ox
 * @param {number} oy
 * @param {number} ir
 * @param {number} or
 * @param {number} sa
 * @param {number} ea
 * @param {number} res
 * @return {Two.ArcSegment}
 */
Two.prototype.makeArcSegment = function(ox, oy, ir, or, sa, ea, res) {};

/**
 * @param {... Two.Path|Two.Group} objects
 * @return {Two.Group}
 */
Two.prototype.makeGroup = function(objects) {};

/**
 * @param {?} svgNode
 * @return {Two.Group}
 */
Two.prototype.interpret = function(svgNode) {};

/**
 * @param {string} event
 * @param {function(Array<?>): void} callback
 * @return {Two}
 */
Two.prototype.bind = function(event, callback) {};

/**
 * @param {string} event
 * @param {?function(Array<?>): void} callback
 * @return {Two}
 */
Two.prototype.unbind = function(event, callback) {};

/**
 * @const
 * @type {string}
 */
Two.Types.webgl;
/**
 * @const
 * @type {string}
 */
Two.Types.svg;
/**
 * @const
 * @type {string}
 */
Two.Types.canvas;


/**
 * @constructor
 * @param {number} x
 * @param {number} y
 * @param {number} lx
 * @param {number} ly
 * @param {number} rx
 * @param {number} ry
 * @param {?} command
*/
Two.Anchor = function(x, y, lx, ly, rx, ry, command) {}

/** @type {number} */
Two.Anchor.prototype.x;

/** @type {number} */
Two.Anchor.prototype.y;

/** @type {?} */
Two.Anchor.prototype.command;

/** @type {?} */
Two.Anchor.prototype.controls;

//TODO: Fill this in.

/**
 * @constructor
 * @param {Array<Two.Archor>} vertices
 * @param {boolean} closed
 * @param {boolean} curved
 * @param {?=} manual
*/
Two.Path = function(vertices, closed, curved, manual) {}

/** @type {number} */
Two.Path.prototype.id;

/** @type {string} */
Two.Path.prototype.stroke;

/** @type {string} */
Two.Path.prototype.fill;

/** @type {number} */
Two.Path.prototype.linewidth;

/** @type {number} */
Two.Path.prototype.opacity;

/** @type {string} */
Two.Path.prototype.cap;

/** @type {string} */
Two.Path.prototype.join;

/** @type {number} */
Two.Path.prototype.miter;

/** @type {number} */
Two.Path.prototype.rotation;

/** @type {number} */
Two.Path.prototype.scale;

/** @type {Two.Vector} */
Two.Path.prototype.translation;

/** @type {Two.Group} */
Two.Path.prototype.parent;

/** @type {Array<Two.Archor>} */
Two.Path.prototype.vertices;

/** @type {boolean} */
Two.Path.prototype.closed;

/** @type {boolean} */
Two.Path.prototype.curved;

/** @type {boolean} */
Two.Path.prototype.automatic;

/** @type {number} */
Two.Path.prototype.beginning;

/** @type {number} */
Two.Path.prototype.ending;

/** @type {boolean} */
Two.Path.prototype.clip;

/** @return {Two.Path} */
Two.Path.prototype.clone = function() {};

Two.Path.prototype.center = function() {};

/**
 * @param {Two.Group} group
 */
Two.Path.prototype.addTo = function(group) {};

Two.Path.prototype.remove = function() {};

Two.Path.prototype.noFill = function() {};

Two.Path.prototype.noStroke = function() {};

Two.Path.prototype.plot = function() {};

Two.Path.prototype.subdivide = function() {};



/**
 * @constructor
 * @extends {Two.Path}
 */
Two.Line = function(x1, y1, x2, y2) {};

/**
 * @constructor
 * @extends {Two.Path}
 */
Two.Rectangle = function(x, y, width, height) {};

/**
 * @constructor
 * @extends {Two.Path}
 */
Two.RoundedRectangle = function(x, y, width, height, radius) {};

/**
 * @constructor
 * @extends {Two.Path}
 */
Two.Ellipse = function(x, y, width, height) {};

/**
 * @constructor
 * @extends {Two.Path}
 */
Two.Star = function(x, y, or, ir, sides) {};

/**
 * @constructor
 * @extends {Two.Path}
 */
Two.Polygon = function(x, y, radius, sides) {};



/**
 * @constructor
 */
Two.Group = function() {};

//TODO: Fill this in.


/**
 * @constructor
 * @param {number} x
 * @param {number} y
 */
Two.Vector = function(x, y) {};

/** @type {number} */
Two.Vector.prototype.x;

/** @type {number} */
Two.Vector.prototype.y;

// TODO: Fill this in.
