declare module 'two.js/src/shapes/points' {
  /**
   * @name Two.Points
   * @class
   * @param {Vector[]} [vertices] - A list of {@link Two.Vector}s that represent the order and coordinates to construct a rendered set of points.
   * @description This is a primary primitive class for quickly and easily drawing points in Two.js. Unless specified methods return their instance of `Two.Points` for the purpose of chaining.
   */
  export class Points extends Shape {
    static Properties: (
      | 'fill'
      | 'stroke'
      | 'linewidth'
      | 'opacity'
      | 'visible'
      | 'size'
      | 'sizeAttenuation'
      | 'beginning'
      | 'ending'
      | 'dashes'
      | string
    )[];
    static fromObject(
      obj: Parameters<typeof Shape.fromObject>[0] & {
        fill?: string;
        stroke?: string;
        linewidth?: number;
        opacity?: number;
        visible?: boolean;
        size?: number;
        sizeAttenuation?: boolean;
        beginning?: number;
        ending?: number;
        dashes: number[] & {
          offset?: number;
        };
      }
    ): Points;
    constructor(vertices?: Vector[]);
    private _flagVertices;
    private _flagLength;
    private _flagFill;
    private _flagStroke;
    private _flagLinewidth;
    private _flagOpacity;
    private _flagVisible;
    private _flagSize;
    private _flagSizeAttenuation;
    private _length;
    private _fill;
    private _stroke;
    private _linewidth;
    private _opacity;
    private _visible;
    private _size;
    private _sizeAttenuation;
    private _beginning;
    private _ending;
    private _dashes;
    private _strokeAttenuation;
    /**
     * @name Two.Points#size
     * @property {Number} - Number describing the diameter each point should have
     * @description Set the size of each point in the collection of {@link Two.Points}
     */
    size: number;
    /**
     * @name Two.Points#sizeAttenuation
     * @property {Boolean} - Boolean dictating whether Two.js should scale the size of the points based on its matrix hierarchy.
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
     * @description {@link Two.Points#ending} is a percentage value that represents at what percentage into the points the renderer should stop drawing.
     */
    ending: number;
    /**
     * @name Two.Points#fill
     * @property {(String|Gradient|Texture)} - The value of what the path should be filled in with.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
     */
    fill: string | Gradient | Texture;
    /**
     * @name Two.Points#stroke
     * @property {(String|Gradient|Texture)} - The value of what the path should be outlined in with.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
     */
    stroke: string | Gradient | Texture;
    /**
     * @name Two.Points#className
     * @property {String} - A class to be applied to the element to be compatible with CSS styling.
     * @nota-bene Only available for the SVG renderer.
     */
    /**
     * @name Two.Points#linewidth
     * @property {Number} - The thickness in pixels of the stroke.
     */
    linewidth: number;

    /**
     * @name Two.Points#opacity
     * @property {Number} - The opaqueness of the path.
     * @nota-bene Can be used in conjunction with CSS Colors that have an alpha value.
     */
    opacity: number;
    className: string;
    /**
     * @name Two.Points#visible
     * @property {Boolean} - Display the points or not.
     * @nota-bene For {@link Two.CanvasRenderer} and {@link Two.WebGLRenderer} when set to false all updating is disabled improving performance dramatically with many objects in the scene.
     */
    visible: boolean;
    /**
     * @name Two.Points#vertices
     * @property {Vector[]} - An ordered list of vector points for rendering points.
     * @description A list of {@link Two.Vector} objects that consist of which coordinates to draw points at.
     * @nota-bene The array when manipulating is actually a {@link Two.Collection}.
     */
    vertices: (Anchor | Vector)[];
    /**
     * @name Two.Points#dashes
     * @type {number[] & { offset?: number }}
     * @property {Number[]} - Array of numbers. Odd indices represent dash length. Even indices represent dash space.
     * @description A list of numbers that represent the repeated dash length and dash space applied to the stroke of the points.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray} for more information on the SVG stroke-dasharray attribute.
     */
    dashes: number[] & {
      offset?: number;
    };
    /**
     * @name Two.Points#strokeAttenuation
     * @property {Boolean} - When set to `true`, stroke width scales with transformations (default behavior). When `false`, stroke width remains constant in screen space.
     * @description When `strokeAttenuation` is `false`, the stroke width is automatically adjusted to compensate for the object's world transform scale, maintaining constant visual thickness regardless of zoom level. When `true` (default), stroke width scales normally with transformations.
     */
    strokeAttenuation: boolean;
    /**
     * @name Two.Points#copy
     * @function
     * @param {Two.Points} points - The reference {@link Two.Points}
     * @description Copy the properties of one {@link Two.Points} onto another.
     */
    copy(points: Points): Points;
    /**
     * @name Two.Points#clone
     * @function
     * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
     * @returns {Two.Points}
     * @description Create a new instance of {@link Two.Points} with the same properties of the current path.
     */
    clone(parent?: Group): Points;
    /**
     * @name Two.Points#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the points object.
     */
    toObject(): object;
    /**
     * @name Two.Points#dispose
     * @function
     * @description Release the points' renderer resources and detach all events.
     * This method cleans up vertices collection events, individual vertex events,
     * and disposes fill/stroke effects (calling dispose() on Gradients and
     * Textures for thorough cleanup) while preserving the renderer type for
     * potential re-attachment to a new renderer.
     */
    dispose(): Points;
    /**
     * @name Two.Points#noFill
     * @function
     * @description Short hand method to set fill to `none`.
     */
    noFill: () => Points;
    /**
     * @name Two.Points#noStroke
     * @function
     * @description Short hand method to set stroke to `none`.
     */
    noStroke: () => Points;
    /**
     * @name Two.Points#corner
     * @function
     * @description Orient the vertices of the shape to the upper left-hand corner of the points object.
     */
    corner: () => Points;
    /**
     * @name Two.Points#center
     * @function
     * @description Orient the vertices of the shape to the center of the points object.
     */
    center: () => Points;
    /**
     * @name Two.Points#getBoundingClientRect
     * @function
     * @param {Boolean} [shallow=false] - Describes whether to calculate off local matrix or world matrix.
     * @returns {Object} - Returns object with top, left, right, bottom, width, height attributes.
     * @description Return an object with top, left, right, bottom, width, and height parameters of the path.
     */
    getBoundingClientRect: (shallow?: boolean) => BoundingBox;
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
    private _updateLength(limit?: number, silent?: boolean): Points;
    /**
     * @name Two.Points#_update
     * @function
     * @private
     * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
     * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
     * @nota-bene Try not to call this method more than once a frame.
     */
    protected _update(bubbles?: boolean): Points;
    /**
     * @name Two.Points#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset(): Points;
  }
  import { Shape } from 'two.js/src/shape';
  import { Group } from 'two.js/src/group';
  import { Gradient } from 'two.js/src/effects/gradient';
  import { Texture } from 'two.js/src/effects/texture';
  import { BoundingBox } from 'two.js';
  import { Vector } from 'two.js/src/vector';
  import { Anchor } from 'two.js/src/anchor';
}
