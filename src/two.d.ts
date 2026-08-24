declare module 'two.js' {
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
     * @description The entrypoint for Two.js. Instantiate a `new Two` in order to setup a scene to render to. `Two` is also the publicly accessible interface that all other sub-classes, functions, and utilities attach to.
     */
  export default class Two {
    static NextFrameId: any;
    /**
     * @name Two.Types
     * @property {Object} - The different rendering types available in the library.
     */
    static Types: {
      webgl: 'WebGLRenderer';
      svg: 'SVGRenderer';
      canvas: 'CanvasRenderer';
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
    static Instances: Two[];
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
    static Element: typeof TwoElement;
    static Shape: typeof Shape;
    static Text: typeof Text;
    static Vector: typeof Vector;
    static Gradient: typeof Gradient;
    static Image: typeof Image;
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
      move: 'M';
      line: 'L';
      curve: 'C';
      arc: 'A';
      close: 'Z';
    };
    /**
     * @name Two.Utils
     * @property {Object} - A massive object filled with utility functions and properties.
     */
    static Utils: any;
    constructor(options?: {
      fullscreen?: boolean;
      fitted?: boolean;
      autostart?: boolean;
      width?: number;
      height?: number;
      type?: (typeof Two.Types)[keyof typeof Two.Types];
      domElement?: SVGElement | HTMLCanvasElement;
      overdraw?: boolean;
      smoothing?: boolean;
      ratio?: number;
    });
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
    type: (typeof Two.Types)[keyof typeof Two.Types];
    /**
     * @name Two#renderer
     * @property {(Two.SVGRenderer|CanvasRenderer|WebGLRenderer)} - The instantiated rendering class for the instance. For a list of possible rendering types check out Two.Types.
     */
    renderer: SVGRenderer | CanvasRenderer | WebGLRenderer;
    /**
     * @name Two#scene
     * @property {Group} - The base level {@link Two.Group} which houses all objects for the instance. Because it is a {@link Two.Group} transformations can be applied to it that will affect all objects in the instance. This is handy as a makeshift inverted camera.
     */
    scene: Group;
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
    fit(): void;
    /**
     * @name Two#appendTo
     * @function
     * @param {Element} elem - The DOM element to append the Two.js stage to.
     * @description Shorthand method to append your instance of Two.js to the `document`.
     */
    appendTo(elem: HTMLElement): Two;
    /**
     * @name Two#play
     * @function
     * @fires Two.Events.Types.play event
     * @description Call to start an internal animation loop.
     * @nota-bene This function initiates a `requestAnimationFrame` loop.
     */
    play(): Two;
    /**
     * @name Two#pause
     * @function
     * @fires Two.Events.Types.pause event
     * @description Call to stop the internal animation loop for a specific instance of Two.js.
     */
    pause(): Two;
    setPlaying(p: boolean): Two;
    /**
     * @name Two#release
     * @function
     * @param {Two.Element} [obj] - Object to release from event listening. If none provided then the root {@link Two.Group} will be used.
     * @returns {Two.Element} The object passed for event deallocation.
     * @description Release a {@link Two.Element}’s events from memory and recurse through its children, effects, and/or vertices.
     */
    release(obj?: undefined): Group;
    release<T extends TwoElement>(obj: T): T;
    getShapesAtPoint(
      x: number,
      y: number,
      options?: SceneHitTestOptions
    ): Shape[];
    /**
     * @name Two#update
     * @function
     * @fires Two.Events.Types.update event
     * @description Update positions and calculations in one pass before rendering. Then render to the canvas.
     * @nota-bene This function is called automatically if using {@link Two#play} or the `autostart` parameter in construction.
     */
    update(): Two;
    _lastFrame: number;
    /**
     * @name Two#render
     * @function
     * @fires render
     * @description Render all drawable and visible objects of the scene.
     */
    render(): Two;
    /**
     * @name Two#add
     * @function
     * @param {Shape | Shape[]} [objects] - An array of Two.js objects. Alternatively can add objects as individual arguments.
     * @description A shorthand method to add specific Two.js objects to the scene.
     */
    add(objects: Shape[]): Two;
    /**
     * @name Two#add
     * @function
     * @param {...Shape} [args] - Alternatively pass each shape as an argument
     * @description A shorthand method to add specific Two.js objects to the scene.
     */
    add(...args: Shape[]): Two;
    /**
     * @name Two#remove
     * @function
     * @param {Shape | Shape[]} [objects] - An array of Two.js objects.
     * @description A shorthand method to remove specific Two.js objects from the scene.
     */
    remove(objects: Shape[]): Two;
    /**
     * @name Two#remove
     * @function
     * @param {...Shape} [args] - Alternatively pass each shape as an argument
     * @description A shorthand method to remove specific Two.js objects from the scene.
     */
    remove(...args: Shape[]): Two;
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
     * @returns {Line}
     * @description Creates a Two.js line and adds it to the scene.
     */
    makeLine(x1: number, y1: number, x2: number, y2: number): Line;
    /**
     * @name Two#makeArrow
     * @function
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x2
     * @param {Number} y2
     * @returns {Path}
     * @description Creates a Two.js arrow and adds it to the scene.
     */
    makeArrow(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      size?: number
    ): Path;
    /**
     * @name Two#makeRectangle
     * @function
     * @param {Number} x
     * @param {Number} y
     * @param {Number} width
     * @param {Number} height
     * @returns {Rectangle}
     * @description Creates a Two.js rectangle and adds it to the scene.
     */
    makeRectangle(
      x: number,
      y: number,
      width: number,
      height: number
    ): Rectangle;
    /**
     * @name Two#makeRoundedRectangle
     * @function
     * @param {Number} x
     * @param {Number} y
     * @param {Number} width
     * @param {Number} height
     * @param {(Number|Vector)} radius
     * @returns {RoundedRectangle}
     * @description Creates a Two.js rounded rectangle and adds it to the scene.
     */
    makeRoundedRectangle(
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number | Vector
    ): RoundedRectangle;
    /**
     * @name Two#makeCircle
     * @function
     * @param {Number} x
     * @param {Number} y
     * @param {Number} radius
     * @param {Number} [resolution=4]
     * @returns {Circle}
     * @description Creates a Two.js circle and adds it to the scene.
     */
    makeCircle(
      x: number,
      y: number,
      radius: number,
      resolution?: number
    ): Circle;
    /**
     * @name Two#makeEllipse
     * @function
     * @param {Number} x
     * @param {Number} y
     * @param {Number} rx
     * @param {Number} ry
     * @param {Number} [resolution=4]
     * @returns {Ellipse}
     * @description Creates a Two.js ellipse and adds it to the scene.
     */
    makeEllipse(
      x: number,
      y: number,
      rx: number,
      ry: number,
      resolution?: number
    ): Ellipse;
    /**
     * @name Two#makeStar
     * @function
     * @param {Number} x
     * @param {Number} y
     * @param {Number} innerRadius
     * @param {Number} outerRadius
     * @param {Number} sides
     * @returns {Star}
     * @description Creates a Two.js star and adds it to the scene.
     */
    makeStar(
      x: any,
      y: any,
      innerRadius: number,
      outerRadius: number,
      sides: number
    ): Star;
    /**
     * @name Two#makeCurve
     * @function
     * @param {Anchor[]} [points] - An array of {@link Two.Anchor} points.
     * @returns {Path} - Where `path.curved` is set to `true`.
     * @description Creates a Two.js path that is curved and adds it to the scene.
     * @nota-bene In either case of passing an array or passing numbered arguments the last argument is an optional `Boolean` that defines whether the path should be open or closed.
     */
    makeCurve(points?: Anchor[]): Path;
    /**
     * @name Two#makeCurve
     * @function
     * @param {...Number} [args] - Alternatively you can pass alternating `x` / `y` coordinate values as individual arguments. These will be combined into {@link Two.Anchor}s for use in the path.
     * @returns {Path} - Where `path.curved` is set to `true`.
     * @description Creates a Two.js path that is curved and adds it to the scene.
     * @nota-bene In either case of passing an array or passing numbered arguments the last argument is an optional `Boolean` that defines whether the path should be open or closed.
     */
    makeCurve(...args: number[]): Path;
    /**
     * @name Two#makePolygon
     * @function
     * @param {Number} x
     * @param {Number} y
     * @param {Number} radius
     * @param {Number} sides
     * @returns {Polygon}
     * @description Creates a Two.js polygon and adds it to the scene.
     */
    makePolygon(x: number, y: number, radius: number, sides: number): Polygon;
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
     * @returns {ArcSegment}
     */
    makeArcSegment(
      x: number,
      y: number,
      innerRadius: number,
      outerRadius: number,
      startAngle: number,
      endAngle: number,
      resolution?: number
    ): ArcSegment;
    /**
     * @name Two#makePoints
     * @function
     * @param {Vector[]} [points] - An array of {@link Two.Vector} points
     * @returns {Points}
     * @description Creates a Two.js points object and adds it to the current scene.
     */
    makePoints(points?: Vector[]): Points;
    /**
     * @name Two#makePoints
     * @function
     * @param {...Number} [args] - Alternatively you can pass alternating `x` / `y` coordinate values as individual arguments. These will be combined into {@link Two.Vector}s for use in the points object.
     * @returns {Points}
     * @description Creates a Two.js points object and adds it to the current scene.
     */
    makePoints(...args: number[]): Points;
    /**
     * @name Two#makePath
     * @function
     * @param {Anchor[]} [points] - An array of {@link Two.Anchor} points
     * @returns {Path}
     * @description Creates a Two.js path and adds it to the scene.
     * @nota-bene In either case of passing an array or passing numbered arguments the last argument is an optional `Boolean` that defines whether the path should be open or closed.
     */
    makePath(points?: Anchor[]): Path;
    /**
     * @name Two#makePath
     * @function
     * @param {...Number} [args] - Alternatively you can pass alternating `x` / `y` coordinate values as individual arguments. These will be combined into {@link Two.Anchor}s for use in the path.
     * @returns {Path}
     * @description Creates a Two.js path and adds it to the scene.
     * @nota-bene In either case of passing an array or passing numbered arguments the last argument is an optional `Boolean` that defines whether the path should be open or closed.
     */
    makePath(...args: number[]): Path;
    /**
     * @name Two#makeText
     * @function
     * @param {String} message
     * @param {Number} x
     * @param {Number} y
     * @param {Object} [styles] - An object to describe any of the {@link Two.Text.Properties} including `fill`, `stroke`, `linewidth`, `family`, `alignment`, `leading`, `opacity`, etc..
     * @returns {Text}
     * @description Creates a Two.js text object and adds it to the scene.
     */
    makeText(
      message: string,
      x: number,
      y: number,
      styles?: {
        value?: string;
        family?: string;
        size?: number;
        leading?: number;
        alignment?: 'left' | 'center' | 'right';
        linewidth?: number;
        style?: 'normal' | 'italic';
        weight?: number | string;
        decoration?: 'underline' | 'strikethrough' | 'none';
        direction?: 'ltr' | 'rtl';
        baseline?: 'top' | 'middle' | 'bottom' | 'baseline';
        opacity?: number;
        visible?: boolean;
        fill?: string | Gradient | Texture;
        stroke?: string | Gradient | Texture;
        dashes?: number[] & { offset?: number };
      }
    ): Text;
    /**
     * @name Two#makeLinearGradient
     * @function
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x2
     * @param {Number} y2
     * @param {...Stop} args - Any number of color stops sometimes referred to as ramp stops. If none are supplied then the default black-to-white two stop gradient is applied.
     * @returns {LinearGradient}
     * @description Creates a Two.js linear gradient and adds it to the scene. In the case of an effect it's added to an invisible "definitions" group.
     */
    makeLinearGradient(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      ...args: Stop[]
    ): LinearGradient;
    /**
     * @name Two#makeRadialGradient
     * @function
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} radius
     * @param {...Stop} args - Any number of color stops sometimes referred to as ramp stops. If none are supplied then the default black-to-white two stop gradient is applied.
     * @returns {RadialGradient}
     * @description Creates a Two.js radial-gradient object and adds it to the scene. In the case of an effect it's added to an invisible "definitions" group.
     */
    makeRadialGradient(
      x1: number,
      y1: number,
      radius: number,
      ...args: Stop[]
    ): RadialGradient;
    /**
     * @name Two#makeSprite
     * @function
     * @param {(String|Texture)} src - The URL path to an image or an already created {@link Two.Texture}.
     * @param {Number} x
     * @param {Number} y
     * @param {Number} [columns=1]
     * @param {Number} [rows=1]
     * @param {Number} [frameRate=0]
     * @param {Boolean} [autostart=false]
     * @returns {Sprite}
     * @description Creates a Two.js sprite object and adds it to the scene. Sprites can be used for still images as well as animations.
     */
    makeSprite(
      src: any,
      x: number,
      y: number,
      columns?: number,
      rows?: number,
      frameRate?: number,
      autostart?: boolean
    ): Sprite;
    /**
     * @name Two#makeImage
     * @function
     * @param {(String|Two.Texture)} src - The URL path to an image or an already created {@link Two.Texture}.
     * @param {Number} x
     * @param {Number} y
     * @param {Number} [width]
     * @param {Number} [height]
     * @param {String} [mode="fill"]
     * @returns {Two.Image}
     * @description Creates a Two.js image object and adds it to the scene. Images are scaled to fit the provided width and height.
     */
    makeImage(
      src: any,
      x: number,
      y: number,
      width?: number,
      height?: number,
      mode?: 'fit' | 'fill' | 'crop' | 'tile' | 'stretch'
    ): Image;
    /**
     * @name Two#makeImageSequence
     * @function
     * @param {(String[]|Texture[])} src - An array of paths or of {@link Two.Textures}.
     * @param {Number} x
     * @param {Number} y
     * @param {Number} [frameRate=0]
     * @param {Boolean} [autostart=false]
     * @returns {ImageSequence}
     * @description Creates a Two.js image sequence object and adds it to the scene.
     */
    makeImageSequence(
      src: string[] | Texture[] | string | Texture,
      x: number,
      y: number,
      frameRate?: number,
      autostart?: boolean
    ): ImageSequence;
    /**
     * @name Two#makeTexture
     * @function
     * @param {(String|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement)} [src] - The URL path to an image or a DOM image-like element.
     * @param {Function} [callback] - Function to be invoked when the image is loaded.
     * @returns {Texture}
     * @description Creates a Two.js texture object.
     */
    makeTexture(
      src?: string | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
      callback?: () => void
    ): Texture;
    /**
     * @name Two#makeGroup
     * @function
     * @param {Shape[]} [objects] - Two.js objects to be added to the group in the form of an array or as individual arguments.
     * @returns {Group}
     * @description Creates a Two.js group object and adds it to the scene.
     */
    makeGroup(objects?: Shape[]): Group;
    /**
     * @name Two#makeGroup
     * @function
     * @param {...Shape} [args] - Alternatively pass each element as an argument
     * @returns {Group}
     * @description Creates a Two.js group object and adds it to the scene.
     */
    makeGroup(...args: Shape[]): Group;
    /**
     * @name Two#interpret
     * @function
     * @param {SVGElement} svg - The SVG node to be parsed.
     * @param {Boolean} shallow - Don't create a top-most group but append all content directly.
     * @param {Boolean} [add=true] � Automatically add the reconstructed SVG node to scene.
     * @returns {Group}
     * @description Interpret an SVG Node and add it to this instance's scene. The distinction should be made that this doesn't `import` svg's, it solely interprets them into something compatible for Two.js - this is slightly different than a direct transcription.
     */
    interpret(svg: SVGElement, shallow?: boolean, add?: boolean): Group;
    /**
     * @name Two#load
     * @function
     * @param {String|SVGElement} pathOrSVGContent - The URL path of an SVG file or an SVG document as text.
     * @param {Function} [callback] - Function to call once loading has completed.
     * @returns {Group}
     * @description Load an SVG file or SVG text and interpret it into Two.js legible objects.
     */
    load(
      pathOrSVGContent: any,
      callback?: (
        group: Group,
        svg:
          | SVGElement
          | SVGGElement
          | SVGPathElement
          | SVGTextElement
          | SVGPatternElement
          | SVGDefsElement
          | SVGGradientElement
          | SVGLinearGradientElement
          | SVGRadialGradientElement
          | SVGImageElement
          | SVGClipPathElement
          | SVGStopElement
          | (
              | SVGElement
              | SVGGElement
              | SVGPathElement
              | SVGTextElement
              | SVGPatternElement
              | SVGDefsElement
              | SVGGradientElement
              | SVGLinearGradientElement
              | SVGRadialGradientElement
              | SVGImageElement
              | SVGClipPathElement
              | SVGStopElement
            )[]
      ) => void
    ): Group;
  }
  import { Line } from 'two.js/src/shapes/line';
  import { Path } from 'two.js/src/path';
  import { Rectangle } from 'two.js/src/shapes/rectangle';
  import { Circle } from 'two.js/src/shapes/circle';
  import { Ellipse } from 'two.js/src/shapes/ellipse';
  import { Star } from 'two.js/src/shapes/star';
  import { Polygon } from 'two.js/src/shapes/polygon';
  import { ArcSegment } from 'two.js/src/shapes/arc-segment';
  import { Points } from 'two.js/src/shapes/points';
  import { Text } from 'two.js/src/text';
  import { LinearGradient } from 'two.js/src/effects/linear-gradient';
  import { RadialGradient } from 'two.js/src/effects/radial-gradient';
  import { Sprite } from 'two.js/src/effects/sprite';
  import { Image } from 'two.js/src/effects/image';
  import { ImageSequence } from 'two.js/src/effects/image-sequence';
  import { Texture } from 'two.js/src/effects/texture';
  import { Group } from 'two.js/src/group';
  import { Anchor } from 'two.js/src/anchor';
  import { Collection } from 'two.js/src/collection';
  import { Events } from 'two.js/src/events';
  import { Matrix } from 'two.js/src/matrix';
  import { Registry } from 'two.js/src/registry';
  import { Element as TwoElement } from 'two.js/src/element';
  import { Shape, type ShapeHitTestOptions } from 'two.js/src/shape';
  import { Vector } from 'two.js/src/vector';
  import { Gradient } from 'two.js/src/effects/gradient';
  import { Stop } from 'two.js/src/effects/stop';
  import { RoundedRectangle } from 'two.js/src/shapes/rounded-rectangle';
  import { Renderer as CanvasRenderer } from 'two.js/src/renderers/canvas';
  import { Renderer as SVGRenderer } from 'two.js/src/renderers/svg';
  import { Renderer as WebGLRenderer } from 'two.js/src/renderers/webgl';

  export type BoundingBox = {
    top: number;
    left: number;
    right: number;
    bottom: number;
  } & Dimensions;

  export type Dimensions = {
    width: number;
    height: number;
  };

  export interface SceneHitTestOptions extends ShapeHitTestOptions {
    visibleOnly?: boolean;
    includeGroups?: boolean;
    mode?: 'all' | 'deepest';
    deepest?: boolean;
    filter?: (shape: Shape) => boolean;
  }
}
