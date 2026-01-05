declare module 'two.js/src/effects/sprite' {
  /**
     * @name Two.Sprite
     * @class

     * @param {String|Texture} [src] - The URL path or {@link Two.Texture} to be used as the bitmap data displayed on the sprite.
     * @param {Number} [ox=0] - The initial `x` position of the Two.Sprite.
     * @param {Number} [oy=0] - The initial `y` position of the Two.Sprite.
     * @param {Number} [cols=1] - The number of columns the sprite contains.
     * @param {Number} [rows=1] - The number of rows the sprite contains.
     * @param {Number} [frameRate=0] - The frame rate at which the partitions of the image should playback at.
     * @description A convenient package to display still or animated images through a tiled image source. For more information on the principals of animated imagery through tiling see [Texture Atlas](https://en.wikipedia.org/wiki/Texture_atlas) on Wikipedia.
     */
  export class Sprite extends Rectangle {
    /**
     * @name Two.Sprite.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.Sprite}.
     */
    static Properties: (
      | 'texture'
      | 'columns'
      | 'rows'
      | 'frameRate'
      | 'index'
      | 'firstFrame'
      | 'lastFrame'
      | 'loop'
      | string
    )[];
    /**
     * @name Two.Sprite.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.Sprite} to create a new instance
     * @returns {Two.Sprite}
     * @description Create a new {@link Two.Sprite} from an object notation of a {@link Two.Sprite}.
     * @nota-bene Works in conjunction with {@link Two.Sprite#toObject}
     */
    static fromObject(
      obj: Parameters<typeof Rectangle.fromObject>[0] & {
        texture?: Parameters<typeof Texture.fromObject>[0];
        columns?: number;
        rows?: number;
        frameRate?: number;
        index?: number;
        firstFrame?: number;
        lastFrame?: number;
        loop?: boolean;
      }
    ): Sprite;
    constructor(
      src?: string | Texture,
      ox?: number,
      oy?: number,
      cols?: number,
      rows?: number,
      frameRate?: number
    );
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
    texture: Texture;
    columns: number;
    rows: number;
    frameRate: number;
    /**
     * @name Two.Sprite#index
     * @property {Number} - The index of the current tile of the sprite to display. Defaults to `0`.
     */
    index: number;
    /**
     * @name Two.Sprite#copy
     * @function
     * @param {Two.Sprite} sprite - The reference {@link Two.Sprite}
     * @description Copy the properties of one {@link Two.Sprite} onto another.
     */
    copy(sprite: Sprite): Sprite;
    /**
     * @name Two.Sprite#play
     * @function
     * @param {Number} [firstFrame=0] - The index of the frame to start the animation with.
     * @param {Number} [lastFrame] - The index of the frame to end the animation with. Defaults to the last item in the {@link Two.Sprite#textures}.
     * @param {Function} [onLastFrame] - Optional callback function to be triggered after playing the last frame. This fires multiple times when the sprite is looped.
     * @description Initiate animation playback of a {@link Two.Sprite}.
     */
    play(
      firstFrame?: number,
      lastFrame?: number,
      onLastFrame?: () => void
    ): Sprite;
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
    clone(parent?: Group): Sprite;
    /**
     * @name Two.Sprite#dispose
     * @function
     * @description Release the sprite's renderer resources and detach all events.
     * This method stops any running animation, clears animation callbacks, disposes
     * the texture (calling dispose() for thorough cleanup), and inherits comprehensive
     * cleanup from the Rectangle/Path hierarchy while preserving the renderer type
     * for potential re-attachment.
     */
    dispose(): Sprite;
  }
  import { Rectangle } from 'two.js/src/shapes/rectangle';
  import { Texture } from 'two.js/src/effects/texture';
  import { Group } from 'two.js/src/group';
}
