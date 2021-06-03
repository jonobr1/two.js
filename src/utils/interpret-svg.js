import root from './root.js';
import Commands from './path-commands.js';
import { decomposeMatrix } from './math.js';
import { getReflection } from './curves.js';
import _ from './underscore.js';
import TwoError from './error.js';
import Registry from '../registry.js';

import Anchor from '../anchor.js';
import Vector from '../vector.js';
import Matrix from '../matrix.js';
import Path from '../path.js';
import Group from '../group.js';

import Circle from '../shapes/circle.js';
import Ellipse from '../shapes/ellipse.js';
import Line from '../shapes/line.js';
import Rectangle from '../shapes/rectangle.js';
import RoundedRectangle from '../shapes/rounded-rectangle.js';

import Stop from '../effects/stop.js';
import Gradient from '../effects/gradient.js';
import LinearGradient from '../effects/linear-gradient.js';
import RadialGradient from '../effects/radial-gradient.js';
import Text from '../text.js';

import Constants from '../constants.js';

// https://github.com/jonobr1/two.js/issues/507#issuecomment-777159213
var regex = {
  path: /[+-]?(?:\d*\.\d+|\d+)(?:[eE][+-]\d+)?/g
};

var alignments = {
  start: 'left',
  middle: 'center',
  end: 'right'
};

/**
 * @name Two.Utils.getAlignment
 * @function
 * @param {AlignmentString}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor}
 */
var getAlignment = function(anchor) {
  return alignments[anchor];
};

var getBaseline = function(node) {
  var a = node.getAttribute('dominant-baseline');
  var b = node.getAttribute('alignment-baseline');
  return a || b;
};

var getTagName = function(tag) {
  return tag.replace(/svg:/ig, '').toLowerCase();
};

var applyTransformsToVector = function(transforms, vector) {

  vector.x += transforms.translateX;
  vector.y += transforms.translateY;

  vector.x *= transforms.scaleX;
  vector.y *= transforms.scaleY;

  if (transforms.rotation !== 0) {
    // TODO: Test further
    var l = vector.length();
    vector.x = l * Math.cos(transforms.rotation);
    vector.y = l * Math.sin(transforms.rotation);
  }

};

/**
 * @name Two.Utils.extractCSSText
 * @function
 * @param {String} text - The CSS text body to be parsed and extracted.
 * @param {Object} [styles] - The styles object to apply CSS key values to.
 * @returns {Object} styles
 * @description Parse CSS text body and apply them as key value pairs to a JavaScript object.
 */
var extractCSSText = function(text, styles) {

  var commands, command, name, value;

  if (!styles) {
    styles = {};
  }

  commands = text.split(';');

  for (var i = 0; i < commands.length; i++) {
    command = commands[i].split(':');
    name = command[0];
    value = command[1];
    if (typeof name === 'undefined' || typeof value === 'undefined') {
      continue;
    }
    styles[name] = value.replace(/\s/, '');
  }

  return styles;

};

/**
 * @name Two.Utils.getSvgStyles
 * @function
 * @param {SVGElement} node - The SVG node to parse.
 * @returns {Object} styles
 * @description Get the CSS comands from the `style` attribute of an SVG node and apply them as key value pairs to a JavaScript object.
 */
var getSvgStyles = function(node) {

  var styles = {};
  var attributes = getSvgAttributes(node);
  var length = Math.max(attributes.length, node.style.length);

  for (var i = 0; i < length; i++) {

    var command = node.style[i];
    var attribute = attributes[i];

    if (command) {
      styles[command] = node.style[command];
    }
    if (attribute) {
      styles[attribute] = node.getAttribute(attribute);
    }

  }

  return styles;

};

var getSvgAttributes = function(node) {

  var attributes = node.getAttributeNames();

  // Reserved attributes to remove
  var keywords = ['id', 'class', 'transform', 'xmlns', 'viewBox'];

  for (var i = 0; i < keywords.length; i++) {
    var keyword = keywords[i];
    var index = Array.prototype.indexOf.call(attributes, keyword);
    if (index >= 0) {
      attributes.splice(index, 1);
    }
  }

  return attributes;

};

