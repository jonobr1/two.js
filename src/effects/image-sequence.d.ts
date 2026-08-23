declare module 'two.js/src/effects/image-sequence' {
  /**
     * @name Two.ImageSequence
     * @class

     * @param {String|String[]|Texture|Texture[]} [src] - A list of URLs or {@link Two.Texture}s.
     * @param {Number} [ox=0] - The initial `x` position of the Two.ImageSequence.
     * @param {Number} [oy=0] - The initial `y` position of the Two.ImageSequence.
     * @param {Number} [frameRate=30] - The frame rate at which the images should playback at.
     * @description A convenient package to display still or animated images organized as a series of still images.
     */
  export class ImageSequence extends Rectangle {
    /**
     * @name Two.ImageSequence.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.ImageSequence}.
     */
    Properties: (
      | 'textures'
      | 'frameRate'
      | 'index'
      | 'firstFrame'
      | 'lastFrame'
      | 'loop'
      | string
    )[];
    /**
     * @name Two.ImageSequence.DefaultFrameRate
     * @property The default frame rate that {@link Two.ImageSequence#frameRate} is set to when instantiated.
     */
    static DefaultFrameRate: 30;
    /**
     * @name Two.ImageSequence.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.ImageSequence} to create a new instance
     * @returns {Two.ImageSequence}
     * @description Create a new {@link Two.ImageSequence} from an object notation of a {@link Two.ImageSequence}.
     * @nota-bene Works in conjunction with {@link Two.ImageSequence#toObject}
     */
    fromObject(
      obj: Parameters<typeof Rectangle.fromObject>[0] & {
        textures?: Parameters<typeof Texture.fromObject>[0][];
        frameRate?: number;
        index?: number;
        firstFrame?: number;
        lastFrame?: number;
        loop?: boolean;
      }
    ): ImageSequence;

    constructor(
      src?: string | string[] | Texture | Texture[],
      ox?: number,
      oy?: number,
      frameRate?: number
    );
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
    textures: Texture[];
    frameRate: number;
    /**
     * @name Two.ImageSequence#index
     * @property {Number} - The index of the current tile of the sprite to display. Defaults to `0`.
     */
    index: number;
    /**
     * @name Two.ImageSequence#copy
     * @function
     * @param {Two.ImageSequence} imageSequence - The reference {@link Two.ImageSequence}
     * @description Copy the properties of one {@link Two.ImageSequence} onto another.
     */
    copy(imageSeqence: ImageSequence): ImageSequence;
    /**
     * @name Two.ImageSequence#play
     * @function
     * @param {Number} [firstFrame=0] - The index of the frame to start the animation with.
     * @param {Number} [lastFrame] - The index of the frame to end the animation with. Defaults to the last item in the {@link Two.ImageSequence#textures}.
     * @param {Function} [onLastFrame] - Optional callback function to be triggered after playing the last frame. This fires multiple times when the image sequence is looped.
     * @description Initiate animation playback of a {@link Two.ImageSequence}.
     */
    play(
      firstFrame?: number,
      lastFrame?: number,
      onLastFrame?: () => void
    ): ImageSequence;
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
    clone(parent?: Group): ImageSequence;
    /**
     * @name Two.ImageSequence#dispose
     * @function
     * @description Release the image sequence's renderer resources and detach all events.
     * This method stops any running animation, clears animation callbacks, unbinds
     * textures collection events, and disposes individual textures (calling dispose()
     * for thorough cleanup) while preserving the renderer type for potential
     * re-attachment to a new renderer.
     */
    dispose(): ImageSequence;
  }
  import { Rectangle } from 'two.js/src/shapes/rectangle';
  import { Texture } from 'two.js/src/effects/texture';
  import { Group } from 'two.js/src/group';
}
