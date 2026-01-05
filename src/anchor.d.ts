declare module 'two.js/src/anchor' {
  /**
     * @class
     * @name Two.Anchor
     * @param {Number} [x=0] - The x position of the root anchor point.
     * @param {Number} [y=0] - The y position of the root anchor point.
     * @param {Number} [ax=0] - The x position of the left handle point.
     * @param {Number} [ay=0] - The y position of the left handle point.
     * @param {Number} [bx=0] - The x position of the right handle point.
     * @param {Number} [by=0] - The y position of the right handle point.
     * @param {String} [command=Two.Commands.move] - The command to describe how to render. Applicable commands are {@link Two.Commands}

     * @description An object that holds 3 {@link Two.Vector}s, the anchor point and its corresponding handles: `left` and `right`. In order to properly describe the bezier curve about the point there is also a command property to describe what type of drawing should occur when Two.js renders the anchors.
     */
  export class Anchor extends Vector {
    static makeBroadcast(scope: Anchor): () => void;
    /**
     * @name Two.Anchor.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.Anchor} to create a new instance
     * @returns {Two.Anchor}
     * @description Create a new {@link Two.Anchor} from an object notation of a {@link Two.Anchor}.
     * @nota-bene Works in conjunction with {@link Two.Anchor#toObject}
     */
    static fromObject(
      obj:
        | object
        | {
            x?: number;
            y?: number;
            command?: Commands[keyof Commands];
            relative?: boolean;
            controls?: {
              left: { x: number; y: number } | Vector;
              right: { x: number; y: number } | Vector;
            };
            rx?: number;
            ry?: number;
            xAxisRotation?: number;
            largeArcFlag?: number;
          }
    ): Anchor;
    constructor(
      x?: number,
      y?: number,
      ax?: number,
      ay?: number,
      bx?: number,
      by?: number,
      command?: Commands[keyof Commands]
    );
    controls: {
      left: Vector;
      right: Vector;
    };
    command: Commands[keyof Commands];
    relative: boolean;
    rx?: number;
    ry?: number;
    xAxisRotation?: number;
    largeArcFlag?: number;
    sweepFlag?: number;
    /**
     * @name Two.Anchor#copy
     * @function
     * @param {Two.Anchor} v - The anchor to apply values to.
     * @description Copy the properties of one {@link Two.Anchor} onto another.
     */
    copy(anchor: Anchor): Anchor;
    /**
     * @name Two.Anchor#clone
     * @function
     * @returns {Two.Anchor}
     * @description Create a new {@link Two.Anchor}, set all its values to the current instance and return it for use.
     */
    clone(): Anchor;
    /**
     * @name Two.Anchor#toObject
     * @function
     * @returns {Object} - An object with properties filled out to mirror {@link Two.Anchor}.
     * @description Create a JSON compatible plain object of the current instance. Intended for use with storing values in a database.
     * @nota-bene Works in conjunction with {@link Two.Anchor.fromObject}
     */
    toObject(): object;
    /**
     * @name Two.Anchor#toString
     * @function
     * @returns {String} - A String with comma-separated values reflecting the various values on the current instance.
     * @description Create a string form of the current instance. Intended for use with storing values in a database. This is lighter to store than the JSON compatible {@link Two.Anchor#toObject}.
     */
    toString(): string;
  }
  import { Vector } from 'two.js/src/vector';
  import { Commands } from 'two.js/src/utils/path-commands';
}
