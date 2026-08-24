declare module 'two.js/src/path' {
  export type CapProperties = 'butt' | 'round' | 'square';
  export type JoinProperties = 'miter' | 'round' | 'bevel';
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
  export class Path extends Shape {
    /**
     * @name Two.Path.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.Path}.
     */
    static Properties: string[];
    static Utils: {
      getCurveLength: (
        a: Anchor | Vector,
        b: Anchor | Vector,
        limit: number
      ) => number;
    };
    /**
     * @name Two.Path.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.Path} to create a new instance
     * @returns {Two.Path}
     * @description Create a new {@link Two.Path} from an object notation of a {@link Two.Path}.
     * @nota-bene Works in conjunction with {@link Two.Path#toObject}
     */
    static fromObject(
      obj: Parameters<typeof Shape.fromObject>[0] & {
        vertices?: ({ x: number; y: number } | Anchor | Vector)[];
        fill?: string;
        stroke?: string;
        linewidth?: number;
        opacity?: number;
        visible?: boolean;
        cap?: CapProperties;
        join?: JoinProperties;
        miter?: number;
        closed?: boolean;
        curved?: boolean;
        automatic?: boolean;
        beginning?: number;
        ending?: number;
        dashes?: number[] & {
          offset?: number;
        };
      }
    ): Path;
    constructor(
      vertices?: Anchor[],
      closed?: boolean,
      curved?: boolean,
      manual?: boolean
    );
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
     * @name Two.Path#_strokeAttenuation
     * @private
     * @see {@link Two.Path#strokeAttenuation}
     */
    private _strokeAttenuation;
    /**
     * @name Two.Path#closed
     * @property {Boolean} - Determines whether a final line is drawn between the final point in the `vertices` array and the first point.
     */
    closed: boolean;
    /**
     * @name Two.Path#curved
     * @property {Boolean} - When the path is `automatic = true` this boolean determines whether the lines between the points are curved or not.
     */
    curved: boolean;
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
     * @description {@link Two.Path#ending} is a percentage value that represents at what percentage into the path the renderer should stop drawing.
     * @nota-bene This is great for animating in and out stroked paths in conjunction with {@link Two.Path#beginning}.
     */
    ending: number;
    /**
     * @name Two.Path#fill
     * @property {(String|Gradient|Texture)} - The value of what the path should be filled in with.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
     */
    fill: string | Gradient | Texture;
    /**
     * @name Two.Path#stroke
     * @property {(String|Gradient|Texture)} - The value of what the path should be outlined in with.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
     */
    stroke: string | Gradient | Texture;
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
    cap: CapProperties;
    /**
     * @name Two.Path#join
     * @property {String}
     * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeLinejoinProperty}
     */
    join: JoinProperties;
    /**
     * @name Two.Path#miter
     * @property {String}
     * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeMiterlimitProperty}
     */
    miter: number;
    /**
     * @name Two.Path#vertices
     * @property {Anchor[]} - An ordered list of anchor points for rendering the path.
     * @description A list of {@link Two.Anchor} objects that consist of what form the path takes.
     * @nota-bene The array when manipulating is actually a {@link Two.Collection}.
     */
    vertices: Anchor[];
    /**
     * @name Two.Path#automatic
     * @property {Boolean} - Determines whether or not Two.js should calculate curves, lines, and commands automatically for you or to let the developer manipulate them for themselves.
     */
    automatic: boolean;
    /**
     * @name Two.Path#dashes
     * @type {number[] & { offset?: number }}
     * @property {Number[]} - Array of numbers. Odd indices represent dash length. Even indices represent dash space.
     * @description A list of numbers that represent the repeated dash length and dash space applied to the stroke of the path.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray} for more information on the SVG stroke-dasharray attribute.
     */
    dashes: number[] & {
      offset?: number;
    };
    /**
     * @name Two.Path#strokeAttenuation
     * @property {Boolean} - When set to `true`, stroke width scales with transformations (default behavior). When `false`, stroke width remains constant in screen space.
     * @description When `strokeAttenuation` is `false`, the stroke width is automatically adjusted to compensate for the object's world transform scale, maintaining constant visual thickness regardless of zoom level. When `true` (default), stroke width scales normally with transformations.
     */
    strokeAttenuation: boolean;
    /**
     * @name Two.Path#copy
     * @function
     * @param {Two.Path} path - The reference {@link Two.Path}
     * @description Copy the properties of one {@link Two.Path} onto another.
     */
    copy(path: Path): Path;
    /**
     * @name Two.Path#clone
     * @function
     * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
     * @returns {Two.Path}
     * @description Create a new instance of {@link Two.Path} with the same properties of the current path.
     */
    clone(parent?: Group): Path;
    /**
     * @name Two.Path#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the path.
     */
    toObject(): object;
    /**
     * @name Two.Path#dispose
     * @function
     * @description Release the path's renderer resources and detach all events.
     * This method cleans up vertices collection events, individual vertex events,
     * control point events, and disposes fill/stroke effects (calling dispose()
     * on Gradients and Textures for thorough cleanup) while preserving the
     * renderer type for potential re-attachment to a new renderer.
     */
    dispose(): Path;
    /**
     * @name Two.Path#noFill
     * @function
     * @description Short hand method to set fill to `none`.
     */
    noFill(): Path;
    /**
     * @name Two.Path#noStroke
     * @function
     * @description Short hand method to set stroke to `none`.
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
    getBoundingClientRect(shallow?: boolean): BoundingBox;
    /**
     * @name Two.Path#getPointAt
     * @function
     * @param {Number} t - Percentage value describing where on the {@link Two.Path} to estimate and assign coordinate values.
     * @param {Vector} [obj] - Object to apply calculated x, y to. If none available returns new `Object`.
     * @returns {Object}
     * @description Given a float `t` from 0 to 1, return a point or assign a passed `obj`'s coordinates to that percentage on this {@link Two.Path}'s curve.
     */
    getPointAt(t: number, obj?: Vector): Vector;
    /**
     * @name Two.Path#plot
     * @function
     * @description Based on closed / curved and sorting of vertices plot where all points should be and where the respective handles should be too.
     * @nota-bene While this method is public it is internally called by {@link Two.Path#_update} when `automatic = true`.
     */
    plot(): Path;
    /**
     * @name Two.Path#smooth
     * @function
     * @param {Object} [options] - Configuration for smoothing.
     * @param {String} [options.type='continuous'] - Type of smoothing algorithm.
     * @param {Number} [options.from=0] - Index of vertices to start smoothing
     * @param {Number} [options.to=1] - Index of vertices to terminate smoothing
     * @description Adjust vertex handles to generate smooth curves without toggling `automatic`.
     */
    smooth(): Path;
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
    private _updateLength(limit: number, silent?: boolean): Path;
    private _lengths: number[];
    /**
     * @name Two.Path#_update
     * @function
     * @private
     * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
     * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
     * @nota-bene Try not to call this method more than once a frame.
     */
    protected _update(bubbles?: boolean): Path;
    /**
     * @name Two.Path#contains
     * @function
     * @param {Number} x - x coordinate to hit test against
     * @param {Number} y - y coordinate to hit test against
     * @param {Object} [options] - Optional options object
     * @param {Boolean} [options.ignoreVisibility] - If `true`, hit test against `path.visible = false` shapes
     * @param {Number} [options.tolerance] - Padding to hit test against in pixels
     * @returns {Boolean}
     * @description Check to see if coordinates are within a {@link Two.Path}'s bounding rectangle
     * @nota-bene Expects *world-space coordinates* – the same pixel-space you get from the renderer (e.g., mouse `clientX`/`clientY` adjusted for the canvas’s offset and pixel ratio).
     */
    contains(
      x: number,
      y: number,
      options?: { ignoreVisibility: boolean; tolerance: number }
    ): boolean;
    /**
     * @name Two.Path#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset(): Path;
  }
  import { Vector } from 'two.js/src/vector';
  import { Anchor } from 'two.js/src/anchor';
  import { Shape } from 'two.js/src/shape';
  import { Gradient } from 'two.js/src/effects/gradient';
  import { Group } from 'two.js/src/group';
  import { Texture } from 'two.js/src/effects/texture';
  import { BoundingBox } from 'two.js';
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
  export function BindVertices(items: Anchor[]): void;
  /**
   * @name UnbindVertices
   * @private
   * @function
   * @description Cached method to let {@link Two.Path} know vertices have been removed from the instance.
   */
  export function UnbindVertices(items: Anchor[]): void;
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