/**
 * @name Two.Utils.applySvgViewBox
 * @function
 * @param {Two.Shape} node - The Two.js object to apply viewbox matrix to
 * @param {String} value - The viewBox value from the SVG attribute
 * @returns {Two.Shape} node
 * @description Applies the transform of the SVG Viewbox on a given node.
 */
var applySvgViewBox = function(node, value) {

  var elements = value.split(/\s/);

  var x = parseFloat(elements[0]);
  var y = parseFloat(elements[1]);
  var width = parseFloat(elements[2]);
  var height = parseFloat(elements[3]);

  var s = Math.min(this.width / width, this.height / height);

  node.translation.x -= x * s;
  node.translation.y -= y * s;
  node.scale = s;

  return node;

};

/**
 * @name Two.Utils.applySvgAttributes
 * @function
 * @param {SVGElement} node - An SVG Node to extrapolate attributes from.
 * @param {Two.Shape} elem - The Two.js object to apply extrapolated attributes to.
 * @returns {Two.Shape} The Two.js object passed now with applied attributes.
 * @description This function iterates through an SVG Node's properties and stores ones of interest. It tries to resolve styles applied via CSS as well.
 * @TODO Reverse calculate {@link Two.Gradient}s for fill / stroke of any given path.
 */
var applySvgAttributes = function(node, elem, parentStyles) {

  var styles = {}, attributes = {}, extracted = {}, i, m, key, value, attr;
  var id, scene, ref, tagName;

  // Not available in non browser environments
  if (root.getComputedStyle) {
    // Convert CSSStyleDeclaration to a normal object
    var computedStyles = root.getComputedStyle(node);
    i = computedStyles.length;

    while (i--) {
      key = computedStyles[i];
      value = computedStyles[key];
      // Gecko returns undefined for unset properties
      // Webkit returns the default value
      if (typeof value !== 'undefined') {
        styles[key] = value;
      }
    }
  }

  // Convert NodeMap to a normal object
  for (i = 0; i < node.attributes.length; i++) {
    attr = node.attributes[i];
    if (/style/i.test(attr.nodeName)) {
      extractCSSText(attr.value, extracted);
    } else {
      attributes[attr.nodeName] = attr.value;
    }
  }

  // Getting the correct opacity is a bit tricky, since SVG path elements don't
  // support opacity as an attribute, but you can apply it via CSS.
  // So we take the opacity and set (stroke/fill)-opacity to the same value.
  if (typeof styles.opacity !== 'undefined') {
    styles['stroke-opacity'] = styles.opacity;
    styles['fill-opacity'] = styles.opacity;
    delete styles.opacity;
  }

  // Merge attributes and applied styles (attributes take precedence)
  if (parentStyles) {
    _.defaults(styles, parentStyles);
  }
  _.extend(styles, extracted, attributes);

  // Similarly visibility is influenced by the value of both display and visibility.
  // Calculate a unified value here which defaults to `true`.
  styles.visible = !(typeof styles.display === 'undefined' && /none/i.test(styles.display))
    || (typeof styles.visibility === 'undefined' && /hidden/i.test(styles.visibility));

  // Now iterate the whole thing
  for (key in styles) {
    value = styles[key];

    switch (key) {
      case 'gradientTransform':
        // TODO: Check this out https://github.com/paperjs/paper.js/blob/develop/src/svg/SvgImport.js#L315
        if (/none/i.test(value)) break;
        m = (node.gradientTransform && node.gradientTransform.baseVal && node.gradientTransform.baseVal.length > 0)
          ? node.gradientTransform.baseVal[0].matrix
          : (node.getCTM ? node.getCTM() : null);

        if (m === null) break;

        var transforms = decomposeMatrix(m);

        switch (elem._renderer.type) {
          case 'linear-gradient':
            applyTransformsToVector(transforms, elem.left);
            applyTransformsToVector(transforms, elem.right);
            break;
          case 'radial-gradient':
            elem.center.x += transforms.translateX;
            elem.center.y += transforms.translateY;

            elem.focal.x += transforms.translateX;
            elem.focal.y += transforms.translateY;

            elem.radius *= Math.max(transforms.scaleX, transforms.scaleY);
            break;
        }

        break;
      case 'transform':
        // TODO: Check this out https://github.com/paperjs/paper.js/blob/develop/src/svg/SvgImport.js#L315
        if (/none/i.test(value)) break;
        m = (node.transform && node.transform.baseVal && node.transform.baseVal.length > 0)
          ? node.transform.baseVal[0].matrix
          : (node.getCTM ? node.getCTM() : null);

        // Might happen when transform string is empty or not valid.
        if (m === null) break;

        if (Constants.AutoCalculateImportedMatrices) {

          // Decompose and infer Two.js related properties.
          var transforms = decomposeMatrix(m);

          elem.translation.set(transforms.translateX, transforms.translateY);
          elem.rotation = Math.PI * (transforms.rotation / 180);
          elem.scale = new Vector(transforms.scaleX, transforms.scaleY);

          var x = parseFloat((styles.x + '').replace('px'));
          var y = parseFloat((styles.y + '').replace('px'));

          // Override based on attributes.
          if (x) {
            elem.translation.x = x;
          }

          if (y) {
            elem.translation.y = y;
          }

        } else {

          // Edit the underlying matrix and don't force an auto calc.
          m = node.getCTM();
          elem._matrix.manual = true;
          elem._matrix.set(m.a, m.b, m.c, m.d, m.e, m.f);

        }

        break;
      case 'viewBox':
        applySvgViewBox.call(this, elem, value);
        break;
      case 'visible':
        if (elem instanceof Group) {
          elem._visible = value;
          break;
        }
        elem.visible = value;
        break;
      case 'stroke-linecap':
        if (elem instanceof Group) {
          elem._cap = value;
          break;
        }
        elem.cap = value;
        break;
      case 'stroke-linejoin':
        if (elem instanceof Group) {
          elem._join = value;
          break;
        }
        elem.join = value;
        break;
      case 'stroke-miterlimit':
        if (elem instanceof Group) {
          elem._miter = value;
          break;
        }
        elem.miter = value;
        break;
      case 'stroke-width':
        if (elem instanceof Group) {
          elem._linewidth = parseFloat(value);
          break;
        }
        elem.linewidth = parseFloat(value);
        break;
      case 'opacity':
      case 'stroke-opacity':
      case 'fill-opacity':
        // Only apply styles to rendered shapes
        // in the scene.
        if (elem instanceof Group) {
          elem._opacity = parseFloat(value);
          break;
        }
        elem.opacity = parseFloat(value);
        break;
      case 'fill':
      case 'stroke':
        if (elem instanceof Group) {
          key = '_' + key;
        }
        if (/url\(#.*\)/i.test(value)) {
          id = value.replace(/url\(#(.*)\)/i, '$1')
          if (read.defs.current && read.defs.current.contains(id)) {
            ref = read.defs.current.get(id);
            tagName = getTagName(ref.nodeName);
            ref = read[tagName].call(this, ref, {});
          } else {
            scene = getScene(this);
            ref = scene.getById(id);
          }
          elem[key] = ref;
        } else {
          elem[key] = (/none/i.test(value)) ? 'transparent' : value;
        }
        break;
      case 'id':
        elem.id = value;
        // Overwritten id for non-conflicts on same page SVG documents
        // TODO: Make this non-descructive
        node.id = value + '-' + Constants.Identifier + 'applied';
        break;
      case 'class':
      case 'className':
        elem.classList = value.split(' ');
        break;
      case 'x':
      case 'y':
        var ca = elem instanceof Gradient;
        var cb = elem instanceof LinearGradient;
        var cc = elem instanceof RadialGradient;
        if (ca || cb || cc) {
          break;
        }
        if (value.match('[a-z%]$') && !value.endsWith('px')) {
          var error = new TwoError(
            'only pixel values are supported with the ' + key + ' attribute.');
          console.warn(error.name, error.message);
        }
        elem.translation[key] = parseFloat(value);
        break;
      case 'font-family':
        if (elem instanceof Text) {
          elem.family = value;
        }
        break;
      case 'font-size':
        if (elem instanceof Text) {
          elem.size = value;
        }
        break;
      case 'font-weight':
        if (elem instanceof Text) {
          elem.weight = value;
        }
        break;
      case 'font-style':
        if (elem instanceof Text) {
          elem.style = value;
        }
        break;
      case 'text-decoration':
        if (elem instanceof Text) {
          elem.decoration = value;
        }
        break;
      case 'line-height':
        if (elem instanceof Text) {
          elem.leading = value;
        }
        break;
    }
  }

  return styles;

};

/**
 * @name Two.Utils.updateDefsCache
 * @function
 * @param {SVGElement} node - The SVG Node with which to update the defs cache.
 * @param {Object} Object - The defs cache to be updated.
 * @description Update the cache of children of <defs /> tags.
 */
var updateDefsCache = function(node, defsCache) {
  for (var i = 0, l = node.childNodes.length; i < l; i++) {
    var n = node.childNodes[i];
    if (!n.id) continue;

    var tagName = getTagName(node.nodeName);
    if (tagName === '#text') continue;

    defsCache.add(n.id, n);
  }
};

/**
 * @name Two.Utils.getScene
 * @param {Two.Shape} node - The currently available object in the scenegraph.
 * @returns {Group} - The highest order {@link Two.Group} in the scenegraph.
 * @property {Function}
 */
var getScene = function(node) {

  while (node.parent) {
    node = node.parent;
  }

  return node.scene;

};

/**
 * @name Two.Utils.read
 * @property {Object} read - A map of functions to read any number of SVG node types and create Two.js equivalents of them. Primarily used by the {@link Two#interpret} method.
 */
var read = {

  svg: function(node) {

    var defs = read.defs.current = new Registry();
    var elements = node.getElementsByTagName('defs');

    for (var i = 0; i < elements.length; i++) {
      updateDefsCache(elements[i], defs);
    }

    var svg = read.g.call(this, node);
    // var viewBox = node.getAttribute('viewBox');

    svg.defs = defs;  // Export out the <defs /> for later use
    // Utils.applySvgViewBox(svg, viewBox);

    delete read.defs.current;

    return svg;

  },

  defs: function(node) {
    return null;
  },

  use: function(node, styles) {

    var error;
    var href = node.getAttribute('href') || node.getAttribute('xlink:href');
    if (!href) {
      error = new TwoError('encountered <use /> with no href.');
      console.warn(error.name, error.message);
      return null;
    }

    var id = href.slice(1);
    if (!read.defs.current.contains(id)) {
      error = new TwoError(
        'unable to find element for reference ' + href + '.');
      console.warn(error.name, error.message);
      return null;
    }

    var template = read.defs.current.get(id);
    var fullNode = template.cloneNode(true);
    var overwriteAttrs = ['x', 'y', 'width', 'height', 'href', 'xlink:href'];

    for (var i = 0; i < node.attributes.length; i++) {
      var attr = node.attributes[i];
      var ca = overwriteAttrs.includes(attr.nodeName);
      var cb = !fullNode.hasAttribute(attr.nodeName);
      if (ca || cb) {
        fullNode.setAttribute(attr.nodeName, attr.value);
      }
    }

    var tagName = getTagName(fullNode.nodeName);
    return read[tagName].call(this, fullNode, styles);

  },

  g: function(node, parentStyles) {

    var styles;
    var group = new Group();

    applySvgAttributes.call(this, node, group, parentStyles);

    this.add(group);

    // Switched up order to inherit more specific styles
    styles = getSvgStyles.call(this, node);

    for (var i = 0, l = node.childNodes.length; i < l; i++) {
      var n = node.childNodes[i];
      var tag = n.nodeName;
      if (!tag) return;

      var tagName = getTagName(tag);

      if (tagName in read) {
        var o = read[tagName].call(group, n, styles);
        if (!!o && !o.parent) {
          group.add(o);
        }
      }
    }

    return group;

  },

  polygon: function(node, parentStyles) {

    var points = node.getAttribute('points');

    var verts = [];
    points.replace(/(-?[\d.eE-]+)[,|\s](-?[\d.eE-]+)/g, function(match, p1, p2) {
      verts.push(new Anchor(parseFloat(p1), parseFloat(p2)));
    });

    var poly = new Path(verts, true).noStroke();
    poly.fill = 'black';

    applySvgAttributes.call(this, node, poly, parentStyles);

    return poly;

  },

  polyline: function(node, parentStyles) {
    var poly = read.polygon.call(this, node, parentStyles);
    poly.closed = false;
    return poly;
  },

  path: function(node, parentStyles) {

    var path = node.getAttribute('d');
    var points = [];
    var closed = false, relative = false;

    if (path) {

      // Create a Two.Path from the paths.

      var coord = new Anchor();
      var control, coords;
      var commands = path.match(/[a-df-z][^a-df-z]*/ig);
      var last = commands.length - 1;

      // Split up polybeziers

      _.each(commands.slice(0), function(command, i) {

        var items = command.slice(1).trim().match(regex.path);
        var type = command[0];
        var lower = type.toLowerCase();
        var bin, j, l, ct, times, result = [];

        if (i === 0) {
          commands = [];
        }

        switch (lower) {
          case 'h':
          case 'v':
            if (items.length > 1) {
              bin = 1;
            }
            break;
          case 'm':
          case 'l':
          case 't':
            if (items.length > 2) {
              bin = 2;
            }
            break;
          case 's':
          case 'q':
            if (items.length > 4) {
              bin = 4;
            }
            break;
          case 'c':
            if (items.length > 6) {
              bin = 6;
            }
            break;
          case 'a':
            if (items.length > 7) {
              bin = 7;
            }
            break;
        }

        // This means we have a polybezier.
        if (bin) {

          for (j = 0, l = items.length, times = 0; j < l; j+=bin) {

            ct = type;
            if (times > 0) {

              switch (type) {
                case 'm':
                  ct = 'l';
                  break;
                case 'M':
                  ct = 'L';
                  break;
              }

            }

            result.push(ct + items.slice(j, j + bin).join(' '));
            times++;

          }

          commands = Array.prototype.concat.apply(commands, result);

        } else {

          commands.push(command);

        }

      });

      // Create the vertices for our Two.Path

      _.each(commands, function(command, i) {

        var result, x, y;
        var type = command[0];
        var lower = type.toLowerCase();

        coords = command.slice(1).trim().match(regex.path);
        relative = type === lower;

        var x1, y1, x2, y2, x3, y3, x4, y4, reflection;

        switch (lower) {

          case 'z':
            if (i >= last) {
              closed = true;
            } else {
              x = coord.x;
              y = coord.y;
              result = new Anchor(
                x, y,
                undefined, undefined,
                undefined, undefined,
                Commands.close
              );
              // Make coord be the last `m` command
              for (var j = points.length - 1; j >= 0; j--) {
                var point = points[j];
                if (/m/i.test(point.command)) {
                  coord = point;
                  break;
                }
              }
            }
            break;

          case 'm':
          case 'l':

            control = undefined;

            x = parseFloat(coords[0]);
            y = parseFloat(coords[1]);

            result = new Anchor(
              x, y,
              undefined, undefined,
              undefined, undefined,
              /m/i.test(lower) ? Commands.move : Commands.line
            );

            if (relative) {
              result.addSelf(coord);
            }

            // result.controls.left.copy(result);
            // result.controls.right.copy(result);

            coord = result;
            break;

          case 'h':
          case 'v':

            var a = /h/i.test(lower) ? 'x' : 'y';
            var b = /x/i.test(a) ? 'y' : 'x';

            result = new Anchor(
              undefined, undefined,
              undefined, undefined,
              undefined, undefined,
              Commands.line
            );
            result[a] = parseFloat(coords[0]);
            result[b] = coord[b];

            if (relative) {
              result[a] += coord[a];
            }

            // result.controls.left.copy(result);
            // result.controls.right.copy(result);

            coord = result;
            break;

          case 'c':
          case 's':

            x1 = coord.x;
            y1 = coord.y;

            if (!control) {
              control = new Vector();//.copy(coord);
            }

            if (/c/i.test(lower)) {

              x2 = parseFloat(coords[0]);
              y2 = parseFloat(coords[1]);
              x3 = parseFloat(coords[2]);
              y3 = parseFloat(coords[3]);
              x4 = parseFloat(coords[4]);
              y4 = parseFloat(coords[5]);

            } else {

              // Calculate reflection control point for proper x2, y2
              // inclusion.

              reflection = getReflection(coord, control, relative);

              x2 = reflection.x;
              y2 = reflection.y;
              x3 = parseFloat(coords[0]);
              y3 = parseFloat(coords[1]);
              x4 = parseFloat(coords[2]);
              y4 = parseFloat(coords[3]);

            }

            if (relative) {
              x2 += x1;
              y2 += y1;
              x3 += x1;
              y3 += y1;
              x4 += x1;
              y4 += y1;
            }

            if (!_.isObject(coord.controls)) {
              Anchor.AppendCurveProperties(coord);
            }

            coord.controls.right.set(x2 - coord.x, y2 - coord.y);
            result = new Anchor(
              x4, y4,
              x3 - x4, y3 - y4,
              undefined, undefined,
              Commands.curve
            );

            coord = result;
            control = result.controls.left;

            break;

          case 't':
          case 'q':

            x1 = coord.x;
            y1 = coord.y;

            if (!control) {
              control = new Vector();
            }

            if (/q/i.test(lower)) {

              x2 = parseFloat(coords[0]);
              y2 = parseFloat(coords[1]);
              x3 = parseFloat(coords[0]);
              y3 = parseFloat(coords[1]);
              x4 = parseFloat(coords[2]);
              y4 = parseFloat(coords[3]);

            } else {

              reflection = getReflection(coord, control, relative);

              x2 = reflection.x;
              y2 = reflection.y;
              x3 = reflection.x;
              y3 = reflection.y;
              x4 = parseFloat(coords[0]);
              y4 = parseFloat(coords[1]);

            }

            if (relative) {
              x2 += x1;
              y2 += y1;
              x3 += x1;
              y3 += y1;
              x4 += x1;
              y4 += y1;
            }

            if (!_.isObject(coord.controls)) {
              Anchor.AppendCurveProperties(coord);
            }

            coord.controls.right.set(
              (x2 - coord.x) * 0.33, (y2 - coord.y) * 0.33);
            result = new Anchor(
              x4, y4,
              x3 - x4, y3 - y4,
              undefined, undefined,
              Commands.curve
            );

            coord = result;
            control = result.controls.left;

            break;

          case 'a':

            x1 = coord.x;
            y1 = coord.y;

            var rx = parseFloat(coords[0]);
            var ry = parseFloat(coords[1]);
            var xAxisRotation = parseFloat(coords[2]);// * PI / 180;
            var largeArcFlag = parseFloat(coords[3]);
            var sweepFlag = parseFloat(coords[4]);

            x4 = parseFloat(coords[5]);
            y4 = parseFloat(coords[6]);

            if (relative) {
              x4 += x1;
              y4 += y1;
            }

            var anchor = new Anchor(x4, y4);
            anchor.command = Commands.arc;
            anchor.rx = rx;
            anchor.ry = ry;
            anchor.xAxisRotation = xAxisRotation;
            anchor.largeArcFlag = largeArcFlag;
            anchor.sweepFlag = sweepFlag;

            result = anchor;

            coord = anchor;
            control = undefined;

            break;

        }

        if (result) {
          if (Array.isArray(result)) {
            points = points.concat(result);
          } else {
            points.push(result);
          }
        }

      });

    }

    path = new Path(points, closed, undefined, true).noStroke();
    path.fill = 'black';

    var rect = path.getBoundingClientRect(true);

    // Center objects to stay consistent
    // with the rest of the Two.js API.
    rect.centroid = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };

    _.each(path.vertices, function(v) {
      v.subSelf(rect.centroid);
    });

    applySvgAttributes.call(this, node, path, parentStyles);

    path.translation.addSelf(rect.centroid);

    return path;

  },

  circle: function(node, parentStyles) {

    var x = parseFloat(node.getAttribute('cx'));
    var y = parseFloat(node.getAttribute('cy'));
    var r = parseFloat(node.getAttribute('r'));

    var circle = new Circle(0, 0, r).noStroke();
    circle.fill = 'black';

    applySvgAttributes.call(this, node, circle, parentStyles);

    circle.translation.x = x;
    circle.translation.y = y;

    return circle;

  },

  ellipse: function(node, parentStyles) {

    var x = parseFloat(node.getAttribute('cx'));
    var y = parseFloat(node.getAttribute('cy'));
    var width = parseFloat(node.getAttribute('rx'));
    var height = parseFloat(node.getAttribute('ry'));

    var ellipse = new Ellipse(0, 0, width, height).noStroke();
    ellipse.fill = 'black';

    applySvgAttributes.call(this, node, ellipse, parentStyles);

    ellipse.translation.x = x;
    ellipse.translation.y = y;

    return ellipse;

  },

  rect: function(node, parentStyles) {

    var rx = parseFloat(node.getAttribute('rx'));
    var ry = parseFloat(node.getAttribute('ry'));

    if (!_.isNaN(rx) || !_.isNaN(ry)) {
      return read['rounded-rect'](node);
    }

    var width = parseFloat(node.getAttribute('width'));
    var height = parseFloat(node.getAttribute('height'));

    var w2 = width / 2;
    var h2 = height / 2;

    var rect = new Rectangle(0, 0, width, height)
      .noStroke();
    rect.fill = 'black';

    applySvgAttributes.call(this, node, rect, parentStyles);

    // For rectangles, (x, y) is the center of the shape rather than the top
    // left corner.
    rect.translation.x += w2;
    rect.translation.y += h2;

    return rect;

  },

  'rounded-rect': function(node, parentStyles) {

    var rx = parseFloat(node.getAttribute('rx')) || 0;
    var ry = parseFloat(node.getAttribute('ry')) || 0;

    var width = parseFloat(node.getAttribute('width'));
    var height = parseFloat(node.getAttribute('height'));

    var w2 = width / 2;
    var h2 = height / 2;
    var radius = new Vector(rx, ry);

    var rect = new RoundedRectangle(0, 0, width, height, radius)
      .noStroke();
    rect.fill = 'black';

    applySvgAttributes.call(this, node, rect, parentStyles);

    // For rectangles, (x, y) is the center of the shape rather than the top
    // left corner.
    rect.translation.x += w2;
    rect.translation.y += h2;

    return rect;

  },

  line: function(node, parentStyles) {

    var x1 = parseFloat(node.getAttribute('x1'));
    var y1 = parseFloat(node.getAttribute('y1'));
    var x2 = parseFloat(node.getAttribute('x2'));
    var y2 = parseFloat(node.getAttribute('y2'));

    var line = new Line(x1, y1, x2, y2).noFill();

    applySvgAttributes.call(this, node, line, parentStyles);

    return line;

  },

  lineargradient: function(node, parentStyles) {

    var x1 = parseFloat(node.getAttribute('x1'));
    var y1 = parseFloat(node.getAttribute('y1'));
    var x2 = parseFloat(node.getAttribute('x2'));
    var y2 = parseFloat(node.getAttribute('y2'));

    var ox = (x2 + x1) / 2;
    var oy = (y2 + y1) / 2;

    var stops = [];
    for (var i = 0; i < node.children.length; i++) {

      var child = node.children[i];

      var offset = child.getAttribute('offset');
      if (/%/ig.test(offset)) {
        offset = parseFloat(offset.replace(/%/ig, '')) / 100;
      }
      offset = parseFloat(offset);

      var color = child.getAttribute('stop-color');
      var opacity = child.getAttribute('stop-opacity');
      var style = child.getAttribute('style');

      var matches;
      if (color === null) {
        matches = style ? style.match(/stop-color:\s?([#a-fA-F0-9]*)/) : false;
        color = matches && matches.length > 1 ? matches[1] : undefined;
      }

      if (opacity === null) {
        matches = style ? style.match(/stop-opacity:\s?([0-9.-]*)/) : false;
        opacity = matches && matches.length > 1 ? parseFloat(matches[1]) : 1;
      } else {
        opacity = parseFloat(opacity);
      }

      stops.push(new Stop(offset, color, opacity));

    }

    var gradient = new LinearGradient(x1 - ox, y1 - oy, x2 - ox,
      y2 - oy, stops);

    applySvgAttributes.call(this, node, gradient, parentStyles);

    return gradient;

  },

  radialgradient: function(node, parentStyles) {

    var cx = parseFloat(node.getAttribute('cx')) || 0;
    var cy = parseFloat(node.getAttribute('cy')) || 0;
    var r = parseFloat(node.getAttribute('r'));

    var fx = parseFloat(node.getAttribute('fx'));
    var fy = parseFloat(node.getAttribute('fy'));

    if (_.isNaN(fx)) {
      fx = cx;
    }

    if (_.isNaN(fy)) {
      fy = cy;
    }

    var ox = Math.abs(cx + fx) / 2;
    var oy = Math.abs(cy + fy) / 2;

    var stops = [];
    for (var i = 0; i < node.children.length; i++) {

      var child = node.children[i];

      var offset = child.getAttribute('offset');
      if (/%/ig.test(offset)) {
        offset = parseFloat(offset.replace(/%/ig, '')) / 100;
      }
      offset = parseFloat(offset);

      var color = child.getAttribute('stop-color');
      var opacity = child.getAttribute('stop-opacity');
      var style = child.getAttribute('style');

      var matches;
      if (color === null) {
        matches = style ? style.match(/stop-color:\s?([#a-fA-F0-9]*)/) : false;
        color = matches && matches.length > 1 ? matches[1] : undefined;
      }

      if (opacity === null) {
        matches = style ? style.match(/stop-opacity:\s?([0-9.-]*)/) : false;
        opacity = matches && matches.length > 1 ? parseFloat(matches[1]) : 1;
      } else {
        opacity = parseFloat(opacity);
      }

      stops.push(new Stop(offset, color, opacity));

    }

    var gradient = new RadialGradient(cx - ox, cy - oy, r,
      stops, fx - ox, fy - oy);

    applySvgAttributes.call(this, node, gradient, parentStyles);

    return gradient;

  },

  text: function(node, parentStyles) {

    var alignment = getAlignment(node.getAttribute('text-anchor')) || 'left';
    var baseline = getBaseline(node) || 'baseline';
    var message = node.textContent;

    var text = new Text(message);

    applySvgAttributes.call(this, node, text, parentStyles);

    text.alignment = alignment;
    text.baseline = baseline;

    return text;

  }

};

export default read;
