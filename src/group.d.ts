declare module 'two.js/src/group' {
  type ChildParams =
    | Parameters<typeof Path.fromObject>[0]
    | Parameters<typeof Text.fromObject>[0]
    | Parameters<typeof Points.fromObject>[0];
  /**
   * @name Two.Group
   * @class
   * @param {Shape[]} [children] - A list of objects that inherit {@link Two.Shape}. For instance, the array could be a {@link Two.Path}, {@link Two.Text}, and {@link Two.RoundedRectangle}.
   * @description This is the primary class for grouping objects that are then drawn in Two.js. In Illustrator this is a group, in After Effects it would be a Null Object. Whichever the case, the `Two.Group` contains a transformation matrix and commands to style its children, but it by itself doesn't render to the screen.
   * @nota-bene The {@link Two#scene} is an instance of `Two.Group`.
   */
  export class Group extends Shape {
    static Children: Children;
    static IsVisible(element: Element, visibleOnly?: boolean): boolean;
    static VisitForHitTest(
      group: Group,
      context: {
        x: number;
        y: number;
        visibleOnly: boolean;
        results: Element[];
      },
      includeGroups: boolean,
      filter: Function | null,
      hitOptions: Pick<
        SceneHitTestOptions,
        'precision' | 'fill' | 'stroke' | 'tolerance' | 'ignoreVisibility'
      >,
      tolerance: number,
      stopOnFirst: null
    ): boolean;
    /**
     * @name Two.Group.InsertChildren
     * @function
     * @param {Shape[]} children - The objects to be inserted.
     * @description Cached method to let renderers know children have been added to a {@link Two.Group}.
     */
    static InsertChildren(children: Shape[]): void;
    /**
     * @name Two.Group.RemoveChildren
     * @function
     * @param {Shape[]} children - The objects to be removed.
     * @description Cached method to let renderers know children have been removed from a {@link Two.Group}.
     */
    static RemoveChildren(children: Shape[]): void;
    /**
     * @name Two.Group.OrderChildren
     * @function
     * @description Cached method to let renderers know order has been updated on a {@link Two.Group}.
     */
    static OrderChildren(children: Shape[]): void;
    /**
     * @name Two.Group.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.Group}.
     */
    static Properties: string[];
    static fromObject(
      obj: Parameters<typeof Shape.fromObject>[0] & {
        children?: (ChildParams | Parameters<typeof Group.fromObject>[0])[];
        opacity?: number;
        mask?: ChildParams;
      }
    ): Group;
    constructor(children?: Shape[]);
    constructor(...args: Shape[]);
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
     * @property {(String|Gradient|Texture)} - The value of what all child shapes should be filled in with.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
     */
    fill: string | Gradient | Texture;
    /**
     * @name Two.Group#stroke
     * @property {(String|Gradient|Texture)} - The value of what all child shapes should be outlined in with.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
     */
    stroke: string | Gradient | Texture;
    /**
     * @name Two.Group#linewidth
     * @property {Number} - The thickness in pixels of the stroke for all child shapes.
     */
    linewidth: number;
    /**
     * @name Two.Group#opacity
     * @property {Number} - The opaqueness of all child shapes.
     * @nota-bene Becomes multiplied by the individual child's opacity property.
     */
    opacity: number;
    /**
     * @name Two.Group#visible
     * @property {Boolean} - Display the path or not.
     * @nota-bene For {@link Two.CanvasRenderer} and {@link Two.WebGLRenderer} when set to false all updating is disabled improving performance dramatically with many objects in the scene.
     */
    visible: boolean;
    /**
     * @name Two.Group#cap
     * @property {String}
     * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeLinecapProperty}
     */
    cap: CapProperties;
    /**
     * @name Two.Group#join
     * @property {String}
     * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeLinejoinProperty}
     */
    join: JoinProperties;
    /**
     * @name Two.Group#miter
     * @property {String}
     * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeMiterlimitProperty}
     */
    miter: number;
    /**
     * @name Two.Group#closed
     * @property {Boolean} - Determines whether a final line is drawn between the final point in the `vertices` array and the first point of all child shapes.
     */
    closed: boolean;
    /**
     * @name Two.Group#curved
     * @property {Boolean} - When the child's path is `automatic = true` this boolean determines whether the lines between the points are curved or not.
     */
    curved: boolean;
    /**
     * @name Two.Group#automatic
     * @property {Boolean} - Determines whether or not Two.js should calculate curves, lines, and commands automatically for you or to let the developer manipulate them for themselves.
     */
    automatic: boolean;
    /**
     * @name Two.Group#beginning
     * @property {Number} - Number between zero and one to state the beginning of where the path is rendered.
     * @description {@link Two.Group#beginning} is a percentage value that represents at what percentage into all child shapes should the renderer start drawing.
     * @nota-bene This is great for animating in and out stroked paths in conjunction with {@link Two.Group#ending}.
     */
    beginning: number;
    /**
     * @name Two.Group#ending
     * @property {Number} - Number between zero and one to state the ending of where the path is rendered.
     * @description {@link Two.Group#ending} is a percentage value that represents at what percentage into all child shapes the renderer should stop drawing.
     * @nota-bene This is great for animating in and out stroked paths in conjunction with {@link Two.Group#beginning}.
     */
    ending: number;
    /**
     * @name Two.Group#length
     * @property {Number} - The sum of distances between all child lengths.
     */
    length: number;
    /**
     * @name Two.Group#mask
     * @property {Shape} - The Two.js object to clip from a group's rendering.
     */
    mask: Shape | null | undefined;
    /**
     * @name Two.Group#strokeAttenuation
     * @property {Boolean} - When set to `true`, stroke width scales with transformations (default behavior). When `false`, stroke width remains constant in screen space for all child shapes.
     * @description When `strokeAttenuation` is `false`, this property is applied to all child shapes, making their stroke widths automatically adjust to compensate for the group's world transform scale, maintaining constant visual thickness regardless of zoom level. When `true` (default), stroke widths scale normally with transformations.
     */
    strokeAttenuation: boolean;
    /**
     * @name Two.Group#additions
     * @property {Shape[]}
     * @description An automatically updated list of children that need to be appended to the renderer's scenegraph.
     */
    additions: Shape[];
    /**
     * @name Two.Group#subtractions
     * @property {Shape[]}
     * @description An automatically updated list of children that need to be removed from the renderer's scenegraph.
     */
    subtractions: Shape[];
    /**
     * @name Two.Group#children
     * @property {Group.Children}
     * @description A list of all the children in the scenegraph.
     * @nota-bene Ther order of this list indicates the order each element is rendered to the screen.
     */
    children: Children;
    /**
     * @name Two.Group#copy
     * @function
     * @param {Two.Group} [group] - The reference {@link Two.Group}
     * @returns {Two.Group}
     * @description Copy the properties of one {@link Two.Group} onto another.
     */
    copy(group: Group): Group;
    /**
     * @name Two.Group#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the group.
     */
    toObject(): Object;
    /**
     * @name Two.Group#dispose
     * @function
     * @description Release the group's renderer resources and detach all events.
     * This method recursively disposes all child objects, unbinds the children
     * collection events, and preserves the renderer type for potential re-attachment
     * to a new renderer.
     */
    dispose(): Group;
    /**
     * @name Two.Group#getShapesAtPoint
     * @function
     * @param {Number} x - X coordinate in world space.
     * @param {Number} y - Y coordinate in world space.
     * @param {SceneHitTestOptions} [options]
     * @returns {Shape[]} Ordered list of intersecting shapes, front to back.
     * @description Traverse the group hierarchy and return shapes that contain the specified point.
     */
    getShapesAtPoint(
      x: number,
      y: number,
      options?: SceneHitTestOptions
    ): Shape[];
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
     * @returns {Shape} - Or `null` if nothing is found.
     */
    getById(id: string): Shape;
    /**
     * @name Two.Group#getByClassName
     * @function
     * @description Recursively search for classes. Returns an array of matching elements.
     * @returns {Shape[]} - Or empty array if nothing is found.
     */
    getByClassName(className: string): Shape[];
    /**
     * @name Two.Group#getByType
     * @function
     * @description Recursively search for children of a specific type, e.g. {@link Two.Path}. Pass a reference to this type as the param. Returns an array of matching elements.
     * @returns {Shape[]} - Empty array if nothing is found.
     */
    getByType(type: Shape): Shape[];
    /**
     * @name Two.Group#add
     * @function
     * @param {Element[]} objects - An array of objects to be added. Can also be supplied as individual arguments.
     * @params {...Element} [args] - Alternatively pass shapes as each argument
     * @description Add objects to the group.
     */
    add(objects: Shape | Shape[]): Group;
    add(...args: Shape[]): Group;
    /**
     * @name Two.Group#remove
     * @function
     * @description Remove self from the scene / parent.
     */
    remove(): Shape;
    /**
     * @name Two.Group#remove
     * @function
     * @param {Shape[]} objects - An array of objects to be removed. Can also be supplied as individual arguments.
     * @description Remove objects from the group.
     */
    remove(objects: Shape[]): Shape[];
    /**
     * @name Two.Group#remove
     * @function
     * @params {...Shape} [args] - Alternatively pass shapes as each argument
     * @description Remove objects from the group.
     */
    remove(...args: Shape[]): Shape | Shape[];
    /**
     * @name Two.Group#getBoundingClientRect
     * @function
     * @param {Boolean} [shallow=false] - Describes whether to calculate off local matrix or world matrix.
     * @returns {Object} - Returns object with top, left, right, bottom, width, height attributes.
     * @description Return an object with top, left, right, bottom, width, and height parameters of the group.
     */
    getBoundingClientRect(shallow?: boolean): BoundingBox;
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
    subdivide(limit?: number): Group;
    /**
     * @name Two.Group#clone
     * @function
     * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
     * @returns {Two.Group}
     * @description Create a new instance of {@link Two.Group} with the same properties of the current group.
     */
    clone(parent?: Group): Group;
    /**
     * @name Two.Group#_update
     * @function
     * @private
     * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
     * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
     * @nota-bene Try not to call this method more than once a frame.
     */
    protected _update(bubbles?: boolean): Group;
    /**
     * @name Two.Group#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset(): Group;
  }
  import { Shape } from 'two.js/src/shape';
  import { Path, CapProperties, JoinProperties } from 'two.js/src/path';
  import { Text } from 'two.js/src/text';
  import { Points } from 'two.js/src/shapes/points';
  import { Children } from 'two.js/src/children';
  import { Gradient } from 'two.js/src/effects/gradient';
  import { Texture } from 'two.js/src/effects/texture';
  import { BoundingBox, SceneHitTestOptions } from 'two.js';
}
