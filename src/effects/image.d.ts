declare module 'two.js/src/effects/image' {
  export type ModeProperties = 'fill' | 'fit' | 'crop' | 'tile' | 'stretch';
  /**
   * @name Two.Image
   * @class
   * @extends Two.Rectangle
   * @param {String|Two.Texture} [src] - The URL path or {@link Two.Texture} to be used as the bitmap data displayed on the image.
   * @param {Number} [ox=0] - The initial `x` position of the Two.Image.
   * @param {Number} [oy=0] - The initial `y` position of the Two.Image.
   * @param {Number} [width=1] - The width to display the image at.
   * @param {Number} [height=1] - The height to display the image at.
   * @description A convenient package to display images scaled to fit specific dimensions. Unlike {@link Two.Sprite}, this class scales the image to the provided width and height rather than using the image's native dimensions. By default, images are scaled to 'fill' within the bounds while preserving aspect ratio.
   */
  export class Image extends Rectangle {
    /**
     * @name Two.Image.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.Image}.
     */
    static Properties: ('texture' | 'mode' | string)[];
    /**
     * @name Two.Image.Modes
     * @property {Object} mode - Different mode types to render an image inspired by Figma.
     * @property {String} mode.fill - Scale image to fill the bounds while preserving aspect ratio.
     * @property {String} mode.fit - Scale image to fit within bounds while preserving aspect ratio.
     * @property {String} mode.crop - Scale image to fill bounds while preserving aspect ratio, cropping excess.
     * @property {String} mode.tile - Repeat image at original size to fill the bounds.
     * @property {String} mode.stretch - Stretch image to fill dimensions, ignoring aspect ratio.
     */
    static Modes: {
      fill: 'fill';
      fit: 'fit';
      crop: 'crop';
      tile: 'tile';
      stretch: 'stretch';
    };

    /**
     * @name Two.Image.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.Image} to create a new instance
     * @returns {Two.Image}
     * @description Create a new {@link Two.Image} from an object notation of a {@link Two.Image}.
     * @nota-bene Works in conjunction with {@link Two.Image#toObject}
     */
    static fromObject(
      obj: Parameters<typeof Rectangle.fromObject>[0] & {
        texture?: Parameters<typeof Texture.fromObject>[0];
        mode?: ModeProperties;
      }
    ): Image;
    constructor(
      src?: string | Texture,
      ox?: number,
      oy?: number,
      width?: number,
      height?: number,
      mode?: ModeProperties
    );
    /**
     * @name Two.Image#_flagTexture
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Image#texture} needs updating.
     */
    private _flagTexture;
    /**
     * @name Two.Image#_flagMode
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Image#mode} needs updating.
     */
    private _flagMode;
    /**
     * @name Two.Image#_texture
     * @private
     * @see {@link Two.Image#texture}
     */
    private _texture;
    /**
     * @name Two.Image#_mode
     * @private
     * @see {@link Two.Image#mode}
     */
    private _mode;
    texture: Texture;
    /**
     * @name Two.Image#mode
     * @property {String} - The scaling mode for the image. Can be 'fill', 'fit', 'crop', 'tile', or 'stretch'. Defaults to 'fill'.
     */
    mode: ModeProperties;
    /**
     * @name Two.Image#dispose
     * @function
     * @description Release the image's renderer resources and detach all events.
     * This method disposes the texture (calling dispose() for thorough cleanup) and inherits comprehensive
     * cleanup from the Rectangle/Path hierarchy while preserving the renderer type
     * for potential re-attachment.
     */
    dispose(): Image;
  }
  import { Rectangle } from 'two.js/src/shapes/rectangle';
  import { Texture } from 'two.js/src/effects/texture';
}
