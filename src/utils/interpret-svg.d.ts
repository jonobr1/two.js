declare module 'two.js/src/utils/interpret-svg' {
  /**
   * @name Two.Utils.read
   * @property {Object} read - A map of functions to read any number of SVG node types and create Two.js equivalents of them. Primarily used by the {@link Two#interpret} method.
   */
  export const read: {
    svg: (node: any) => any;
    defs: (node: any) => any;
    use: (node: any, styles: any) => any;
    g: (node: any, parentStyles: any) => Group;
    polygon: (node: any, parentStyles: any) => Path;
    polyline: (node: any, parentStyles: any) => any;
    path: (node: any, parentStyles: any) => Path;
    circle: (node: any, parentStyles: any) => Circle;
    ellipse: (node: any, parentStyles: any) => Ellipse;
    rect: (node: any, parentStyles: any) => Rectangle | RoundedRectangle;
    'rounded-rect': (node: any, parentStyles: any) => RoundedRectangle;
    line: (node: any, parentStyles: any) => Line;
    lineargradient: (node: any, parentStyles: any) => LinearGradient;
    radialgradient: (node: any, parentStyles: any) => RadialGradient;
    text: (node: any, parentStyles: any) => Text;
    clippath: (node: any, parentStyles: any) => any;
    image: (node: any, parentStyles: any) => Sprite;
  };
  import { Group } from 'two.js/src/group';
  import { Path } from 'two.js/src/path';
  import { Circle } from 'two.js/src/shapes/circle';
  import { Ellipse } from 'two.js/src/shapes/ellipse';
  import { Rectangle } from 'two.js/src/shapes/rectangle';
  import { RoundedRectangle } from 'two.js/src/shapes/rounded-rectangle';
  import { Line } from 'two.js/src/shapes/line';
  import { LinearGradient } from 'two.js/src/effects/linear-gradient';
  import { RadialGradient } from 'two.js/src/effects/radial-gradient';
  import { Text } from 'two.js/src/text';
  import { Sprite } from 'two.js/src/effects/sprite';
}
