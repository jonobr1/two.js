declare module "two.js/src/utils/path-commands" {
    export namespace Commands {
        export const move: string;
        export const line: string;
        export const curve: string;
        export const arc: string;
        export const close: string;
    }
}
declare module "two.js/src/utils/root" {
    export let root: any;
}
declare module "two.js/src/utils/math" {
    /**
     * @name Two.Utils.decomposeMatrix
     * @function
     * @param {Two.Matrix} matrix - The matrix to decompose.
     * @returns {Object} An object containing relevant skew values.
     * @description Decompose a 2D 3x3 Matrix to find the skew.
     */
    export function decomposeMatrix(matrix: any, b: any, c: any, d: any, e: any, f: any, ...args: any[]): any;
    /**
     * @name Two.Utils.getComputedMatrix
     * @function
     * @param {Two.Shape} object - The Two.js object that has a matrix property to calculate from.
     * @param {Two.Matrix} [matrix] - The matrix to apply calculated transformations to if available.
     * @returns {Two.Matrix} The computed matrix of a nested object. If no `matrix` was passed in arguments then a `new Two.Matrix` is returned.
     * @description Method to get the world space transformation of a given object in a Two.js scene.
     */
    export function getComputedMatrix(object: any, matrix?: any): any;
    export function getPoT(value: any): number;
    export function setMatrix(matrix: any): void;
    /**
     * @name Two.Utils.lerp
     * @function
     * @param {Number} a - Start value.
     * @param {Number} b - End value.
     * @param {Number} t - Zero-to-one value describing percentage between a and b.
     * @returns {Number}
     * @description Linear interpolation between two values `a` and `b` by an amount `t`.
     */
    export function lerp(a: number, b: number, t: number): number;
    /**
     * @name Two.Utils.mod
     * @function
     * @param {Number} v - The value to modulo
     * @param {Number} l - The value to modulo by
     * @returns {Number}
     * @description Modulo with added functionality to handle negative values in a positive manner.
     */
    export function mod(v: number, l: number): number;
    export const NumArray: any;
    /**
    * @name Two.Utils.toFixed
    * @function
    * @param {Number} v - Any float
    * @returns {Number} That float trimmed to the third decimal place.
    * @description A pretty fast toFixed(3) alternative.
    * @see {@link http://jsperf.com/parsefloat-tofixed-vs-math-round/18}
    */
    export function toFixed(v: number): number;
    export const TWO_PI: number;
    export const HALF_PI: number;
}
declare module "two.js/src/events" {
    /**
     * @name Two.Events
     * @class
     * @description Object inherited by many Two.js objects in order to facilitate custom events.
     */
    export class Events {
        /**
         * @name Two.Events.Types
         * @property {Object} - Object of different types of Two.js specific events.
         */
        static Types: {
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
        static Methods: string[];
        _events: {};
        _bound: boolean;
        /**
         * @name Two.Events#addEventListener
         * @function
         * @param {String} [name] - The name of the event to bind a function to.
         * @param {Function} [handler] - The function to be invoked when the event is dispatched.
         * @description Call to add a listener to a specific event name.
         */
        addEventListener(name?: string, handler?: Function): Events;
        /**
         * @name Two.Events#on
         * @function
         * @description Alias for {@link Two.Events#addEventListener}.
         */
        on(...args: any[]): any;
        /**
         * @name Two.Events#bind
         * @function
         * @description Alias for {@link Two.Events#addEventListener}.
         */
        bind(...args: any[]): any;
        /**
         * @name Two.Events#removeEventListener
         * @function
         * @param {String} [name] - The name of the event intended to be removed.
         * @param {Function} [handler] - The handler intended to be reomved.
         * @description Call to remove listeners from a specific event. If only `name` is passed then all the handlers attached to that `name` will be removed. If no arguments are passed then all handlers for every event on the obejct are removed.
         */
        removeEventListener(name?: string, handler?: Function): Events;
        /**
         * @name Two.Events#off
         * @function
         * @description Alias for {@link Two.Events#removeEventListener}.
         */
        off(...args: any[]): any;
        /**
         * @name Two.Events#unbind
         * @function
         * @description Alias for {@link Two.Events#removeEventListener}.
         */
        unbind(...args: any[]): any;
        /**
         * @name Two.Events#dispatchEvent
         * @function
         * @param {String} name - The name of the event to dispatch.
         * @param arguments - Anything can be passed after the name and those will be passed on to handlers attached to the event in the order they are passed.
         * @description Call to trigger a custom event. Any additional arguments passed after the name will be passed along to the attached handlers.
         */
        dispatchEvent(name: string, ...args: any[]): Events;
        trigger(...args: any[]): any;
        listen(obj: any, name: any, handler: any): Events;
        ignore(obj: any, name: any, handler: any): Events;
    }
}
declare module "two.js/src/vector" {
    /**
     * @name Two.Vector
     * @class
     * @extends Two.Events
     * @param {Number} [x=0] - Any number to represent the horizontal x-component of the vector.
     * @param {Number} [y=0] - Any number to represent the vertical y-component of the vector.
     * @description A class to store x / y component vector data. In addition to storing data `Two.Vector` has suped up methods for commonplace mathematical operations.
     */
    export class Vector {
        /**
         * @name Two.Vector.zero
         * @readonly
         * @property {Two.Vector} - Handy reference to a vector with component values 0, 0 at all times.
         */
        static readonly zero: Vector;
        /**
         * @name Two.Vector.add
         * @function
         * @param {Two.Vector} v1
         * @param {Two.Vector} v2
         * @returns {Two.Vector}
         * @description Add two vectors together.
         */
        static add(v1: any, v2: any): any;
        /**
         * @name Two.Vector.sub
         * @function
         * @param {Two.Vector} v1
         * @param {Two.Vector} v2
         * @returns {Two.Vector}
         * @description Subtract two vectors: `v2` from `v1`.
         */
        static sub(v1: any, v2: any): any;
        /**
         * @name Two.Vector.subtract
         * @function
         * @description Alias for {@link Two.Vector.sub}.
         */
        static subtract(v1: any, v2: any): any;
        /**
         * @name Two.Vector.ratioBetween
         * @function
         * @param {Two.Vector} A
         * @param {Two.Vector} B
         * @returns {Number} The ratio betwen two points `v1` and `v2`.
         */
        static ratioBetween(v1: any, v2: any): number;
        /**
         * @name Two.Vector.angleBetween
         * @function
         * @param {Two.Vector} v1
         * @param {Two.Vector} v2
         * @returns {Number} The angle between points `v1` and `v2`.
         */
        static angleBetween(v1: any, v2: any, ...args: any[]): number;
        /**
         * @name Two.Vector.distanceBetween
         * @function
         * @param {Two.Vector} v1
         * @param {Two.Vector} v2
         * @returns {Number} The distance between points `v1` and `v2`. Distance is always positive.
         */
        static distanceBetween(v1: any, v2: any): number;
        /**
         * @name Two.Vector.distanceBetweenSquared
         * @function
         * @param {Two.Vector} v1
         * @param {Two.Vector} v2
         * @returns {Number} The squared distance between points `v1` and `v2`.
         */
        static distanceBetweenSquared(v1: any, v2: any): number;
        constructor(x?: number, y?: number);
        /**
         * @name Two.Vector#_x
         * @private
         */
        private _x;
        /**
         * @name Two.Vector#_y
         * @private
         */
        private _y;
        /**
         * @name Two.Vector#x
         * @property {Number} - The horizontal x-component of the vector.
         * @type {Number}
         */
        x: number;
        /**
         * @name Two.Vector#y
         * @property {Number} - The vertical y-component of the vector.
         * @type {Number}
         */
        y: number;
        set(x: any, y: any): Vector;
        /**
         * @name Two.Vector#copy
         * @function
         * @param {Two.Vector} v
         * @description Copy the x / y components of another object `v`.
         */
        copy(v: any): Vector;
        /**
         * @name Two.Vector#clear
         * @function
         * @description Set the x / y component values of the vector to zero.
         */
        clear(): Vector;
        /**
         * @name Two.Vector#clone
         * @function
         * @description Create a new vector and copy the existing values onto the newly created instance.
         */
        clone(): Vector;
        /**
         * @name Two.Vector#add
         * @function
         * @param {Two.Vector} v
         * @description Add an object with x / y component values to the instance.
         * @overloaded
         */
        /**
         * @name Two.Vector#add
         * @function
         * @param {Number} v
         * @description Add the **same** number to both x / y component values of the instance.
         * @overloaded
         */
        /**
         * @name Two.Vector#add
         * @function
         * @param {Number} x
         * @param {Number} y
         * @description Add `x` / `y` values to their respective component value on the instance.
         * @overloaded
         */
        add(x: number, y: number, ...args: any[]): Vector;
        /**
         * @name Two.Vector#addSelf
         * @function
         * @description Alias for {@link Two.Vector.add}.
         */
        addSelf(v: any, ...args: any[]): any;
        /**
         * @name Two.Vector#sub
         * @function
         * @param {Two.Vector} v
         * @description Subtract an object with x / y component values to the instance.
         * @overloaded
         */
        /**
         * @name Two.Vector#sub
         * @function
         * @param {Number} v
         * @description Subtract the **same** number to both x / y component values of the instance.
         * @overloaded
         */
        /**
         * @name Two.Vector#sub
         * @function
         * @param {Number} x
         * @param {Number} y
         * @description Subtract `x` / `y` values to their respective component value on the instance.
         * @overloaded
         */
        sub(x: number, y: number, ...args: any[]): Vector;
        /**
         * @name Two.Vector#subtract
         * @function
         * @description Alias for {@link Two.Vector.sub}.
         */
        subtract(...args: any[]): any;
        /**
         * @name Two.Vector#subSelf
         * @function
         * @description Alias for {@link Two.Vector.sub}.
         */
        subSelf(v: any, ...args: any[]): any;
        /**
         * @name Two.Vector#subtractSelf
         * @function
         * @description Alias for {@link Two.Vector.sub}.
         */
        subtractSelf(v: any, ...args: any[]): any;
        /**
         * @name Two.Vector#multiply
         * @function
         * @param {Two.Vector} v
         * @description Multiply an object with x / y component values to the instance.
         * @overloaded
         */
        /**
         * @name Two.Vector#multiply
         * @function
         * @param {Number} v
         * @description Multiply the **same** number to both x / y component values of the instance.
         * @overloaded
         */
        /**
         * @name Two.Vector#multiply
         * @function
         * @param {Number} x
         * @param {Number} y
         * @description Multiply `x` / `y` values to their respective component value on the instance.
         * @overloaded
         */
        multiply(x: number, y: number, ...args: any[]): Vector;
        /**
         * @name Two.Vector#multiplySelf
         * @function
         * @description Alias for {@link Two.Vector.multiply}.
         */
        multiplySelf(v: any, ...args: any[]): any;
        /**
         * @name Two.Vector#multiplyScalar
         * @function
         * @param {Number} s - The scalar to multiply by.
         * @description Mulitiply the vector by a single number. Shorthand to call {@link Two.Vector#multiply} directly.
         */
        multiplyScalar(s: number): Vector;
        /**
         * @name Two.Vector#divide
         * @function
         * @param {Two.Vector} v
         * @description Divide an object with x / y component values to the instance.
         * @overloaded
         */
        /**
         * @name Two.Vector#divide
         * @function
         * @param {Number} v
         * @description Divide the **same** number to both x / y component values of the instance.
         * @overloaded
         */
        /**
         * @name Two.Vector#divide
         * @function
         * @param {Number} x
         * @param {Number} y
         * @description Divide `x` / `y` values to their respective component value on the instance.
         * @overloaded
         */
        divide(x: number, y: number, ...args: any[]): Vector;
        /**
         * @name Two.Vector#divideSelf
         * @function
         * @description Alias for {@link Two.Vector.divide}.
         */
        divideSelf(v: any, ...args: any[]): any;
        /**
         * @name Two.Vector#divideScalar
         * @function
         * @param {Number} s - The scalar to divide by.
         * @description Divide the vector by a single number. Shorthand to call {@link Two.Vector#divide} directly.
         */
        divideScalar(s: number): Vector;
        /**
         * @name Two.Vector#negate
         * @function
         * @description Invert each component's sign value.
         */
        negate(): Vector;
        /**
         * @name Two.Vector#negate
         * @function
         * @returns {Number}
         * @description Get the [dot product](https://en.wikipedia.org/wiki/Dot_product) of the vector.
         */
        dot(v: any): number;
        /**
         * @name Two.Vector#length
         * @function
         * @returns {Number}
         * @description Get the length of a vector.
         */
        length(): number;
        /**
         * @name Two.Vector#lengthSquared
         * @function
         * @returns {Number}
         * @description Get the length of the vector to the power of two. Widely used as less expensive than {@link Two.Vector#length} because it isn't square-rooting any numbers.
         */
        lengthSquared(): number;
        /**
         * @name Two.Vector#normalize
         * @function
         * @description Normalize the vector from negative one to one.
         */
        normalize(): Vector;
        /**
         * @name Two.Vector#distanceTo
         * @function
         * @returns {Number}
         * @description Get the distance between two vectors.
         */
        distanceTo(v: any): number;
        /**
         * @name Two.Vector#distanceToSquared
         * @function
         * @returns {Number}
         * @description Get the distance between two vectors to the power of two. Widely used as less expensive than {@link Two.Vector#distanceTo} because it isn't square-rooting any numbers.
         */
        distanceToSquared(v: any): number;
        /**
         * @name Two.Vector#setLength
         * @function
         * @param {Number} l - length to set vector to.
         * @description Set the length of a vector.
         */
        setLength(l: number): Vector;
        /**
         * @name Two.Vector#equals
         * @function
         * @param {Two.Vector} v - The vector to compare against.
         * @param {Number} [eps=0.0001] - An options epsilon for precision.
         * @returns {Boolean}
         * @description Qualify if one vector roughly equal another. With a margin of error defined by epsilon.
         */
        equals(v: any, eps?: number): boolean;
        /**
         * @name Two.Vector#lerp
         * @function
         * @param {Two.Vector} v - The destination vector to step towards.
         * @param {Number} t - The zero to one value of how close the current vector gets to the destination vector.
         * @description Linear interpolate one vector to another by an amount `t` defined as a zero to one number.
         * @see [Matt DesLauriers](https://twitter.com/mattdesl/status/1031305279227478016) has a good thread about this.
         */
        lerp(v: any, t: number): Vector;
        /**
         * @name Two.Vector#isZero
         * @function
         * @param {Number} [eps=0.0001] - Optional precision amount to check against.
         * @returns {Boolean}
         * @description Check to see if vector is roughly zero, based on the `epsilon` precision value.
         */
        isZero(eps?: number): boolean;
        /**
         * @name Two.Vector#toString
         * @function
         * @returns {String}
         * @description Return a comma-separated string of x, y value. Great for storing in a database.
         */
        toString(): string;
        /**
         * @name Two.Vector#toObject
         * @function
         * @returns {Object}
         * @description Return a JSON compatible plain object that represents the vector.
         */
        toObject(): any;
        /**
         * @name Two.Vector#rotate
         * @function
         * @param {Number} radians - The amount to rotate the vector by in radians.
         * @description Rotate a vector.
         */
        rotate(radians: number): Vector;
    }
}
declare module "two.js/src/anchor" {
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
    export class Anchor {
        static makeBroadcast(scope: any): () => void;
        constructor(x?: number, y?: number, ax?: number, ay?: number, bx?: number, by?: number, command?: string);
        controls: {
            left: Vector;
            right: Vector;
        };
        _command: string;
        _relative: boolean;
        _rx: number;
        _ry: number;
        _xAxisRotation: number;
        _largeArcFlag: number;
        _sweepFlag: number;
        command: string;
        relative: boolean;
        /**
         * @name Two.Anchor#copy
         * @function
         * @param {Two.Anchor} v - The anchor to apply values to.
         * @description Copy the properties of one {@link Two.Anchor} onto another.
         */
        copy(v: any): Anchor;
        x: any;
        y: any;
        rx: any;
        ry: any;
        xAxisRotation: any;
        largeArcFlag: any;
        sweepFlag: any;
        /**
         * @name Two.Anchor#clone
         * @function
         * @returns {Two.Anchor}
         * @description Create a new {@link Two.Anchor}, set all its values to the current instance and return it for use.
         */
        clone(): any;
        /**
         * @name Two.Anchor#toObject
         * @function
         * @returns {Object} - An object with properties filled out to mirror {@link Two.Anchor}.
         * @description Create a JSON compatible plain object of the current instance. Intended for use with storing values in a database.
         */
        toObject(): any;
        /**
         * @name Two.Anchor#toString
         * @function
         * @returns {String} - A String with comma-separated values reflecting the various values on the current instance.
         * @description Create a string form of the current instance. Intended for use with storing values in a database. This is lighter to store than the JSON compatible {@link Two.Anchor#toObject}.
         */
        toString(): string;
    }
    import { Vector } from "two.js/src/vector";
}
declare module "two.js/src/constants" {
    export namespace Constants {
        export const nextFrameID: any;
        export namespace Types {
            export const webgl: string;
            export const svg: string;
            export const canvas: string;
        }
        export const Version: string;
        export const PublishDate: string;
        export const Identifier: string;
        export const Resolution: number;
        export const AutoCalculateImportedMatrices: boolean;
        export const Instances: any[];
        export function uniqueId(): number;
    }
}
declare module "two.js/src/utils/curves" {
    export namespace Curve {
        export const CollinearityEpsilon: number;
        export const RecursionLimit: number;
        export const CuspLimit: number;
        export namespace Tolerance {
            export const distance: number;
            export const angle: number;
            export const epsilon: number;
        }
        export const abscissas: number[][];
        export const weights: number[][];
    }
    /**
     * @name Two.Utils.getComponentOnCubicBezier
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
     * @name Two.Utils.subdivide
     * @function
     * @param {Number} x1 - x position of first anchor point.
     * @param {Number} y1 - y position of first anchor point.
     * @param {Number} x2 - x position of first anchor point's "right" bezier handle.
     * @param {Number} y2 - y position of first anchor point's "right" bezier handle.
     * @param {Number} x3 - x position of second anchor point's "left" bezier handle.
     * @param {Number} y3 - y position of second anchor point's "left" bezier handle.
     * @param {Number} x4 - x position of second anchor point.
     * @param {Number} y4 - y position of second anchor point.
     * @param {Number} [limit=Two.Utils.Curve.RecursionLimit] - The amount of vertices to create by subdividing.
     * @returns {Anchor[]} A list of anchor points ordered in between `x1`, `y1` and `x4`, `y4`
     * @description Given 2 points (a, b) and corresponding control point for each return an array of points that represent points plotted along the curve. The number of returned points is determined by `limit`.
     */
    export function subdivide(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, limit?: number): Anchor[];
    /**
     * @name Two.Utils.getCurveLength
     * @function
     * @param {Number} x1 - x position of first anchor point.
     * @param {Number} y1 - y position of first anchor point.
     * @param {Number} x2 - x position of first anchor point's "right" bezier handle.
     * @param {Number} y2 - y position of first anchor point's "right" bezier handle.
     * @param {Number} x3 - x position of second anchor point's "left" bezier handle.
     * @param {Number} y3 - y position of second anchor point's "left" bezier handle.
     * @param {Number} x4 - x position of second anchor point.
     * @param {Number} y4 - y position of second anchor point.
     * @param {Number} [limit=Two.Utils.Curve.RecursionLimit] - The amount of vertices to create by subdividing.
     * @returns {Number} The length of a curve.
     * @description Given 2 points (a, b) and corresponding control point for each, return a float that represents the length of the curve using Gauss-Legendre algorithm. Limit iterations of calculation by `limit`.
     */
    export function getCurveLength(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, limit?: number): number;
    /**
     * @name Two.Utils.getCurveBoundingBox
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
     * @name Two.Utils.integrate
     * @function
     * @param {Function} f
     * @param {Number} a
     * @param {Number} b
     * @param {Number} n
     * @description Integration for `getCurveLength` calculations.
     * @see [Paper.js](@link https://github.com/paperjs/paper.js/blob/master/src/util/Numerical.js#L101)
     */
    export function integrate(f: Function, a: number, b: number, n: number): number;
    /**
     * @name Two.Utils.getCurveFromPoints
     * @function
     * @param {Anchor[]} points
     * @param {Boolean} closed
     * @description Sets the bezier handles on {@link Anchor}s in the `points` list with estimated values to create a catmull-rom like curve. Used by {@link Two.Path#plot}.
     */
    export function getCurveFromPoints(points: Anchor[], closed: boolean): void;
    /**
     * @name Two.Utils.getControlPoints
     * @function
     * @param {Anchor} a
     * @param {Anchor} b
     * @param {Anchor} c
     * @returns {Anchor} Returns the passed middle point `b`.
     * @description Given three coordinates set the control points for the middle, b, vertex based on its position with the adjacent points.
     */
    export function getControlPoints(a: Anchor, b: Anchor, c: Anchor): Anchor;
    /**
     * @name Two.Utils.getReflection
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
     * @name Two.Utils.getAnchorsFromArcData
     * @function
     * @param {Vector} center
     * @param {Number} xAxisRotation
     * @param {Number} rx - x radius
     * @param {Number} ry - y radius
     * @param {Number} ts
     * @param {Number} td
     * @param {Boolean} [ccw=false] - Set path traversal to counter-clockwise
     */
    export function getAnchorsFromArcData(center: Vector, xAxisRotation: number, rx: number, ry: number, ts: number, td: number, ccw?: boolean): void;
    import { Anchor } from "two.js/src/anchor";
    import { Vector } from "two.js/src/vector";
}
declare module "two.js/src/utils/device-pixel-ratio" {
    /**
     * @name Two.Utils.getRatio
     * @function
     * @param {CanvasRenderingContext2D} ctx
     * @returns {Number} The ratio of a unit in Two.js to the pixel density of a session's screen.
     * @see [High DPI Rendering](http://www.html5rocks.com/en/tutorials/canvas/hidpi/)
     */
    export function getRatio(ctx: CanvasRenderingContext2D): number;
}
declare module "two.js/src/utils/underscore" {
    export namespace _ {
        export function isNaN(obj: any): boolean;
        export function isElement(obj: any): boolean;
        export function isObject(obj: any): boolean;
        export function extend(base: any, ...args: any[]): any;
        export function defaults(base: any, ...args: any[]): any;
        export function each(obj: any, iteratee: any, context: any): any;
        export const performance: any;
    }
}
declare module "two.js/src/element" {
    /**
     * @name Two.Element
     * @class
     * @extends Two.Events
     * @description The foundational object for the Two.js scenegraph.
     */
    export class Element {
        /**
         * @name Two.Element#_flagId
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Element#id} needs updating.
         */
        private _flagId;
        /**
         * @name Two.Element#_flagClassName
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Group#className} need updating.
         */
        private _flagClassName;
        /**
         * @name Two.Element#renderer
         * @property {Object} - Object access to store relevant renderer specific variables. Warning: manipulating this object can create unintended consequences.
         * @nota-bene With the {@link Two.SvgRenderer} you can access the underlying SVG element created via `shape.renderer.elem`.
         */
        _renderer: {};
        /**
         * @name Two.Element#id
         * @property {String} - Session specific unique identifier.
         * @nota-bene In the {@link Two.SvgRenderer} change this to change the underlying SVG element's id too.
         */
        _id: string;
        /**
         * @name Two.Element#className
         * @property {String} - A class to be applied to the element to be compatible with CSS styling.
         * @nota-bene Only available for the SVG renderer.
         */
        _className: string;
        /**
         * @name Two.Element#classList
         * @property {String[]}
         * @description A list of class strings stored if imported / interpreted  from an SVG element.
         */
        classList: any[];
        /**
         * @name Two.Element#flagReset
         * @function
         * @description Called internally by Two.js's renderer to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
         */
        flagReset(): void;
    }
}
declare module "two.js/src/matrix" {
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
    export class Matrix extends Events {
        /**
         * @name Two.Matrix.Identity
         * @property {Number[]} - A stored reference to the default value of a 3 x 3 matrix.
         */
        static Identity: number[];
        /**
         * @name Two.Matrix.Multiply
         * @function
         * @param {Two.Matrix} A
         * @param {Two.Matrix} B
         * @param {Two.Matrix} [C] - An optional matrix to apply the multiplication to.
         * @returns {Two.Matrix} - If an optional `C` matrix isn't passed then a new one is created and returned.
         * @description Multiply two matrices together and return the result.
         */
        static Multiply(A: any, B: any, C?: any): any;
        constructor(a: any, b: any, c: any, d: any, e: any, f: any, ...args: any[]);
        /**
         * @name Two.Matrix#elements
         * @property {Number[]} - The underlying data stored as an array.
         */
        elements: any;
        /**
         * @name Two.Matrix#manual
         * @property {Boolean} - Determines whether Two.js automatically calculates the values for the matrix or if the developer intends to manage the matrix.
         * @nota-bene - Setting to `true` nullifies {@link Two.Shape#translation}, {@link Two.Shape#rotation}, and {@link Two.Shape#scale}.
         */
        manual: boolean;
        /**
         * @name Two.Matrix#set
         * @function
         * @param {Number} a - The value for element at the first column and first row.
         * @param {Number} b - The value for element at the second column and first row.
         * @param {Number} c - The value for element at the third column and first row.
         * @param {Number} d - The value for element at the first column and second row.
         * @param {Number} e - The value for element at the second column and second row.
         * @param {Number} f - The value for element at the third column and second row.
         * @param {Number} g - The value for element at the first column and third row.
         * @param {Number} h - The value for element at the second column and third row.
         * @param {Number} i - The value for element at the third column and third row.
         * @description Set an array of values onto the matrix. Order described in {@link Two.Matrix}.
         */
        /**
        * @name Two.Matrix#set
        * @function
        * @param {Number[]} a - The array of elements to apply.
        * @description Set an array of values onto the matrix. Order described in {@link Two.Matrix}.
        */
        set(a: number[], b: any, c: any, d: any, e: any, f: any, g: any, h: any, i: any): any;
        /**
         * @name Two.Matrix#copy
         * @function
         * @description Copy the matrix of one to the current instance.
         */
        copy(m: any): any;
        /**
         * @name Two.Matrix#identity
         * @function
         * @description Turn matrix to the identity, like resetting.
         */
        identity(): any;
        /**
         * @name Two.Matrix#multiply
         * @function
         * @param {Number} a - The scalar to be multiplied.
         * @description Multiply all components of the matrix against a single scalar value.
         * @overloaded
         */
        /**
         * @name Two.Matrix#multiply
         * @function
         * @param {Number} a - The x component to be multiplied.
         * @param {Number} b - The y component to be multiplied.
         * @param {Number} c - The z component to be multiplied.
         * @description Multiply all components of a matrix against a 3 component vector.
         * @overloaded
         */
        /**
         * @name Two.Matrix#multiply
         * @function
         * @param {Number} a - The value at the first column and first row of the matrix to be multiplied.
         * @param {Number} b - The value at the second column and first row of the matrix to be multiplied.
         * @param {Number} c - The value at the third column and first row of the matrix to be multiplied.
         * @param {Number} d - The value at the first column and second row of the matrix to be multiplied.
         * @param {Number} e - The value at the second column and second row of the matrix to be multiplied.
         * @param {Number} f - The value at the third column and second row of the matrix to be multiplied.
         * @param {Number} g - The value at the first column and third row of the matrix to be multiplied.
         * @param {Number} h - The value at the second column and third row of the matrix to be multiplied.
         * @param {Number} i - The value at the third column and third row of the matrix to be multiplied.
         * @description Multiply all components of a matrix against another matrix.
         * @overloaded
         */
        multiply(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number): any;
        /**
         * @name Two.Matrix#inverse
         * @function
         * @param {Two.Matrix} [out] - The optional matrix to apply the inversion to.
         * @description Return an inverted version of the matrix. If no optional one is passed a new matrix is created and returned.
         */
        inverse(out?: any): any;
        /**
         * @name Two.Matrix#scale
         * @function
         * @param {Number} scale - The one dimensional scale to apply to the matrix.
         * @description Uniformly scale the transformation matrix.
         */
        /**
         * @name Two.Matrix#scale
         * @function
         * @param {Number} sx - The horizontal scale factor.
         * @param {Number} sy - The vertical scale factor
         * @description Scale the transformation matrix in two dimensions.
         */
        scale(sx: number, sy: number, ...args: any[]): any;
        /**
         * @name Two.Matrix#rotate
         * @function
         * @param {Number} Number - The amount to rotate in Number.
         * @description Rotate the matrix.
         */
        rotate(Number: number): any;
        /**
         * @name Two.Matrix#translate
         * @function
         * @param {Number} x - The horizontal translation value to apply.
         * @param {Number} y - The vertical translation value to apply.
         * @description Translate the matrix.
         */
        translate(x: number, y: number): any;
        /**
         * @name Two.Matrix#skewX
         * @function
         * @param {Number} Number - The amount to skew in Number.
         * @description Skew the matrix by an angle in the x axis direction.
         */
        skewX(Number: number): any;
        /**
         * @name Two.Matrix#skewY
         * @function
         * @param {Number} Number - The amount to skew in Number.
         * @description Skew the matrix by an angle in the y axis direction.
         */
        skewY(Number: number): any;
        /**
         * @name Two.Matrix#toString
         * @function
         * @param {Boolean} [fullMatrix=false] - Return the full 9 elements of the matrix or just 6 for 2D transformations.
         * @returns {String} - The transformation matrix as a 6 component string separated by spaces.
         * @description Create a transform string. Used for the Two.js rendering APIs.
         */
        toString(fullMatrix?: boolean): string;
        /**
         * @name Two.Matrix#toTransformArray
         * @function
         * @param {Boolean} [fullMatrix=false] - Return the full 9 elements of the matrix or just 6 in the format for 2D transformations.
         * @param {Number[]} [output] - An array empty or otherwise to apply the values to.
         * @description Create a transform array. Used for the Two.js rendering APIs.
         */
        toTransformArray(fullMatrix?: boolean, output?: number[]): any[];
        /**
         * @name Two.Matrix#toArray
         * @function
         * @param {Boolean} [fullMatrix=false] - Return the full 9 elements of the matrix or just 6 for 2D transformations.
         * @param {Number[]} [output] - An array empty or otherwise to apply the values to.
         * @description Create a transform array. Used for the Two.js rendering APIs.
         */
        toArray(fullMatrix?: boolean, output?: number[]): any[];
        /**
         * @name Two.Matrix#toObject
         * @function
         * @description Create a JSON compatible object that represents information of the matrix.
         */
        toObject(): {
            elements: any[];
            manual: boolean;
        };
        /**
         * @name Two.Matrix#clone
         * @function
         * @description Clone the current matrix.
         */
        clone(): any;
    }
    import { Events } from "two.js/src/events";
}
declare module "two.js/src/shape" {
    /**
     * @name Two.Shape
     * @class
     * @extends Two.Element
     * @description The foundational transformation object for the Two.js scenegraph.
     */
    export class Shape {
        /**
         * @name Two.Shape#_flagMatrix
         * @private
         * @property {Boolean} - Determines whether the matrix needs updating.
         */
        private _flagMatrix;
        /**
         * @name Two.Shape#_flagScale
         * @private
         * @property {Boolean} - Determines whether the scale needs updating.
         */
        private _flagScale;
        /**
         * @name Two.Shape#_matrix
         * @private
         * @property {Two.Matrix} - The matrix value of the shape's position, rotation, and scale.
         */
        private _matrix;
        /**
         * @name Two.Shape#_worldMatrix
         * @private
         * @property {Two.Matrix} - The matrix value of the shape's position, rotation, and scale in the scene.
         */
        private _worldMatrix;
        /**
         * @name Two.Shape#_position
         * @private
         * @property {Two.Vector} - The translation values as a {@link Two.Vector}.
         */
        private _position;
        /**
         * @name Two.Shape#_rotation
         * @private
         * @property {Number} - The rotation value in Number.
         */
        private _rotation;
        /**
         * @name Two.Shape#_scale
         * @private
         * @property {Number|Two.Vector} - The scale value in Number. Can be a vector for non-uniform scaling.
         */
        private _scale;
        /**
         * @name Two.Shape#_skewX
         * @private
         * @property {Number} - The rotation value in Number.
         */
        private _skewX;
        /**
         * @name Two.Shape#_skewY
         * @private
         * @property {Number} - The rotation value in Number.
         */
        private _skewY;
        isShape: boolean;
        /**
         * @name Two.Shape#id
         * @property {String} - Session specific unique identifier.
         * @nota-bene In the {@link Two.SvgRenderer} change this to change the underlying SVG element's id too.
         */
        id: string;
        /**
         * @name Two.Shape#matrix
         * @property {Two.Matrix}
         * @description The transformation matrix of the shape.
         * @nota-bene {@link Two.Shape#position}, {@link Two.Shape#rotation}, {@link Two.Shape#scale}, {@link Two.Shape#skewX}, and {@link Two.Shape#skewY} apply their values to the matrix when changed. The matrix is what is sent to the renderer to be drawn.
         */
        matrix: Matrix;
        /**
         * @name Two.Shape#worldMatrix
         * @property {Two.Matrix}
         * @description The transformation matrix of the shape in the scene.
         */
        worldMatrix: Matrix;
        /**
         * @name Two.Shape#position
         * @property {Two.Vector} - The x and y value for where the shape is placed relative to its parent.
         */
        position: Vector;
        /**
         * @name Two.Shape#rotation
         * @property {Number} - The value in Number for how much the shape is rotated relative to its parent.
         */
        rotation: number;
        /**
         * @name Two.Shape#scale
         * @property {Number} - The value for how much the shape is scaled relative to its parent.
         * @nota-bene This value can be replaced with a {@link Two.Vector} to do non-uniform scaling. e.g: `shape.scale = new Two.Vector(2, 1);`
         */
        scale: number;
        /**
         * @name Two.Shape#skewX
         * @property {Number} - The value in Number for how much the shape is skewed relative to its parent.
         * @description Skew the shape by an angle in the x axis direction.
         */
        skewX: number;
        /**
         * @name Two.Shape#skewY
         * @property {Number} - The value in Number for how much the shape is skewed relative to its parent.
         * @description Skew the shape by an angle in the y axis direction.
         */
        skewY: number;
        set renderer(arg: any);
        get renderer(): any;
        _renderer: any;
        set translation(arg: any);
        /**
         * @name Two.Shape#translation
         * @description Alias for {@link Two.Shape#position}.
         */
        get translation(): any;
        /**
         * @name Two.Shape#addTo
         * @function
         * @param {Two.Group} group - The parent the shape adds itself to.
         * @description Convenience method to add itself to the scenegraph.
         */
        addTo(group: any): Shape;
        /**
         * @name Two.Shape#remove
         * @function
         * @description Remove self from the scene / parent.
         */
        remove(): Shape;
        /**
         * @name Two.Shape#clone
         * @function
         * @param {Two.Group} [parent] - Optional argument to automatically add the shape to a scenegraph.
         * @returns {Two.Shape}
         * @description Create a new {@link Two.Shape} with the same values as the current shape.
         */
        clone(parent?: any): any;
        /**
         * @name Two.Shape#_update
         * @function
         * @private
         * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
         * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
         * @nota-bene Try not to call this method more than once a frame.
         */
        private _update;
        /**
         * @name Two.Shape#flagReset
         * @function
         * @private
         * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
         */
        private flagReset;
    }
    import { Matrix } from "two.js/src/matrix";
    import { Vector } from "two.js/src/vector";
}
declare module "two.js/src/collection" {
    /**
     * @name Two.Collection
     * @class
     * @extends Two.Events
     * @description An `Array` like object with additional event propagation on actions. `pop`, `shift`, and `splice` trigger `removed` events. `push`, `unshift`, and `splice` with more than 2 arguments trigger 'inserted'. Finally, `sort` and `reverse` trigger `order` events.
     */
    export class Collection {
        constructor(...args: any[]);
        /**
         * @private
         */
        private _events;
        set _bound(arg: boolean);
        get _bound(): boolean;
        addEventListener(...args: any[]): any;
        on(...args: any[]): any;
        bind(...args: any[]): any;
        removeEventListener(...args: any[]): any;
        off(...args: any[]): any;
        unbind(...args: any[]): any;
        dispatchEvent(...args: any[]): any;
        trigger(...args: any[]): any;
        listen(...args: any[]): any;
        ignore(...args: any[]): any;
        pop(...args: any[]): any;
        shift(...args: any[]): any;
        push(...args: any[]): any;
        unshift(...args: any[]): any;
        splice(...args: any[]): any;
        sort(...args: any[]): Collection;
        reverse(...args: any[]): Collection;
        indexOf(...args: any[]): any;
    }
}
declare module "two.js/src/children" {
    /**
     * @class
     * @name Two.Group.Children
     * @extends Two.Collection
     * @description A children collection which is accesible both by index and by object `id`.
     */
    export class Children {
        constructor(children: any, ...args: any[]);
        /**
         * @name Two.Group.Children#ids
         * @property {Object} - Map of all elements in the list keyed by `id`s.
         */
        ids: {};
        /**
         * @function
         * @name Two.Group.Children#attach
         * @param {Two.Shape[]} children - The objects which extend {@link Two.Shape} to be added.
         * @description Adds elements to the `ids` map.
         */
        attach(children: any[]): Children;
        /**
         * @function
         * @name Two.Group.Children#detach
         * @param {Two.Shape[]} children - The objects which extend {@link Two.Shape} to be removed.
         * @description Removes elements to the `ids` map.
         */
        detach(children: any[]): Children;
    }
}
declare module "two.js/src/group" {
    /**
     * @name Two.Group
     * @class
     * @extends Two.Shape
     * @param {Two.Shape[]} [children] - A list of objects that inherit {@link Two.Shape}. For instance, the array could be a {@link Two.Path}, {@link Two.Text}, and {@link Two.RoundedRectangle}.
     * @description This is the primary class for grouping objects that are then drawn in Two.js. In Illustrator this is a group, in After Effects it would be a Null Object. Whichever the case, the `Two.Group` contains a transformation matrix and commands to style its children, but it by itself doesn't render to the screen.
     * @nota-bene The {@link Two#scene} is an instance of `Two.Group`.
     */
    export class Group {
        static Children: typeof Children;
        /**
         * @name Two.Group.InsertChildren
         * @function
         * @param {Two.Shape[]} children - The objects to be inserted.
         * @description Cached method to let renderers know children have been added to a {@link Two.Group}.
         */
        static InsertChildren(children: any[]): void;
        /**
         * @name Two.Group.RemoveChildren
         * @function
         * @param {Two.Shape[]} children - The objects to be removed.
         * @description Cached method to let renderers know children have been removed from a {@link Two.Group}.
         */
        static RemoveChildren(children: any[]): void;
        /**
         * @name Two.Group.OrderChildren
         * @function
         * @description Cached method to let renderers know order has been updated on a {@link Two.Group}.
         */
        static OrderChildren(children: any): void;
        /**
         * @name Two.Group.Properties
         * @property {String[]} - A list of properties that are on every {@link Two.Group}.
         */
        static Properties: string[];
        constructor(children: any, ...args: any[]);
        /**
         * @name Two.Group#_flagAdditions
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Group#additions} needs updating.
         */
        private _flagAdditions;
        /**
         * @name Two.Group#_flagSubtractions
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Group#subtractions} needs updating.
         */
        private _flagSubtractions;
        /**
         * @name Two.Group#_flagOrder
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Group#order} needs updating.
         */
        private _flagOrder;
        /**
         * @name Two.Group#_flagVisible
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Group#visible} needs updating.
         */
        /**
         * @name Two.Group#_flagOpacity
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Group#opacity} needs updating.
         */
        private _flagOpacity;
        /**
         * @name Two.Group#_flagBeginning
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Group#beginning} needs updating.
         */
        private _flagBeginning;
        /**
         * @name Two.Group#_flagEnding
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Group#ending} needs updating.
         */
        private _flagEnding;
        /**
         * @name Two.Group#_flagLength
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Group#length} needs updating.
         */
        private _flagLength;
        /**
         * @name Two.Group#_flagMask
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Group#mask} needs updating.
         */
        private _flagMask;
        /**
         * @name Two.Group#fill
         * @property {(String|Two.Gradient|Two.Texture)} - The value of what all child shapes should be filled in with.
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
         */
        _fill: string;
        /**
         * @name Two.Group#stroke
         * @property {(String|Two.Gradient|Two.Texture)} - The value of what all child shapes should be outlined in with.
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
         */
        _stroke: string;
        /**
         * @name Two.Group#linewidth
         * @property {Number} - The thickness in pixels of the stroke for all child shapes.
         */
        _linewidth: number;
        /**
         * @name Two.Group#opacity
         * @property {Number} - The opaqueness of all child shapes.
         * @nota-bene Becomes multiplied by the individual child's opacity property.
         */
        _opacity: number;
        /**
         * @name Two.Group#visible
         * @property {Boolean} - Display the path or not.
         * @nota-bene For {@link Two.CanvasRenderer} and {@link Two.WebGLRenderer} when set to false all updating is disabled improving performance dramatically with many objects in the scene.
         */
        _visible: boolean;
        /**
         * @name Two.Group#cap
         * @property {String}
         * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeLinecapProperty}
         */
        _cap: string;
        /**
         * @name Two.Group#join
         * @property {String}
         * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeLinejoinProperty}
         */
        _join: string;
        /**
         * @name Two.Group#miter
         * @property {String}
         * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeMiterlimitProperty}
         */
        _miter: number;
        /**
         * @name Two.Group#closed
         * @property {Boolean} - Determines whether a final line is drawn between the final point in the `vertices` array and the first point of all child shapes.
         */
        _closed: boolean;
        /**
         * @name Two.Group#curved
         * @property {Boolean} - When the child's path is `automatic = true` this boolean determines whether the lines between the points are curved or not.
         */
        _curved: boolean;
        /**
         * @name Two.Group#automatic
         * @property {Boolean} - Determines whether or not Two.js should calculate curves, lines, and commands automatically for you or to let the developer manipulate them for themselves.
         */
        _automatic: boolean;
        /**
         * @name Two.Group#beginning
         * @property {Number} - Number between zero and one to state the beginning of where the path is rendered.
         * @description {@link Two.Group#beginning} is a percentage value that represents at what percentage into all child shapes should the renderer start drawing.
         * @nota-bene This is great for animating in and out stroked paths in conjunction with {@link Two.Group#ending}.
         */
        _beginning: number;
        /**
         * @name Two.Group#ending
         * @property {Number} - Number between zero and one to state the ending of where the path is rendered.
         * @description {@link Two.Group#ending} is a percentage value that represents at what percentage into all child shapes should the renderer start drawing.
         * @nota-bene This is great for animating in and out stroked paths in conjunction with {@link Two.Group#beginning}.
         */
        _ending: number;
        /**
         * @name Two.Group#length
         * @property {Number} - The sum of distances between all child lengths.
         */
        _length: number;
        /**
         * @name Two.Group#mask
         * @property {Two.Shape} - The Two.js object to clip from a group's rendering.
         */
        _mask: any;
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
         * @name Two.Group#children
         * @property {Two.Group.Children}
         * @description A list of all the children in the scenegraph.
         * @nota-bene Ther order of this list indicates the order each element is rendered to the screen.
         */
        children: any;
        /**
         * @name Two.Group#clone
         * @function
         * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
         * @returns {Two.Group}
         * @description Create a new instance of {@link Two.Group} with the same properties of the current group.
         */
        clone(parent?: any): any;
        /**
         * @name Two.Group#toObject
         * @function
         * @returns {Object}
         * @description Return a JSON compatible plain object that represents the group.
         */
        toObject(): any;
        /**
         * @name Two.Group#corner
         * @function
         * @description Orient the children of the group to the upper left-hand corner of that group.
         */
        corner(): Group;
        /**
         * @name Two.Group#center
         * @function
         * @description Orient the children of the group to the center of that group.
         */
        center(): Group;
        /**
         * @name Two.Group#getById
         * @function
         * @description Recursively search for id. Returns the first element found.
         * @returns {Two.Shape} - Or `null` if nothing is found.
         */
        getById(id: any): any;
        /**
         * @name Two.Group#getByClassName
         * @function
         * @description Recursively search for classes. Returns an array of matching elements.
         * @returns {Two.Shape[]} - Or empty array if nothing is found.
         */
        getByClassName(className: any): any[];
        /**
         * @name Two.Group#getByType
         * @function
         * @description Recursively search for children of a specific type, e.g. {@link Two.Path}. Pass a reference to this type as the param. Returns an array of matching elements.
         * @returns {Two.Shape[]} - Empty array if nothing is found.
         */
        getByType(type: any): any[];
        /**
         * @name Two.Group#add
         * @function
         * @param {Two.Shape[]|...Two.Shape} objects - An array of objects to be added. Can be also be supplied as individual arguments.
         * @description Add objects to the group.
         */
        add(objects: any, ...args: any[]): Group;
        /**
         * @name Two.Group#remove
         * @function
         * @param {Two.Shape[]|...Two.Shape} [objects=self] - An array of objects to be removed. Can be also removed as individual arguments. If no arguments are passed, then it removes itself from its parent.
         * @description Remove objects from the group.
         */
        remove(objects: any, ...args: any[]): Group;
        /**
         * @name Two.Group#getBoundingClientRect
         * @function
         * @param {Boolean} [shallow=false] - Describes whether to calculate off local matrix or world matrix.
         * @returns {Object} - Returns object with top, left, right, bottom, width, height attributes.
         * @description Return an object with top, left, right, bottom, width, and height parameters of the group.
         */
        getBoundingClientRect(shallow?: boolean): any;
        /**
         * @name Two.Group#noFill
         * @function
         * @description Apply `noFill` method to all child shapes.
         */
        noFill(): Group;
        /**
         * @name Two.Group#noStroke
         * @function
         * @description Apply `noStroke` method to all child shapes.
         */
        noStroke(): Group;
        /**
         * @name Two.Group#subdivide
         * @function
         * @description Apply `subdivide` method to all child shapes.
         */
        subdivide(...args: any[]): Group;
        /**
         * @name Two.Group#_update
         * @function
         * @private
         * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
         * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
         * @nota-bene Try not to call this method more than once a frame.
         */
        private _update;
        /**
         * @name Two.Group#flagReset
         * @function
         * @private
         * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
         */
        private flagReset;
    }
    import { Children } from "two.js/src/children";
}
declare module "two.js/src/renderers/canvas" {
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
    export class Renderer {
        /**
         * @name Two.CanvasRenderer.Utils
         * @property {Object} - A massive object filled with utility functions and properties to render Two.js objects to a `<canvas />`.
         */
        static Utils: {
            isHidden: RegExp;
            alignments: {
                left: string;
                middle: string;
                right: string;
            };
            shim: (elem: any, name: any) => any;
            group: {
                renderChild: (child: any) => void;
                render: (ctx: any) => any;
            };
            path: {
                render: (ctx: any, forced: any, parentClipped: any) => any;
            };
            points: {
                render: (ctx: any, forced: any, parentClipped: any) => any;
            };
            text: {
                render: (ctx: any, forced: any, parentClipped: any) => any;
            };
            'linear-gradient': {
                render: (ctx: any, parent: any) => any;
            };
            'radial-gradient': {
                render: (ctx: any, parent: any) => any;
            };
            texture: {
                render: (ctx: any) => any;
            };
            renderSvgArcCommand: (ctx: any, ax: any, ay: any, rx: any, ry: any, largeArcFlag: any, sweepFlag: any, xAxisRotation: any, x: any, y: any) => void;
        };
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
        /**
         * @name Two.CanvasRenderer#setSize
         * @function
         * @fires resize
         * @param {Number} width - The new width of the renderer.
         * @param {Number} height - The new height of the renderer.
         * @param {Number} [ratio] - The new pixel ratio (pixel density) of the renderer. Defaults to calculate the pixel density of the user's screen.
         * @description Change the size of the renderer.
         */
        setSize(width: number, height: number, ratio?: number): any;
        width: number;
        height: number;
        ratio: number;
        /**
         * @name Two.CanvasRenderer#render
         * @function
         * @description Render the current scene to the `<canvas />`.
         */
        render(): Renderer;
    }
    import { Group } from "two.js/src/group";
}
declare module "two.js/src/utils/canvas-shim" {
    export namespace CanvasShim {
        export const Image: any;
        export const isHeadless: boolean;
        export function shim(canvas: any, Image?: new (width?: number, height?: number) => HTMLImageElement): any;
    }
}
declare module "two.js/src/utils/dom" {
    export namespace dom {
        export const temp: any;
    }
}
declare module "two.js/src/utils/error" {
    /**
     * @name Two.Utils.Error
     * @class
     * @description Custom error throwing for Two.js specific identification.
     */
    export class TwoError extends Error {
        constructor(message: any);
    }
}
declare module "two.js/src/registry" {
    /**
     * @name Two.Registry
     * @class
     * @description An arbitrary class to manage a directory of things. Mainly used for keeping tabs of textures in Two.js.
     */
    export class Registry {
        map: {};
        /**
         * @name Two.Registry#add
         * @function
         * @param {String} id - A unique identifier.
         * @param value - Any type of variable to be registered to the directory.
         * @description Adds any value to the directory. Assigned by the `id`.
         */
        add(id: string, obj: any): Registry;
        /**
         * @name Two.Registry#remove
         * @function
         * @param {String} id - A unique identifier.
         * @description Remove any value from the directory by its `id`.
         */
        remove(id: string): Registry;
        /**
         * @name Two.Registry#get
         * @function
         * @param {String} id - A unique identifier.
         * @returns {?Object} The associated value. If unavailable then `undefined` is returned.
         * @description Get a registered value by its `id`.
         */
        get(id: string): any | null;
        /**
         * @name Two.Registry#contains
         * @function
         * @param {String} id - A unique identifier.
         * @returns {Boolean}
         * @description Convenience method to see if a value is registered to an `id` already.
         */
        contains(id: string): boolean;
    }
}
declare module "two.js/src/utils/shape" {
    /**
     * @private
     * @param {Two.Path} path - The path to analyze against.
     * @param {Number} t -
     * @returns {Number}
     * @description
     */
    export function contains(path: any, t: number): number;
    /**
     * @private
     * @param {Two.Path} path - The path to analyze against.
     * @param {Number} target - The target length at which to find an anchor.
     * @returns {Number}
     * @description Return the id of an anchor based on a target length.
     */
    export function getIdByLength(path: any, target: number): number;
    export function getCurveLength(a: any, b: any, limit: any): number;
    export function getSubdivisions(a: any, b: any, limit: any): import("two.js/src/anchor").Anchor[];
}
declare module "two.js/src/effects/stop" {
    /**
     * @name Two.Stop
     * @class
     * @extends Two.Element
     * @param {Number} [offset] - The offset percentage of the stop represented as a zero-to-one value. Default value flip flops from zero-to-one as new stops are created.
     * @param {String} [color] - The color of the stop. Default value flip flops from white to black as new stops are created.
     * @param {Number} [opacity] - The opacity value. Default value is 1, cannot be lower than 0.
     * @nota-bene Used specifically in conjunction with {@link Two.Gradient}s to control color graduation.
     */
    export class Stop {
        /**
         * @name Two.Stop.Index
         * @property {Number} - The current index being referenced for calculating a stop's default offset value.
         */
        static Index: number;
        /**
         * @name Two.Stop.Properties
         * @property {String[]} - A list of properties that are on every {@link Two.Stop}.
         */
        static Properties: string[];
        constructor(offset: any, color: any, opacity: any);
        /**
         * @name Two.Stop#_flagOffset
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Stop#offset} needs updating.
         */
        private _flagOffset;
        /**
         * @name Two.Stop#_flagOpacity
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Stop#opacity} needs updating.
         */
        private _flagOpacity;
        /**
         * @name Two.Stop#_flagColor
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Stop#color} needs updating.
         */
        private _flagColor;
        /**
         * @name Two.Stop#_offset
         * @private
         * @see {@link Two.Stop#offset}
         */
        private _offset;
        /**
         * @name Two.Stop#_opacity
         * @private
         * @see {@link Two.Stop#opacity}
         */
        private _opacity;
        /**
         * @name Two.Stop#_color
         * @private
         * @see {@link Two.Stop#color}
         */
        private _color;
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
         * @property {String} - The color of the stop.
         */
        color: string;
        /**
         * @name Two.Stop#clone
         * @function
         * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
         * @returns {Two.Stop}
         * @description Create a new instance of {@link Two.Stop} with the same properties of the current path.
         */
        clone(): any;
        /**
         * @name Two.Stop#toObject
         * @function
         * @returns {Object}
         * @description Return a JSON compatible plain object that represents the path.
         */
        toObject(): any;
        /**
         * @name Two.Stop#flagReset
         * @function
         * @private
         * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
         */
        private flagReset;
    }
}
declare module "two.js/src/effects/gradient" {
    /**
     * @name Two.Gradient
     * @class
     * @extends Two.Element
     * @param {Two.Stop[]} [stops] - A list of {@link Two.Stop}s that contain the gradient fill pattern for the gradient.
     * @description This is the base class for constructing different types of gradients with Two.js. The two common gradients are {@link Two.LinearGradient} and {@link Two.RadialGradient}.
     */
    export class Gradient {
        /**
         * @name Two.Gradient.Stop
         * @see {@link Two.Stop}
         */
        static Stop: typeof Stop;
        /**
         * @name Two.Gradient.Properties
         * @property {String[]} - A list of properties that are on every {@link Two.Gradient}.
         */
        static Properties: string[];
        constructor(stops: any);
        _flagStops: boolean;
        _flagSpread: boolean;
        _flagUnits: boolean;
        _spread: string;
        _units: string;
        /**
         * @name Two.Gradient#renderer
         * @property {Object}
         * @description Object access to store relevant renderer specific variables. Warning: manipulating this object can create unintended consequences.
         * @nota-bene With the {@link Two.SvgRenderer} you can access the underlying SVG element created via `shape.renderer.elem`.
         */
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
        /**
         * @name Two.Gradient#units
         * @property {String} [units='objectBoundingBox'] - Indicates how coordinate values are interpreted by the renderer. Possible values are `'userSpaceOnUse'` and `'objectBoundingBox'`.
         * @see {@link https://www.w3.org/TR/SVG11/pservers.html#RadialGradientElementGradientUnitsAttribute} for more information
         */
        units: string;
        stops: any;
        /**
         * @name Two.Gradient#clone
         * @function
         * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
         * @returns {Two.Gradient}
         * @description Create a new instance of {@link Two.Gradient} with the same properties of the current path.
         */
        clone(parent?: any): any;
        /**
         * @name Two.Gradient#toObject
         * @function
         * @returns {Object}
         * @description Return a JSON compatible plain object that represents the path.
         */
        toObject(): any;
        /**
         * @name Two.Gradient#_update
         * @function
         * @private
         * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
         * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
         * @nota-bene Try not to call this method more than once a frame.
         */
        private _update;
        /**
         * @name Two.Gradient#flagReset
         * @function
         * @private
         * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
         */
        private flagReset;
    }
    import { Stop } from "two.js/src/effects/stop";
}
declare module "two.js/src/effects/linear-gradient" {
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
    export class LinearGradient {
        static Properties: string[];
        /**
         * @name Two.LinearGradient.Stop
         * @see {@link Two.Stop}
         */
        static Stop: typeof Stop;
        constructor(x1: any, y1: any, x2: any, y2: any, stops: any);
        /**
         * @name Two.LinearGradient#_flagEndPoints
         * @private
         * @property {Boolean} - Determines whether the {@link Two.LinearGradient#left} or {@link Two.LinearGradient#right} changed and needs to update.
         */
        private _flagEndPoints;
        _left: any;
        _right: any;
        /**
         * @name Two.LinearGradient#left
         * @property {Two.Vector} - The x and y value for where the first end point is placed on the canvas.
         */
        left: Vector;
        /**
         * @name Two.LinearGradient#right
         * @property {Two.Vector} - The x and y value for where the second end point is placed on the canvas.
         */
        right: Vector;
        /**
         * @name Two.LinearGradient#clone
         * @function
         * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
         * @returns {Two.Gradient}
         * @description Create a new instance of {@link Two.LinearGradient} with the same properties of the current path.
         */
        clone(parent?: any): any;
        /**
         * @name Two.LinearGradient#toObject
         * @function
         * @returns {Object}
         * @description Return a JSON compatible plain object that represents the path.
         */
        toObject(): any;
        /**
         * @name Two.LinearGradient#_update
         * @function
         * @private
         * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
         * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
         * @nota-bene Try not to call this method more than once a frame.
         */
        private _update;
        /**
         * @name Two.LinearGradient#flagReset
         * @function
         * @private
         * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
         */
        private flagReset;
    }
    import { Vector } from "two.js/src/vector";
    import { Stop } from "two.js/src/effects/stop";
}
declare module "two.js/src/effects/radial-gradient" {
    /**
     * @name Two.RadialGradient
     * @class
     * @extends Two.Gradient
     * @param {Number} [x=0] - The x position of the origin of the radial gradient.
     * @param {Number} [y=0] - The y position of the origin of the radial gradient.
     * @param {Number} [radius=0] - The radius of the radial gradient.
     * @param {Two.Stop[]} [stops] - A list of {@link Two.Stop}s that contain the gradient fill pattern for the gradient.
     * @param {Number} [focalX=0] - The x position of the focal point on the radial gradient.
     * @param {Number} [focalY=0] - The y position of the focal point on the radial gradient.
     * @nota-bene The radial gradient lives within the space of the parent object's matrix space.
     */
    export class RadialGradient {
        /**
         * @name Two.RadialGradient.Stop
         * @see {@link Two.Stop}
         */
        static Stop: typeof Stop;
        /**
         * @name Two.RadialGradient.Properties
         * @property {String[]} - A list of properties that are on every {@link Two.RadialGradient}.
         */
        static Properties: string[];
        constructor(cx: any, cy: any, r: any, stops: any, fx: any, fy: any);
        /**
         * @name Two.RadialGradient#_flagRadius
         * @private
         * @property {Boolean} - Determines whether the {@link Two.RadialGradient#radius} changed and needs to update.
         */
        private _flagRadius;
        /**
         * @name Two.RadialGradient#_flagCenter
         * @private
         * @property {Boolean} - Determines whether the {@link Two.RadialGradient#center} changed and needs to update.
         */
        private _flagCenter;
        /**
         * @name Two.RadialGradient#_flagFocal
         * @private
         * @property {Boolean} - Determines whether the {@link Two.RadialGradient#focal} changed and needs to update.
         */
        private _flagFocal;
        _radius: number;
        _center: any;
        _focal: any;
        /**
         * @name Two.RadialGradient#center
         * @property {Two.Vector} - The x and y value for where the origin of the radial gradient is.
         */
        center: Vector;
        radius: number;
        /**
         * @name Two.RadialGradient#focal
         * @property {Two.Vector} - The x and y value for where the focal point of the radial gradient is.
         * @nota-bene This effects the spray or spread of the radial gradient.
         */
        focal: Vector;
        /**
         * @name Two.RadialGradient#clone
         * @function
         * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
         * @returns {Two.Gradient}
         * @description Create a new instance of {@link Two.RadialGradient} with the same properties of the current path.
         */
        clone(parent?: any): any;
        /**
         * @name Two.RadialGradient#toObject
         * @function
         * @returns {Object}
         * @description Return a JSON compatible plain object that represents the path.
         */
        toObject(): any;
        /**
         * @name Two.RadialGradient#_update
         * @function
         * @private
         * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
         * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
         * @nota-bene Try not to call this method more than once a frame.
         */
        private _update;
        /**
         * @name Two.RadialGradient#flagReset
         * @function
         * @private
         * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
         */
        private flagReset;
    }
    import { Vector } from "two.js/src/vector";
    import { Stop } from "two.js/src/effects/stop";
}
declare module "two.js/src/effects/texture" {
    /**
     * @name Two.Texture
     * @class
     * @extends Two.Element
     * @param {String|HTMLImageElement} [src] - The URL path to an image file or an `<img />` element.
     * @param {Function} [callback] - An optional callback function once the image has been loaded.
     * @description Fundamental to work with bitmap data, a.k.a. pregenerated imagery, in Two.js. Supported formats include jpg, png, gif, and tiff. See {@link Two.Texture.RegularExpressions} for a full list of supported formats.
     */
    export class Texture {
        /**
         * @name Two.Texture.Properties
         * @property {String[]} - A list of properties that are on every {@link Two.Texture}.
         */
        static Properties: string[];
        /**
         * @name Two.Texture.RegularExpressions
         * @property {Object} - A map of compatible DOM Elements categorized by media format.
         */
        static RegularExpressions: {
            video: RegExp;
            image: RegExp;
            effect: RegExp;
        };
        /**
         * @name Two.Texture.ImageRegistry
         * @property {Two.Registry} - A canonical listing of image data used in a single session of Two.js.
         * @nota-bene This object is used to cache image data between different textures.
         */
        static ImageRegistry: Registry;
        /**
         * @name Two.Texture.getAbsoluteURL
         * @property {Function} - Serializes a URL as an absolute path for canonical attribution in {@link Two.ImageRegistry}.
         * @param {String} path
         * @returns {String} - The serialized absolute path.
         */
        static getAbsoluteURL(path: string): string;
        /**
         * @name Two.Texture.loadHeadlessBuffer
         * @property {Function} - Loads an image as a buffer in headless environments.
         * @param {Two.Texture} texture - The {@link Two.Texture} to be loaded.
         * @param {Function} loaded - The callback function to be triggered once the image is loaded.
         * @nota-bene - This function uses node's `fs.readFileSync` to spoof the `<img />` loading process in the browser.
         */
        static loadHeadlessBuffer(texture: any, loaded: Function): void;
        /**
         * @name Two.Texture.getTag
         * @property {Function} - Retrieves the tag name of an image, video, or canvas node.
         * @param {HTMLImageElement} - The image to infer the tag name from.
         * @returns {String} - Returns the tag name of an image, video, or canvas node.
         */
        static getTag(image: any): string;
        /**
         * @name Two.Texture.getImage
         * @property {Function} - Convenience function to set {@link Two.Texture#image} properties with canonincal versions set in {@link Two.Texture.ImageRegistry}.
         * @param {String} src - The URL path of the image.
         * @returns {HTMLImageElement} - Returns either a cached version of the image or a new one that is registered in {@link Two.Texture.ImageRegistry}.
         */
        static getImage(src: string): HTMLImageElement;
        /**
         * @name Two.Register
         * @interface
         * @description A collection of functions to register different types of textures. Used internally by a {@link Two.Texture}.
         */
        static Register: {
            canvas: (texture: any, callback: any) => void;
            img: (texture: any, callback: any) => void;
            video: (texture: any, callback: any) => void;
        };
        /**
         * @name Two.Texture.load
         * @function
         * @param {Two.Texture} texture - The texture to load.
         * @param {Function} callback - The function to be called once the texture is loaded.
         */
        static load(texture: any, callback: Function): void;
        constructor(src: any, callback: any);
        /**
         * @name Two.Texture#_flagSrc
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Texture#src} needs updating.
         */
        private _flagSrc;
        /**
         * @name Two.Texture#_flagImage
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Texture#image} needs updating.
         */
        private _flagImage;
        /**
         * @name Two.Texture#_flagVideo
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Texture#video} needs updating.
         */
        private _flagVideo;
        /**
         * @name Two.Texture#_flagLoaded
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Texture#loaded} needs updating.
         */
        private _flagLoaded;
        /**
         * @name Two.Texture#_flagRepeat
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Texture#repeat} needs updating.
         */
        private _flagRepeat;
        /**
         * @name Two.Texture#_flagOffset
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Texture#offset} needs updating.
         */
        private _flagOffset;
        /**
         * @name Two.Texture#_flagScale
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Texture#scale} needs updating.
         */
        private _flagScale;
        /**
         * @name Two.Texture#_src
         * @private
         * @see {@link Two.Texture#src}
         */
        private _src;
        /**
         * @name Two.Texture#_image
         * @private
         * @see {@link Two.Texture#image}
         */
        private _image;
        /**
         * @name Two.Texture#_loaded
         * @private
         * @see {@link Two.Texture#loaded}
         */
        private _loaded;
        /**
         * @name Two.Texture#_repeat
         * @private
         * @see {@link Two.Texture#repeat}
         */
        private _repeat;
        /**
         * @name Two.Texture#_scale
         * @private
         * @see {@link Two.Texture#scale}
         */
        private _scale;
        /**
         * @name Two.Texture#_offset
         * @private
         * @see {@link Two.Texture#offset}
         */
        private _offset;
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
        /**
         * @name Two.Texture#clone
         * @function
         * @returns {Two.Texture}
         * @description Create a new instance of {@link Two.Texture} with the same properties of the current texture.
         */
        clone(): any;
        /**
         * @name Two.Texture#toObject
         * @function
         * @returns {Object}
         * @description Return a JSON compatible plain object that represents the texture.
         */
        toObject(): any;
        /**
         * @name Two.Texture#_update
         * @function
         * @private
         * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
         * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
         * @nota-bene Try not to call this method more than once a frame.
         */
        private _update;
        /**
         * @name Two.Texture#flagReset
         * @function
         * @private
         * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
         */
        private flagReset;
    }
    import { Vector } from "two.js/src/vector";
    import { Registry } from "two.js/src/registry";
}
declare module "two.js/src/path" {
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
    export class Path {
        /**
         * @name Two.Path.Properties
         * @property {String[]} - A list of properties that are on every {@link Two.Path}.
         */
        static Properties: string[];
        static Utils: {
            getCurveLength: typeof getCurveLength;
        };
        constructor(vertices: any, closed: any, curved: any, manual: any);
        /**
         * @name Two.Path#_flagVertices
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Path#vertices} need updating.
         */
        private _flagVertices;
        /**
         * @name Two.Path#_flagLength
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Path#length} needs updating.
         */
        private _flagLength;
        /**
         * @name Two.Path#_flagFill
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Path#fill} needs updating.
         */
        private _flagFill;
        /**
         * @name Two.Path#_flagStroke
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Path#stroke} needs updating.
         */
        private _flagStroke;
        /**
         * @name Two.Path#_flagLinewidth
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Path#linewidth} needs updating.
         */
        private _flagLinewidth;
        /**
         * @name Two.Path#_flagOpacity
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Path#opacity} needs updating.
         */
        private _flagOpacity;
        /**
         * @name Two.Path#_flagVisible
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Path#visible} needs updating.
         */
        private _flagVisible;
        /**
         * @name Two.Path#_flagCap
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Path#cap} needs updating.
         */
        private _flagCap;
        /**
         * @name Two.Path#_flagJoin
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Path#join} needs updating.
         */
        private _flagJoin;
        /**
         * @name Two.Path#_flagMiter
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Path#miter} needs updating.
         */
        private _flagMiter;
        /**
         * @name Two.Path#_flagMask
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Path#mask} needs updating.
         */
        private _flagMask;
        /**
         * @name Two.Path#_flagClip
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Path#clip} needs updating.
         */
        private _flagClip;
        /**
         * @name Two.Path#_length
         * @private
         * @see {@link Two.Path#length}
         */
        private _length;
        /**
         * @name Two.Path#_fill
         * @private
         * @see {@link Two.Path#fill}
         */
        private _fill;
        /**
         * @name Two.Path#_stroke
         * @private
         * @see {@link Two.Path#stroke}
         */
        private _stroke;
        /**
         * @name Two.Path#_linewidth
         * @private
         * @see {@link Two.Path#linewidth}
         */
        private _linewidth;
        /**
         * @name Two.Path#_opacity
         * @private
         * @see {@link Two.Path#opacity}
         */
        private _opacity;
        /**
         * @name Two.Path#_visible
         * @private
         * @see {@link Two.Path#visible}
         */
        private _visible;
        /**
         * @name Two.Path#_cap
         * @private
         * @see {@link Two.Path#cap}
         */
        private _cap;
        /**
         * @name Two.Path#_join
         * @private
         * @see {@link Two.Path#join}
         */
        private _join;
        /**
         * @name Two.Path#_miter
         * @private
         * @see {@link Two.Path#miter}
         */
        private _miter;
        /**
         * @name Two.Path#_closed
         * @private
         * @see {@link Two.Path#closed}
         */
        private _closed;
        /**
         * @name Two.Path#_curved
         * @private
         * @see {@link Two.Path#curved}
         */
        private _curved;
        /**
         * @name Two.Path#_automatic
         * @private
         * @see {@link Two.Path#automatic}
         */
        private _automatic;
        /**
         * @name Two.Path#_beginning
         * @private
         * @see {@link Two.Path#beginning}
         */
        private _beginning;
        /**
         * @name Two.Path#_ending
         * @private
         * @see {@link Two.Path#ending}
         */
        private _ending;
        /**
         * @name Two.Path#_mask
         * @private
         * @see {@link Two.Path#mask}
         */
        private _mask;
        /**
         * @name Two.Path#_clip
         * @private
         * @see {@link Two.Path#clip}
         */
        private _clip;
        /**
         * @name Two.Path#_dashes
         * @private
         * @see {@link Two.Path#dashes}
         */
        private _dashes;
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
         * @property {(String|Two.Gradient|Two.Texture)} - The value of what the path should be filled in with.
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
         */
        fill: string;
        /**
         * @name Two.Path#stroke
         * @property {(String|Two.Gradient|Two.Texture)} - The value of what the path should be outlined in with.
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
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
         * @nota-bene The array when manipulating is actually a {@link Two.Collection}.
         */
        vertices: any;
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
        /**
         * @name Two.Path#clone
         * @function
         * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
         * @returns {Two.Path}
         * @description Create a new instance of {@link Two.Path} with the same properties of the current path.
         */
        clone(parent?: any): any;
        /**
         * @name Two.Path#toObject
         * @function
         * @returns {Object}
         * @description Return a JSON compatible plain object that represents the path.
         */
        toObject(): any;
        /**
         * @name Two.Path#noFill
         * @function
         * @description Short hand method to set fill to `transparent`.
         */
        noFill(): Path;
        /**
         * @name Two.Path#noStroke
         * @function
         * @description Short hand method to set stroke to `transparent`.
         */
        noStroke(): Path;
        /**
         * @name Two.Path#corner
         * @function
         * @description Orient the vertices of the shape to the upper left-hand corner of the path.
         */
        corner(): Path;
        /**
         * @name Two.Path#center
         * @function
         * @description Orient the vertices of the shape to the center of the path.
         */
        center(): Path;
        /**
         * @name Two.Path#getBoundingClientRect
         * @function
         * @param {Boolean} [shallow=false] - Describes whether to calculate off local matrix or world matrix.
         * @returns {Object} - Returns object with top, left, right, bottom, width, height attributes.
         * @description Return an object with top, left, right, bottom, width, and height parameters of the path.
         */
        getBoundingClientRect(shallow?: boolean): any;
        /**
         * @name Two.Path#getPointAt
         * @function
         * @param {Boolean} t - Percentage value describing where on the {@link Two.Path} to estimate and assign coordinate values.
         * @param {Two.Vector} [object] - Object to apply calculated x, y to. If none available returns new `Object`.
         * @returns {Object}
         * @description Given a float `t` from 0 to 1, return a point or assign a passed `obj`'s coordinates to that percentage on this {@link Two.Path}'s curve.
         */
        getPointAt(t: boolean, obj: any): any;
        /**
         * @name Two.Path#plot
         * @function
         * @description Based on closed / curved and sorting of vertices plot where all points should be and where the respective handles should be too.
         * @nota-bene While this method is public it is internally called by {@link Two.Path#_update} when `automatic = true`.
         */
        plot(): Path;
        /**
         * @name Two.Path#subdivide
         * @function
         * @param {Number} limit - How many times to recurse subdivisions.
         * @description Insert a {@link Two.Anchor} at the midpoint between every item in {@link Two.Path#vertices}.
         */
        subdivide(limit: number): Path;
        /**
         * @name Two.Path#_updateLength
         * @function
         * @private
         * @param {Number} [limit] -
         * @param {Boolean} [silent=false] - If set to `true` then the path isn't updated before calculation. Useful for internal use.
         * @description Recalculate the {@link Two.Path#length} value.
         */
        private _updateLength;
        _lengths: any[];
        /**
         * @name Two.Path#_update
         * @function
         * @private
         * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
         * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
         * @nota-bene Try not to call this method more than once a frame.
         */
        private _update;
        /**
         * @name Two.Path#flagReset
         * @function
         * @private
         * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
         */
        private flagReset;
    }
    import { getCurveLength } from "two.js/src/utils/shape";
    /**
     * @name FlagVertices
     * @private
     * @function
     * @description Cached method to let renderers know vertices have been updated on a {@link Two.Path}.
     */
    export function FlagVertices(): void;
    export class FlagVertices {
        _flagVertices: boolean;
        _flagLength: boolean;
    }
    /**
     * @name BindVertices
     * @private
     * @function
     * @description Cached method to let {@link Two.Path} know vertices have been added to the instance.
     */
    export function BindVertices(items: any): void;
    /**
     * @name UnbindVertices
     * @private
     * @function
     * @description Cached method to let {@link Two.Path} know vertices have been removed from the instance.
     */
    export function UnbindVertices(items: any): void;
    /**
     * @name FlagFill
     * @private
     * @function
     * @description Cached method to let {@link Two.Path} know the fill has changed.
     */
    export function FlagFill(): void;
    export class FlagFill {
        _flagFill: boolean;
    }
    /**
     * @name FlagFill
     * @private
     * @function
     * @description Cached method to let {@link Two.Path} know the stroke has changed.
     */
    export function FlagStroke(): void;
    export class FlagStroke {
        _flagStroke: boolean;
    }
}
declare module "two.js/src/shapes/rectangle" {
    /**
     * @name Two.Rectangle
     * @class
     * @extends Two.Path
     * @param {Number} [x=0] - The x position of the rectangle.
     * @param {Number} [y=0] - The y position of the rectangle.
     * @param {Number} [width] - The width value of the rectangle.
     * @param {Number} [height] - The width value of the rectangle.
     */
    export class Rectangle {
        /**
         * @name Two.Rectangle.Properties
         * @property {String[]} - A list of properties that are on every {@link Two.Rectangle}.
         */
        static Properties: string[];
        constructor(x: any, y: any, width: any, height: any);
        /**
         * @name Two.Rectangle#width
         * @property {Number} - The size of the width of the rectangle.
         */
        width: any;
        /**
         * @name Two.Rectangle#height
         * @property {Number} - The size of the height of the rectangle.
         */
        height: any;
        /**
         * @name Two.Rectangle#origin
         * @property {Number} - A two-component vector describing the origin offset to draw the rectangle. Default is `0, 0`.
         */
        origin: Vector;
        /**
         * @name Two.Rectangle#_flagWidth
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Rectangle#width} needs updating.
         */
        private _flagWidth;
        /**
         * @name Two.Rectangle#_flagHeight
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Rectangle#height} needs updating.
         */
        private _flagHeight;
        /**
         * @name Two.Rectangle#_width
         * @private
         * @see {@link Two.Rectangle#width}
         */
        private _width;
        /**
         * @name Two.Rectangle#_height
         * @private
         * @see {@link Two.Rectangle#height}
         */
        private _height;
        _origin: any;
        /**
         * @name Two.Rectangle#_update
         * @function
         * @private
         * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
         * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
         * @nota-bene Try not to call this method more than once a frame.
         */
        private _update;
        /**
         * @name Two.Rectangle#flagReset
         * @function
         * @private
         * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
         */
        private flagReset;
        /**
         * @name Two.Rectangle#clone
         * @function
         * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
         * @returns {Two.Rectangle}
         * @description Create a new instance of {@link Two.Rectangle} with the same properties of the current path.
         */
        clone(parent?: any): any;
        /**
         * @name Two.Rectangle#toObject
         * @function
         * @returns {Object}
         * @description Return a JSON compatible plain object that represents the path.
         */
        toObject(): any;
    }
    import { Vector } from "two.js/src/vector";
}
declare module "two.js/src/effects/sprite" {
    /**
     * @name Two.Sprite
     * @class
     * @extends Two.Rectangle
     * @param {String|Two.Texture} [path] - The URL path or {@link Two.Texture} to be used as the bitmap data displayed on the sprite.
     * @param {Number} [ox=0] - The initial `x` position of the Two.Sprite.
     * @param {Number} [oy=0] - The initial `y` position of the Two.Sprite.
     * @param {Number} [cols=1] - The number of columns the sprite contains.
     * @param {Number} [rows=1] - The number of rows the sprite contains.
     * @param {Number} [frameRate=0] - The frame rate at which the partitions of the image should playback at.
     * @description A convenient package to display still or animated images through a tiled image source. For more information on the principals of animated imagery through tiling see [Texture Atlas](https://en.wikipedia.org/wiki/Texture_atlas) on Wikipedia.
     */
    export class Sprite {
        /**
         * @name Two.Sprite.Properties
         * @property {String[]} - A list of properties that are on every {@link Two.Sprite}.
         */
        static Properties: string[];
        constructor(path: any, ox: any, oy: any, cols: any, rows: any, frameRate: any);
        /**
         * @name Two.Sprite#_flagTexture
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Sprite#texture} needs updating.
         */
        private _flagTexture;
        /**
         * @name Two.Sprite#_flagColumns
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Sprite#columns} need updating.
         */
        private _flagColumns;
        /**
         * @name Two.Sprite#_flagRows
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Sprite#rows} need updating.
         */
        private _flagRows;
        /**
         * @name Two.Sprite#_flagFrameRate
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Sprite#flagFrameRate} needs updating.
         */
        private _flagFrameRate;
        /**
         * @name Two.Sprite#_flagIndex
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Sprite#index} needs updating.
         */
        private _flagIndex;
        /**
         * @name Two.Sprite#_amount
         * @private
         * @property {Number} - Number of frames for a given {@link Two.Sprite}.
         */
        private _amount;
        /**
         * @name Two.Sprite#_duration
         * @private
         * @property {Number} - Number of milliseconds a {@link Two.Sprite}.
         */
        private _duration;
        /**
         * @name Two.Sprite#_startTime
         * @private
         * @property {Milliseconds} - Epoch time in milliseconds of when the {@link Two.Sprite} started.
         */
        private _startTime;
        /**
         * @name Two.Sprite#_playing
         * @private
         * @property {Boolean} - Dictates whether the {@link Two.Sprite} is animating or not.
         */
        private _playing;
        /**
         * @name Two.Sprite#_firstFrame
         * @private
         * @property {Number} - The frame the {@link Two.Sprite} should start with.
         */
        private _firstFrame;
        /**
         * @name Two.Sprite#_lastFrame
         * @private
         * @property {Number} - The frame the {@link Two.Sprite} should end with.
         */
        private _lastFrame;
        /**
         * @name Two.Sprite#_playing
         * @private
         * @property {Boolean} - Dictates whether the {@link Two.Sprite} should loop or not.
         */
        private _loop;
        /**
         * @name Two.Sprite#_texture
         * @private
         * @see {@link Two.Sprite#texture}
         */
        private _texture;
        /**
         * @name Two.Sprite#_columns
         * @private
         * @see {@link Two.Sprite#columns}
         */
        private _columns;
        /**
         * @name Two.Sprite#_rows
         * @private
         * @see {@link Two.Sprite#rows}
         */
        private _rows;
        /**
         * @name Two.Sprite#_frameRate
         * @private
         * @see {@link Two.Sprite#frameRate}
         */
        private _frameRate;
        /**
         * @name Two.Sprite#_index
         * @private
         * @property {Number} - The current frame the {@link Two.Sprite} is currently displaying.
         */
        private _index;
        /**
         * @name Two.Sprite#_origin
         * @private
         * @see {@link Two.Sprite#origin}
         */
        private _origin;
        texture: Texture;
        origin: Vector;
        columns: number;
        rows: number;
        frameRate: number;
        /**
         * @name Two.Sprite#index
         * @property {Number} - The index of the current tile of the sprite to display. Defaults to `0`.
         */
        index: number;
        /**
         * @name Two.Sprite#play
         * @function
         * @param {Number} [firstFrame=0] - The index of the frame to start the animation with.
         * @param {Number} [lastFrame] - The index of the frame to end the animation with. Defaults to the last item in the {@link Two.Sprite#textures}.
         * @param {Function} [onLastFrame] - Optional callback function to be triggered after playing the last frame. This fires multiple times when the sprite is looped.
         * @description Initiate animation playback of a {@link Two.Sprite}.
         */
        play(firstFrame?: number, lastFrame?: number, onLastFrame?: Function): Sprite;
        _onLastFrame: Function;
        /**
         * @name Two.Sprite#pause
         * @function
         * @description Halt animation playback of a {@link Two.Sprite}.
         */
        pause(): Sprite;
        /**
         * @name Two.Sprite#stop
         * @function
         * @description Halt animation playback of a {@link Two.Sprite} and set the current frame back to the first frame.
         */
        stop(): Sprite;
        /**
         * @name Two.Sprite#clone
         * @function
         * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
         * @returns {Two.Sprite}
         * @description Create a new instance of {@link Two.Sprite} with the same properties of the current sprite.
         */
        clone(parent?: any): any;
        /**
         * @name Two.Sprite#toObject
         * @function
         * @returns {Object}
         * @description Return a JSON compatible plain object that represents the path.
         */
        toObject(): any;
        /**
         * @name Two.Sprite#_update
         * @function
         * @private
         * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
         * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
         * @nota-bene Try not to call this method more than once a frame.
         */
        private _update;
        fill: any;
        width: any;
        height: any;
        /**
         * @name Two.Sprite#flagReset
         * @function
         * @private
         * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
         */
        private flagReset;
    }
    import { Texture } from "two.js/src/effects/texture";
    import { Vector } from "two.js/src/vector";
}
declare module "two.js/src/shapes/circle" {
    /**
     * @name Two.Circle
     * @class
     * @extends Two.Path
     * @param {Number} [x=0] - The x position of the circle.
     * @param {Number} [y=0] - The y position of the circle.
     * @param {Number} [radius=0] - The radius value of the circle.
     * @param {Number} [resolution=4] - The number of vertices used to construct the circle.
     */
    export class Circle {
        /**
         * @name Two.Circle.Properties
         * @property {String[]} - A list of properties that are on every {@link Two.Circle}.
         */
        static Properties: string[];
        constructor(ox: any, oy: any, r: any, resolution: any);
        /**
         * @name Two.Circle#_flagRadius
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Circle#radius} needs updating.
         */
        private _flagRadius;
        /**
         * @name Two.Circle#_radius
         * @private
         * @see {@link Two.Circle#radius}
         */
        private _radius;
        radius: number;
        /**
         * @name Two.Circle#_update
         * @function
         * @private
         * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
         * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
         * @nota-bene Try not to call this method more than once a frame.
         */
        private _update;
        /**
         * @name Two.Circle#flagReset
         * @function
         * @private
         * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
         */
        private flagReset;
        /**
         * @name Two.Circle#clone
         * @function
         * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
         * @returns {Two.Circle}
         * @description Create a new instance of {@link Two.Circle} with the same properties of the current path.
         */
        clone(parent?: any): any;
        /**
         * @name Two.Circle#toObject
         * @function
         * @returns {Object}
         * @description Return a JSON compatible plain object that represents the path.
         */
        toObject(): any;
    }
}
declare module "two.js/src/shapes/ellipse" {
    /**
     * @name Two.Ellipse
     * @class
     * @extends Two.Path
     * @param {Number} [x=0] - The x position of the ellipse.
     * @param {Number} [y=0] - The y position of the ellipse.
     * @param {Number} [rx=0] - The radius value of the ellipse in the x direction.
     * @param {Number} [ry=0] - The radius value of the ellipse in the y direction.
     * @param {Number} [resolution=4] - The number of vertices used to construct the ellipse.
     */
    export class Ellipse {
        /**
         * @name Two.Ellipse.Properties
         * @property {String[]} - A list of properties that are on every {@link Two.Ellipse}.
         */
        static Properties: string[];
        constructor(ox: any, oy: any, rx: any, ry: any, resolution: any);
        /**
         * @name Two.Ellipse#_flagWidth
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Ellipse#width} needs updating.
         */
        private _flagWidth;
        /**
         * @name Two.Ellipse#_flagHeight
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Ellipse#height} needs updating.
         */
        private _flagHeight;
        /**
         * @name Two.Ellipse#_width
         * @private
         * @see {@link Two.Ellipse#width}
         */
        private _width;
        /**
         * @name Two.Ellipse#_height
         * @private
         * @see {@link Two.Ellipse#height}
         */
        private _height;
        width: number;
        height: number;
        /**
         * @name Two.Ellipse#_update
         * @function
         * @private
         * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
         * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
         * @nota-bene Try not to call this method more than once a frame.
         */
        private _update;
        /**
         * @name Two.Ellipse#flagReset
         * @function
         * @private
         * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
         */
        private flagReset;
        /**
         * @name Two.Ellipse#clone
         * @function
         * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
         * @returns {Two.Ellipse}
         * @description Create a new instance of {@link Two.Ellipse} with the same properties of the current path.
         */
        clone(parent?: any): any;
        /**
         * @name Two.Ellipse#toObject
         * @function
         * @returns {Object}
         * @description Return a JSON compatible plain object that represents the path.
         */
        toObject(): any;
    }
}
declare module "two.js/src/shapes/line" {
    /**
     * @name Two.Line
     * @class
     * @extends Two.Path
     * @param {Number} [x1=0] - The x position of the first vertex on the line.
     * @param {Number} [y1=0] - The y position of the first vertex on the line.
     * @param {Number} [x2=0] - The x position of the second vertex on the line.
     * @param {Number} [y2=0] - The y position of the second vertex on the line.
     */
    export class Line {
        constructor(x1: any, y1: any, x2: any, y2: any);
        automatic: boolean;
    }
}
declare module "two.js/src/shapes/rounded-rectangle" {
    /**
     * @name Two.RoundedRectangle
     * @class
     * @extends Two.Path
     * @param {Number} [x=0] - The x position of the rounded rectangle.
     * @param {Number} [y=0] - The y position of the rounded rectangle.
     * @param {Number} [width=0] - The width value of the rounded rectangle.
     * @param {Number} [height=0] - The width value of the rounded rectangle.
     * @param {Number} [radius=0] - The radius value of the rounded rectangle.
     * @param {Number} [resolution=12] - The number of vertices used to construct the rounded rectangle.
     */
    export class RoundedRectangle {
        /**
         * @name Two.RoundedRectangle.Properties
         * @property {String[]} - A list of properties that are on every {@link Two.RoundedRectangle}.
         */
        static Properties: string[];
        constructor(ox: any, oy: any, width: any, height: any, radius: any);
        /**
         * @name Two.RoundedRectangle#_flagWidth
         * @private
         * @property {Boolean} - Determines whether the {@link Two.RoundedRectangle#width} needs updating.
         */
        private _flagWidth;
        /**
         * @name Two.RoundedRectangle#_flagHeight
         * @private
         * @property {Boolean} - Determines whether the {@link Two.RoundedRectangle#height} needs updating.
         */
        private _flagHeight;
        /**
         * @name Two.RoundedRectangle#_flagRadius
         * @private
         * @property {Boolean} - Determines whether the {@link Two.RoundedRectangle#radius} needs updating.
         */
        private _flagRadius;
        /**
         * @name Two.RoundedRectangle#_width
         * @private
         * @see {@link Two.RoundedRectangle#width}
         */
        private _width;
        /**
         * @name Two.RoundedRectangle#_height
         * @private
         * @see {@link Two.RoundedRectangle#height}
         */
        private _height;
        /**
         * @name Two.RoundedRectangle#_radius
         * @private
         * @see {@link Two.RoundedRectangle#radius}
         */
        private _radius;
        closed: boolean;
        automatic: boolean;
        width: number;
        height: number;
        radius: number;
        /**
         * @name Two.RoundedRectangle#_update
         * @function
         * @private
         * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
         * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
         * @nota-bene Try not to call this method more than once a frame.
         */
        private _update;
        /**
         * @name Two.RoundedRectangle#flagReset
         * @function
         * @private
         * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
         */
        private flagReset;
        /**
         * @name Two.RoundedRectangle#clone
         * @function
         * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
         * @returns {Two.RoundedRectangle}
         * @description Create a new instance of {@link Two.RoundedRectangle} with the same properties of the current path.
         */
        clone(parent?: any): any;
        /**
         * @name Two.RoundedRectangle#toObject
         * @function
         * @returns {Object}
         * @description Return a JSON compatible plain object that represents the path.
         */
        toObject(): any;
    }
}
declare module "two.js/src/text" {
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
    export class Text {
        /**
         * @name Two.Text.Ratio
         * @property {Number} - Approximate aspect ratio of a typeface's character width to height.
         */
        static Ratio: number;
        /**
         * @name Two.Text.Properties
         * @property {String[]} - A list of properties that are on every {@link Two.Text}.
         */
        static Properties: string[];
        constructor(message: any, x: any, y: any, styles: any);
        /**
         * @name Two.Text#_flagValue
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Text#value} need updating.
         */
        private _flagValue;
        /**
         * @name Two.Text#_flagFamily
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Text#family} need updating.
         */
        private _flagFamily;
        /**
         * @name Two.Text#_flagSize
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Text#size} need updating.
         */
        private _flagSize;
        /**
         * @name Two.Text#_flagLeading
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Text#leading} need updating.
         */
        private _flagLeading;
        /**
         * @name Two.Text#_flagAlignment
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Text#alignment} need updating.
         */
        private _flagAlignment;
        /**
         * @name Two.Text#_flagBaseline
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Text#baseline} need updating.
         */
        private _flagBaseline;
        /**
         * @name Two.Text#_flagStyle
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Text#style} need updating.
         */
        private _flagStyle;
        /**
         * @name Two.Text#_flagWeight
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Text#weight} need updating.
         */
        private _flagWeight;
        /**
         * @name Two.Text#_flagDecoration
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Text#decoration} need updating.
         */
        private _flagDecoration;
        /**
         * @name Two.Text#_flagFill
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Text#fill} need updating.
         */
        private _flagFill;
        /**
         * @name Two.Text#_flagStroke
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Text#stroke} need updating.
         */
        private _flagStroke;
        /**
         * @name Two.Text#_flagLinewidth
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Text#linewidth} need updating.
         */
        private _flagLinewidth;
        /**
         * @name Two.Text#_flagOpacity
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Text#opacity} need updating.
         */
        private _flagOpacity;
        /**
         * @name Two.Text#_flagVisible
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Text#visible} need updating.
         */
        private _flagVisible;
        /**
         * @name Two.Path#_flagMask
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Path#mask} needs updating.
         */
        private _flagMask;
        /**
         * @name Two.Text#_flagClip
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Text#clip} need updating.
         */
        private _flagClip;
        /**
         * @name Two.Text#value
         * @property {String} - The characters to be rendered to the the screen. Referred to in the documentation sometimes as the `message`.
         */
        _value: string;
        /**
         * @name Two.Text#family
         * @property {String} - The font family Two.js should attempt to regsiter for rendering. The default value is `'sans-serif'`. Comma separated font names can be supplied as a "stack", similar to the CSS implementation of `font-family`.
         */
        _family: string;
        /**
         * @name Two.Text#size
         * @property {Number} - The font size in Two.js point space. Defaults to `13`.
         */
        _size: number;
        /**
         * @name Two.Text#leading
         * @property {Number} - The height between lines measured from base to base in Two.js point space. Defaults to `17`.
         */
        _leading: number;
        /**
         * @name Two.Text#alignment
         * @property {String} - Alignment of text in relation to {@link Two.Text#translation}'s coordinates. Possible values include `'left'`, `'center'`, `'right'`. Defaults to `'center'`.
         */
        _alignment: string;
        /**
         * @name Two.Text#baseline
         * @property {String} - The vertical aligment of the text in relation to {@link Two.Text#translation}'s coordinates. Possible values include `'top'`, `'middle'`, `'bottom'`, and `'baseline'`. Defaults to `'baseline'`.
         */
        _baseline: string;
        /**
         * @name Two.Text#style
         * @property {String} - The font's style. Possible values include '`normal`', `'italic'`. Defaults to `'normal'`.
         */
        _style: string;
        /**
         * @name Two.Text#weight
         * @property {Number} - A number at intervals of 100 to describe the font's weight. This compatibility varies with the typeface's variant weights. Larger values are bolder. Smaller values are thinner. Defaults to `'500'`.
         */
        _weight: number;
        /**
         * @name Two.Text#decoration
         * @property {String} - String to delineate whether text should be decorated with for instance an `'underline'`. Defaults to `'none'`.
         */
        _decoration: string;
        /**
         * @name Two.Text#fill
         * @property {(String|Two.Gradient|Two.Texture)} - The value of what the text object should be filled in with.
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
         */
        _fill: string;
        /**
         * @name Two.Text#stroke
         * @property {(String|Two.Gradient|Two.Texture)} - The value of what the text object should be filled in with.
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
         */
        _stroke: string;
        /**
         * @name Two.Text#linewidth
         * @property {Number} - The thickness in pixels of the stroke.
         */
        _linewidth: number;
        /**
         * @name Two.Text#opacity
         * @property {Number} - The opaqueness of the text object.
         * @nota-bene Can be used in conjunction with CSS Colors that have an alpha value.
         */
        _opacity: number;
        /**
         * @name Two.Text#visible
         * @property {Boolean} - Display the text object or not.
         * @nota-bene For {@link Two.CanvasRenderer} and {@link Two.WebGLRenderer} when set to false all updating is disabled improving performance dramatically with many objects in the scene.
         */
        _visible: boolean;
        /**
         * @name Two.Text#mask
         * @property {Two.Shape} - The shape whose alpha property becomes a clipping area for the text.
         * @nota-bene This property is currently not working becuase of SVG spec issues found here {@link https://code.google.com/p/chromium/issues/detail?id=370951}.
         */
        _mask: any;
        /**
         * @name Two.Text#clip
         * @property {Two.Shape} - Object to define clipping area.
         * @nota-bene This property is currently not working becuase of SVG spec issues found here {@link https://code.google.com/p/chromium/issues/detail?id=370951}.
         */
        _clip: boolean;
        /**
         * @name Two.Text#_dashes
         * @private
         * @see {@link Two.Text#dashes}
         */
        private _dashes;
        value: any;
        /**
         * @name Two.Text#dashes
         * @property {Number[]} - Array of numbers. Odd indices represent dash length. Even indices represent dash space.
         * @description A list of numbers that represent the repeated dash length and dash space applied to the stroke of the text.
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray} for more information on the SVG stroke-dasharray attribute.
         */
        dashes: any[];
        /**
         * @name Two.Text#clone
         * @function
         * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
         * @returns {Two.Text}
         * @description Create a new instance of {@link Two.Text} with the same properties of the current text object.
         */
        clone(parent?: any): any;
        /**
         * @name Two.Text#toObject
         * @function
         * @returns {Object}
         * @description Return a JSON compatible plain object that represents the text object.
         */
        toObject(): any;
        /**
         * @name Two.Text#noFill
         * @function
         * @description Short hand method to set fill to `transparent`.
         */
        noFill(): Text;
        fill: string;
        /**
         * @name Two.Text#noStroke
         * @function
         * @description Short hand method to set stroke to `transparent`.
         */
        noStroke(): Text;
        stroke: any;
        linewidth: any;
        /**
         * @name Two.Text#getBoundingClientRect
         * @function
         * @param {Boolean} [shallow=false] - Describes whether to calculate off local matrix or world matrix.
         * @returns {Object} - Returns object with top, left, right, bottom, width, height attributes.
         * @description Return an object with top, left, right, bottom, width, and height parameters of the text object.
         */
        getBoundingClientRect(shallow?: boolean): any;
        /**
         * @name Two.Text#flagReset
         * @function
         * @private
         * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
         */
        private flagReset;
        _flagClassName: boolean;
    }
}
declare module "two.js/src/utils/interpret-svg" {
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
        circle: (node: any, parentStyles: any) => any;
        ellipse: (node: any, parentStyles: any) => any;
        rect: (node: any, parentStyles: any) => any;
        'rounded-rect': (node: any, parentStyles: any) => any;
        line: (node: any, parentStyles: any) => any;
        lineargradient: (node: any, parentStyles: any) => LinearGradient;
        radialgradient: (node: any, parentStyles: any) => RadialGradient;
        text: (node: any, parentStyles: any) => Text;
        clippath: (node: any, parentStyles: any) => any;
        image: (node: any, parentStyles: any) => Sprite;
    };
    import { Group } from "two.js/src/group";
    import { Path } from "two.js/src/path";
    import { LinearGradient } from "two.js/src/effects/linear-gradient";
    import { RadialGradient } from "two.js/src/effects/radial-gradient";
    import { Text } from "two.js/src/text";
    import { Sprite } from "two.js/src/effects/sprite";
}
declare module "two.js/src/utils/xhr" {
    /**
     * @name Two.Utils.xhr
     * @function
     * @param {String} path
     * @param {Function} callback
     * @returns {XMLHttpRequest} The constructed and called XHR request.
     * @description Canonical method to initiate `GET` requests in the browser. Mainly used by {@link Two#load} method.
     */
    export function xhr(path: string, callback: Function): XMLHttpRequest;
}
declare module "two.js/src/effects/image-sequence" {
    /**
     * @name Two.ImageSequence
     * @class
     * @extends Two.Rectangle
     * @param {String|String[]|Two.Texture|Two.Texture[]} paths - A list of URLs or {@link Two.Texture}s.
     * @param {Number} [ox=0] - The initial `x` position of the Two.ImageSequence.
     * @param {Number} [oy=0] - The initial `y` position of the Two.ImageSequence.
     * @param {Number} [frameRate=30] - The frame rate at which the images should playback at.
     * @description A convenient package to display still or animated images organized as a series of still images.
     */
    export class ImageSequence {
        /**
         * @name Two.ImageSequence.Properties
         * @property {String[]} - A list of properties that are on every {@link Two.ImageSequence}.
         */
        static Properties: string[];
        /**
         * @name Two.ImageSequence.DefaultFrameRate
         * @property The default frame rate that {@link Two.ImageSequence#frameRate} is set to when instantiated.
         */
        static DefaultFrameRate: number;
        constructor(paths: any, ox: any, oy: any, frameRate: any);
        /**
         * @name Two.ImageSequence#_flagTextures
         * @private
         * @property {Boolean} - Determines whether the {@link Two.ImageSequence#textures} need updating.
         */
        private _flagTextures;
        /**
         * @name Two.ImageSequence#_flagFrameRate
         * @private
         * @property {Boolean} - Determines whether the {@link Two.ImageSequence#frameRate} needs updating.
         */
        private _flagFrameRate;
        /**
         * @name Two.ImageSequence#_flagIndex
         * @private
         * @property {Boolean} - Determines whether the {@link Two.ImageSequence#index} needs updating.
         */
        private _flagIndex;
        /**
         * @name Two.ImageSequence#_amount
         * @private
         * @property {Number} - Number of frames for a given {@link Two.ImageSequence}.
         */
        private _amount;
        /**
         * @name Two.ImageSequence#_duration
         * @private
         * @property {Number} - Number of milliseconds a {@link Two.ImageSequence}.
         */
        private _duration;
        /**
         * @name Two.ImageSequence#_index
         * @private
         * @property {Number} - The current frame the {@link Two.ImageSequence} is currently displaying.
         */
        private _index;
        /**
         * @name Two.ImageSequence#_startTime
         * @private
         * @property {Milliseconds} - Epoch time in milliseconds of when the {@link Two.ImageSequence} started.
         */
        private _startTime;
        /**
         * @name Two.ImageSequence#_playing
         * @private
         * @property {Boolean} - Dictates whether the {@link Two.ImageSequence} is animating or not.
         */
        private _playing;
        /**
         * @name Two.ImageSequence#_firstFrame
         * @private
         * @property {Number} - The frame the {@link Two.ImageSequence} should start with.
         */
        private _firstFrame;
        /**
         * @name Two.ImageSequence#_lastFrame
         * @private
         * @property {Number} - The frame the {@link Two.ImageSequence} should end with.
         */
        private _lastFrame;
        /**
         * @name Two.ImageSequence#_playing
         * @private
         * @property {Boolean} - Dictates whether the {@link Two.ImageSequence} should loop or not.
         */
        private _loop;
        /**
         * @name Two.ImageSequence#_textures
         * @private
         * @see {@link Two.ImageSequence#textures}
         */
        private _textures;
        /**
         * @name Two.ImageSequence#_frameRate
         * @private
         * @see {@link Two.ImageSequence#frameRate}
         */
        private _frameRate;
        /**
         * @name Two.ImageSequence#_origin
         * @private
         * @see {@link Two.ImageSequence#origin}
         */
        private _origin;
        textures: any[];
        origin: Vector;
        frameRate: number;
        /**
         * @name Two.ImageSequence#index
         * @property {Number} - The index of the current tile of the sprite to display. Defaults to `0`.
         */
        index: number;
        /**
         * @name Two.ImageSequence#play
         * @function
         * @param {Number} [firstFrame=0] - The index of the frame to start the animation with.
         * @param {Number} [lastFrame] - The index of the frame to end the animation with. Defaults to the last item in the {@link Two.ImageSequence#textures}.
         * @param {Function} [onLastFrame] - Optional callback function to be triggered after playing the last frame. This fires multiple times when the image sequence is looped.
         * @description Initiate animation playback of a {@link Two.ImageSequence}.
         */
        play(firstFrame?: number, lastFrame?: number, onLastFrame?: Function): ImageSequence;
        _onLastFrame: Function;
        /**
         * @name Two.ImageSequence#pause
         * @function
         * @description Halt animation playback of a {@link Two.ImageSequence}.
         */
        pause(): ImageSequence;
        /**
         * @name Two.ImageSequence#stop
         * @function
         * @description Halt animation playback of a {@link Two.ImageSequence} and set the current frame back to the first frame.
         */
        stop(): ImageSequence;
        /**
         * @name Two.ImageSequence#clone
         * @function
         * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
         * @returns {Two.ImageSequence}
         * @description Create a new instance of {@link Two.ImageSequence} with the same properties of the current image sequence.
         */
        clone(parent?: any): any;
        /**
         * @name Two.ImageSequence#toObject
         * @function
         * @returns {Object}
         * @description Return a JSON compatible plain object that represents the path.
         */
        toObject(): any;
        /**
         * @name Two.ImageSequence#_update
         * @function
         * @private
         * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
         * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
         * @nota-bene Try not to call this method more than once a frame.
         */
        private _update;
        width: any;
        height: any;
        fill: any;
        /**
         * @name Two.ImageSequence#flagReset
         * @function
         * @private
         * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
         */
        private flagReset;
    }
    import { Vector } from "two.js/src/vector";
}
declare module "two.js/src/shapes/arc-segment" {
    /**
     * @name Two.ArcSegment
     * @class
     * @extends Two.Path
     * @param {Number} [x=0] - The x position of the arc segment.
     * @param {Number} [y=0] - The y position of the arc segment.
     * @param {Number} [innerRadius=0] - The inner radius value of the arc segment.
     * @param {Number} [outerRadius=0] - The outer radius value of the arc segment.
     * @param {Number} [startAngle=0] - The start angle of the arc segment in Number.
     * @param {Number} [endAngle=6.2831] - The end angle of the arc segment in Number.
     * @param {Number} [resolution=24] - The number of vertices used to construct the arc segment.
     */
    export class ArcSegment {
        /**
         * @name Two.ArcSegment.Properties
         * @property {String[]} - A list of properties that are on every {@link Two.ArcSegment}.
         */
        static Properties: string[];
        constructor(ox: any, oy: any, ir: any, or: any, sa: any, ea: any, res: any);
        /**
         * @name Two.ArcSegment#_flagStartAngle
         * @private
         * @property {Boolean} - Determines whether the {@link Two.ArcSegment#startAngle} needs updating.
         */
        private _flagStartAngle;
        /**
         * @name Two.ArcSegment#_flagEndAngle
         * @private
         * @property {Boolean} - Determines whether the {@link Two.ArcSegment#endAngle} needs updating.
         */
        private _flagEndAngle;
        /**
         * @name Two.ArcSegment#_flagInnerRadius
         * @private
         * @property {Boolean} - Determines whether the {@link Two.ArcSegment#innerRadius} needs updating.
         */
        private _flagInnerRadius;
        /**
         * @name Two.ArcSegment#_flagOuterRadius
         * @private
         * @property {Boolean} - Determines whether the {@link Two.ArcSegment#outerRadius} needs updating.
         */
        private _flagOuterRadius;
        /**
         * @name Two.ArcSegment#_startAngle
         * @private
         * @see {@link Two.ArcSegment#startAngle}
         */
        private _startAngle;
        /**
         * @name Two.ArcSegment#_endAngle
         * @private
         * @see {@link Two.ArcSegment#endAngle}
         */
        private _endAngle;
        /**
         * @name Two.ArcSegment#_innerRadius
         * @private
         * @see {@link Two.ArcSegment#innerRadius}
         */
        private _innerRadius;
        /**
         * @name Two.ArcSegment#_outerRadius
         * @private
         * @see {@link Two.ArcSegment#outerRadius}
         */
        private _outerRadius;
        innerRadius: number;
        outerRadius: number;
        startAngle: number;
        endAngle: number;
        /**
         * @name Two.ArcSegment#_update
         * @function
         * @private
         * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
         * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
         * @nota-bene Try not to call this method more than once a frame.
         */
        private _update;
        /**
         * @name Two.ArcSegment#flagReset
         * @function
         * @private
         * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
         */
        private flagReset;
        /**
         * @name Two.ArcSegment#clone
         * @function
         * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
         * @returns {Two.ArcSegment}
         * @description Create a new instance of {@link Two.ArcSegment} with the same properties of the current path.
         */
        clone(parent?: any): any;
        /**
         * @name Two.ArcSegment#toObject
         * @function
         * @returns {Object}
         * @description Return a JSON compatible plain object that represents the path.
         */
        toObject(): any;
    }
}
declare module "two.js/src/shapes/points" {
    /**
     * @name Two.Points
     * @class
     * @extends Two.Shape
     * @param {Two.Vector[]} [vertices] - A list of {@link Two.Vector}s that represent the order and coordinates to construct a rendered set of points.
     * @description This is a primary primitive class for quickly and easily drawing points in Two.js. Unless specified methods return their instance of `Two.Points` for the purpose of chaining.
     */
    export class Points {
        static Properties: string[];
        constructor(vertices: any);
        _flagVertices: boolean;
        _flagLength: boolean;
        _flagFill: boolean;
        _flagStroke: boolean;
        _flagLinewidth: boolean;
        _flagOpacity: boolean;
        _flagVisible: boolean;
        _flagSize: boolean;
        _flagSizeAttenuation: boolean;
        _length: number;
        _fill: string;
        _stroke: string;
        _linewidth: number;
        _opacity: number;
        _visible: boolean;
        _size: number;
        _sizeAttenuation: boolean;
        _beginning: number;
        _ending: number;
        _dashes: any;
        /**
         * @name Two.Points#sizeAttenuation
         * @property {Boolean} - Boolean dictating whether Two.js should scale the size of the points based on its matrix hierarcy.
         * @description Set to `true` if you'd like the size of the points to be relative to the scale of its parents; `false` to disregard. Default is `false`.
         */
        sizeAttenuation: boolean;
        /**
         * @name Two.Points#beginning
         * @property {Number} - Number between zero and one to state the beginning of where the path is rendered.
         * @description {@link Two.Points#beginning} is a percentage value that represents at what percentage into the path should the renderer start drawing.
         */
        beginning: number;
        /**
         * @name Two.Points#ending
         * @property {Number} - Number between zero and one to state the ending of where the path is rendered.
         * @description {@link Two.Points#ending} is a percentage value that represents at what percentage into the path should the renderer start drawing.
         */
        ending: number;
        /**
         * @name Two.Points#fill
         * @property {(String|Two.Gradient|Two.Texture)} - The value of what the path should be filled in with.
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
         */
        fill: string;
        /**
         * @name Two.Points#stroke
         * @property {(String|Two.Gradient|Two.Texture)} - The value of what the path should be outlined in with.
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
         */
        stroke: string;
        /**
         * @name Two.Points#className
         * @property {String} - A class to be applied to the element to be compatible with CSS styling.
         * @nota-bene Only available for the SVG renderer.
         */
        className: string;
        /**
         * @name Two.Points#visible
         * @property {Boolean} - Display the points or not.
         * @nota-bene For {@link Two.CanvasRenderer} and {@link Two.WebGLRenderer} when set to false all updating is disabled improving performance dramatically with many objects in the scene.
         */
        visible: boolean;
        /**
         * @name Two.Points#vertices
         * @property {Two.Vector[]} - An ordered list of vector points for rendering points.
         * @description A list of {@link Two.Vector} objects that consist of which coordinates to draw points at.
         * @nota-bene The array when manipulating is actually a {@link Two.Collection}.
         */
        vertices: any;
        /**
         * @name Two.Points#dashes
         * @property {Number[]} - Array of numbers. Odd indices represent dash length. Even indices represent dash space.
         * @description A list of numbers that represent the repeated dash length and dash space applied to the stroke of the text.
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray} for more information on the SVG stroke-dasharray attribute.
         */
        dashes: any[];
        /**
         * @name Two.Points#clone
         * @function
         * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
         * @returns {Two.Points}
         * @description Create a new instance of {@link Two.Points} with the same properties of the current path.
         */
        clone(parent?: any): any;
        /**
         * @name Two.Points#toObject
         * @function
         * @returns {Object}
         * @description Return a JSON compatible plain object that represents the points object.
         */
        toObject(): any;
        /**
         * @name Two.Points#noFill
         * @function
         * @description Short hand method to set fill to `transparent`.
         */
        noFill: () => Path;
        /**
         * @name Two.Points#noStroke
         * @function
         * @description Short hand method to set stroke to `transparent`.
         */
        noStroke: () => Path;
        /**
         * @name Two.Points#corner
         * @function
         * @description Orient the vertices of the shape to the upper left-hand corner of the points object.
         */
        corner: () => Path;
        /**
         * @name Two.Points#center
         * @function
         * @description Orient the vertices of the shape to the center of the points object.
         */
        center: () => Path;
        /**
         * @name Two.Points#getBoundingClientRect
         * @function
         * @param {Boolean} [shallow=false] - Describes whether to calculate off local matrix or world matrix.
         * @returns {Object} - Returns object with top, left, right, bottom, width, height attributes.
         * @description Return an object with top, left, right, bottom, width, and height parameters of the path.
         */
        getBoundingClientRect: (shallow?: boolean) => any;
        /**
         * @name Two.Points#subdivide
         * @function
         * @param {Number} limit - How many times to recurse subdivisions.
         * @description Insert a {@link Two.Vector} at the midpoint between every item in {@link Two.Points#vertices}.
         */
        subdivide(limit: number): Points;
        /**
         * @name Two.Points#_updateLength
         * @function
         * @private
         * @param {Number} [limit] -
         * @param {Boolean} [silent=false] - If set to `true` then the points object isn't updated before calculation. Useful for internal use.
         * @description Recalculate the {@link Two.Points#length} value.
         */
        private _updateLength;
        /**
         * @name Two.Points#_update
         * @function
         * @private
         * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
         * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
         * @nota-bene Try not to call this method more than once a frame.
         */
        private _update;
        /**
         * @name Two.Points#flagReset
         * @function
         * @private
         * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
         */
        private flagReset;
    }
    import { Path } from "two.js/src/path";
}
declare module "two.js/src/shapes/polygon" {
    /**
     * @name Two.Polygon
     * @class
     * @extends Two.Path
     * @param {Number} [x=0] - The x position of the polygon.
     * @param {Number} [y=0] - The y position of the polygon.
     * @param {Number} [radius=0] - The radius value of the polygon.
     * @param {Number} [sides=12] - The number of vertices used to construct the polygon.
     */
    export class Polygon {
        /**
         * @name Two.Polygon.Properties
         * @property {String[]} - A list of properties that are on every {@link Two.Polygon}.
         */
        static Properties: string[];
        constructor(ox: any, oy: any, r: any, sides: any);
        /**
         * @name Two.Polygon#_flagWidth
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Polygon#width} needs updating.
         */
        private _flagWidth;
        /**
         * @name Two.Polygon#_flagHeight
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Polygon#height} needs updating.
         */
        private _flagHeight;
        /**
         * @name Two.Polygon#_flagSides
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Polygon#sides} needs updating.
         */
        private _flagSides;
        /**
         * @name Two.Polygon#_width
         * @private
         * @see {@link Two.Polygon#width}
         */
        private _width;
        /**
         * @name Two.Polygon#_height
         * @private
         * @see {@link Two.Polygon#height}
         */
        private _height;
        /**
         * @name Two.Polygon#_sides
         * @private
         * @see {@link Two.Polygon#sides}
         */
        private _sides;
        closed: boolean;
        automatic: boolean;
        width: number;
        height: number;
        sides: number;
        /**
         * @name Two.Polygon#_update
         * @function
         * @private
         * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
         * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
         * @nota-bene Try not to call this method more than once a frame.
         */
        private _update;
        /**
         * @name Two.Polygon#flagReset
         * @function
         * @private
         * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
         */
        private flagReset;
        /**
         * @name Two.Polygon#clone
         * @function
         * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
         * @returns {Two.Polygon}
         * @description Create a new instance of {@link Two.Polygon} with the same properties of the current path.
         */
        clone(parent?: any): any;
        /**
         * @name Two.Polygon#toObject
         * @function
         * @returns {Object}
         * @description Return a JSON compatible plain object that represents the path.
         */
        toObject(): any;
    }
}
declare module "two.js/src/shapes/star" {
    /**
     * @name Two.Star
     * @class
     * @extends Two.Path
     * @param {Number} [x=0] - The x position of the star.
     * @param {Number} [y=0] - The y position of the star.
     * @param {Number} [innerRadius=0] - The inner radius value of the star.
     * @param {Number} [outerRadius=0] - The outer radius value of the star.
     * @param {Number} [sides=5] - The number of sides used to construct the star.
     */
    export class Star {
        /**
         * @name Two.Star.Properties
         * @property {String[]} - A list of properties that are on every {@link Two.Star}.
         */
        static Properties: string[];
        constructor(ox: any, oy: any, ir: any, or: any, sides: any, ...args: any[]);
        /**
         * @name Two.Star#_flagInnerRadius
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Star#innerRadius} needs updating.
         */
        private _flagInnerRadius;
        /**
         * @name Two.Star#_flagOuterRadius
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Star#outerRadius} needs updating.
         */
        private _flagOuterRadius;
        /**
         * @name Two.Star#_flagSides
         * @private
         * @property {Boolean} - Determines whether the {@link Two.Star#sides} needs updating.
         */
        private _flagSides;
        /**
         * @name Two.Star#_innerRadius
         * @private
         * @see {@link Two.Star#innerRadius}
         */
        private _innerRadius;
        /**
         * @name Two.Star#_outerRadius
         * @private
         * @see {@link Two.Star#outerRadius}
         */
        private _outerRadius;
        /**
         * @name Two.Star#_sides
         * @private
         * @see {@link Two.Star#sides}
         */
        private _sides;
        closed: boolean;
        automatic: boolean;
        innerRadius: number;
        outerRadius: number;
        sides: number;
        /**
         * @name Two.Star#_update
         * @function
         * @private
         * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
         * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
         * @nota-bene Try not to call this method more than once a frame.
         */
        private _update;
        /**
         * @name Two.Star#flagReset
         * @function
         * @private
         * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
         */
        private flagReset;
        /**
         * @name Two.Star#clone
         * @function
         * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
         * @returns {Two.Star}
         * @description Create a new instance of {@link Two.Star} with the same properties of the current path.
         */
        clone(parent?: any): any;
        /**
         * @name Two.Star#toObject
         * @function
         * @returns {Object}
         * @description Return a JSON compatible plain object that represents the path.
         */
        toObject(): any;
    }
}
declare module "two.js/src/renderers/svg" {
    /**
     * @name Two.SVGRenderer
     * @class
     * @extends Two.Events
     * @param {Object} [parameters] - This object is inherited when constructing a new instance of {@link Two}.
     * @param {Element} [parameters.domElement] - The `<svg />` to draw to. If none given a new one will be constructed.
     * @description This class is used by {@link Two} when constructing with `type` of `Two.Types.svg` (the default type). It takes Two.js' scenegraph and renders it to a `<svg />`.
     */
    export class Renderer {
        /**
         * @name Two.SVGRenderer.Utils
         * @property {Object} - A massive object filled with utility functions and properties to render Two.js objects to a `<svg />`.
         */
        static Utils: {
            version: number;
            ns: string;
            xlink: string;
            alignments: {
                left: string;
                center: string;
                right: string;
            };
            createElement: (name: any, attrs: any) => Element;
            setAttributes: (elem: any, attrs: any) => any;
            removeAttributes: (elem: any, attrs: any) => any;
            toString: (points: any, closed: any) => string;
            pointsToString: (points: any, size: any) => string;
            getClip: (shape: any, domElement: any) => any;
            group: {
                appendChild: (object: any) => void;
                removeChild: (object: any) => void;
                orderChild: (object: any) => void;
                renderChild: (child: any) => void;
                render: (domElement: any) => any;
            };
            path: {
                render: (domElement: any) => any;
            };
            points: {
                render: (domElement: any) => any;
            };
            text: {
                render: (domElement: any) => any;
            };
            'linear-gradient': {
                render: (domElement: any, silent: any) => any;
            };
            'radial-gradient': {
                render: (domElement: any, silent: any) => any;
            };
            texture: {
                render: (domElement: any, silent: any) => any;
            };
        };
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
        /**
         * @name Two.SVGRenderer#setSize
         * @function
         * @param {Number} width - The new width of the renderer.
         * @param {Number} height - The new height of the renderer.
         * @description Change the size of the renderer.
         * @nota-bene Triggers a `Two.Events.resize`.
         */
        setSize(width: number, height: number): any;
        width: number;
        height: number;
        /**
         * @name Two.SVGRenderer#render
         * @function
         * @description Render the current scene to the `<svg />`.
         */
        render(): Renderer;
    }
    import { Group } from "two.js/src/group";
}
declare module "two.js/src/utils/shaders" {
    export namespace shaders {
        export function create(gl: any, source: any, type: any): any;
        export namespace types {
            export const vertex: string;
            export const fragment: string;
        }
        export namespace path {
            const vertex_1: string;
            export { vertex_1 as vertex };
            const fragment_1: string;
            export { fragment_1 as fragment };
        }
        export namespace points {
            const vertex_2: string;
            export { vertex_2 as vertex };
            const fragment_2: string;
            export { fragment_2 as fragment };
        }
    }
}
declare module "two.js/src/renderers/webgl" {
    /**
     * @name Two.WebGLRenderer
     * @class
     * @extends Two.Events
     * @param {Object} [parameters] - This object is inherited when constructing a new instance of {@link Two}.
     * @param {Element} [parameters.domElement] - The `<canvas />` to draw to. If none given a new one will be constructed.
     * @param {HTMLCanvasElement} [parameters.offscreenElement] - The offscreen two dimensional `<canvas />` to render each element on WebGL texture updates.
     * @param {Boolean} [parameters.antialias] - Determines whether the canvas should clear render with antialias on.
     * @description This class is used by {@link Two} when constructing with `type` of `Two.Types.webgl`. It takes Two.js' scenegraph and renders it to a `<canvas />` through the WebGL api.
     * @see {@link https://www.khronos.org/registry/webgl/specs/latest/1.0/}
     */
    export class Renderer {
        /**
         * @name Two.WebGLRenderer.Utils
         * @property {Object} - A massive object filled with utility functions and properties to render Two.js objects to a `<canvas />` through the WebGL API.
         */
        static Utils: {
            precision: number;
            isHidden: RegExp;
            canvas: any;
            alignments: {
                left: string;
                middle: string;
                right: string;
            };
            matrix: Matrix;
            group: {
                removeChild: (child: any, gl: any) => void;
                /**
                 * @function
                 // * @type {(gl: any, programs: any) => any}
                 * @param {WebGLContext} gl
                 * @param {Object} programs
                 */
                render: (gl: any, programs: any) => any;
            };
            path: {
                updateCanvas: (elem: any) => void;
                getBoundingClientRect: (vertices: any, border: any, rect: any) => void;
                render: (gl: any, programs: any, forcedParent: any) => any;
            };
            points: {
                updateCanvas: (elem: any) => void;
                render: (gl: any, programs: any, forcedParent: any) => any;
            };
            text: {
                updateCanvas: (elem: any) => void;
                getBoundingClientRect: (elem: any, rect: any) => void;
                render: (gl: any, programs: any, forcedParent: any) => any;
            };
            'linear-gradient': {
                render: (ctx: any, parent: any) => any;
            };
            'radial-gradient': {
                render: (ctx: any, parent: any) => any;
            };
            texture: {
                render: (ctx: any, elem: any) => any;
            };
            updateTexture: (gl: any, elem: any) => void;
            program: {
                create: (gl: any, shaders: any) => any;
            };
            TextureRegistry: Registry;
        };
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
         * @name Two.WebGLRenderer#programs
         * @property {Object} - Associated WebGL programs to render all elements from the scenegraph.
         */
        programs: {
            current: any;
            buffers: {
                position: any;
            };
            resolution: {
                width: number;
                height: number;
                ratio: number;
                flagged: boolean;
            };
        };
        /**
         * @name Two.WebGLRenderer#setSize
         * @function
         * @fires resize
         * @param {Number} width - The new width of the renderer.
         * @param {Number} height - The new height of the renderer.
         * @param {Number} [ratio] - The new pixel ratio (pixel density) of the renderer. Defaults to calculate the pixel density of the user's screen.
         * @description Change the size of the renderer.
         */
        setSize(width: number, height: number, ratio?: number): any;
        width: number;
        height: number;
        ratio: number;
        /**
         * @name Two.WebGLRenderer#render
         * @function
         * @description Render the current scene to the `<canvas />`.
         */
        render(): Renderer;
    }
    import { Group } from "two.js/src/group";
    import { Matrix } from "two.js/src/matrix";
    import { Registry } from "two.js/src/registry";
}
declare module "two.js" {
    /**
     * @name Two
     * @class
     * @global
     * @extends Two.Events
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
    export default class Two {
        static nextFrameID: any;
        /**
         * @name Two.Types
         * @property {Object} - The different rendering types available in the library.
         */
        static Types: {
            webgl: string;
            svg: string;
            canvas: string;
        };
        /**
         * @name Two.Version
         * @property {String} - The current working version of the library, `$version`.
         */
        static Version: string;
        /**
         * @name Two.PublishDate
         * @property {String} - The automatically generated publish date in the build process to verify version release candidates.
         */
        static PublishDate: string;
        /**
         * @name Two.Identifier
         * @property {String} - String prefix for all Two.js object's ids. This trickles down to SVG ids.
         */
        static Identifier: string;
        /**
         * @name Two.Resolution
         * @property {Number} - Default amount of vertices to be used for interpreting Arcs and ArcSegments.
         */
        static Resolution: number;
        /**
         * @name Two.AutoCalculateImportedMatrices
         * @property {Boolean} - When importing SVGs through the {@link Two#interpret} and {@link Two#load}, this boolean determines whether Two.js infers and then overrides the exact transformation matrix of the reference SVG.
         * @nota-bene `false` copies the exact transformation matrix values, but also sets the path's `matrix.manual = true`.
         */
        static AutoCalculateImportedMatrices: boolean;
        /**
         * @name Two.Instances
         * @property {Two[]} - Registered list of all Two.js instances in the current session.
         */
        static Instances: any[];
        /**
         * @function Two.uniqueId
         * @description Simple method to access an incrementing value. Used for `id` allocation on all Two.js objects.
         * @returns {Number} Ever increasing Number.
         */
        static uniqueId: () => number;
        static Anchor: typeof Anchor;
        static Collection: typeof Collection;
        static Events: typeof Events;
        static Group: typeof Group;
        static Matrix: typeof Matrix;
        static Path: typeof Path;
        static Registry: typeof Registry;
        static Shape: typeof Shape;
        static Text: typeof Text;
        static Vector: typeof Vector;
        static Gradient: typeof Gradient;
        static ImageSequence: typeof ImageSequence;
        static LinearGradient: typeof LinearGradient;
        static RadialGradient: typeof RadialGradient;
        static Sprite: typeof Sprite;
        static Stop: typeof Stop;
        static Texture: typeof Texture;
        static ArcSegment: typeof ArcSegment;
        static Circle: typeof Circle;
        static Ellipse: typeof Ellipse;
        static Line: typeof Line;
        static Points: typeof Points;
        static Polygon: typeof Polygon;
        static Rectangle: typeof Rectangle;
        static RoundedRectangle: typeof RoundedRectangle;
        static Star: typeof Star;
        static CanvasRenderer: typeof CanvasRenderer;
        static SVGRenderer: typeof SVGRenderer;
        static WebGLRenderer: typeof WebGLRenderer;
        static Commands: {
            move: string;
            line: string;
            curve: string;
            arc: string;
            close: string;
        };
        /**
         * @name Two.Utils
         * @property {Object} - A massive object filled with utility functions and properties.
         */
        static Utils: any;
        constructor(options: any);
        /**
         * @private
         */
        private _events;
        set _bound(arg: boolean);
        get _bound(): boolean;
        addEventListener(...args: any[]): any;
        on(...args: any[]): any;
        bind(...args: any[]): any;
        removeEventListener(...args: any[]): any;
        off(...args: any[]): any;
        unbind(...args: any[]): any;
        dispatchEvent(...args: any[]): any;
        trigger(...args: any[]): any;
        listen(...args: any[]): any;
        ignore(...args: any[]): any;
        /**
         * @name Two#type
         * @property {String} - A string representing which type of renderer the instance has instantiated.
         */
        type: string;
        /**
         * @name Two#renderer
         * @property {(Two.SVGRenderer|Two.CanvasRenderer|Two.WebGLRenderer)} - The instantiated rendering class for the instance. For a list of possible rendering types check out Two.Types.
         */
        renderer: any;
        /**
         * @name Two#scene
         * @property {Two.Group} - The base level {@link Two.Group} which houses all objects for the instance. Because it is a {@link Two.Group} transformations can be applied to it that will affect all objects in the instance. This is handy as a makeshift inverted camera.
         */
        scene: any;
        /**
         * @name Two#width
         * @property {Number} - The width of the instance's dom element.
         */
        width: number;
        /**
         * @name Two#height
         * @property {Number} - The height of the instance's dom element.
         */
        height: number;
        /**
         * @name Two#frameCount
         * @property {Number} - An integer representing how many frames have elapsed.
         */
        frameCount: number;
        /**
         * @name Two#timeDelta
         * @property {Number} - A number representing how much time has elapsed since the last frame in milliseconds.
         */
        timeDelta: number;
        /**
         * @name Two#playing
         * @property {Boolean} - A boolean representing whether or not the instance is being updated through the automatic `requestAnimationFrame`.
         */
        playing: boolean;
        fit: any;
        /**
         * @name Two#appendTo
         * @function
         * @param {Element} elem - The DOM element to append the Two.js stage to.
         * @description Shorthand method to append your instance of Two.js to the `document`.
         */
        appendTo(elem: Element): Two;
        /**
         * @name Two#play
         * @function
         * @fires Two.Events.Types.play event
         * @description Call to start an internal animation loop.
         * @nota-bene This function initiates a `requestAnimationFrame` loop.
         */
        play(): any;
        /**
         * @name Two#pause
         * @function
         * @fires Two.Events.Types.pause event
         * @description Call to stop the internal animation loop for a specific instance of Two.js.
         */
        pause(): any;
        setPlaying(p: any): void;
        /**
         * @name Two#release
         * @function
         * @param {Object} obj
         * @returns {Object} The object passed for event deallocation.
         * @description Release an arbitrary class' events from the Two.js corpus and recurse through its children and or vertices.
         */
        release(obj: any): any;
        /**
         * @name Two#update
         * @function
         * @fires Two.Events.Types.update event
         * @description Update positions and calculations in one pass before rendering. Then render to the canvas.
         * @nota-bene This function is called automatically if using {@link Two#play} or the `autostart` parameter in construction.
         */
        update(): any;
        _lastFrame: any;
        /**
         * @name Two#render
         * @function
         * @fires render
         * @description Render all drawable and visible objects of the scene.
         */
        render(): any;
        /**
         * @name Two#add
         * @function
         * @param {(Two.Shape[]|...Two.Shape)} [objects] - An array of Two.js objects. Alternatively can add objects as individual arguments.
         * @description A shorthand method to add specific Two.js objects to the scene.
         */
        add(o: any, ...args: any[]): Two;
        /**
         * @name Two#remove
         * @function
         * @param {(Two.Shape[]|...Two.Shape)} [objects] - An array of Two.js objects.
         * @description A shorthand method to remove specific Two.js objects from the scene.
         */
        remove(o: any, ...args: any[]): Two;
        /**
         * @name Two#clear
         * @function
         * @description Removes all objects from the instance's scene. If you intend to have the browser garbage collect this, don't forget to delete the references in your application as well.
         */
        clear(): Two;
        /**
         * @name Two#makeLine
         * @function
         * @param {Number} x1
         * @param {Number} y1
         * @param {Number} x2
         * @param {Number} y2
         * @returns {Two.Line}
         * @description Creates a Two.js line and adds it to the scene.
         */
        makeLine(x1: number, y1: number, x2: number, y2: number): typeof Line;
        /**
         * @name Two#makeArrow
         * @function
         * @param {Number} x1
         * @param {Number} y1
         * @param {Number} x2
         * @param {Number} y2
         * @returns {Two.Path}
         * @description Creates a Two.js arrow and adds it to the scene.
         */
        makeArrow(x1: number, y1: number, x2: number, y2: number, size: any): typeof Path;
        /**
         * @name Two#makeRectangle
         * @function
         * @param {Number} x
         * @param {Number} y
         * @param {Number} width
         * @param {Number} height
         * @returns {Two.Rectangle}
         * @description Creates a Two.js rectangle and adds it to the scene.
         */
        makeRectangle(x: number, y: number, width: number, height: number): typeof Rectangle;
        /**
         * @name Two#makeRoundedRectangle
         * @function
         * @param {Number} x
         * @param {Number} y
         * @param {Number} width
         * @param {Number} height
         * @param {Number} sides
         * @returns {Two.Rectangle}
         * @description Creates a Two.js rounded rectangle and adds it to the scene.
         */
        makeRoundedRectangle(x: number, y: number, width: number, height: number, sides: number): typeof Rectangle;
        /**
         * @name Two#makeCircle
         * @function
         * @param {Number} x
         * @param {Number} y
         * @param {Number} radius
         * @param {Number} [resolution=4]
         * @returns {Two.Circle}
         * @description Creates a Two.js circle and adds it to the scene.
         */
        makeCircle(x: number, y: number, radius: number, resolution?: number): typeof Circle;
        /**
         * @name Two#makeEllipse
         * @function
         * @param {Number} x
         * @param {Number} y
         * @param {Number} rx
         * @param {Number} ry
         * @param {Number} [resolution=4]
         * @returns {Two.Ellipse}
         * @description Creates a Two.js ellipse and adds it to the scene.
         */
        makeEllipse(x: number, y: number, rx: number, ry: number, resolution?: number): typeof Ellipse;
        /**
         * @name Two#makeStar
         * @function
         * @param {Number} x
         * @param {Number} y
         * @param {Number} outerRadius
         * @param {Number} innerRadius
         * @param {Number} sides
         * @returns {Two.Star}
         * @description Creates a Two.js star and adds it to the scene.
         */
        makeStar(ox: any, oy: any, outerRadius: number, innerRadius: number, sides: number): typeof Star;
        /**
         * @name Two#makeCurve
         * @function
         * @param {Two.Anchor[]} [points] - An array of {@link Two.Anchor} points.
         * @param {...Number} - Alternatively you can pass alternating `x` / `y` coordinate values as individual arguments. These will be combined into {@link Two.Anchor}s for use in the path.
         * @returns {Two.Path} - Where `path.curved` is set to `true`.
         * @description Creates a Two.js path that is curved and adds it to the scene.
         * @nota-bene In either case of passing an array or passing numbered arguments the last argument is an optional `Boolean` that defines whether the path should be open or closed.
         */
        makeCurve(p: any, ...args: any[]): typeof Path;
        /**
         * @name Two#makePolygon
         * @function
         * @param {Number} x
         * @param {Number} y
         * @param {Number} radius
         * @param {Number} sides
         * @returns {Two.Polygon}
         * @description Creates a Two.js polygon and adds it to the scene.
         */
        makePolygon(x: number, y: number, radius: number, sides: number): typeof Polygon;
        /**
         * @name Two#makeArcSegment
         * @function
         * @param {Number} x
         * @param {Number} y
         * @param {Number} innerRadius
         * @param {Number} outerRadius
         * @param {Number} startAngle
         * @param {Number} endAngle
         * @param {Number} [resolution=Two.Resolution] - The number of vertices that should comprise the arc segment.
         * @returns {Two.ArcSegment}
         */
        makeArcSegment(ox: any, oy: any, ir: any, or: any, sa: any, ea: any, res: any): typeof ArcSegment;
        /**
         * @name Two#makePoints
         * @function
         * @param {Two.Vector[]} [points] - An array of {@link Two.Vector} points
         * @param {...Number} - Alternatively you can pass alternating `x` / `y` coordinate values as individual agrguments. These will be combined into {@link Two.Vector}s for use in the points object.
         * @returns {Two.Points}
         * @description Creates a Two.js points object and adds it to the current scene.
         */
        makePoints(p: any, ...args: any[]): typeof Points;
        /**
         * @name Two#makePath
         * @function
         * @param {Two.Anchor[]} [points] - An array of {@link Two.Anchor} points
         * @param {...Number} - Alternatively you can pass alternating `x` / `y` coordinate values as individual arguments. These will be combined into {@link Two.Anchor}s for use in the path.
         * @returns {Two.Path}
         * @description Creates a Two.js path and adds it to the scene.
         * @nota-bene In either case of passing an array or passing numbered arguments the last argument is an optional `Boolean` that defines whether the path should be open or closed.
         */
        makePath(p: any, ...args: any[]): typeof Path;
        /**
         * @name Two#makeText
         * @function
         * @param {String} message
         * @param {Number} x
         * @param {Number} y
         * @param {Object} [styles] - An object to describe any of the {@link Two.Text.Properties} including `fill`, `stroke`, `linewidth`, `family`, `alignment`, `leading`, `opacity`, etc..
         * @returns {Two.Text}
         * @description Creates a Two.js text object and adds it to the scene.
         */
        makeText(message: string, x: number, y: number, styles?: any): typeof Text;
        /**
         * @name Two#makeLinearGradient
         * @function
         * @param {Number} x1
         * @param {Number} y1
         * @param {Number} x2
         * @param {Number} y2
         * @param {...Two.Stop} stops - Any number of color stops sometimes reffered to as ramp stops. If none are supplied then the default black-to-white two stop gradient is applied.
         * @returns {Two.LinearGradient}
         * @description Creates a Two.js linear gradient and ads it to the scene. In the case of an effect it's added to an invisible "definitions" group.
         */
        makeLinearGradient(x1: number, y1: number, x2: number, y2: number, ...args: any[]): typeof LinearGradient;
        /**
         * @name Two#makeRadialGradient
         * @function
         * @param {Number} x1
         * @param {Number} y1
         * @param {Number} radius
         * @param {...Two.Stop} stops - Any number of color stops sometimes reffered to as ramp stops. If none are supplied then the default black-to-white two stop gradient is applied.
         * @returns {Two.RadialGradient}
         * @description Creates a Two.js linear-gradient object and ads it to the scene. In the case of an effect it's added to an invisible "definitions" group.
         */
        makeRadialGradient(x1: number, y1: number, r: any, ...args: any[]): typeof RadialGradient;
        /**
         * @name Two#makeSprite
         * @function
         * @param {(String|Two.Texture)} pathOrTexture - The URL path to an image or an already created {@link Two.Texture}.
         * @param {Number} x
         * @param {Number} y
         * @param {Number} [columns=1]
         * @param {Number} [rows=1]
         * @param {Number} [frameRate=0]
         * @param {Boolean} [autostart=false]
         * @returns {Two.Sprite}
         * @description Creates a Two.js sprite object and adds it to the scene. Sprites can be used for still images as well as animations.
         */
        makeSprite(path: any, x: number, y: number, cols: any, rows?: number, frameRate?: number, autostart?: boolean): typeof Sprite;
        /**
         * @name Two#makeImageSequence
         * @function
         * @param {(String[]|Two.Texture[])} pathsOrTextures - An array of paths or of {@link Two.Textures}.
         * @param {Number} x
         * @param {Number} y
         * @param {Number} [frameRate=0]
         * @param {Boolean} [autostart=false]
         * @returns {Two.ImageSequence}
         * @description Creates a Two.js image sequence object and adds it to the scene.
         */
        makeImageSequence(paths: any, x: number, y: number, frameRate?: number, autostart?: boolean): typeof ImageSequence;
        /**
         * @name Two#makeTexture
         * @function
         * @param {(String|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement)} [pathOrSource] - The URL path to an image or a DOM image-like element.
         * @param {Function} [callback] - Function to be invoked when the image is loaded.
         * @returns {Two.Texture}
         * @description Creates a Two.js texture object.
         */
        makeTexture(path: any, callback?: Function): typeof Texture;
        /**
         * @name Two#makeGroup
         * @function
         * @param {(Two.Shape[]|...Two.Shape)} [objects] - Two.js objects to be added to the group in the form of an array or as individual arguments.
         * @returns {Two.Group}
         * @description Creates a Two.js group object and adds it to the scene.
         */
        makeGroup(o: any, ...args: any[]): typeof Group;
        /**
         * @name Two#interpret
         * @function
         * @param {SVGElement} SVGElement - The SVG node to be parsed.
         * @param {Boolean} shallow - Don't create a top-most group but append all content directly.
         * @param {Boolean} [add=true] – Automatically add the reconstructed SVG node to scene.
         * @returns {Two.Group}
         * @description Interpret an SVG Node and add it to this instance's scene. The distinction should be made that this doesn't `import` svg's, it solely interprets them into something compatible for Two.js - this is slightly different than a direct transcription.
         */
        interpret(SVGElement: SVGElement, shallow: boolean, add?: boolean): typeof Group;
        /**
         * @name Two#load
         * @function
         * @param {String|SVGElement} pathOrSVGContent - The URL path of an SVG file or an SVG document as text.
         * @param {Function} callback - Function to call once loading has completed.
         * @returns {Two.Group}
         * @description Load an SVG file or SVG text and interpret it into Two.js legible objects.
         */
        load(text: any, callback: Function): typeof Group;
    }
    import { Line } from "two.js/src/shapes/line";
    import { Path } from "two.js/src/path";
    import { Rectangle } from "two.js/src/shapes/rectangle";
    import { Circle } from "two.js/src/shapes/circle";
    import { Ellipse } from "two.js/src/shapes/ellipse";
    import { Star } from "two.js/src/shapes/star";
    import { Polygon } from "two.js/src/shapes/polygon";
    import { ArcSegment } from "two.js/src/shapes/arc-segment";
    import { Points } from "two.js/src/shapes/points";
    import { Text } from "two.js/src/text";
    import { LinearGradient } from "two.js/src/effects/linear-gradient";
    import { RadialGradient } from "two.js/src/effects/radial-gradient";
    import { Sprite } from "two.js/src/effects/sprite";
    import { ImageSequence } from "two.js/src/effects/image-sequence";
    import { Texture } from "two.js/src/effects/texture";
    import { Group } from "two.js/src/group";
    import { Anchor } from "two.js/src/anchor";
    import { Collection } from "two.js/src/collection";
    import { Events } from "two.js/src/events";
    import { Matrix } from "two.js/src/matrix";
    import { Registry } from "two.js/src/registry";
    import { Shape } from "two.js/src/shape";
    import { Vector } from "two.js/src/vector";
    import { Gradient } from "two.js/src/effects/gradient";
    import { Stop } from "two.js/src/effects/stop";
    import { RoundedRectangle } from "two.js/src/shapes/rounded-rectangle";
    import { Renderer as CanvasRenderer } from "two.js/src/renderers/canvas";
    import { Renderer as SVGRenderer } from "two.js/src/renderers/svg";
    import { Renderer as WebGLRenderer } from "two.js/src/renderers/webgl";
}
declare module "two.js/extras/jsm/zui" {
    /**
     * @name Two.ZUI
     * @class
     * @param {Two.Group} group - The scene or group to
     * @param {HTMLElement} [domElement=document.body] - The HTML Element to attach event listeners to.
     */
    export class ZUI {
        static Surface: typeof Surface;
        static Clamp(v: any, min: any, max: any): number;
        static Limit: {
            min: number;
            max: number;
            clone: () => {};
        };
        static TranslateMatrix(m: any, x: any, y: any): any;
        static PositionToScale(pos: any): number;
        static ScaleToPosition(scale: any): number;
        constructor(group: any, domElement: any);
        limits: {
            scale: {};
            x: {};
            y: {};
        };
        viewport: any;
        viewportOffset: {
            top: number;
            left: number;
            matrix: Matrix;
        };
        surfaceMatrix: Matrix;
        surfaces: any[];
        add(surface: any): ZUI;
        addLimits(min: any, max: any, type: any): ZUI;
        clientToSurface(x: any, y: any): any;
        surfaceToClient(v: any): any;
        zoomBy(byF: any, clientX: any, clientY: any): ZUI;
        zoomSet(zoom: any, clientX: any, clientY: any): ZUI;
        zoom: number;
        scale: any;
        translateSurface(x: any, y: any): ZUI;
        updateOffset(): ZUI;
        updateSurface(): ZUI;
        reset(): ZUI;
        fitToLimits(s: any): number;
    }
    import { Matrix } from "two.js/src/matrix";
    class Surface {
        constructor(object: any);
        object: any;
        limits(min: any, max: any): Surface | {
            min: any;
            max: any;
        };
        min: any;
        max: any;
        apply(px: any, py: any, s: any): Surface;
    }
    export {};
}
