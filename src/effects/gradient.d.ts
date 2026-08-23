declare module 'two.js/src/effects/gradient' {
  type SpreadProperties = 'pad' | 'reflect' | 'repeat';
  type UnitsProperties = 'userSpaceOnUse' | 'objectBoundingBox';
  /**
   * @name Two.Gradient
   * @class
   * @param {Stop[]} [stops] - A list of {@link Two.Stop}s that contain the gradient fill pattern for the gradient.
   * @description This is the base class for constructing different types of gradients with Two.js. The two common gradients are {@link Two.LinearGradient} and {@link Two.RadialGradient}.
   */
  export class Gradient extends TwoElement {
    /**
     * @name Two.Gradient.Stop
     * @see {@link Two.Stop}
     */
    static Stop: Stop;
    /**
     * @name Two.Gradient.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.Gradient}.
     */
    static Properties: ('spread' | 'stops' | 'units' | string)[];
    /**
     * @name Two.Gradient.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.Gradient} to create a new instance
     * @returns {Two.Gradient}
     * @description Create a new {@link Two.Gradient} from an object notation of a {@link Two.Gradient}.
     * @nota-bene Works in conjunction with {@link Two.Gradient#toObject}
     */
    static fromObject(
      obj: Parameters<typeof TwoElement.fromObject>[0] & {
        stops?: (Stop | Parameters<typeof Stop.fromObject>[0])[];
        spread?: SpreadProperties;
        units?: UnitsProperties;
      }
    ): Gradient;
    constructor(stops?: Stop[]);
    private _flagStops: boolean;
    private _flagSpread: boolean;
    private _flagUnits: boolean;
    private _spread: string;
    private _units: string;
    /**
     * @name Two.Gradient#renderer
     * @property {Object}
     * @description Object access to store relevant renderer specific variables. Warning: manipulating this object can create unintended consequences.
     * @nota-bene With the {@link Two.SVGRenderer} you can access the underlying SVG element created via `shape.renderer.elem`.
     */
    /**
     * @name Two.Gradient#id
     * @property {String} - Session specific unique identifier.
     * @nota-bene In the {@link Two.SVGRenderer} change this to change the underlying SVG element's id too.
     */
    id: string;
    /**
     * @name Two.Gradient#spread
     * @property {String} - Indicates what happens if the gradient starts or ends inside the bounds of the target rectangle. Possible values are `'pad'`, `'reflect'`, and `'repeat'`.
     * @see {@link https://www.w3.org/TR/SVG11/pservers.html#LinearGradientElementSpreadMethodAttribute} for more information
     */
    spread: SpreadProperties;
    /**
     * @name Two.Gradient#units
     * @property {String} [units='objectBoundingBox'] - Indicates how coordinate values are interpreted by the renderer. Possible values are `'userSpaceOnUse'` and `'objectBoundingBox'`.
     * @see {@link https://www.w3.org/TR/SVG11/pservers.html#RadialGradientElementGradientUnitsAttribute} for more information
     */
    units: UnitsProperties;
    /**
     * @name Two.Gradient#stops
     * @property {Two.Stop[]} - An ordered list of {@link Two.Stop}s for rendering the gradient.
     * @nota-bene Actually a {@link Two.Collection} polyfilled to act like an observable Array.
     */
    stops: Stop[];
    /**
     * @name Two.Gradient#copy
     * @function
     * @param {Two.Gradient} gradient - The reference {@link Two.Gradient}
     * @description Copy the properties of one {@link Two.Gradient} onto another.
     */
    copy(gradient: Gradient): Gradient;
    /**
     * @name Two.Gradient#clone
     * @function
     * @param {Group} [parent] - The parent group or scene to add the clone to.
     * @returns {Gradient}
     * @description Create a new instance of {@link Two.Gradient} with the same properties of the current path.
     */
    clone(parent?: Group): Gradient;
    /**
     * @name Two.Gradient#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the path.
     */
    toObject(): object;
    /**
     * @name Two.Gradient#_update
     * @function
     * @private
     * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
     * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
     * @nota-bene Try not to call this method more than once a frame.
     */
    protected _update(bubbles?: boolean): Gradient;
    /**
     * @name Two.Gradient#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset(): Gradient;
    /**
     * @name Two.Gradient#dispose
     * @function
     * @description Detach instance from renderer including any `<defs />` or textures stored in memory.
     */
    dispose(): Gradient;
  }
  import { Element as TwoElement } from 'two.js/src/element';
  import { Stop } from 'two.js/src/effects/stop';
  import { Group } from 'two.js/src/group';
}
