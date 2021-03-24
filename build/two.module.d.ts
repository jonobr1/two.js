declare module "utils/path-commands" {
    export default Commands;
    namespace Commands {
        const move: string;
        const line: string;
        const curve: string;
        const arc: string;
        const close: string;
    }
}
declare module "utils/root" {
    export default root;
    var root: any;
}
declare module "utils/underscore" {
    export default _;
    namespace _ {
        function isNaN(obj: any): boolean;
        function isElement(obj: any): boolean;
        function isObject(obj: any): boolean;
        function extend(base: any, ...args: any[]): any;
        function defaults(base: any, ...args: any[]): any;
        function each(obj: any, iteratee: any, context: any): any;
        const performance: any;
    }
}
declare module "events" {
    export default Events;
    namespace Events {
        export { addEventListener as bind };
        export { removeEventListener as unbind };
    }
    /**
     * @returns {Events} - Returns an instance of self for the purpose of chaining.
     */
    function addEventListener(name: any, handler: any): {
        /**
         * @name Utils.Events.on
         * @function
         * @param {String} [name] - The name of the event to bind a function to.
         * @param {Function} [handler] - The function to be invoked when the event is dispatched.
         * @description Call to add a listener to a specific event name.
         */
        on: typeof addEventListener;
        /**
         * @name Utils.Events.off
         * @function
         * @param {String} [name] - The name of the event intended to be removed.
         * @param {Function} [handler] - The handler intended to be reomved.
         * @description Call to remove listeners from a specific event. If only `name` is passed then all the handlers attached to that `name` will be removed. If no arguments are passed then all handlers for every event on the obejct are removed.
         */
        off: typeof removeEventListener;
        /**
         * @name Utils.Events.trigger
         * @function
         * @param {String} name - The name of the event to dispatch.
         * @param arguments - Anything can be passed after the name and those will be passed on to handlers attached to the event in the order they are passed.
         * @description Call to trigger a custom event. Any additional arguments passed after the name will be passed along to the attached handlers.
         */
        trigger: (name: string, ...args: any[]) => any;
        listen: (obj: any, name: any, handler: any) => any;
        ignore: (obj: any, name: any, handler: any) => any;
        Types: {
            play: string;
            pause: string;
            update: string;
            render: string;
            resize: string;
            change: string;
            remove: string;
            insert: string;
            order: string;
            load: string;
        };
    };
    class addEventListener {
        /**
         * @returns {Events} - Returns an instance of self for the purpose of chaining.
         */
        constructor(name: any, handler: any);
        _events: {};
    }
    /**
     * @returns {Events} - Returns an instance of self for the purpose of chaining.
     */
    function removeEventListener(name: any, handler: any): {
        /**
         * @name Utils.Events.on
         * @function
         * @param {String} [name] - The name of the event to bind a function to.
         * @param {Function} [handler] - The function to be invoked when the event is dispatched.
         * @description Call to add a listener to a specific event name.
         */
        on: typeof addEventListener;
        /**
         * @name Utils.Events.off
         * @function
         * @param {String} [name] - The name of the event intended to be removed.
         * @param {Function} [handler] - The handler intended to be reomved.
         * @description Call to remove listeners from a specific event. If only `name` is passed then all the handlers attached to that `name` will be removed. If no arguments are passed then all handlers for every event on the obejct are removed.
         */
        off: typeof removeEventListener;
        /**
         * @name Utils.Events.trigger
         * @function
         * @param {String} name - The name of the event to dispatch.
         * @param arguments - Anything can be passed after the name and those will be passed on to handlers attached to the event in the order they are passed.
         * @description Call to trigger a custom event. Any additional arguments passed after the name will be passed along to the attached handlers.
         */
        trigger: (name: string, ...args: any[]) => any;
        listen: (obj: any, name: any, handler: any) => any;
        ignore: (obj: any, name: any, handler: any) => any;
        Types: {
            play: string;
            pause: string;
            update: string;
            render: string;
            resize: string;
            change: string;
            remove: string;
            insert: string;
            order: string;
            load: string;
        };
    };
}
declare module "vector" {
    export default Vector;
    /**
     * @name Two.Vector
     * @class
     * @param {Number} [x=0] - Any number to represent the horizontal x-component of the vector.
     * @param {Number} [y=0] - Any number to represent the vertical y-component of the vector.
     * @description A class to store x / y component vector data. In addition to storing data `Two.Vector` has suped up methods for commonplace mathematical operations.
     */
    function Vector(x?: number, y?: number): void;
    class Vector {
        /**
         * @name Two.Vector
         * @class
         * @param {Number} [x=0] - Any number to represent the horizontal x-component of the vector.
         * @param {Number} [y=0] - Any number to represent the vertical y-component of the vector.
         * @description A class to store x / y component vector data. In addition to storing data `Two.Vector` has suped up methods for commonplace mathematical operations.
         */
        constructor(x?: number, y?: number);
        /**
         * @name Two.Vector#x
         * @property {Number} - The horizontal x-component of the vector.
         */
        x: number;
        /**
         * @name Two.Vector#y
         * @property {Number} - The vertical y-component of the vector.
         */
        y: number;
    }
}
declare module "anchor" {
    export default Anchor;
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
    function Anchor(x?: number, y?: number, lx?: number, ly?: number, rx?: number, ry?: number, command?: string): void;
    class Anchor {
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
        constructor(x?: number, y?: number, lx?: number, ly?: number, rx?: number, ry?: number, command?: string);
        _broadcast: any;
        _command: string;
        _relative: boolean;
    }
}
declare module "collection" {
    export default Collection;
    /**
     * @name Utils.Collection
     * @class
     * @extends Utils.Events
     * @description An `Array` like object with additional event propagation on actions. `pop`, `shift`, and `splice` trigger `removed` events. `push`, `unshift`, and `splice` with more than 2 arguments trigger 'inserted'. Finally, `sort` and `reverse` trigger `order` events.
     */
    function Collection(...args: any[]): void;
    class Collection {
        /**
         * @name Utils.Collection
         * @class
         * @extends Utils.Events
         * @description An `Array` like object with additional event propagation on actions. `pop`, `shift`, and `splice` trigger `removed` events. `push`, `unshift`, and `splice` with more than 2 arguments trigger 'inserted'. Finally, `sort` and `reverse` trigger `order` events.
         */
        constructor(...args: any[]);
    }
}
declare module "children" {
    export default Children;
    /**
     * @class
     * @name Two.Group.Children
     * @extends Two.Utils.Collection
     * @description A children collection which is accesible both by index and by object `id`.
     */
    function Children(...args: any[]): void;
    class Children {
        /**
         * @class
         * @name Two.Group.Children
         * @extends Two.Utils.Collection
         * @description A children collection which is accesible both by index and by object `id`.
         */
        constructor(...args: any[]);
        /**
         * @name Two.Group.Children#ids
         * @property {Object} - Map of all elements in the list keyed by `id`s.
         */
        ids: {};
    }
}
declare module "constants" {
    export default Constants;
    namespace Constants {
        const nextFrameID: any;
        namespace Types {
            const webgl: string;
            const svg: string;
            const canvas: string;
        }
        const Version: string;
        const PublishDate: string;
        const Identifier: string;
        const Resolution: number;
        const AutoCalculateImportedMatrices: boolean;
        const Instances: any[];
        function uniqueId(): number;
    }
}
declare module "utils/math" {
    /**
     * @name Utils.decomposeMatrix
     * @function
     * @param {Two.Matrix} matrix - The matrix to decompose.
     * @returns {Object} An object containing relevant skew values.
     * @description Decompose a 2D 3x3 Matrix to find the skew.
     */
    export function decomposeMatrix(matrix: any): any;
    /**
     * @name Utils.getComputedMatrix
     * @function
     * @param {Two.Shape} object - The Two.js object that has a matrix property to calculate from.
     * @param {Two.Matrix} [matrix] - The matrix to apply calculated transformations to if available.
     * @returns {Two.Matrix} The computed matrix of a nested object. If no `matrix` was passed in arguments then a `new Two.Matrix` is returned.
     * @description Method to get the world space transformation of a given object in a Two.js scene.
     */
    export function getComputedMatrix(object: any, matrix?: any): any;
    export function setMatrix(M: any): void;
    /**
     * @name Utils.lerp
     * @function
     * @param {Number} a - Start value.
     * @param {Number} b - End value.
     * @param {Number} t - Zero-to-one value describing percentage between a and b.
     * @returns {Number}
     * @description Linear interpolation between two values `a` and `b` by an amount `t`.
     */
    export function lerp(a: number, b: number, t: number): number;
    /**
     * @name Utils.mod
     * @param {Number} v - The value to modulo
     * @param {Number} l - The value to modulo by
     * @returns {Number}
     * @description Modulo with added functionality to handle negative values in a positive manner.
     */
    export function mod(v: number, l: number): number;
    export var NumArray: any;
    /**
    * @name Utils.toFixed
    * @function
    * @param {Number} v - Any float
    * @returns {Number} That float trimmed to the third decimal place.
    * @description A pretty fast toFixed(3) alternative.
    * @see {@link http://jsperf.com/parsefloat-tofixed-vs-math-round/18}
    */
    export function toFixed(v: number): number;
}
declare module "matrix" {
    export default Matrix;
    /**
     * @name Two.Matrix
     * @class
     * @param {Number} [a=1] - The value for element at the first column and first row.
     * @param {Number} [b=0] - The value for element at the second column and first row.
     * @param {Number} [c=0] - The value for element at the third column and first row.
     * @param {Number} [d=0] - The value for element at the first column and second row.
     * @param {Number} [e=1] - The value for element at the second column and second row.
     * @param {Number} [f=0] - The value for element at the third column and second row.
     * @param {Number} [g=0] - The value for element at the first column and third row.
     * @param {Number} [h=0] - The value for element at the second column and third row.
     * @param {Number} [i=1] - The value for element at the third column and third row.
     * @description A class to store 3 x 3 transformation matrix information. In addition to storing data `Two.Matrix` has suped up methods for commonplace mathematical operations.
     * @nota-bene Order is based on how to construct transformation strings for the browser.
     */
    function Matrix(a?: number, b?: number, c?: number, d?: number, e?: number, f?: number, ...args: any[]): void;
    class Matrix {
        /**
         * @name Two.Matrix
         * @class
         * @param {Number} [a=1] - The value for element at the first column and first row.
         * @param {Number} [b=0] - The value for element at the second column and first row.
         * @param {Number} [c=0] - The value for element at the third column and first row.
         * @param {Number} [d=0] - The value for element at the first column and second row.
         * @param {Number} [e=1] - The value for element at the second column and second row.
         * @param {Number} [f=0] - The value for element at the third column and second row.
         * @param {Number} [g=0] - The value for element at the first column and third row.
         * @param {Number} [h=0] - The value for element at the second column and third row.
         * @param {Number} [i=1] - The value for element at the third column and third row.
         * @description A class to store 3 x 3 transformation matrix information. In addition to storing data `Two.Matrix` has suped up methods for commonplace mathematical operations.
         * @nota-bene Order is based on how to construct transformation strings for the browser.
         */
        constructor(a?: number, b?: number, c?: number, d?: number, e?: number, f?: number, ...args: any[]);
        /**
         * @name Two.Matrix#elements
         * @property {Number[]} - The underlying data stored as an array.
         */
        elements: any;
    }
}
declare module "shape" {
    export default Shape;
    /**
     * @name Two.Shape
     * @class
     * @extends Events
     * @description The foundational transformation object for the Two.js scenegraph.
     */
    function Shape(): void;
    class Shape {
        /**
         * @name Two.Shape#_renderer
         * @property {Object}
         * @private
         * @description A private object to store relevant renderer specific variables.
         * @nota-bene With the {@link Two.SvgRenderer} you can access the underlying SVG element created via `shape._renderer.elem`.
         */
        private _renderer;
        isShape: boolean;
        /**
         * @name Two.Shape#id
         * @property {String} - Session specific unique identifier.
         * @nota-bene In the {@link Two.SvgRenderer} change this to change the underlying SVG element's id too.
         */
        id: string;
        /**
         * @name Two.Shape#classList
         * @property {String[]}
         * @description A list of class strings stored if imported / interpreted  from an SVG element.
         */
        classList: any[];
        /**
         * @name Two.Shape#matrix
         * @property {Two.Matrix}
         * @description The transformation matrix of the shape.
         * @nota-bene {@link Two.Shape#translation}, {@link Two.Shape#rotation}, and {@link Two.Shape#scale} apply their values to the matrix when changed. The matrix is what is sent to the renderer to be drawn.
         */
        matrix: Matrix;
        /**
         * @name Two.Shape#translation
         * @property {Two.Vector} - The x and y value for where the shape is placed relative to its parent.
         */
        translation: Vector;
        /**
         * @name Two.Shape#rotation
         * @property {Radians} - The value in radians for how much the shape is rotated relative to its parent.
         */
        rotation: number;
        /**
         * @name Two.Shape#scale
         * @property {Number} - The value for how much the shape is scaled relative to its parent.
         * @nota-bene This value can be replaced with a {@link Two.Vector} to do non-uniform scaling. e.g: `shape.scale = new Two.Vector(2, 1);`
         */
        scale: number;
    }
    import Matrix from "matrix";
    import Vector from "vector";
}
declare module "group" {
    export default Group;
    /**
     * @name Two.Group
     * @class
     * @extends Two.Shape
     * @param {Two.Shape[]} [children] - A list of objects that inherit {@link Two.Shape}. For instance, the array could be a {@link Two.Path}, {@link Two.Text}, and {@link Two.RoundedRectangle}.
     * @description This is the primary class for grouping objects that are then drawn in Two.js. In Illustrator this is a group, in After Effects it would be a Null Object. Whichever the case, the `Two.Group` contains a transformation matrix and commands to style its children, but it by itself doesn't render to the screen.
     * @nota-bene The {@link Two#scene} is an instance of `Two.Group`.
     */
    function Group(children?: any[], ...args: any[]): void;
    class Group {
        /**
         * @name Two.Group
         * @class
         * @extends Two.Shape
         * @param {Two.Shape[]} [children] - A list of objects that inherit {@link Two.Shape}. For instance, the array could be a {@link Two.Path}, {@link Two.Text}, and {@link Two.RoundedRectangle}.
         * @description This is the primary class for grouping objects that are then drawn in Two.js. In Illustrator this is a group, in After Effects it would be a Null Object. Whichever the case, the `Two.Group` contains a transformation matrix and commands to style its children, but it by itself doesn't render to the screen.
         * @nota-bene The {@link Two#scene} is an instance of `Two.Group`.
         */
        constructor(children?: any[], ...args: any[]);
        /**
         * @name Two.Group#additions
         * @property {Two.Shape[]}
         * @description An automatically updated list of children that need to be appended to the renderer's scenegraph.
         */
        additions: any[];
        /**
         * @name Two.Group#subtractions
         * @property {Two.Shape[]}
         * @description An automatically updated list of children that need to be removed from the renderer's scenegraph.
         */
        subtractions: any[];
        /**
         * @name Two.Group#additions
         * @property {Two.Group.Children}
         * @description A list of all the children in the scenegraph.
         * @nota-bene Ther order of this list indicates the order each element is rendered to the screen.
         */
        children: any;
    }
}
declare module "utils/curves" {
    export namespace Curve {
        const CollinearityEpsilon: number;
        const RecursionLimit: number;
        const CuspLimit: number;
        namespace Tolerance {
            const distance: number;
            const angle: number;
            const epsilon: number;
        }
        const abscissas: number[][];
        const weights: number[][];
    }
    /**
     * @name Utils.getComponentOnCubicBezier
     * @function
     * @param {Number} t - Zero-to-one value describing what percentage to calculate.
     * @param {Number} a - The firt point's component value.
     * @param {Number} b - The first point's bezier component value.
     * @param {Number} c - The second point's bezier component value.
     * @param {Number} d - The second point's component value.
     * @returns {Number} The coordinate value for a specific component along a cubic bezier curve by `t`.
     */
    export function getComponentOnCubicBezier(t: number, a: number, b: number, c: number, d: number): number;
    /**
     * @name Utils.subdivide
     * @function
     * @param {Number} x1 - x position of first anchor point.
     * @param {Number} y1 - y position of first anchor point.
     * @param {Number} x2 - x position of first anchor point's "right" bezier handle.
     * @param {Number} y2 - y position of first anchor point's "right" bezier handle.
     * @param {Number} x3 - x position of second anchor point's "left" bezier handle.
     * @param {Number} y3 - y position of second anchor point's "left" bezier handle.
     * @param {Number} x4 - x position of second anchor point.
     * @param {Number} y4 - y position of second anchor point.
     * @param {Number} [limit=Utils.Curve.RecursionLimit] - The amount of vertices to create by subdividing.
     * @returns {Anchor[]} A list of anchor points ordered in between `x1`, `y1` and `x4`, `y4`
     * @description Given 2 points (a, b) and corresponding control point for each return an array of points that represent points plotted along the curve. The number of returned points is determined by `limit`.
     */
    export function subdivide(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, limit?: number): Anchor[];
    /**
     * @name Utils.getCurveLength
     * @function
     * @param {Number} x1 - x position of first anchor point.
     * @param {Number} y1 - y position of first anchor point.
     * @param {Number} x2 - x position of first anchor point's "right" bezier handle.
     * @param {Number} y2 - y position of first anchor point's "right" bezier handle.
     * @param {Number} x3 - x position of second anchor point's "left" bezier handle.
     * @param {Number} y3 - y position of second anchor point's "left" bezier handle.
     * @param {Number} x4 - x position of second anchor point.
     * @param {Number} y4 - y position of second anchor point.
     * @param {Number} [limit=Utils.Curve.RecursionLimit] - The amount of vertices to create by subdividing.
     * @returns {Number} The length of a curve.
     * @description Given 2 points (a, b) and corresponding control point for each, return a float that represents the length of the curve using Gauss-Legendre algorithm. Limit iterations of calculation by `limit`.
     */
    export function getCurveLength(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, limit?: number): number;
    /**
     * @name Utils.getCurveBoundingBox
     * @function
     * @param {Number} x1 - x position of first anchor point.
     * @param {Number} y1 - y position of first anchor point.
     * @param {Number} x2 - x position of first anchor point's "right" bezier handle.
     * @param {Number} y2 - y position of first anchor point's "right" bezier handle.
     * @param {Number} x3 - x position of second anchor point's "left" bezier handle.
     * @param {Number} y3 - y position of second anchor point's "left" bezier handle.
     * @param {Number} x4 - x position of second anchor point.
     * @param {Number} y4 - y position of second anchor point.
     * @returns {Object} Object contains min and max `x` / `y` bounds.
     * @see {@link https://github.com/adobe-webplatform/Snap.svg/blob/master/src/path.js#L856}
     */
    export function getCurveBoundingBox(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): any;
    /**
     * @name Utils.integrate
     * @function
     * @param {Function} f
     * @param {Number} a
     * @param {Number} b
     * @param {Integer} n
     * @description Integration for `getCurveLength` calculations.
     * @see [Paper.js](@link https://github.com/paperjs/paper.js/blob/master/src/util/Numerical.js#L101)
     */
    export function integrate(f: Function, a: number, b: number, n: any): number;
    /**
     * @name Utils.getCurveFromPoints
     * @function
     * @param {Anchor[]} points
     * @param {Boolean} closed
     * @description Sets the bezier handles on {@link Anchor}s in the `points` list with estimated values to create a catmull-rom like curve. Used by {@link Two.Path#plot}.
     */
    export function getCurveFromPoints(points: Anchor[], closed: boolean): void;
    /**
     * @name Utils.getControlPoints
     * @function
     * @param {Anchor} a
     * @param {Anchor} b
     * @param {Anchor} c
     * @returns {Anchor} Returns the passed middle point `b`.
     * @description Given three coordinates set the control points for the middle, b, vertex based on its position with the adjacent points.
     */
    export function getControlPoints(a: Anchor, b: Anchor, c: Anchor): Anchor;
    /**
     * @name Utils.getReflection
     * @function
     * @param {Vector} a
     * @param {Vector} b
     * @param {Boolean} [relative=false]
     * @returns {Vector} New {@link Vector} that represents the reflection point.
     * @description Get the reflection of a point `b` about point `a`. Where `a` is in absolute space and `b` is relative to `a`.
     * @see {@link http://www.w3.org/TR/SVG11/implnote.html#PathElementImplementationNotes}
     */
    export function getReflection(a: Vector, b: Vector, relative?: boolean): Vector;
    /**
     * @name Utils.getAnchorsFromArcData
     * @function
     * @param {Vector} center
     * @param {Radians} xAxisRotation
     * @param {Number} rx - x radius
     * @param {Number} ry - y radius
     * @param {Radians} ts
     * @param {Radians} td
     * @param {Boolean} [ccw=false] - Set path traversal to counter-clockwise
     */
    export function getAnchorsFromArcData(center: Vector, xAxisRotation: any, rx: number, ry: number, ts: any, td: any, ccw?: boolean): void;
    import Anchor from "anchor";
    import Vector from "vector";
}
declare module "utils/get-set" {
    export default defineGetterSetter;
    /**
     * @name Utils.defineGetterSetter
     * @function
     * @this Two#
     * @param {String} property - The property to add an enumerable getter / setter to.
     * @description Convenience function to setup the flag based getter / setter that most properties are defined as in Two.js.
     */
    function defineGetterSetter(property: string): void;
}
declare module "effects/stop" {
    export default Stop;
    /**
     * @name Two.Stop
     * @class
     * @param {Number} [offset] - The offset percentage of the stop represented as a zero-to-one value. Default value flip flops from zero-to-one as new stops are created.
     * @param {CssColor} [color] - The color of the stop. Default value flip flops from white to black as new stops are created.
     * @param {Number} [opacity] - The opacity value. Default value is 1, cannot be lower than 0.
     * @nota-bene Used specifically in conjunction with {@link Two.Gradient}s to control color graduation.
     */
    function Stop(offset?: number, color?: any, opacity?: number): void;
    class Stop {
        /**
         * @name Two.Stop
         * @class
         * @param {Number} [offset] - The offset percentage of the stop represented as a zero-to-one value. Default value flip flops from zero-to-one as new stops are created.
         * @param {CssColor} [color] - The color of the stop. Default value flip flops from white to black as new stops are created.
         * @param {Number} [opacity] - The opacity value. Default value is 1, cannot be lower than 0.
         * @nota-bene Used specifically in conjunction with {@link Two.Gradient}s to control color graduation.
         */
        constructor(offset?: number, color?: any, opacity?: number);
        /**
         * @name Two.Stop#_renderer
         * @property {Object}
         * @private
         * @description A private object to store relevant renderer specific variables.
         * @nota-bene With the {@link Two.SvgRenderer} you can access the underlying SVG element created via `stop._renderer.elem`.
         */
        private _renderer;
        /**
         * @name Two.Stop#offset
         * @property {Number} - The offset percentage of the stop represented as a zero-to-one value.
         */
        offset: number;
        /**
         * @name Two.Stop#opacity
         * @property {Number} - The alpha percentage of the stop represented as a zero-to-one value.
         */
        opacity: number;
        /**
         * @name Two.Stop#color
         * @property {CssColor} - The color of the stop.
         */
        color: string;
    }
}
declare module "effects/gradient" {
    export default Gradient;
    /**
     * @name Two.Gradient
     * @class
     * @param {Two.Stop[]} [stops] - A list of {@link Two.Stop}s that contain the gradient fill pattern for the gradient.
     * @description This is the base class for constructing different types of gradients with Two.js. The two common gradients are {@link Two.LinearGradient} and {@link Two.RadialGradient}.
     */
    function Gradient(stops?: any[]): void;
    class Gradient {
        /**
         * @name Two.Gradient
         * @class
         * @param {Two.Stop[]} [stops] - A list of {@link Two.Stop}s that contain the gradient fill pattern for the gradient.
         * @description This is the base class for constructing different types of gradients with Two.js. The two common gradients are {@link Two.LinearGradient} and {@link Two.RadialGradient}.
         */
        constructor(stops?: any[]);
        /**
         * @name Two.Gradient#_renderer
         * @property {Object}
         * @private
         * @description A private object to store relevant renderer specific variables.
         * @nota-bene With the {@link Two.SvgRenderer} you can access the underlying SVG element created via `gradient._renderer.elem`.
         */
        private _renderer;
        /**
         * @name Two.Gradient#id
         * @property {String} - Session specific unique identifier.
         * @nota-bene In the {@link Two.SvgRenderer} change this to change the underlying SVG element's id too.
         */
        id: string;
        classList: any[];
        /**
         * @name Two.Gradient#spread
         * @property {String} - Indicates what happens if the gradient starts or ends inside the bounds of the target rectangle. Possible values are `'pad'`, `'reflect'`, and `'repeat'`.
         * @see {@link https://www.w3.org/TR/SVG11/pservers.html#LinearGradientElementSpreadMethodAttribute} for more information
         */
        spread: string;
        stops: any[];
    }
}
declare module "effects/linear-gradient" {
    export default LinearGradient;
    /**
     * @name Two.LinearGradient
     * @class
     * @extends Two.Gradient
     * @param {Number} [x1=0] - The x position of the first end point of the linear gradient.
     * @param {Number} [y1=0] - The y position of the first end point of the linear gradient.
     * @param {Number} [x2=0] - The x position of the second end point of the linear gradient.
     * @param {Number} [y2=0] - The y position of the second end point of the linear gradient.
     * @param {Two.Stop[]} [stops] - A list of {@link Two.Stop}s that contain the gradient fill pattern for the gradient.
     * @nota-bene The linear gradient lives within the space of the parent object's matrix space.
     */
    function LinearGradient(x1?: number, y1?: number, x2?: number, y2?: number, stops?: any[]): void;
    class LinearGradient {
        /**
         * @name Two.LinearGradient
         * @class
         * @extends Two.Gradient
         * @param {Number} [x1=0] - The x position of the first end point of the linear gradient.
         * @param {Number} [y1=0] - The y position of the first end point of the linear gradient.
         * @param {Number} [x2=0] - The x position of the second end point of the linear gradient.
         * @param {Number} [y2=0] - The y position of the second end point of the linear gradient.
         * @param {Two.Stop[]} [stops] - A list of {@link Two.Stop}s that contain the gradient fill pattern for the gradient.
         * @nota-bene The linear gradient lives within the space of the parent object's matrix space.
         */
        constructor(x1?: number, y1?: number, x2?: number, y2?: number, stops?: any[]);
        /**
         * @name Two.LinearGradient#left
         * @property {Two.Vector} - The x and y value for where the first end point is placed on the canvas.
         */
        left: any;
        /**
         * @name Two.LinearGradient#right
         * @property {Two.Vector} - The x and y value for where the second end point is placed on the canvas.
         */
        right: any;
    }
}
declare module "effects/radial-gradient" {
    export default RadialGradient;
    /**
     * @name Two.RadialGradient
     * @class
     * @extends Two.Gradient
     * @param {Number} [x=0] - The x position of the origin of the radial gradient.
     * @param {Number} [y=0] - The y position of the origin of the radial gradient.
     * @param {Number} [radius=0] - The radius of the radial gradient.
     * @param {Two.Stop[]} stops - A list of {@link Two.Stop}s that contain the gradient fill pattern for the gradient.
     * @param {Number} [focalX=0] - The x position of the focal point on the radial gradient.
     * @param {Number} [focalY=0] - The y position of the focal point on the radial gradient.
     * @nota-bene The radial gradient lives within the space of the parent object's matrix space.
     */
    function RadialGradient(cx: any, cy: any, r: any, stops: any[], fx: any, fy: any): void;
    class RadialGradient {
        /**
         * @name Two.RadialGradient
         * @class
         * @extends Two.Gradient
         * @param {Number} [x=0] - The x position of the origin of the radial gradient.
         * @param {Number} [y=0] - The y position of the origin of the radial gradient.
         * @param {Number} [radius=0] - The radius of the radial gradient.
         * @param {Two.Stop[]} stops - A list of {@link Two.Stop}s that contain the gradient fill pattern for the gradient.
         * @param {Number} [focalX=0] - The x position of the focal point on the radial gradient.
         * @param {Number} [focalY=0] - The y position of the focal point on the radial gradient.
         * @nota-bene The radial gradient lives within the space of the parent object's matrix space.
         */
        constructor(cx: any, cy: any, r: any, stops: any[], fx: any, fy: any);
        /**
         * @name Two.RadialGradient#center
         * @property {Two.Vector} - The x and y value for where the origin of the radial gradient is.
         */
        center: any;
        radius: number;
        /**
         * @name Two.RadialGradient#focal
         * @property {Two.Vector} - The x and y value for where the focal point of the radial gradient is.
         * @nota-bene This effects the spray or spread of the radial gradient.
         */
        focal: any;
    }
}
declare module "utils/error" {
    export default TwoError;
    /**
     * @name Utils.Error
     * @class
     * @description Custom error throwing for Two.js specific identification.
     */
    function TwoError(message: any): void;
    class TwoError {
        /**
         * @name Utils.Error
         * @class
         * @description Custom error throwing for Two.js specific identification.
         */
        constructor(message: any);
        name: string;
        message: any;
    }
}
declare module "utils/get-ratio" {
    export default getRatio;
    /**
     * @name Utils.getRatio
     * @function
     * @param {CanvasRenderingContext2D} ctx
     * @returns {Number} The ratio of a unit in Two.js to the pixel density of a session's screen.
     * @see [High DPI Rendering](http://www.html5rocks.com/en/tutorials/canvas/hidpi/)
     */
    function getRatio(ctx: CanvasRenderingContext2D): number;
}
declare module "renderers/canvas" {
    export default Renderer;
    /**
     * @name Two.CanvasRenderer
     * @class
     * @extends Two.Events
     * @param {Object} [parameters] - This object is inherited when constructing a new instance of {@link Two}.
     * @param {Element} [parameters.domElement] - The `<canvas />` to draw to. If none given a new one will be constructed.
     * @param {Boolean} [parameters.overdraw] - Determines whether the canvas should clear the background or not. Defaults to `true`.
     * @param {Boolean} [parameters.smoothing=true] - Determines whether the canvas should antialias drawing. Set it to `false` when working with pixel art. `false` can lead to better performance, since it would use a cheaper interpolation algorithm.
     * @description This class is used by {@link Two} when constructing with `type` of `Two.Types.canvas`. It takes Two.js' scenegraph and renders it to a `<canvas />`.
     */
    function Renderer(params: any): void;
    class Renderer {
        /**
         * @name Two.CanvasRenderer
         * @class
         * @extends Two.Events
         * @param {Object} [parameters] - This object is inherited when constructing a new instance of {@link Two}.
         * @param {Element} [parameters.domElement] - The `<canvas />` to draw to. If none given a new one will be constructed.
         * @param {Boolean} [parameters.overdraw] - Determines whether the canvas should clear the background or not. Defaults to `true`.
         * @param {Boolean} [parameters.smoothing=true] - Determines whether the canvas should antialias drawing. Set it to `false` when working with pixel art. `false` can lead to better performance, since it would use a cheaper interpolation algorithm.
         * @description This class is used by {@link Two} when constructing with `type` of `Two.Types.canvas`. It takes Two.js' scenegraph and renders it to a `<canvas />`.
         */
        constructor(params: any);
        /**
         * @name Two.CanvasRenderer#domElement
         * @property {Element} - The `<canvas />` associated with the Two.js scene.
         */
        domElement: any;
        /**
         * @name Two.CanvasRenderer#ctx
         * @property {Canvas2DContext} - Associated two dimensional context to render on the `<canvas />`.
         */
        ctx: any;
        /**
         * @name Two.CanvasRenderer#overdraw
         * @property {Boolean} - Determines whether the canvas clears the background each draw call.
         * @default true
         */
        overdraw: any;
        /**
         * @name Two.CanvasRenderer#scene
         * @property {Two.Group} - The root group of the scenegraph.
         */
        scene: Group;
    }
    import Group from "group";
}
declare module "utils/canvas-shim" {
    export default CanvasShim;
    namespace CanvasShim {
        const Image: any;
        const isHeadless: boolean;
        function shim(canvas: any, Image?: new (width?: number, height?: number) => HTMLImageElement): any;
    }
}
declare module "registry" {
    export default Registry;
    /**
     * @name Two.Registry
     * @class
     * @description An arbitrary class to manage a directory of things. Mainly used for keeping tabs of textures in Two.js.
     */
    function Registry(): void;
    class Registry {
        map: {};
    }
}
declare module "effects/texture" {
    export default Texture;
    /**
     * @name Two.Texture
     * @class
     * @extends Two.Shape
     * @param {String|ImageElement} [src] - The URL path to an image file or an `<img />` element.
     * @param {Function} [callback] - An optional callback function once the image has been loaded.
     * @description Fundamental to work with bitmap data, a.k.a. pregenerated imagery, in Two.js. Supported formats include jpg, png, gif, and tiff. See {@link Two.Texture.RegularExpressions} for a full list of supported formats.
     */
    function Texture(src?: string | any, callback?: Function): void;
    class Texture {
        /**
         * @name Two.Texture
         * @class
         * @extends Two.Shape
         * @param {String|ImageElement} [src] - The URL path to an image file or an `<img />` element.
         * @param {Function} [callback] - An optional callback function once the image has been loaded.
         * @description Fundamental to work with bitmap data, a.k.a. pregenerated imagery, in Two.js. Supported formats include jpg, png, gif, and tiff. See {@link Two.Texture.RegularExpressions} for a full list of supported formats.
         */
        constructor(src?: string | any, callback?: Function);
        _renderer: {};
        id: string;
        classList: any[];
        /**
         * @name Two.Texture#loaded
         * @property {Boolean} - Shorthand value to determine if image has been loaded into the texture.
         */
        loaded: boolean;
        /**
         * @name Two.Texture#repeat
         * @property {String} - CSS style declaration to tile {@link Two.Path}. Valid values include: `'no-repeat'`, `'repeat'`, `'repeat-x'`, `'repeat-y'`.
         * @see {@link https://www.w3.org/TR/2dcontext/#dom-context-2d-createpattern}
         */
        repeat: string;
        /**
         * @name Two.Texture#offset
         * @property {Two.Vector} - A two-component vector describing any pixel offset of the texture when applied to a {@link Two.Path}.
         */
        offset: Vector;
        src: string;
        /**
         * @name Two.Texture#image
         * @property {Element} - The corresponding DOM Element of the texture. Can be a `<img />`, `<canvas />`, or `<video />` element. See {@link Two.Texture.RegularExpressions} for a full list of supported elements.
         * @nota-bene In headless environments this is a `Canvas.Image` object. See {@link https://github.com/Automattic/node-canvas} for more information on headless image objects.
         */
        image: any;
    }
    import Vector from "vector";
}
declare module "path" {
    export default Path;
    /**
     * @name Two.Path
     * @class
     * @extends Two.Shape
     * @param {Two.Anchor[]} [vertices] - A list of {@link Two.Anchor}s that represent the order and coordinates to construct the rendered shape.
     * @param {Boolean} [closed=false] - Describes whether the shape is closed or open.
     * @param {Boolean} [curved=false] - Describes whether the shape automatically calculates bezier handles for each vertex.
     * @param {Boolean} [manual=false] - Describes whether the developer controls how vertices are plotted or if Two.js automatically plots coordinates based on closed and curved booleans.
     * @description This is the primary primitive class for creating all drawable shapes in Two.js. Unless specified methods return their instance of `Two.Path` for the purpose of chaining.
     */
    function Path(vertices?: any[], closed?: boolean, curved?: boolean, manual?: boolean): void;
    class Path {
        /**
         * @name Two.Path
         * @class
         * @extends Two.Shape
         * @param {Two.Anchor[]} [vertices] - A list of {@link Two.Anchor}s that represent the order and coordinates to construct the rendered shape.
         * @param {Boolean} [closed=false] - Describes whether the shape is closed or open.
         * @param {Boolean} [curved=false] - Describes whether the shape automatically calculates bezier handles for each vertex.
         * @param {Boolean} [manual=false] - Describes whether the developer controls how vertices are plotted or if Two.js automatically plots coordinates based on closed and curved booleans.
         * @description This is the primary primitive class for creating all drawable shapes in Two.js. Unless specified methods return their instance of `Two.Path` for the purpose of chaining.
         */
        constructor(vertices?: any[], closed?: boolean, curved?: boolean, manual?: boolean);
        /**
         * @name Two.Path#closed
         * @property {Boolean} - Determines whether a final line is drawn between the final point in the `vertices` array and the first point.
         */
        _closed: boolean;
        /**
         * @name Two.Path#curved
         * @property {Boolean} - When the path is `automatic = true` this boolean determines whether the lines between the points are curved or not.
         */
        _curved: boolean;
        /**
         * @name Two.Path#beginning
         * @property {Number} - Number between zero and one to state the beginning of where the path is rendered.
         * @description {@link Two.Path#beginning} is a percentage value that represents at what percentage into the path should the renderer start drawing.
         * @nota-bene This is great for animating in and out stroked paths in conjunction with {@link Two.Path#ending}.
         */
        beginning: number;
        /**
         * @name Two.Path#ending
         * @property {Number} - Number between zero and one to state the ending of where the path is rendered.
         * @description {@link Two.Path#ending} is a percentage value that represents at what percentage into the path should the renderer start drawing.
         * @nota-bene This is great for animating in and out stroked paths in conjunction with {@link Two.Path#beginning}.
         */
        ending: number;
        /**
         * @name Two.Path#fill
         * @property {(CssColor|Two.Gradient|Two.Texture)} - The value of what the path should be filled in with.
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS Colors.
         */
        fill: string;
        /**
         * @name Two.Path#stroke
         * @property {(CssColor|Two.Gradient|Two.Texture)} - The value of what the path should be outlined in with.
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS Colors.
         */
        stroke: string;
        /**
         * @name Two.Path#linewidth
         * @property {Number} - The thickness in pixels of the stroke.
         */
        linewidth: number;
        /**
         * @name Two.Path#opacity
         * @property {Number} - The opaqueness of the path.
         * @nota-bene Can be used in conjunction with CSS Colors that have an alpha value.
         */
        opacity: number;
        /**
         * @name Two.Path#className
         * @property {String} - A class to be applied to the element to be compatible with CSS styling.
         * @nota-bene Only available for the SVG renderer.
         */
        className: string;
        /**
         * @name Two.Path#visible
         * @property {Boolean} - Display the path or not.
         * @nota-bene For {@link Two.CanvasRenderer} and {@link Two.WebGLRenderer} when set to false all updating is disabled improving performance dramatically with many objects in the scene.
         */
        visible: boolean;
        /**
         * @name Two.Path#cap
         * @property {String}
         * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeLinecapProperty}
         */
        cap: string;
        /**
         * @name Two.Path#join
         * @property {String}
         * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeLinejoinProperty}
         */
        join: string;
        /**
         * @name Two.Path#miter
         * @property {String}
         * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeMiterlimitProperty}
         */
        miter: number;
        /**
         * @name Two.Path#vertices
         * @property {Two.Anchor[]} - An ordered list of anchor points for rendering the path.
         * @description A list of {@link Two.Anchor} objects that consist of what form the path takes.
         * @nota-bene The array when manipulating is actually a {@link Two.Utils.Collection}.
         */
        vertices: any[];
        /**
         * @name Two.Path#automatic
         * @property {Boolean} - Determines whether or not Two.js should calculate curves, lines, and commands automatically for you or to let the developer manipulate them for themselves.
         */
        automatic: boolean;
        /**
         * @name Two.Path#dashes
         * @property {Number[]} - Array of numbers. Odd indices represent dash length. Even indices represent dash space.
         * @description A list of numbers that represent the repeated dash length and dash space applied to the stroke of the text.
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray} for more information on the SVG stroke-dasharray attribute.
         */
        dashes: any[];
    }
}
declare module "text" {
    export default Text;
    /**
     * @name Two.Text
     * @class
     * @extends Two.Shape
     * @param {String} [message] - The String to be rendered to the scene.
     * @param {Number} [x=0] - The position in the x direction for the object.
     * @param {Number} [y=0] - The position in the y direction for the object.
     * @param {Object} [styles] - An object where styles are applied. Attribute must exist in Two.Text.Properties.
     * @description This is a primitive class for creating drawable text that can be added to the scenegraph.
     * @returns {Two.Text}
     */
    function Text(message?: string, x?: number, y?: number, styles?: any): any;
    class Text {
        /**
         * @name Two.Text
         * @class
         * @extends Two.Shape
         * @param {String} [message] - The String to be rendered to the scene.
         * @param {Number} [x=0] - The position in the x direction for the object.
         * @param {Number} [y=0] - The position in the y direction for the object.
         * @param {Object} [styles] - An object where styles are applied. Attribute must exist in Two.Text.Properties.
         * @description This is a primitive class for creating drawable text that can be added to the scenegraph.
         * @returns {Two.Text}
         */
        constructor(message?: string, x?: number, y?: number, styles?: any);
        value: string;
        /**
         * @name Two.Text#dashes
         * @property {Number[]} - Array of numbers. Odd indices represent dash length. Even indices represent dash space.
         * @description A list of numbers that represent the repeated dash length and dash space applied to the stroke of the text.
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray} for more information on the SVG stroke-dasharray attribute.
         */
        dashes: any[];
    }
}
declare module "utils/dom" {
    export default dom;
    namespace dom {
        const temp: any;
    }
}
declare module "shapes/circle" {
    export default Circle;
    /**
     * @name Two.Circle
     * @class
     * @extends Two.Path
     * @param {Number} [x=0] - The x position of the circle.
     * @param {Number} [y=0] - The y position of the circle.
     * @param {Number} radius - The radius value of the circle.
     * @param {Number} [resolution=4] - The number of vertices used to construct the circle.
     */
    function Circle(ox: any, oy: any, r: any, resolution?: number): void;
    class Circle {
        /**
         * @name Two.Circle
         * @class
         * @extends Two.Path
         * @param {Number} [x=0] - The x position of the circle.
         * @param {Number} [y=0] - The y position of the circle.
         * @param {Number} radius - The radius value of the circle.
         * @param {Number} [resolution=4] - The number of vertices used to construct the circle.
         */
        constructor(ox: any, oy: any, r: any, resolution?: number);
        /**
         * @name Two.Circle#radius
         * @property {Number} - The size of the radius of the circle.
         */
        radius: any;
    }
}
declare module "shapes/ellipse" {
    export default Ellipse;
    /**
     * @name Two.Ellipse
     * @class
     * @extends Two.Path
     * @param {Number} [x=0] - The x position of the ellipse.
     * @param {Number} [y=0] - The y position of the ellipse.
     * @param {Number} rx - The radius value of the ellipse in the x direction.
     * @param {Number} ry - The radius value of the ellipse in the y direction.
     * @param {Number} [resolution=4] - The number of vertices used to construct the ellipse.
     */
    function Ellipse(ox: any, oy: any, rx: number, ry: number, resolution?: number): void;
    class Ellipse {
        /**
         * @name Two.Ellipse
         * @class
         * @extends Two.Path
         * @param {Number} [x=0] - The x position of the ellipse.
         * @param {Number} [y=0] - The y position of the ellipse.
         * @param {Number} rx - The radius value of the ellipse in the x direction.
         * @param {Number} ry - The radius value of the ellipse in the y direction.
         * @param {Number} [resolution=4] - The number of vertices used to construct the ellipse.
         */
        constructor(ox: any, oy: any, rx: number, ry: number, resolution?: number);
        /**
         * @name Two.Ellipse#width
         * @property {Number} - The width of the ellipse.
         */
        width: number;
        /**
         * @name Two.Ellipse#height
         * @property {Number} - The height of the ellipse.
         */
        height: number;
    }
}
declare module "shapes/line" {
    export default Line;
    /**
     * @name Two.Line
     * @class
     * @extends Two.Path
     * @param {Number} [x1=0] - The x position of the first vertex on the line.
     * @param {Number} [y1=0] - The y position of the first vertex on the line.
     * @param {Number} [x2=0] - The x position of the second vertex on the line.
     * @param {Number} [y2=0] - The y position of the second vertex on the line.
     */
    function Line(x1?: number, y1?: number, x2?: number, y2?: number): void;
    class Line {
        /**
         * @name Two.Line
         * @class
         * @extends Two.Path
         * @param {Number} [x1=0] - The x position of the first vertex on the line.
         * @param {Number} [y1=0] - The y position of the first vertex on the line.
         * @param {Number} [x2=0] - The x position of the second vertex on the line.
         * @param {Number} [y2=0] - The y position of the second vertex on the line.
         */
        constructor(x1?: number, y1?: number, x2?: number, y2?: number);
        automatic: boolean;
    }
}
declare module "shapes/rectangle" {
    export default Rectangle;
    /**
     * @name Two.Rectangle
     * @class
     * @extends Two.Path
     * @param {Number} [x=0] - The x position of the rectangle.
     * @param {Number} [y=0] - The y position of the rectangle.
     * @param {Number} [width] - The width value of the rectangle.
     * @param {Number} [height] - The width value of the rectangle.
     */
    function Rectangle(x?: number, y?: number, width?: number, height?: number): void;
    class Rectangle {
        /**
         * @name Two.Rectangle
         * @class
         * @extends Two.Path
         * @param {Number} [x=0] - The x position of the rectangle.
         * @param {Number} [y=0] - The y position of the rectangle.
         * @param {Number} [width] - The width value of the rectangle.
         * @param {Number} [height] - The width value of the rectangle.
         */
        constructor(x?: number, y?: number, width?: number, height?: number);
        /**
         * @name Two.Rectangle#width
         * @property {Number} - The size of the width of the rectangle.
         */
        width: number;
        /**
         * @name Two.Rectangle#height
         * @property {Number} - The size of the height of the rectangle.
         */
        height: number;
        /**
         * @name Two.Rectangle#origin
         * @property {Number} - A two-component vector describing the origin offset to draw the rectangle. Default is `0, 0`.
         */
        origin: Vector;
    }
    import Vector from "vector";
}
declare module "shapes/rounded-rectangle" {
    export default RoundedRectangle;
    /**
     * @name Two.RoundedRectangle
     * @class
     * @extends Two.Path
     * @param {Number} [x=0] - The x position of the rounded rectangle.
     * @param {Number} [y=0] - The y position of the rounded rectangle.
     * @param {Number} width - The width value of the rounded rectangle.
     * @param {Number} height - The width value of the rounded rectangle.
     * @param {Number} radius - The radius value of the rounded rectangle.
     * @param {Number} [resolution=12] - The number of vertices used to construct the rounded rectangle.
     */
    function RoundedRectangle(ox: any, oy: any, width: number, height: number, radius: number): void;
    class RoundedRectangle {
        /**
         * @name Two.RoundedRectangle
         * @class
         * @extends Two.Path
         * @param {Number} [x=0] - The x position of the rounded rectangle.
         * @param {Number} [y=0] - The y position of the rounded rectangle.
         * @param {Number} width - The width value of the rounded rectangle.
         * @param {Number} height - The width value of the rounded rectangle.
         * @param {Number} radius - The radius value of the rounded rectangle.
         * @param {Number} [resolution=12] - The number of vertices used to construct the rounded rectangle.
         */
        constructor(ox: any, oy: any, width: number, height: number, radius: number);
        closed: boolean;
        automatic: boolean;
        /**
         * @name Two.RoundedRectangle#width
         * @property {Number} - The width of the rounded rectangle.
         */
        width: number;
        /**
         * @name Two.RoundedRectangle#height
         * @property {Number} - The height of the rounded rectangle.
         */
        height: number;
        /**
         * @name Two.RoundedRectangle#radius
         * @property {Number} - The size of the radius of the rounded rectangle.
         */
        radius: number;
    }
}
declare module "utils/interpret-svg" {
    export default read;
    /**
     * @name Utils.read
     * @property {Object} read - A map of functions to read any number of SVG node types and create Two.js equivalents of them. Primarily used by the {@link Two#interpret} method.
     */
    var read: {
        svg: (node: any) => any;
        defs: (node: any) => any;
        use: (node: any, styles: any) => any;
        g: (node: any, parentStyles: any) => Group;
        polygon: (node: any, parentStyles: any) => any;
        polyline: (node: any, parentStyles: any) => any;
        path: (node: any, parentStyles: any) => any;
        circle: (node: any, parentStyles: any) => any;
        ellipse: (node: any, parentStyles: any) => any;
        rect: (node: any, parentStyles: any) => any;
        'rounded-rect': (node: any, parentStyles: any) => any;
        line: (node: any, parentStyles: any) => any;
        lineargradient: (node: any, parentStyles: any) => LinearGradient;
        radialgradient: (node: any, parentStyles: any) => RadialGradient;
        text: (node: any, parentStyles: any) => Text;
    };
    import Group from "group";
    import LinearGradient from "effects/linear-gradient";
    import RadialGradient from "effects/radial-gradient";
    import Text from "text";
}
declare module "utils/xhr" {
    export default xhr;
    /**
     * @name Utils.xhr
     * @function
     * @param {String} path
     * @param {Function} callback
     * @returns {XMLHttpRequest} The constructed and called XHR request.
     * @description Canonical method to initiate `GET` requests in the browser. Mainly used by {@link Two#load} method.
     */
    function xhr(path: string, callback: Function): XMLHttpRequest;
}
declare module "effects/image-sequence" {
    export default ImageSequence;
    /**
     * @name Two.ImageSequence
     * @class
     * @extends Two.Rectangle
     * @param {String|String[]|Two.Texture|Two.Texture[]} paths - A list of URLs or {@link Two.Texture}s.
     * @param {Number} [ox=0] - The initial `x` position of the Two.ImageSequence.
     * @param {Number} [oy=0] - The initial `y` position of the Two.ImageSequence.
     * @param {Integer} [frameRate=30] - The frame rate at which the images should playback at.
     * @description A convenient package to display still or animated images organized as a series of still images.
     */
    function ImageSequence(paths: string | string[] | any | any[], ox?: number, oy?: number, frameRate?: any): void;
    class ImageSequence {
        /**
         * @name Two.ImageSequence
         * @class
         * @extends Two.Rectangle
         * @param {String|String[]|Two.Texture|Two.Texture[]} paths - A list of URLs or {@link Two.Texture}s.
         * @param {Number} [ox=0] - The initial `x` position of the Two.ImageSequence.
         * @param {Number} [oy=0] - The initial `y` position of the Two.ImageSequence.
         * @param {Integer} [frameRate=30] - The frame rate at which the images should playback at.
         * @description A convenient package to display still or animated images organized as a series of still images.
         */
        constructor(paths: string | string[] | any | any[], ox?: number, oy?: number, frameRate?: any);
        textures: any[];
        origin: Vector;
        frameRate: any;
        /**
         * @name Two.ImageSequence#index
         * @property {Integer} - The index of the current tile of the sprite to display. Defaults to `0`.
         */
        index: number;
    }
    import Vector from "vector";
}
declare module "effects/sprite" {
    export default Sprite;
    /**
     * @name Two.Sprite
     * @class
     * @extends Two.Rectangle
     * @param {String|Two.Texture} [path] - The URL path or {@link Two.Texture} to be used as the bitmap data displayed on the sprite.
     * @param {Number} [ox=0] - The initial `x` position of the Two.Sprite.
     * @param {Number} [oy=0] - The initial `y` position of the Two.Sprite.
     * @param {Integer} [cols=1] - The number of columns the sprite contains.
     * @param {Integer} [rows=1] - The number of rows the sprite contains.
     * @param {Integer} [frameRate=0] - The frame rate at which the partitions of the image should playback at.
     * @description A convenient package to display still or animated images through a tiled image source. For more information on the principals of animated imagery through tiling see [Texture Atlas](https://en.wikipedia.org/wiki/Texture_atlas) on Wikipedia.
     */
    function Sprite(path?: string | any, ox?: number, oy?: number, cols?: any, rows?: any, frameRate?: any): void;
    class Sprite {
        /**
         * @name Two.Sprite
         * @class
         * @extends Two.Rectangle
         * @param {String|Two.Texture} [path] - The URL path or {@link Two.Texture} to be used as the bitmap data displayed on the sprite.
         * @param {Number} [ox=0] - The initial `x` position of the Two.Sprite.
         * @param {Number} [oy=0] - The initial `y` position of the Two.Sprite.
         * @param {Integer} [cols=1] - The number of columns the sprite contains.
         * @param {Integer} [rows=1] - The number of rows the sprite contains.
         * @param {Integer} [frameRate=0] - The frame rate at which the partitions of the image should playback at.
         * @description A convenient package to display still or animated images through a tiled image source. For more information on the principals of animated imagery through tiling see [Texture Atlas](https://en.wikipedia.org/wiki/Texture_atlas) on Wikipedia.
         */
        constructor(path?: string | any, ox?: number, oy?: number, cols?: any, rows?: any, frameRate?: any);
        texture: Texture;
        origin: Vector;
        columns: number;
        rows: number;
        frameRate: number;
        /**
         * @name Two.Sprite#index
         * @property {Integer} - The index of the current tile of the sprite to display. Defaults to `0`.
         */
        index: number;
    }
    import Texture from "effects/texture";
    import Vector from "vector";
}
declare module "shapes/arc-segment" {
    export default ArcSegment;
    /**
     * @name Two.ArcSegment
     * @class
     * @extends Two.Path
     * @param {Number} [x=0] - The x position of the arc segment.
     * @param {Number} [y=0] - The y position of the arc segment.
     * @param {Number} innerRadius - The inner radius value of the arc segment.
     * @param {Number} outerRadius - The outer radius value of the arc segment.
     * @param {Radians} startAngle - The start angle of the arc segment in radians.
     * @param {Radians} endAngle - The end angle of the arc segment in radians.
     * @param {Number} [resolution=24] - The number of vertices used to construct the arc segment.
     */
    function ArcSegment(ox: any, oy: any, ir: any, or: any, sa: any, ea: any, res: any): void;
    class ArcSegment {
        /**
         * @name Two.ArcSegment
         * @class
         * @extends Two.Path
         * @param {Number} [x=0] - The x position of the arc segment.
         * @param {Number} [y=0] - The y position of the arc segment.
         * @param {Number} innerRadius - The inner radius value of the arc segment.
         * @param {Number} outerRadius - The outer radius value of the arc segment.
         * @param {Radians} startAngle - The start angle of the arc segment in radians.
         * @param {Radians} endAngle - The end angle of the arc segment in radians.
         * @param {Number} [resolution=24] - The number of vertices used to construct the arc segment.
         */
        constructor(ox: any, oy: any, ir: any, or: any, sa: any, ea: any, res: any);
        /**
         * @name Two.ArcSegment#innerRadius
         * @property {Number} - The size of the inner radius of the arc segment.
         */
        innerRadius: any;
        /**
         * @name Two.ArcSegment#outerRadius
         * @property {Number} - The size of the outer radius of the arc segment.
         */
        outerRadius: any;
        /**
         * @name Two.ArcSegment#startRadius
         * @property {Radians} - The angle of one side for the arc segment.
         */
        startAngle: any;
        /**
         * @name Two.ArcSegment#endAngle
         * @property {Radians} - The angle of the other side for the arc segment.
         */
        endAngle: any;
    }
}
declare module "shapes/polygon" {
    export default Polygon;
    /**
     * @name Two.Polygon
     * @class
     * @extends Two.Path
     * @param {Number} [x=0] - The x position of the polygon.
     * @param {Number} [y=0] - The y position of the polygon.
     * @param {Number} radius - The radius value of the polygon.
     * @param {Number} [sides=12] - The number of vertices used to construct the polygon.
     */
    function Polygon(ox: any, oy: any, r: any, sides?: number): void;
    class Polygon {
        /**
         * @name Two.Polygon
         * @class
         * @extends Two.Path
         * @param {Number} [x=0] - The x position of the polygon.
         * @param {Number} [y=0] - The y position of the polygon.
         * @param {Number} radius - The radius value of the polygon.
         * @param {Number} [sides=12] - The number of vertices used to construct the polygon.
         */
        constructor(ox: any, oy: any, r: any, sides?: number);
        closed: boolean;
        automatic: boolean;
        /**
         * @name Two.Polygon#width
         * @property {Number} - The size of the width of the polygon.
         */
        width: number;
        /**
         * @name Two.Polygon#height
         * @property {Number} - The size of the height of the polygon.
         */
        height: number;
        /**
         * @name Two.Polygon#sides
         * @property {Number} - The amount of sides the polyogn has.
         */
        sides: number;
    }
}
declare module "shapes/star" {
    export default Star;
    /**
     * @name Two.Star
     * @class
     * @extends Two.Path
     * @param {Number} [x=0] - The x position of the star.
     * @param {Number} [y=0] - The y position of the star.
     * @param {Number} innerRadius - The inner radius value of the star.
     * @param {Number} outerRadius - The outer radius value of the star.
     * @param {Number} [sides=5] - The number of sides used to construct the star.
     */
    function Star(ox: any, oy: any, ir: any, or: any, sides?: number, ...args: any[]): void;
    class Star {
        /**
         * @name Two.Star
         * @class
         * @extends Two.Path
         * @param {Number} [x=0] - The x position of the star.
         * @param {Number} [y=0] - The y position of the star.
         * @param {Number} innerRadius - The inner radius value of the star.
         * @param {Number} outerRadius - The outer radius value of the star.
         * @param {Number} [sides=5] - The number of sides used to construct the star.
         */
        constructor(ox: any, oy: any, ir: any, or: any, sides?: number, ...args: any[]);
        closed: boolean;
        automatic: boolean;
        /**
         * @name Two.Star#innerRadius
         * @property {Number} - The size of the inner radius of the star.
         */
        innerRadius: any;
        /**
         * @name Two.Star#outerRadius
         * @property {Number} - The size of the outer radius of the star.
         */
        outerRadius: any;
        /**
         * @name Two.Star#sides
         * @property {Number} - The amount of sides the star has.
         */
        sides: number;
    }
}
declare module "renderers/svg" {
    export default Renderer;
    /**
     * @name Two.SVGRenderer
     * @class
     * @extends Two.Events
     * @param {Object} [parameters] - This object is inherited when constructing a new instance of {@link Two}.
     * @param {Element} [parameters.domElement] - The `<svg />` to draw to. If none given a new one will be constructed.
     * @description This class is used by {@link Two} when constructing with `type` of `Two.Types.svg` (the default type). It takes Two.js' scenegraph and renders it to a `<svg />`.
     */
    function Renderer(params: any): void;
    class Renderer {
        /**
         * @name Two.SVGRenderer
         * @class
         * @extends Two.Events
         * @param {Object} [parameters] - This object is inherited when constructing a new instance of {@link Two}.
         * @param {Element} [parameters.domElement] - The `<svg />` to draw to. If none given a new one will be constructed.
         * @description This class is used by {@link Two} when constructing with `type` of `Two.Types.svg` (the default type). It takes Two.js' scenegraph and renders it to a `<svg />`.
         */
        constructor(params: any);
        /**
         * @name Two.SVGRenderer#domElement
         * @property {Element} - The `<svg />` associated with the Two.js scene.
         */
        domElement: any;
        /**
         * @name Two.SVGRenderer#scene
         * @property {Two.Group} - The root group of the scenegraph.
         */
        scene: Group;
        /**
         * @name Two.SVGRenderer#defs
         * @property {SvgDefintionsElement} - The `<defs />` to apply gradients, patterns, and bitmap imagery.
         */
        defs: Element;
    }
    import Group from "group";
}
declare module "renderers/webgl" {
    export default Renderer;
    /**
     * @name Two.WebGLRenderer
     * @class
     * @extends Two.Events
     * @param {Object} [parameters] - This object is inherited when constructing a new instance of {@link Two}.
     * @param {Element} [parameters.domElement] - The `<canvas />` to draw to. If none given a new one will be constructed.
     * @param {CanvasElement} [parameters.offscreenElement] - The offscreen two dimensional `<canvas />` to render each element on WebGL texture updates.
     * @param {Boolean} [parameters.antialias] - Determines whether the canvas should clear render with antialias on.
     * @description This class is used by {@link Two} when constructing with `type` of `Two.Types.webgl`. It takes Two.js' scenegraph and renders it to a `<canvas />` through the WebGL api.
     * @see {@link https://www.khronos.org/registry/webgl/specs/latest/1.0/}
     */
    function Renderer(params: any): void;
    class Renderer {
        /**
         * @name Two.WebGLRenderer
         * @class
         * @extends Two.Events
         * @param {Object} [parameters] - This object is inherited when constructing a new instance of {@link Two}.
         * @param {Element} [parameters.domElement] - The `<canvas />` to draw to. If none given a new one will be constructed.
         * @param {CanvasElement} [parameters.offscreenElement] - The offscreen two dimensional `<canvas />` to render each element on WebGL texture updates.
         * @param {Boolean} [parameters.antialias] - Determines whether the canvas should clear render with antialias on.
         * @description This class is used by {@link Two} when constructing with `type` of `Two.Types.webgl`. It takes Two.js' scenegraph and renders it to a `<canvas />` through the WebGL api.
         * @see {@link https://www.khronos.org/registry/webgl/specs/latest/1.0/}
         */
        constructor(params: any);
        /**
         * @name Two.WebGLRenderer#domElement
         * @property {Element} - The `<canvas />` associated with the Two.js scene.
         */
        domElement: any;
        /**
         * @name Two.WebGLRenderer#scene
         * @property {Two.Group} - The root group of the scenegraph.
         */
        scene: Group;
        _renderer: {
            type: string;
            matrix: any;
            scale: number;
            opacity: number;
        };
        _flagMatrix: boolean;
        /**
         * @name Two.WebGLRenderer#overdraw
         * @property {Boolean} - Determines whether the canvas clears the background each draw call.
         * @default true
         */
        overdraw: any;
        ctx: any;
        /**
         * @name Two.WebGLRenderer#program
         * @property {WebGLProgram} - Associated WebGL program to render all elements from the scenegraph.
         */
        program: any;
    }
    import Group from "group";
}
declare module "two" {
    export default Two;
    /**
     * @name Two
     * @class
     * @global
     * @param {Object} [options]
     * @param {Boolean} [options.fullscreen=false] - Set to `true` to automatically make the stage adapt to the width and height of the parent document. This parameter overrides `width` and `height` parameters if set to `true`. This overrides `options.fitted` as well.
     * @param {Boolean} [options.fitted=false] = Set to `true` to automatically make the stage adapt to the width and height of the parent element. This parameter overrides `width` and `height` parameters if set to `true`.
     * @param {Number} [options.width=640] - The width of the stage on construction. This can be set at a later time.
     * @param {Number} [options.height=480] - The height of the stage on construction. This can be set at a later time.
     * @param {String} [options.type=Two.Types.svg] - The type of renderer to setup drawing with. See {@link Two.Types} for available options.
     * @param {Boolean} [options.autostart=false] - Set to `true` to add the instance to draw on `requestAnimationFrame`. This is a convenient substitute for {@link Two#play}.
     * @param {Element} [options.domElement] - The canvas or SVG element to draw into. This overrides the `options.type` argument.
     * @description The entrypoint for Two.js. Instantiate a `new Two` in order to setup a scene to render to. `Two` is also the publicly accessible namespace that all other sub-classes, functions, and utilities attach to.
     */
    function Two(options?: {
        fullscreen?: boolean;
        fitted?: boolean;
        width?: number;
        height?: number;
        type?: string;
        autostart?: boolean;
        domElement?: Element;
    }): void;
    class Two {
        /**
         * @name Two
         * @class
         * @global
         * @param {Object} [options]
         * @param {Boolean} [options.fullscreen=false] - Set to `true` to automatically make the stage adapt to the width and height of the parent document. This parameter overrides `width` and `height` parameters if set to `true`. This overrides `options.fitted` as well.
         * @param {Boolean} [options.fitted=false] = Set to `true` to automatically make the stage adapt to the width and height of the parent element. This parameter overrides `width` and `height` parameters if set to `true`.
         * @param {Number} [options.width=640] - The width of the stage on construction. This can be set at a later time.
         * @param {Number} [options.height=480] - The height of the stage on construction. This can be set at a later time.
         * @param {String} [options.type=Two.Types.svg] - The type of renderer to setup drawing with. See {@link Two.Types} for available options.
         * @param {Boolean} [options.autostart=false] - Set to `true` to add the instance to draw on `requestAnimationFrame`. This is a convenient substitute for {@link Two#play}.
         * @param {Element} [options.domElement] - The canvas or SVG element to draw into. This overrides the `options.type` argument.
         * @description The entrypoint for Two.js. Instantiate a `new Two` in order to setup a scene to render to. `Two` is also the publicly accessible namespace that all other sub-classes, functions, and utilities attach to.
         */
        constructor(options?: {
            fullscreen?: boolean;
            fitted?: boolean;
            width?: number;
            height?: number;
            type?: string;
            autostart?: boolean;
            domElement?: Element;
        });
        type: any;
        renderer: any;
        frameCount: number;
        fit: any;
        width: any;
        height: any;
        scene: any;
    }
}
