/**
 * This file provides mock implementations of Two.js classes for testing purposes.
 * It's used to verify that the TypeScript declarations are correct.
 */

// Mocking base classes
class Vector {
  x: number;
  y: number;
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  set(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }
  add() { return this; }
  sub() { return this; }
  static distanceBetween() { return 5; }
}

class Matrix {
  elements: number[] = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  manual = false;
  translate(x: number, y: number) { return this; }
  scale(x: number, y: number) { return this; }
  rotate(r: number) { return this; }
}

class Events {
  addEventListener() { return this; }
  on() { return this; }
  trigger() { return this; }
}

class Element extends Events {
  id = '';
  className = '';
  flagReset() { return this; }
}

class Shape extends Element {
  position = new Vector();
  rotation = 0;
  scale: number | Vector = 1;
  matrix = new Matrix();
  worldMatrix = new Matrix();
  addTo(group: Group) { return this; }
  remove() { return this; }
  _update() { return this; }
}

class Path extends Shape {
  vertices: Anchor[] = [];
  closed = false;
  curved = false;
  automatic = true;
  fill: string | Gradient | Texture = '#fff';
  stroke: string | Gradient | Texture = '#000';
  linewidth = 1;
  opacity = 1;
  visible = true;
  cap = 'round';
  join = 'round';
  miter = 4;
  beginning = 0;
  ending = 1;
  dashes: number[] = [];
  noFill() { return this; }
  noStroke() { return this; }
  getBoundingClientRect() { 
    return { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
  }
}

class Group extends Shape {
  children: Shape[] = [];
  fill: string | Gradient | Texture = '';
  stroke: string | Gradient | Texture = '';
  linewidth = 1;
  opacity = 1;
  visible = true;
  mask?: Shape;
  add(...args: Shape[]) { return this; }
  remove(...args: Shape[]) { return this; }
  getById(id: string) { return this.children[0]; }
  center() { return this; }
  corner() { return this; }
  getBoundingClientRect(shallow?: boolean) { 
    return { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
  }
}

class Anchor extends Vector {
  controls = {
    left: new Vector(),
    right: new Vector()
  };
  command = 'M';
}

// Shapes
class Rectangle extends Path {
  width = 0;
  height = 0;
  origin = new Vector(0, 0);
}

class Circle extends Path {
  radius = 0;
}

class Ellipse extends Path {
  width = 0;
  height = 0;
}

class Line extends Path {
  left = new Anchor();
  right = new Anchor();
}

class RoundedRectangle extends Rectangle {
  radius = 0;
}

class Polygon extends Path {
  width = 0;
  height = 0;
  sides = 0;
}

class Star extends Path {
  outerRadius = 0;
  innerRadius = 0;
  sides = 0;
}

class ArcSegment extends Path {
  innerRadius = 0;
  outerRadius = 0;
  startAngle = 0;
  endAngle = 0;
}

class Points extends Shape {
  vertices: (Anchor | Vector)[] = [];
  size = 0;
  sizeAttenuation = false;
  beginning = 0;
  ending = 1;
  fill: string | Gradient | Texture = '#fff';
  stroke: string | Gradient | Texture = '#000';
  dashes: number[] = [];
  noFill() { return this; }
  noStroke() { return this; }
  subdivide() { return this; }
}

// Effects
class Gradient extends Element {
  stops: Stop[] = [];
  spread: 'pad' | 'reflect' | 'repeat' = 'pad';
  units: 'userSpaceOnUse' | 'objectBoundingBox' = 'objectBoundingBox';
}

class Stop extends Element {
  offset = 0;
  color = '';
  opacity = 1;
}

class LinearGradient extends Gradient {
  left = new Vector();
  right = new Vector();
}

class RadialGradient extends Gradient {
  center = new Vector();
  focal = new Vector();
  radius = 0;
}

class Texture extends Element {
  src = '';
  loaded = false;
  offset = new Vector();
  repeat = 'no-repeat';
  constructor(src = '') {
    super();
    this.src = src;
  }
  clone() { return new Texture(); }
}

class Sprite extends Rectangle {
  texture = new Texture();
  columns = 0;
  rows = 0;
  frameRate = 0;
  index = 0;
  play(firstFrame?: number, lastFrame?: number, onLastFrame?: Function) { return this; }
  pause() { return this; }
  stop() { return this; }
}

class ImageSequence extends Rectangle {
  textures: any[] = [];
  frameRate = 0;
  index = 0;
  play(firstFrame?: number, lastFrame?: number, onLastFrame?: Function) { return this; }
  pause() { return this; }
  stop() { return this; }
}

class Text extends Shape {
  value = '';
  family = '';
  size = 0;
  leading = 0;
  alignment: 'left' | 'center' | 'right' = 'center';
  baseline: 'top' | 'middle' | 'bottom' | 'baseline' = 'baseline';
  style: 'normal' | 'italic' = 'normal';
  weight: number | string = 500;
  decoration: 'underline' | 'strikethrough' | 'none' = 'none';
  direction: 'ltr' | 'rtl' = 'ltr';
  fill: string | Gradient | Texture = '#000';
  stroke: string | Gradient | Texture = '#000';
  linewidth = 1;
  opacity = 1;
  visible = true;
  dashes: number[] = [];
  noFill() { return this; }
  noStroke() { return this; }
  getBoundingClientRect() { 
    return { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
  }
}

// Renderers
class SVGRenderer extends Events {
  domElement: any = { tagName: 'svg' };
  scene = new Group();
  width = 0;
  height = 0;
  setSize(width: number, height: number) { 
    this.width = width; 
    this.height = height; 
    return this; 
  }
  render() { return this; }
}

class CanvasRenderer extends Events {
  domElement: any = { tagName: 'canvas' };
  scene = new Group();
  overdraw = true;
  width = 0;
  height = 0;
  setSize(width: number, height: number) { 
    this.width = width; 
    this.height = height; 
    return this; 
  }
  render() { return this; }
}

class WebGLRenderer extends Events {
  domElement: any = { tagName: 'canvas' };
  scene = new Group();
  overdraw = true;
  width = 0;
  height = 0;
  setSize(width: number, height: number) { 
    this.width = width; 
    this.height = height; 
    return this; 
  }
  render() { return this; }
}

// Utils
class Registry {
  map: { [key: string]: any } = {};
  add(id: string, obj: any) { this.map[id] = obj; return this; }
  remove(id: string) { delete this.map[id]; return this; }
  get(id: string) { return this.map[id]; }
  contains(id: string) { return id in this.map; }
}

class TwoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TwoError';
  }
}

// Create a mock Two.js implementation
const Two = jest.fn().mockImplementation(function(this: any, options = {}) {
  this.type = options.type || 'SVGRenderer';
  this.width = options.width || 640;
  this.height = options.height || 480;
  this.renderer = {
    type: this.type,
    setSize: jest.fn(),
    render: jest.fn()
  };
  this.scene = new Group();
  this.frameCount = 0;
  this.timeDelta = 0;
  this.playing = false;
}) as any;

// Static properties
Two.Types = {
  webgl: 'WebGLRenderer',
  svg: 'SVGRenderer',
  canvas: 'CanvasRenderer'
};
Two.Version = '0.8.10';
Two.PublishDate = '2021-06-01T00:00:00.000Z';
Two.Instances = [];
Two.uniqueId = jest.fn(() => Math.floor(Math.random() * 1000000));
Two.Utils = {
  decomposeMatrix: jest.fn(),
  getComputedMatrix: jest.fn(() => new Matrix()),
  lerp: jest.fn((a, b, t) => a * (1 - t) + b * t),
  mod: jest.fn((v, l) => ((v % l) + l) % l),
  toFixed: jest.fn(v => Math.floor(v * 1000) / 1000),
  getComponentOnCubicBezier: jest.fn(),
  subdivide: jest.fn(),
  getCurveLength: jest.fn(),
  getCurveBoundingBox: jest.fn(),
  getControlPoints: jest.fn(),
  getReflection: jest.fn(() => new Vector()),
  getAnchorsFromArcData: jest.fn(),
  getRatio: jest.fn(),
  Error: TwoError
};

// Class references
Two.Vector = Vector;
Two.Matrix = Matrix;
Two.Shape = Shape;
Two.Group = Group;
Two.Path = Path;
Two.Rectangle = Rectangle;
Two.Circle = Circle;
Two.Ellipse = Ellipse;
Two.Line = Line;
Two.Polygon = Polygon;
Two.RoundedRectangle = RoundedRectangle;
Two.Star = Star;
Two.ArcSegment = ArcSegment;
Two.Points = Points;
Two.Anchor = Anchor;
Two.Texture = Texture;
Two.Gradient = Gradient;
Two.Stop = Stop;
Two.LinearGradient = LinearGradient;
Two.RadialGradient = RadialGradient;
Two.Sprite = Sprite;
Two.ImageSequence = ImageSequence;
Two.Text = Text;
Two.SVGRenderer = SVGRenderer;
Two.CanvasRenderer = CanvasRenderer;
Two.WebGLRenderer = WebGLRenderer;
Two.Registry = Registry;

// Mock methods
Two.prototype.appendTo = jest.fn(function(this: any) { return this; });
Two.prototype.play = jest.fn(function(this: any) { this.playing = true; return this; });
Two.prototype.pause = jest.fn(function(this: any) { this.playing = false; return this; });
Two.prototype.update = jest.fn(function(this: any) { return this; });
Two.prototype.render = jest.fn(function(this: any) { return this; });
Two.prototype.add = jest.fn(function(this: any) { return this; });
Two.prototype.remove = jest.fn(function(this: any) { return this; });
Two.prototype.clear = jest.fn(function(this: any) { return this; });
Two.prototype.makeLine = jest.fn(() => new Line());
Two.prototype.makeRectangle = jest.fn(() => new Rectangle());
Two.prototype.makeCircle = jest.fn(() => new Circle());
Two.prototype.makeEllipse = jest.fn(() => new Ellipse());
Two.prototype.makePath = jest.fn(() => new Path());
Two.prototype.makeGroup = jest.fn(() => new Group());
Two.prototype.makeText = jest.fn(() => new Text());
Two.prototype.makeLinearGradient = jest.fn(() => new LinearGradient());
Two.prototype.makeRadialGradient = jest.fn(() => new RadialGradient());
Two.prototype.makeTexture = jest.fn(() => new Texture());

// Export the mock Two and class types
export default Two;
export type { Vector, Matrix, Shape, Group, Path, Rectangle, Circle, Ellipse, Line, Polygon, 
  RoundedRectangle, Star, ArcSegment, Points, Anchor, Texture, Gradient, Stop, 
  LinearGradient, RadialGradient, Sprite, ImageSequence, Text, SVGRenderer, 
  CanvasRenderer, WebGLRenderer, Registry, TwoError, Events, Element };

// Also export a BoundingBox type for testing
export type BoundingBox = {
  top: number;
  left: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
};