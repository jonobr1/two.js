declare namespace Two {
    /**
     * An object that holds 3 {@link Two.Vector}s, the anchor point and its corresponding handles: `left` and `right`. In order to properly describe the bezier curve about the point there is also a command property to describe what type of drawing should occur when Two.js renders the anchors.
     * @param [x = 0] - The x position of the root anchor point.
     * @param [y = 0] - The y position of the root anchor point.
     * @param [lx = 0] - The x position of the left handle point.
     * @param [ly = 0] - The y position of the left handle point.
     * @param [rx = 0] - The x position of the right handle point.
     * @param [ry = 0] - The y position of the right handle point.
     * @param [command = Two.Commands.move] - The command to describe how to render. Applicable commands are {@link Two.Commands}
     */
    class Anchor extends Two.Vector {
        constructor(x?: number, y?: number, lx?: number, ly?: number, rx?: number, ry?: number, command?: string);
        /**
         * Adds the `controls` property as an object with `left` and `right` properties to access the bezier control handles that define how the curve is drawn. It also sets the `relative` property to `true` making vectors in the `controls` object relative to their corresponding root anchor point.
         * @param anchor - The instance to append the `control`object to.
         */
        static AppendCurveProperties(anchor: Two.Anchor): void;
        /**
         * An plain object that holds the controls handles for a {@link Two.Anchor}.
         */
        controls: {
            controls: any;
        };
        /**
         * Convenience function to apply observable qualities of a {@link Two.Anchor} to any object. Handy if you'd like to extend the {@link Two.Anchor} class on a custom class.
         * @param object - The object to make observable.
         */
        static MakeObservable(object: any): void;
        /**
         * A draw command associated with the anchor point.
         */
        command: {};
        /**
         * A boolean to render control points relative to the root anchor point or in global coordinate-space to the rest of the scene.
         */
        relative: {};
        /**
         * Convenience method used mainly by {@link Two.Path#vertices} to listen and propagate changes from control points up to their respective anchors and further if necessary.
         */
        listen(): void;
        /**
         * Convenience method used mainly by {@link Two.Path#vertices} to ignore changes from a specific anchor's control points.
         */
        ignore(): void;
        /**
         * Copy the properties of one {@link Two.Anchor} onto another.
         * @param v - The anchor to apply values to.
         */
        copy(v: Two.Anchor): void;
        /**
         * Create a new {@link Two.Anchor}, set all its values to the current instance and return it for use.
         */
        clone(): Two.Anchor;
        /**
         * Create a JSON compatible plain object of the current instance. Intended for use with storing values in a database.
         * @returns - An object with properties filled out to mirror {@link Two.Anchor}.
         */
        toObject(): any;
        /**
         * Create a string form of the current instance. Intended for use with storing values in a database. This is lighter to store than the JSON compatible {@link Two.Anchor#toObject}.
         * @returns - A String with comma-separated values reflecting the various values on the current instance.
         */
        toString(): string;
        /**
         * Add an object with x / y component values to the instance.
         */
        add(v: Two.Vector): void;
        /**
         * Subtract an object with x / y component values to the instance.
         */
        sub(v: Two.Vector): void;
        /**
         * Multiply an object with x / y component values to the instance.
         */
        multiply(v: Two.Vector): void;
        /**
         * Divide an object with x / y component values to the instance.
         */
        divide(v: Two.Vector): void;
        /**
         * Invert each component's sign value.
         */
        negate(): void;
    }
    namespace Group {
        /**
         * A children collection which is accesible both by index and by object `id`.
         */
        class Children extends Two.Collection {
            /**
             * @property undefined - Map of all elements in the list keyed by `id`s.
             */
            ids: {};
            /**
             * Adds elements to the `ids` map.
             * @param children - The objects which extend {@link Two.Shape} to be added.
             */
            attach(children: Two.Shape[]): void;
            /**
             * Removes elements to the `ids` map.
             * @param children - The objects which extend {@link Two.Shape} to be removed.
             */
            detach(children: Two.Shape[]): void;
        }
    }
    /**
     * An `Array` like object with additional event propagation on actions. `pop`, `shift`, and `splice` trigger `removed` events. `push`, `unshift`, and `splice` with more than 2 arguments trigger 'inserted'. Finally, `sort` and `reverse` trigger `order` events.
     */
    class Collection extends Two.Events {
    }
    /**
     * This is the base class for constructing different types of gradients with Two.js. The two common gradients are {@link Two.LinearGradient} and {@link Two.RadialGradient}.
     * @param [stops] - A list of {@link Two.Stop}s that contain the gradient fill pattern for the gradient.
     */
    class Gradient {
        constructor(stops?: Two.Stop[]);
        /**
         * Object access to store relevant renderer specific variables. Warning: manipulating this object can create unintended consequences.
         */
        renderer: {};
        /**
         * @property undefined - Session specific unique identifier.
         */
        id: {};
        /**
         * @property undefined - Indicates what happens if the gradient starts or ends inside the bounds of the target rectangle. Possible values are `'pad'`, `'reflect'`, and `'repeat'`.
         */
        spread: {};
        /**
         * @property undefined - An ordered list of {@link Two.Stop}s for rendering the gradient.
         */
        stops: {};
        static Stop: any;
        /**
         * @property undefined - A list of properties that are on every {@link Two.Gradient}.
         */
        static Properties: {};
        /**
         * Convenience function to apply observable qualities of a {@link Two.Gradient} to any object. Handy if you'd like to extend the {@link Two.Gradient} class on a custom class.
         * @param object - The object to make observable.
         */
        static MakeObservable(object: any): void;
        /**
         * Cached method to let renderers know stops have been updated on a {@link Two.Gradient}.
         */
        static FlagStops(): void;
        /**
         * Cached method to let {@link Two.Gradient} know vertices have been added to the instance.
         */
        static BindVertices(): void;
        /**
         * Cached method to let {@link Two.Gradient} know vertices have been removed from the instance.
         */
        static UnbindStops(): void;
        /**
         * Create a new instance of {@link Two.Gradient} with the same properties of the current path.
         * @param [parent] - The parent group or scene to add the clone to.
         */
        clone(parent?: Two.Group): Two.Gradient;
        /**
         * Return a JSON compatible plain object that represents the path.
         */
        toObject(): any;
    }
    /**
     * A convenient package to display still or animated images organized as a series of still images.
     * @param paths - A list of URLs or {@link Two.Texture}s.
     * @param [ox = 0] - The initial `x` position of the Two.ImageSequence.
     * @param [oy = 0] - The initial `y` position of the Two.ImageSequence.
     * @param [frameRate = 30] - The frame rate at which the images should playback at.
     */
    class ImageSequence extends Two.Rectangle {
        constructor(paths: string | String[] | Two.Texture | Two.Texture[], ox?: number, oy?: number, frameRate?: number);
        /**
         * @property undefined - A list of textures to be used as frames for animating the {@link Two.ImageSequence}.
         */
        textures: {};
        /**
         * @property undefined - The number of frames to animate against per second.
         */
        frameRate: {};
        /**
         * @property undefined - The index of the current tile of the sprite to display. Defaults to `0`.
         */
        index: {};
        /**
         * @property undefined - A list of properties that are on every {@link Two.ImageSequence}.
         */
        static Properties: {};
        /**
         * @property The - default frame rate that {@link Two.ImageSequence#frameRate} is set to when instantiated.
         */
        static DefaultFrameRate: {
            The: any;
        };
        /**
         * Cached method to let renderers know textures have been updated on a {@link Two.ImageSequence}.
         */
        static FlagTextures(): void;
        /**
         * Cached method to let {@link Two.ImageSequence} know textures have been added to the instance.
         */
        static BindTextures(): void;
        /**
         * Cached method to let {@link Two.ImageSequence} know textures have been removed from the instance.
         */
        static UnbindVertices(): void;
        /**
         * Convenience function to apply observable qualities of a {@link Two.ImageSequence} to any object. Handy if you'd like to extend or inherit the {@link Two.ImageSequence} class on a custom class.
         * @param object - The object to make observable.
         */
        static MakeObservable(object: any): void;
        /**
         * Function used internally by {@link Two.ImageSequence} to parse arguments and return {@link Two.Texture}s.
         * @property undefined - Shorthand function to prepare source image material into readable format by {@link Two.ImageSequence}.
         */
        static GenerateTexture: {};
        /**
         * Initiate animation playback of a {@link Two.ImageSequence}.
         * @param [firstFrame = 0] - The index of the frame to start the animation with.
         * @param [lastFrame] - The index of the frame to end the animation with. Defaults to the last item in the {@link Two.ImageSequence#textures}.
         * @param [onLastFrame] - Optional callback function to be triggered after playing the last frame. This fires multiple times when the image sequence is looped.
         */
        play(firstFrame?: number, lastFrame?: number, onLastFrame?: (...params: any[]) => any): void;
        /**
         * Halt animation playback of a {@link Two.ImageSequence}.
         */
        pause(): void;
        /**
         * Halt animation playback of a {@link Two.ImageSequence} and set the current frame back to the first frame.
         */
        stop(): void;
        /**
         * Create a new instance of {@link Two.ImageSequence} with the same properties of the current image sequence.
         * @param [parent] - The parent group or scene to add the clone to.
         */
        clone(parent?: Two.Group): Two.ImageSequence;
        /**
         * Return a JSON compatible plain object that represents the path.
         */
        toObject(): any;
    }
    /**
     * @param [x1 = 0] - The x position of the first end point of the linear gradient.
     * @param [y1 = 0] - The y position of the first end point of the linear gradient.
     * @param [x2 = 0] - The x position of the second end point of the linear gradient.
     * @param [y2 = 0] - The y position of the second end point of the linear gradient.
     * @param [stops] - A list of {@link Two.Stop}s that contain the gradient fill pattern for the gradient.
     */
    class LinearGradient extends Two.Gradient {
        constructor(x1?: number, y1?: number, x2?: number, y2?: number, stops?: Two.Stop[]);
        /**
         * @property undefined - The x and y value for where the first end point is placed on the canvas.
         */
        left: {};
        /**
         * @property undefined - The x and y value for where the second end point is placed on the canvas.
         */
        right: {};
        static Stop: any;
        /**
         * Convenience function to apply observable qualities of a {@link Two.LinearGradient} to any object. Handy if you'd like to extend the {@link Two.LinearGradient} class on a custom class.
         * @param object - The object to make observable.
         */
        static MakeObservable(object: any): void;
        /**
         * Cached method to let renderers know end points have been updated on a {@link Two.LinearGradient}.
         */
        static FlagEndPoints(): void;
        /**
         * Create a new instance of {@link Two.LinearGradient} with the same properties of the current path.
         * @param [parent] - The parent group or scene to add the clone to.
         */
        clone(parent?: Two.Group): Two.Gradient;
        /**
         * Return a JSON compatible plain object that represents the path.
         */
        toObject(): any;
    }
    /**
     * @param [x = 0] - The x position of the origin of the radial gradient.
     * @param [y = 0] - The y position of the origin of the radial gradient.
     * @param [radius = 0] - The radius of the radial gradient.
     * @param [stops] - A list of {@link Two.Stop}s that contain the gradient fill pattern for the gradient.
     * @param [focalX = 0] - The x position of the focal point on the radial gradient.
     * @param [focalY = 0] - The y position of the focal point on the radial gradient.
     */
    class RadialGradient extends Two.Gradient {
        constructor(x?: number, y?: number, radius?: number, stops?: Two.Stop[], focalX?: number, focalY?: number);
        /**
         * @property undefined - The x and y value for where the origin of the radial gradient is.
         */
        center: {};
        /**
         * @property undefined - The x and y value for where the focal point of the radial gradient is.
         */
        focal: {};
        static Stop: any;
        /**
         * @property undefined - A list of properties that are on every {@link Two.RadialGradient}.
         */
        static Properties: {};
        /**
         * Convenience function to apply observable qualities of a {@link Two.RadialGradient} to any object. Handy if you'd like to extend the {@link Two.RadialGradient} class on a custom class.
         * @param object - The object to make observable.
         */
        static MakeObservable(object: any): void;
        /**
         * Create a new instance of {@link Two.RadialGradient} with the same properties of the current path.
         * @param [parent] - The parent group or scene to add the clone to.
         */
        clone(parent?: Two.Group): Two.Gradient;
        /**
         * Return a JSON compatible plain object that represents the path.
         */
        toObject(): any;
    }
    /**
     * A convenient package to display still or animated images through a tiled image source. For more information on the principals of animated imagery through tiling see [Texture Atlas](https://en.wikipedia.org/wiki/Texture_atlas) on Wikipedia.
     * @param [path] - The URL path or {@link Two.Texture} to be used as the bitmap data displayed on the sprite.
     * @param [ox = 0] - The initial `x` position of the Two.Sprite.
     * @param [oy = 0] - The initial `y` position of the Two.Sprite.
     * @param [cols = 1] - The number of columns the sprite contains.
     * @param [rows = 1] - The number of rows the sprite contains.
     * @param [frameRate = 0] - The frame rate at which the partitions of the image should playback at.
     */
    class Sprite extends Two.Rectangle {
        constructor(path?: string | Two.Texture, ox?: number, oy?: number, cols?: number, rows?: number, frameRate?: number);
        /**
         * @property undefined - The texture to be used as bitmap data to display image in the scene.
         */
        texture: {};
        /**
         * @property undefined - The number of columns to split the texture into. Defaults to `1`.
         */
        columns: {};
        /**
         * @property undefined - The number of rows to split the texture into. Defaults to `1`.
         */
        rows: {};
        /**
         * @property undefined - The number of frames to animate against per second. Defaults to `0` for non-animated sprites.
         */
        frameRate: {};
        /**
         * @property undefined - The index of the current tile of the sprite to display. Defaults to `0`.
         */
        index: {};
        /**
         * @property undefined - A list of properties that are on every {@link Two.Sprite}.
         */
        static Properties: {};
        /**
         * Convenience function to apply observable qualities of a {@link Two.Sprite} to any object. Handy if you'd like to extend or inherit the {@link Two.Sprite} class on a custom class.
         * @param object - The object to make observable.
         */
        static MakeObservable(object: any): void;
        /**
         * Initiate animation playback of a {@link Two.Sprite}.
         * @param [firstFrame = 0] - The index of the frame to start the animation with.
         * @param [lastFrame] - The index of the frame to end the animation with. Defaults to the last item in the {@link Two.Sprite#textures}.
         * @param [onLastFrame] - Optional callback function to be triggered after playing the last frame. This fires multiple times when the sprite is looped.
         */
        play(firstFrame?: number, lastFrame?: number, onLastFrame?: (...params: any[]) => any): void;
        /**
         * Halt animation playback of a {@link Two.Sprite}.
         */
        pause(): void;
        /**
         * Halt animation playback of a {@link Two.Sprite} and set the current frame back to the first frame.
         */
        stop(): void;
        /**
         * Create a new instance of {@link Two.Sprite} with the same properties of the current sprite.
         * @param [parent] - The parent group or scene to add the clone to.
         */
        clone(parent?: Two.Group): Two.Sprite;
        /**
         * Return a JSON compatible plain object that represents the path.
         */
        toObject(): any;
    }
    /**
     * @param [offset] - The offset percentage of the stop represented as a zero-to-one value. Default value flip flops from zero-to-one as new stops are created.
     * @param [color] - The color of the stop. Default value flip flops from white to black as new stops are created.
     * @param [opacity] - The opacity value. Default value is 1, cannot be lower than 0.
     */
    class Stop {
        constructor(offset?: number, color?: string, opacity?: number);
        /**
         * Object access to store relevant renderer specific variables. Warning: manipulating this object can create unintended consequences.
         */
        renderer: {};
        /**
         * @property undefined - The offset percentage of the stop represented as a zero-to-one value.
         */
        offset: {};
        /**
         * @property undefined - The alpha percentage of the stop represented as a zero-to-one value.
         */
        opacity: {};
        /**
         * @property undefined - The color of the stop.
         */
        color: {};
        /**
         * @property undefined - The current index being referenced for calculating a stop's default offset value.
         */
        static Index: {};
        /**
         * @property undefined - A list of properties that are on every {@link Two.Stop}.
         */
        static Properties: {};
        /**
         * Convenience function to apply observable qualities of a {@link Two.Stop} to any object. Handy if you'd like to extend the {@link Two.Stop} class on a custom class.
         * @param object - The object to make observable.
         */
        static MakeObservable(object: any): void;
        /**
         * Create a new instance of {@link Two.Stop} with the same properties of the current path.
         * @param [parent] - The parent group or scene to add the clone to.
         */
        clone(parent?: Two.Group): Two.Stop;
        /**
         * Return a JSON compatible plain object that represents the path.
         */
        toObject(): any;
    }
    /**
     * Fundamental to work with bitmap data, a.k.a. pregenerated imagery, in Two.js. Supported formats include jpg, png, gif, and tiff. See {@link Two.Texture.RegularExpressions} for a full list of supported formats.
     * @param [src] - The URL path to an image file or an `<img />` element.
     * @param [callback] - An optional callback function once the image has been loaded.
     */
    class Texture extends Two.Shape {
        constructor(src?: string | HTMLImageElement, callback?: (...params: any[]) => any);
        /**
         * Object access to store relevant renderer specific variables. Warning: manipulating this object can create unintended consequences.
         */
        renderer: {};
        /**
         * @property undefined - Shorthand value to determine if image has been loaded into the texture.
         */
        loaded: {};
        /**
         * @property undefined - CSS style declaration to tile {@link Two.Path}. Valid values include: `'no-repeat'`, `'repeat'`, `'repeat-x'`, `'repeat-y'`.
         */
        repeat: {};
        /**
         * @property undefined - A two-component vector describing any pixel offset of the texture when applied to a {@link Two.Path}.
         */
        offset: {};
        /**
         * @property undefined - The URL path to the image data.
         */
        src: {};
        /**
         * @property undefined - The corresponding DOM Element of the texture. Can be a `<img />`, `<canvas />`, or `<video />` element. See {@link Two.Texture.RegularExpressions} for a full list of supported elements.
         */
        image: {};
        /**
         * @property undefined - A list of properties that are on every {@link Two.Texture}.
         */
        static Properties: {};
        /**
         * @property undefined - A map of compatible DOM Elements categorized by media format.
         */
        static RegularExpressions: {};
        /**
         * @property undefined - A canonical listing of image data used in a single session of Two.js.
         */
        static ImageRegistry: {};
        /**
         * @property undefined - Serializes a URL as an absolute path for canonical attribution in {@link Two.ImageRegistry}.
         */
        static getAbsoluteURL: {};
        /**
         * @property undefined - Loads an image as a buffer in headless environments.
         */
        static loadHeadlessBuffer: {};
        /**
         * @property undefined - Retrieves the tag name of an image, video, or canvas node.
         */
        static getTag: {};
        /**
         * @property undefined - Convenience function to set {@link Two.Texture#image} properties with canonincal versions set in {@link Two.Texture.ImageRegistry}.
         */
        static getImage: {};
        /**
         * @param texture - The texture to load.
         * @param callback - The function to be called once the texture is loaded.
         */
        static load(texture: Two.Texture, callback: (...params: any[]) => any): void;
        /**
         * Cached method to let renderers know `offset` has been updated on a {@link Two.Texture}.
         */
        static FlagOffset(): void;
        /**
         * Cached method to let renderers know `scale` has been updated on a {@link Two.Texture}.
         */
        static FlagScale(): void;
        /**
         * Convenience function to apply observable qualities of a {@link Two.Texture} to any object. Handy if you'd like to extend or inherit the {@link Two.Texture} class on a custom class.
         * @param object - The object to make observable.
         */
        static MakeObservable(object: any): void;
        /**
         * Create a new instance of {@link Two.Texture} with the same properties of the current texture.
         */
        clone(): Two.Texture;
        /**
         * Return a JSON compatible plain object that represents the texture.
         */
        toObject(): any;
    }
    /**
     * A collection of functions to register different types of textures. Used internally by a {@link Two.Texture}.
     */
    interface Register {
    }
    /**
     * Object inherited by many Two.js objects in order to facilitate custom events.
     */
    class Events {
        /**
         * Call to add a listener to a specific event name.
         * @param [name] - The name of the event to bind a function to.
         * @param [handler] - The function to be invoked when the event is dispatched.
         */
        on(name?: string, handler?: (...params: any[]) => any): void;
        /**
         * Call to remove listeners from a specific event. If only `name` is passed then all the handlers attached to that `name` will be removed. If no arguments are passed then all handlers for every event on the obejct are removed.
         * @param [name] - The name of the event intended to be removed.
         * @param [handler] - The handler intended to be reomved.
         */
        off(name?: string, handler?: (...params: any[]) => any): void;
        /**
         * Call to trigger a custom event. Any additional arguments passed after the name will be passed along to the attached handlers.
         * @param name - The name of the event to dispatch.
         * @param arguments - Anything can be passed after the name and those will be passed on to handlers attached to the event in the order they are passed.
         */
        trigger(name: string, arguments: any): void;
        /**
         * @property undefined - Object of different types of Two.js specific events.
         */
        static Types: {};
        /**
         * Alias for {@link Two.Events.on}.
         */
        static bind(): void;
        /**
         * Alias for {@link Two.Events.off}.
         */
        static unbind(): void;
    }
    /**
     * This is the primary class for grouping objects that are then drawn in Two.js. In Illustrator this is a group, in After Effects it would be a Null Object. Whichever the case, the `Two.Group` contains a transformation matrix and commands to style its children, but it by itself doesn't render to the screen.
     * @param [children] - A list of objects that inherit {@link Two.Shape}. For instance, the array could be a {@link Two.Path}, {@link Two.Text}, and {@link Two.RoundedRectangle}.
     */
    class Group extends Two.Shape {
        constructor(children?: Two.Shape[]);
        /**
         * An automatically updated list of children that need to be appended to the renderer's scenegraph.
         */
        additions: {};
        /**
         * An automatically updated list of children that need to be removed from the renderer's scenegraph.
         */
        subtractions: {};
        /**
         * A list of all the children in the scenegraph.
         */
        children: {};
        /**
         * Cached method to let renderers know children have been added to a {@link Two.Group}.
         * @param children - The objects to be inserted.
         */
        static InsertChildren(children: Two.Shape[]): void;
        /**
         * Cached method to let renderers know children have been removed from a {@link Two.Group}.
         * @param children - The objects to be removed.
         */
        static RemoveChildren(children: Two.Shape[]): void;
        /**
         * Cached method to let renderers know order has been updated on a {@link Two.Group}.
         */
        static OrderChildren(): void;
        /**
         * @property undefined - A list of properties that are on every {@link Two.Group}.
         */
        static Properties: {};
        /**
         * Convenience function to apply observable qualities of a {@link Two.Group} to any object. Handy if you'd like to extend the {@link Two.Group} class on a custom class.
         * @param object - The object to make observable.
         */
        static MakeObservable(object: any): void;
        /**
         * Convenience method to apply getter / setter logic on an array of properties. Used in {@link Two.Group.MakeObservable}.
         * @param group - The group to apply getters and setters.
         * @param properties - A key / value object containing properties to inherit.
         */
        static MakeGetterSetters(group: Two.Group, properties: any): void;
        /**
         * Convenience method to apply getter / setter logic specific to how `Two.Group`s trickle down styles to their children. Used in {@link Two.Group.MakeObservable}.
         * @param group - The group to apply getters and setters.
         * @param key - The key which will become a property on the group.
         */
        static MakeGetterSetter(group: Two.Group, key: string): void;
        /**
         * @property undefined - The value of what all child shapes should be filled in with.
         */
        fill: {};
        /**
         * @property undefined - The value of what all child shapes should be outlined in with.
         */
        stroke: {};
        /**
         * @property undefined - The thickness in pixels of the stroke for all child shapes.
         */
        linewidth: {};
        /**
         * @property undefined - The opaqueness of all child shapes.
         */
        opacity: {};
        /**
         * @property undefined - Display the path or not.
         */
        visible: {};
        cap: {};
        join: {};
        miter: {};
        /**
         * @property undefined - Determines whether a final line is drawn between the final point in the `vertices` array and the first point of all child shapes.
         */
        closed: {};
        /**
         * @property undefined - When the child's path is `automatic = true` this boolean determines whether the lines between the points are curved or not.
         */
        curved: {};
        /**
         * @property undefined - Determines whether or not Two.js should calculate curves, lines, and commands automatically for you or to let the developer manipulate them for themselves.
         */
        automatic: {};
        /**
         * {@link Two.Group#beginning} is a percentage value that represents at what percentage into all child shapes should the renderer start drawing.
         * @property undefined - Number between zero and one to state the beginning of where the path is rendered.
         */
        beginning: {};
        /**
         * {@link Two.Group#ending} is a percentage value that represents at what percentage into all child shapes should the renderer start drawing.
         * @property undefined - Number between zero and one to state the ending of where the path is rendered.
         */
        ending: {};
        /**
         * @property undefined - The sum of distances between all child lengths.
         */
        length: {};
        /**
         * @property undefined - The Two.js object to clip from a group's rendering.
         */
        mask: {};
        /**
         * Create a new instance of {@link Two.Group} with the same properties of the current group.
         * @param [parent] - The parent group or scene to add the clone to.
         */
        clone(parent?: Two.Group): Two.Group;
        /**
         * Return a JSON compatible plain object that represents the group.
         */
        toObject(): any;
        /**
         * Orient the children of the group to the upper left-hand corner of that group.
         */
        corner(): void;
        /**
         * Orient the children of the group to the center of that group.
         */
        center(): void;
        /**
         * Recursively search for id. Returns the first element found.
         * @returns - Or `null` if nothing is found.
         */
        getById(): Two.Shape;
        /**
         * Recursively search for classes. Returns an array of matching elements.
         * @returns - Or empty array if nothing is found.
         */
        getByClassName(): Two.Shape[];
        /**
         * Recursively search for children of a specific type, e.g. {@link Two.Path}. Pass a reference to this type as the param. Returns an array of matching elements.
         * @returns - Empty array if nothing is found.
         */
        getByType(): Two.Shape[];
        /**
         * Add objects to the group.
         * @param objects - An array of objects to be added. Can be also be supplied as individual arguments.
         */
        add(objects: Two.Shape[]): void;
        /**
         * Add objects to the group.
         * @param objects - An array of objects to be added. Can be also be supplied as individual arguments.
         */
        add(objects: Two.Shape[]): void;
        /**
         * Return an object with top, left, right, bottom, width, and height parameters of the group.
         * @param [shallow = false] - Describes whether to calculate off local matrix or world matrix.
         * @returns - Returns object with top, left, right, bottom, width, height attributes.
         */
        getBoundingClientRect(shallow?: boolean): any;
        /**
         * Apply `noFill` method to all child shapes.
         */
        noFill(): void;
        /**
         * Apply `noStroke` method to all child shapes.
         */
        noStroke(): void;
        /**
         * Apply `subdivide` method to all child shapes.
         */
        subdivide(): void;
    }
    /**
     * A class to store 3 x 3 transformation matrix information. In addition to storing data `Two.Matrix` has suped up methods for commonplace mathematical operations.
     * @param [a = 1] - The value for element at the first column and first row.
     * @param [b = 0] - The value for element at the second column and first row.
     * @param [c = 0] - The value for element at the third column and first row.
     * @param [d = 0] - The value for element at the first column and second row.
     * @param [e = 1] - The value for element at the second column and second row.
     * @param [f = 0] - The value for element at the third column and second row.
     * @param [g = 0] - The value for element at the first column and third row.
     * @param [h = 0] - The value for element at the second column and third row.
     * @param [i = 1] - The value for element at the third column and third row.
     */
    class Matrix {
        constructor(a?: number, b?: number, c?: number, d?: number, e?: number, f?: number, g?: number, h?: number, i?: number);
        /**
         * @property undefined - The underlying data stored as an array.
         */
        elements: {};
        /**
         * @property undefined - A stored reference to the default value of a 3 x 3 matrix.
         */
        static Identity: {};
        /**
         * Multiply two matrices together and return the result.
         * @param [C] - An optional matrix to apply the multiplication to.
         * @returns - If an optional `C` matrix isn't passed then a new one is created and returned.
         */
        static Multiply(A: Two.Matrix, B: Two.Matrix, C?: Two.Matrix): Two.Matrix;
        /**
         * @property undefined - Determines whether Two.js automatically calculates the values for the matrix or if the developer intends to manage the matrix.
         */
        manual: {};
        /**
         * Set an array of values onto the matrix. Order described in {@link Two.Matrix}.
         * @param a - The value for element at the first column and first row.
         * @param b - The value for element at the second column and first row.
         * @param c - The value for element at the third column and first row.
         * @param d - The value for element at the first column and second row.
         * @param e - The value for element at the second column and second row.
         * @param f - The value for element at the third column and second row.
         * @param g - The value for element at the first column and third row.
         * @param h - The value for element at the second column and third row.
         * @param i - The value for element at the third column and third row.
         */
        set(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number): void;
        /**
         * Set an array of values onto the matrix. Order described in {@link Two.Matrix}.
         * @param a - The value for element at the first column and first row.
         * @param b - The value for element at the second column and first row.
         * @param c - The value for element at the third column and first row.
         * @param d - The value for element at the first column and second row.
         * @param e - The value for element at the second column and second row.
         * @param f - The value for element at the third column and second row.
         * @param g - The value for element at the first column and third row.
         * @param h - The value for element at the second column and third row.
         * @param i - The value for element at the third column and third row.
         */
        set(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number): void;
        /**
         * Copy the matrix of one to the current instance.
         */
        copy(): void;
        /**
         * Turn matrix to the identity, like resetting.
         */
        identity(): void;
        /**
         * Multiply all components of the matrix against a single scalar value.
         * @param a - The scalar to be multiplied.
         */
        multiply(a: number): void;
        /**
         * Multiply all components of the matrix against a single scalar value.
         * @param a - The scalar to be multiplied.
         */
        multiply(a: number): void;
        /**
         * Multiply all components of the matrix against a single scalar value.
         * @param a - The scalar to be multiplied.
         */
        multiply(a: number): void;
        /**
         * Return an inverted version of the matrix. If no optional one is passed a new matrix is created and returned.
         * @param [out] - The optional matrix to apply the inversion to.
         */
        inverse(out?: Two.Matrix): void;
        /**
         * Uniformly scale the transformation matrix.
         * @param scale - The one dimensional scale to apply to the matrix.
         */
        scale(scale: number): void;
        /**
         * Uniformly scale the transformation matrix.
         * @param scale - The one dimensional scale to apply to the matrix.
         */
        scale(scale: number): void;
        /**
         * Rotate the matrix.
         * @param Number - The amount to rotate in Number.
         */
        rotate(Number: number): void;
        /**
         * Translate the matrix.
         * @param x - The horizontal translation value to apply.
         * @param y - The vertical translation value to apply.
         */
        translate(x: number, y: number): void;
        /**
         * Skew the matrix by an angle in the x axis direction.
         * @param Number - The amount to skew in Number.
         */
        skewX(Number: number): void;
        /**
         * Skew the matrix by an angle in the y axis direction.
         * @param Number - The amount to skew in Number.
         */
        skewY(Number: number): void;
        /**
         * Create a transform string. Used for the Two.js rendering APIs.
         * @param [fullMatrix = false] - Return the full 9 elements of the matrix or just 6 for 2D transformations.
         * @returns - The transformation matrix as a 6 component string separated by spaces.
         */
        toString(fullMatrix?: boolean): string;
        /**
         * Create a transform array. Used for the Two.js rendering APIs.
         * @param [fullMatrix = false] - Return the full 9 elements of the matrix or just 6 in the format for 2D transformations.
         * @param [output] - An array empty or otherwise to apply the values to.
         */
        toTransformArray(fullMatrix?: boolean, output?: Number[]): void;
        /**
         * Create a transform array. Used for the Two.js rendering APIs.
         * @param [fullMatrix = false] - Return the full 9 elements of the matrix or just 6 for 2D transformations.
         * @param [output] - An array empty or otherwise to apply the values to.
         */
        toArray(fullMatrix?: boolean, output?: Number[]): void;
        /**
         * Create a JSON compatible object that represents information of the matrix.
         */
        toObject(): void;
        /**
         * Clone the current matrix.
         */
        clone(): void;
    }
    /**
     * This is the primary primitive class for creating all drawable shapes in Two.js. Unless specified methods return their instance of `Two.Path` for the purpose of chaining.
     * @param [vertices] - A list of {@link Two.Anchor}s that represent the order and coordinates to construct the rendered shape.
     * @param [closed = false] - Describes whether the shape is closed or open.
     * @param [curved = false] - Describes whether the shape automatically calculates bezier handles for each vertex.
     * @param [manual = false] - Describes whether the developer controls how vertices are plotted or if Two.js automatically plots coordinates based on closed and curved booleans.
     */
    class Path extends Two.Shape {
        constructor(vertices?: Two.Anchor[], closed?: boolean, curved?: boolean, manual?: boolean);
        /**
         * @property undefined - Determines whether a final line is drawn between the final point in the `vertices` array and the first point.
         */
        closed: {};
        /**
         * @property undefined - When the path is `automatic = true` this boolean determines whether the lines between the points are curved or not.
         */
        curved: {};
        /**
         * {@link Two.Path#beginning} is a percentage value that represents at what percentage into the path should the renderer start drawing.
         * @property undefined - Number between zero and one to state the beginning of where the path is rendered.
         */
        beginning: {};
        /**
         * {@link Two.Path#ending} is a percentage value that represents at what percentage into the path should the renderer start drawing.
         * @property undefined - Number between zero and one to state the ending of where the path is rendered.
         */
        ending: {};
        /**
         * @property undefined - The value of what the path should be filled in with.
         */
        fill: {};
        /**
         * @property undefined - The value of what the path should be outlined in with.
         */
        stroke: {};
        /**
         * @property undefined - The thickness in pixels of the stroke.
         */
        linewidth: {};
        /**
         * @property undefined - The opaqueness of the path.
         */
        opacity: {};
        /**
         * @property undefined - A class to be applied to the element to be compatible with CSS styling.
         */
        className: {};
        /**
         * @property undefined - Display the path or not.
         */
        visible: {};
        cap: {};
        join: {};
        miter: {};
        /**
         * A list of {@link Two.Anchor} objects that consist of what form the path takes.
         * @property undefined - An ordered list of anchor points for rendering the path.
         */
        vertices: {};
        /**
         * @property undefined - Determines whether or not Two.js should calculate curves, lines, and commands automatically for you or to let the developer manipulate them for themselves.
         */
        automatic: {};
        /**
         * A list of numbers that represent the repeated dash length and dash space applied to the stroke of the text.
         * @property undefined - Array of numbers. Odd indices represent dash length. Even indices represent dash space.
         */
        dashes: {};
        /**
         * @property undefined - A list of properties that are on every {@link Two.Path}.
         */
        static Properties: {};
        /**
         * Cached method to let renderers know vertices have been updated on a {@link Two.Path}.
         */
        static FlagVertices(): void;
        /**
         * Cached method to let {@link Two.Path} know vertices have been added to the instance.
         */
        static BindVertices(): void;
        /**
         * Cached method to let {@link Two.Path} know vertices have been removed from the instance.
         */
        static UnbindVertices(): void;
        /**
         * Cached method to let {@link Two.Path} know the fill has changed.
         */
        static FlagFill(): void;
        /**
         * Cached method to let {@link Two.Path} know the fill has changed.
         */
        static FlagFill(): void;
        /**
         * Convenience function to apply observable qualities of a {@link Two.Path} to any object. Handy if you'd like to extend the {@link Two.Path} class on a custom class.
         * @param object - The object to make observable.
         */
        static MakeObservable(object: any): void;
        /**
         * @property undefined - The sum of distances between all {@link Two.Path#vertices}.
         */
        length: {};
        /**
         * @property undefined - Object to define clipping area.
         */
        clip: {};
        /**
         * Create a new instance of {@link Two.Path} with the same properties of the current path.
         * @param [parent] - The parent group or scene to add the clone to.
         */
        clone(parent?: Two.Group): Two.Path;
        /**
         * Return a JSON compatible plain object that represents the path.
         */
        toObject(): any;
        /**
         * Short hand method to set fill to `transparent`.
         */
        noFill(): void;
        /**
         * Short hand method to set stroke to `transparent`.
         */
        noStroke(): void;
        /**
         * Orient the vertices of the shape to the upper left-hand corner of the path.
         */
        corner(): void;
        /**
         * Orient the vertices of the shape to the center of the path.
         */
        center(): void;
        /**
         * Remove self from the scene / parent.
         */
        remove(): void;
        /**
         * Return an object with top, left, right, bottom, width, and height parameters of the path.
         * @param [shallow = false] - Describes whether to calculate off local matrix or world matrix.
         * @returns - Returns object with top, left, right, bottom, width, height attributes.
         */
        getBoundingClientRect(shallow?: boolean): any;
        /**
         * Given a float `t` from 0 to 1, return a point or assign a passed `obj`'s coordinates to that percentage on this Two.Path's curve.
         * @param t - Percentage value describing where on the Two.Path to estimate and assign coordinate values.
         * @param [obj] - Object to apply calculated x, y to. If none available returns new Object.
         */
        getPointAt(t: boolean, obj?: Two.Vector): any;
        /**
         * Based on closed / curved and sorting of vertices plot where all points should be and where the respective handles should be too.
         */
        plot(): void;
        /**
         * Insert a {@link Two.Anchor} at the midpoint between every item in {@link Two.Path#vertices}.
         * @param limit - How many times to recurse subdivisions.
         */
        subdivide(limit: number): void;
    }
    /**
     * An arbitrary class to manage a directory of things. Mainly used for keeping tabs of textures in Two.js.
     */
    class Registry {
        /**
         * Adds any value to the directory. Assigned by the `id`.
         * @param id - A unique identifier.
         * @param value - Any type of variable to be registered to the directory.
         */
        add(id: string, value: any): void;
        /**
         * Remove any value from the directory by its `id`.
         * @param id - A unique identifier.
         */
        remove(id: string): void;
        /**
         * Get a registered value by its `id`.
         * @param id - A unique identifier.
         * @returns The associated value. If unavailable then `undefined` is returned.
         */
        get(id: string): any;
        /**
         * Convenience method to see if a value is registered to an `id` already.
         * @param id - A unique identifier.
         */
        contains(id: string): boolean;
    }
    /**
     * This class is used by {@link Two} when constructing with `type` of `Two.Types.canvas`. It takes Two.js' scenegraph and renders it to a `<canvas />`.
     * @param [parameters] - This object is inherited when constructing a new instance of {@link Two}.
     * @param [parameters.domElement] - The `<canvas />` to draw to. If none given a new one will be constructed.
     * @param [parameters.overdraw] - Determines whether the canvas should clear the background or not. Defaults to `true`.
     * @param [parameters.smoothing = true] - Determines whether the canvas should antialias drawing. Set it to `false` when working with pixel art. `false` can lead to better performance, since it would use a cheaper interpolation algorithm.
     */
    class CanvasRenderer extends Two.Events {
        constructor(parameters?: {
            domElement?: Element;
            overdraw?: boolean;
            smoothing?: boolean;
        });
        /**
         * @property undefined - The `<canvas />` associated with the Two.js scene.
         */
        domElement: {};
        /**
         * @property undefined - Associated two dimensional context to render on the `<canvas />`.
         */
        ctx: {};
        /**
         * @property undefined - Determines whether the canvas clears the background each draw call.
         */
        overdraw: {};
        /**
         * @property undefined - The root group of the scenegraph.
         */
        scene: {};
        /**
         * @property undefined - A massive object filled with utility functions and properties to render Two.js objects to a `<canvas />`.
         */
        static Utils: {};
        /**
         * Change the size of the renderer.
         * @param width - The new width of the renderer.
         * @param height - The new height of the renderer.
         * @param [ratio] - The new pixel ratio (pixel density) of the renderer. Defaults to calculate the pixel density of the user's screen.
         */
        setSize(width: number, height: number, ratio?: number): void;
        /**
         * Render the current scene to the `<canvas />`.
         */
        render(): void;
    }
    /**
     * This class is used by {@link Two} when constructing with `type` of `Two.Types.svg` (the default type). It takes Two.js' scenegraph and renders it to a `<svg />`.
     * @param [parameters] - This object is inherited when constructing a new instance of {@link Two}.
     * @param [parameters.domElement] - The `<svg />` to draw to. If none given a new one will be constructed.
     */
    class SVGRenderer extends Two.Events {
        constructor(parameters?: {
            domElement?: Element;
        });
        /**
         * @property undefined - The `<svg />` associated with the Two.js scene.
         */
        domElement: {};
        /**
         * @property undefined - The root group of the scenegraph.
         */
        scene: {};
        /**
         * @property undefined - The `<defs />` to apply gradients, patterns, and bitmap imagery.
         */
        defs: {};
        /**
         * @property undefined - A massive object filled with utility functions and properties to render Two.js objects to a `<svg />`.
         */
        static Utils: {};
        /**
         * Change the size of the renderer.
         * @param width - The new width of the renderer.
         * @param height - The new height of the renderer.
         */
        setSize(width: number, height: number): void;
        /**
         * Render the current scene to the `<svg />`.
         */
        render(): void;
    }
    /**
     * This class is used by {@link Two} when constructing with `type` of `Two.Types.webgl`. It takes Two.js' scenegraph and renders it to a `<canvas />` through the WebGL api.
     * @param [parameters] - This object is inherited when constructing a new instance of {@link Two}.
     * @param [parameters.domElement] - The `<canvas />` to draw to. If none given a new one will be constructed.
     * @param [parameters.offscreenElement] - The offscreen two dimensional `<canvas />` to render each element on WebGL texture updates.
     * @param [parameters.antialias] - Determines whether the canvas should clear render with antialias on.
     */
    class WebGLRenderer extends Two.Events {
        constructor(parameters?: {
            domElement?: Element;
            offscreenElement?: HTMLCanvasElement;
            antialias?: boolean;
        });
        /**
         * @property undefined - The `<canvas />` associated with the Two.js scene.
         */
        domElement: {};
        /**
         * @property undefined - The root group of the scenegraph.
         */
        scene: {};
        /**
         * @property undefined - Determines whether the canvas clears the background each draw call.
         */
        overdraw: {};
        /**
         * @property undefined - Associated two dimensional context to render on the `<canvas />`.
         */
        ctx: {};
        /**
         * @property undefined - Associated WebGL program to render all elements from the scenegraph.
         */
        program: {};
        /**
         * @property undefined - A massive object filled with utility functions and properties to render Two.js objects to a `<canvas />` through the WebGL API.
         */
        static Utils: {};
        /**
         * Change the size of the renderer.
         * @param width - The new width of the renderer.
         * @param height - The new height of the renderer.
         * @param [ratio] - The new pixel ratio (pixel density) of the renderer. Defaults to calculate the pixel density of the user's screen.
         */
        setSize(width: number, height: number, ratio?: number): void;
        /**
         * Render the current scene to the `<canvas />`.
         */
        render(): void;
    }
    /**
     * The foundational transformation object for the Two.js scenegraph.
     */
    class Shape extends Two.Events {
        /**
         * Object access to store relevant renderer specific variables. Warning: manipulating this object can create unintended consequences.
         */
        renderer: {};
        /**
         * @property undefined - Session specific unique identifier.
         */
        id: {};
        /**
         * A list of class strings stored if imported / interpreted  from an SVG element.
         */
        classList: {};
        /**
         * The transformation matrix of the shape.
         */
        matrix: {};
        /**
         * @property undefined - The x and y value for where the shape is placed relative to its parent.
         */
        translation: {};
        /**
         * @property undefined - The value in Number for how much the shape is rotated relative to its parent.
         */
        rotation: {};
        /**
         * @property undefined - The value for how much the shape is scaled relative to its parent.
         */
        scale: {};
        /**
         * Skew the shape by an angle in the x axis direction.
         * @property undefined - The value in Number for how much the shape is skewed relative to its parent.
         */
        skewX: {};
        /**
         * Skew the shape by an angle in the y axis direction.
         * @property undefined - The value in Number for how much the shape is skewed relative to its parent.
         */
        skewY: {};
        /**
         * Utility function used in conjunction with event handlers to update the flagMatrix of a shape.
         */
        static FlagMatrix(): void;
        /**
         * Convenience function to apply observable qualities of a {@link Two.Shape} to any object. Handy if you'd like to extend the {@link Two.Shape} class on a custom class.
         * @param object - The object to make observable.
         */
        static MakeObservable(object: any): void;
        /**
         * @property undefined - A class to be applied to the element to be compatible with CSS styling.
         */
        className: {};
        /**
         * Convenience method to add itself to the scenegraph.
         * @param group - The parent the shape adds itself to.
         */
        addTo(group: Two.Group): void;
        /**
         * Create a new {@link Two.Shape} with the same values as the current shape.
         * @param [parent] - Optional argument to automatically add the shape to a scenegraph.
         */
        clone(parent?: Two.Group): Two.Shape;
    }
    /**
     * @param [x = 0] - The x position of the arc segment.
     * @param [y = 0] - The y position of the arc segment.
     * @param [innerRadius = 0] - The inner radius value of the arc segment.
     * @param [outerRadius = 0] - The outer radius value of the arc segment.
     * @param [startAngle = 0] - The start angle of the arc segment in Number.
     * @param [endAngle = 6.2831] - The end angle of the arc segment in Number.
     * @param [resolution = 24] - The number of vertices used to construct the arc segment.
     */
    class ArcSegment extends Two.Path {
        constructor(x?: number, y?: number, innerRadius?: number, outerRadius?: number, startAngle?: number, endAngle?: number, resolution?: number);
        /**
         * @property undefined - The size of the inner radius of the arc segment.
         */
        innerRadius: {};
        /**
         * @property undefined - The size of the outer radius of the arc segment.
         */
        outerRadius: {};
        /**
         * @property undefined - The angle of one side for the arc segment.
         */
        startRadius: {};
        /**
         * @property undefined - The angle of the other side for the arc segment.
         */
        endAngle: {};
        /**
         * @property undefined - A list of properties that are on every {@link Two.ArcSegment}.
         */
        static Properties: {};
        /**
         * Convenience function to apply observable qualities of a {@link Two.ArcSegment} to any object. Handy if you'd like to extend the {@link Two.ArcSegment} class on a custom class.
         * @param object - The object to make observable.
         */
        static MakeObservable(object: any): void;
        /**
         * Create a new instance of {@link Two.ArcSegment} with the same properties of the current path.
         * @param [parent] - The parent group or scene to add the clone to.
         */
        clone(parent?: Two.Group): Two.ArcSegment;
        /**
         * Return a JSON compatible plain object that represents the path.
         */
        toObject(): any;
    }
    /**
     * @param [x = 0] - The x position of the circle.
     * @param [y = 0] - The y position of the circle.
     * @param [radius = 0] - The radius value of the circle.
     * @param [resolution = 4] - The number of vertices used to construct the circle.
     */
    class Circle extends Two.Path {
        constructor(x?: number, y?: number, radius?: number, resolution?: number);
        /**
         * @property undefined - The size of the radius of the circle.
         */
        radius: {};
        /**
         * @property undefined - A list of properties that are on every {@link Two.Circle}.
         */
        static Properties: {};
        /**
         * Convenience function to apply observable qualities of a {@link Two.Circle} to any object. Handy if you'd like to extend the {@link Two.Circle} class on a custom class.
         * @param object - The object to make observable.
         */
        static MakeObservable(object: any): void;
        /**
         * Create a new instance of {@link Two.Circle} with the same properties of the current path.
         * @param [parent] - The parent group or scene to add the clone to.
         */
        clone(parent?: Two.Group): Two.Circle;
        /**
         * Return a JSON compatible plain object that represents the path.
         */
        toObject(): any;
    }
    /**
     * @param [x = 0] - The x position of the ellipse.
     * @param [y = 0] - The y position of the ellipse.
     * @param [rx = 0] - The radius value of the ellipse in the x direction.
     * @param [ry = 0] - The radius value of the ellipse in the y direction.
     * @param [resolution = 4] - The number of vertices used to construct the ellipse.
     */
    class Ellipse extends Two.Path {
        constructor(x?: number, y?: number, rx?: number, ry?: number, resolution?: number);
        /**
         * @property undefined - The width of the ellipse.
         */
        width: {};
        /**
         * @property undefined - The height of the ellipse.
         */
        height: {};
        /**
         * @property undefined - A list of properties that are on every {@link Two.Ellipse}.
         */
        static Properties: {};
        /**
         * Convenience function to apply observable qualities of a {@link Two.Ellipse} to any object. Handy if you'd like to extend the {@link Two.Ellipse} class on a custom class.
         * @param object - The object to make observable.
         */
        static MakeObservable(object: any): void;
        /**
         * Create a new instance of {@link Two.Polygon} with the same properties of the current path.
         * @param [parent] - The parent group or scene to add the clone to.
         */
        clone(parent?: Two.Group): Two.Polygon;
        /**
         * Return a JSON compatible plain object that represents the path.
         */
        toObject(): any;
    }
    /**
     * @param [x1 = 0] - The x position of the first vertex on the line.
     * @param [y1 = 0] - The y position of the first vertex on the line.
     * @param [x2 = 0] - The x position of the second vertex on the line.
     * @param [y2 = 0] - The y position of the second vertex on the line.
     */
    class Line extends Two.Path {
        constructor(x1?: number, y1?: number, x2?: number, y2?: number);
    }
    /**
     * @param [x = 0] - The x position of the polygon.
     * @param [y = 0] - The y position of the polygon.
     * @param [radius = 0] - The radius value of the polygon.
     * @param [sides = 12] - The number of vertices used to construct the polygon.
     */
    class Polygon extends Two.Path {
        constructor(x?: number, y?: number, radius?: number, sides?: number);
        /**
         * @property undefined - The size of the width of the polygon.
         */
        width: {};
        /**
         * @property undefined - The size of the height of the polygon.
         */
        height: {};
        /**
         * @property undefined - The amount of sides the polyogn has.
         */
        sides: {};
        /**
         * @property undefined - A list of properties that are on every {@link Two.Polygon}.
         */
        static Properties: {};
        /**
         * Convenience function to apply observable qualities of a {@link Two.Polygon} to any object. Handy if you'd like to extend the {@link Two.Polygon} class on a custom class.
         * @param object - The object to make observable.
         */
        static MakeObservable(object: any): void;
        /**
         * Create a new instance of {@link Two.Polygon} with the same properties of the current path.
         * @param [parent] - The parent group or scene to add the clone to.
         */
        clone(parent?: Two.Group): Two.Polygon;
        /**
         * Return a JSON compatible plain object that represents the path.
         */
        toObject(): any;
    }
    /**
     * @param [x = 0] - The x position of the rectangle.
     * @param [y = 0] - The y position of the rectangle.
     * @param [width] - The width value of the rectangle.
     * @param [height] - The width value of the rectangle.
     */
    class Rectangle extends Two.Path {
        constructor(x?: number, y?: number, width?: number, height?: number);
        /**
         * @property undefined - The size of the width of the rectangle.
         */
        width: {};
        /**
         * @property undefined - The size of the height of the rectangle.
         */
        height: {};
        /**
         * @property undefined - A two-component vector describing the origin offset to draw the rectangle. Default is `0, 0`.
         */
        origin: {};
        /**
         * @property undefined - A list of properties that are on every {@link Two.Rectangle}.
         */
        static Properties: {};
        /**
         * Convenience function to apply observable qualities of a {@link Two.Rectangle} to any object. Handy if you'd like to extend the {@link Two.Rectangle} class on a custom class.
         * @param object - The object to make observable.
         */
        static MakeObservable(object: any): void;
        /**
         * Create a new instance of {@link Two.Rectangle} with the same properties of the current path.
         * @param [parent] - The parent group or scene to add the clone to.
         */
        clone(parent?: Two.Group): Two.Rectangle;
        /**
         * Return a JSON compatible plain object that represents the path.
         */
        toObject(): any;
    }
    /**
     * @param [x = 0] - The x position of the rounded rectangle.
     * @param [y = 0] - The y position of the rounded rectangle.
     * @param [width = 0] - The width value of the rounded rectangle.
     * @param [height = 0] - The width value of the rounded rectangle.
     * @param [radius = 0] - The radius value of the rounded rectangle.
     * @param [resolution = 12] - The number of vertices used to construct the rounded rectangle.
     */
    class RoundedRectangle extends Two.Path {
        constructor(x?: number, y?: number, width?: number, height?: number, radius?: number, resolution?: number);
        /**
         * @property undefined - The width of the rounded rectangle.
         */
        width: {};
        /**
         * @property undefined - The height of the rounded rectangle.
         */
        height: {};
        /**
         * @property undefined - The size of the radius of the rounded rectangle.
         */
        radius: {};
        /**
         * @property undefined - A list of properties that are on every {@link Two.RoundedRectangle}.
         */
        static Properties: {};
        /**
         * @property undefined - A convenience function to trigger the flag for radius changing.
         */
        static FlagRadius: {};
        /**
         * Convenience function to apply observable qualities of a {@link Two.RoundedRectangle} to any object. Handy if you'd like to extend the {@link Two.RoundedRectangle} class on a custom class.
         * @param object - The object to make observable.
         */
        static MakeObservable(object: any): void;
        /**
         * Create a new instance of {@link Two.RoundedRectangle} with the same properties of the current path.
         * @param [parent] - The parent group or scene to add the clone to.
         */
        clone(parent?: Two.Group): Two.RoundedRectangle;
        /**
         * Return a JSON compatible plain object that represents the path.
         */
        toObject(): any;
    }
    /**
     * @param [x = 0] - The x position of the star.
     * @param [y = 0] - The y position of the star.
     * @param [innerRadius = 0] - The inner radius value of the star.
     * @param [outerRadius = 0] - The outer radius value of the star.
     * @param [sides = 5] - The number of sides used to construct the star.
     */
    class Star extends Two.Path {
        constructor(x?: number, y?: number, innerRadius?: number, outerRadius?: number, sides?: number);
        /**
         * @property undefined - The size of the inner radius of the star.
         */
        innerRadius: {};
        /**
         * @property undefined - The size of the outer radius of the star.
         */
        outerRadius: {};
        /**
         * @property undefined - The amount of sides the star has.
         */
        sides: {};
        /**
         * @property undefined - A list of properties that are on every {@link Two.Star}.
         */
        static Properties: {};
        /**
         * Convenience function to apply observable qualities of a {@link Two.Star} to any object. Handy if you'd like to extend the {@link Two.Star} class on a custom class.
         * @param object - The object to make observable.
         */
        static MakeObservable(object: any): void;
        /**
         * Create a new instance of {@link Two.Star} with the same properties of the current path.
         * @param [parent] - The parent group or scene to add the clone to.
         */
        clone(parent?: Two.Group): Two.Star;
        /**
         * Return a JSON compatible plain object that represents the path.
         */
        toObject(): any;
    }
    /**
     * This is a primitive class for creating drawable text that can be added to the scenegraph.
     * @param [message] - The String to be rendered to the scene.
     * @param [x = 0] - The position in the x direction for the object.
     * @param [y = 0] - The position in the y direction for the object.
     * @param [styles] - An object where styles are applied. Attribute must exist in Two.Text.Properties.
     */
    class Text extends Two.Shape {
        constructor(message?: string, x?: number, y?: number, styles?: any);
        /**
         * A list of numbers that represent the repeated dash length and dash space applied to the stroke of the text.
         * @property undefined - Array of numbers. Odd indices represent dash length. Even indices represent dash space.
         */
        dashes: {};
        /**
         * @property undefined - Approximate aspect ratio of a typeface's character width to height.
         */
        static Ratio: {};
        /**
         * @property undefined - A list of properties that are on every {@link Two.Text}.
         */
        static Properties: {};
        /**
         * Cached method to let renderers know the fill property have been updated on a {@link Two.Text}.
         */
        static FlagFill(): void;
        /**
         * Cached method to let renderers know the stroke property have been updated on a {@link Two.Text}.
         */
        static FlagStroke(): void;
        /**
         * @property undefined - The characters to be rendered to the the screen. Referred to in the documentation sometimes as the `message`.
         */
        value: {};
        /**
         * @property undefined - The font family Two.js should attempt to regsiter for rendering. The default value is `'sans-serif'`. Comma separated font names can be supplied as a "stack", similar to the CSS implementation of `font-family`.
         */
        family: {};
        /**
         * @property undefined - The font size in Two.js point space. Defaults to `13`.
         */
        size: {};
        /**
         * @property undefined - The height between lines measured from base to base in Two.js point space. Defaults to `17`.
         */
        leading: {};
        /**
         * @property undefined - Alignment of text in relation to {@link Two.Text#translation}'s coordinates. Possible values include `'left'`, `'center'`, `'right'`. Defaults to `'center'`.
         */
        alignment: {};
        /**
         * @property undefined - The vertical aligment of the text in relation to {@link Two.Text#translation}'s coordinates. Possible values include `'top'`, `'middle'`, `'bottom'`, and `'baseline'`. Defaults to `'baseline'`.
         */
        baseline: {};
        /**
         * @property undefined - The font's style. Possible values include '`normal`', `'italic'`. Defaults to `'normal'`.
         */
        style: {};
        /**
         * @property undefined - A number at intervals of 100 to describe the font's weight. This compatibility varies with the typeface's variant weights. Larger values are bolder. Smaller values are thinner. Defaults to `'500'`.
         */
        weight: {};
        /**
         * @property undefined - String to delineate whether text should be decorated with for instance an `'underline'`. Defaults to `'none'`.
         */
        decoration: {};
        /**
         * @property undefined - The value of what the text object should be filled in with.
         */
        fill: {};
        /**
         * @property undefined - The value of what the text object should be filled in with.
         */
        stroke: {};
        /**
         * @property undefined - The thickness in pixels of the stroke.
         */
        linewidth: {};
        /**
         * @property undefined - The opaqueness of the text object.
         */
        opacity: {};
        /**
         * @property undefined - A class to be applied to the element to be compatible with CSS styling. Only available for the {@link Two.SvgRenderer}.
         */
        className: {};
        /**
         * @property undefined - Display the text object or not.
         */
        visible: {};
        /**
         * @property undefined - Object to define clipping area.
         */
        clip: {};
        /**
         * Remove self from the scene / parent.
         */
        remove(): void;
        /**
         * Create a new instance of {@link Two.Text} with the same properties of the current text object.
         * @param [parent] - The parent group or scene to add the clone to.
         */
        clone(parent?: Two.Group): Two.Text;
        /**
         * Return a JSON compatible plain object that represents the text object.
         */
        toObject(): any;
        /**
         * Short hand method to set fill to `transparent`.
         */
        noFill(): void;
        /**
         * Short hand method to set stroke to `transparent`.
         */
        noStroke(): void;
        /**
         * Return an object with top, left, right, bottom, width, and height parameters of the text object.
         * @param [shallow = false] - Describes whether to calculate off local matrix or world matrix.
         * @returns - Returns object with top, left, right, bottom, width, height attributes.
         */
        getBoundingClientRect(shallow?: boolean): any;
    }
    /**
     * A class to store x / y component vector data. In addition to storing data `Two.Vector` has suped up methods for commonplace mathematical operations.
     * @param [x = 0] - Any number to represent the horizontal x-component of the vector.
     * @param [y = 0] - Any number to represent the vertical y-component of the vector.
     */
    class Vector {
        constructor(x?: number, y?: number);
        /**
         * @property undefined - The horizontal x-component of the vector.
         */
        x: {};
        /**
         * @property undefined - The vertical y-component of the vector.
         */
        y: {};
        /**
         * @property undefined - Handy reference to a vector with component values 0, 0 at all times.
         */
        static readonly zero: {};
        /**
         * Add two vectors together.
         */
        static add(v1: Two.Vector, v2: Two.Vector): Two.Vector;
        /**
         * Subtract two vectors: `v2` from `v1`.
         */
        static sub(v1: Two.Vector, v2: Two.Vector): Two.Vector;
        /**
         * Alias for {@link Two.Vector.sub}.
         */
        static subtract(): void;
        /**
         * @returns The ratio betwen two points `v1` and `v2`.
         */
        static ratioBetween(A: Two.Vector, B: Two.Vector): number;
        /**
         * @returns The angle between points `v1` and `v2`.
         */
        static angleBetween(v1: Two.Vector, v2: Two.Vector): number;
        /**
         * @returns The distance between points `v1` and `v2`. Distance is always positive.
         */
        static distanceBetween(v1: Two.Vector, v2: Two.Vector): number;
        /**
         * @returns The squared distance between points `v1` and `v2`.
         */
        static distanceBetweenSquared(v1: Two.Vector, v2: Two.Vector): number;
        /**
         * Convenience function to apply observable qualities of a {@link Two.Vector} to any object. Handy if you'd like to extend the {@link Two.Vector} class on a custom class.
         * @param object - The object to make observable.
         */
        static MakeObservable(object: any): void;
        /**
         * Set the x / y components of a vector to specific number values.
         */
        set(x: number, y: number): void;
        /**
         * Copy the x / y components of another object `v`.
         */
        copy(v: Two.Vector): void;
        /**
         * Set the x / y component values of the vector to zero.
         */
        clear(): void;
        /**
         * Create a new vector and copy the existing values onto the newly created instance.
         */
        clone(): void;
        /**
         * Add an object with x / y component values to the instance.
         */
        add(v: Two.Vector): void;
        /**
         * Add an object with x / y component values to the instance.
         */
        add(v: Two.Vector): void;
        /**
         * Add an object with x / y component values to the instance.
         */
        add(v: Two.Vector): void;
        /**
         * Alias for {@link Two.Vector.add}.
         */
        addSelf(): void;
        /**
         * Subtract an object with x / y component values to the instance.
         */
        sub(v: Two.Vector): void;
        /**
         * Subtract an object with x / y component values to the instance.
         */
        sub(v: Two.Vector): void;
        /**
         * Subtract an object with x / y component values to the instance.
         */
        sub(v: Two.Vector): void;
        /**
         * Alias for {@link Two.Vector.sub}.
         */
        subtract(): void;
        /**
         * Alias for {@link Two.Vector.sub}.
         */
        subSelf(): void;
        /**
         * Alias for {@link Two.Vector.sub}.
         */
        subtractSelf(): void;
        /**
         * Multiply an object with x / y component values to the instance.
         */
        multiply(v: Two.Vector): void;
        /**
         * Multiply an object with x / y component values to the instance.
         */
        multiply(v: Two.Vector): void;
        /**
         * Multiply an object with x / y component values to the instance.
         */
        multiply(v: Two.Vector): void;
        /**
         * Alias for {@link Two.Vector.multiply}.
         */
        multiplySelf(): void;
        /**
         * Mulitiply the vector by a single number. Shorthand to call {@link Two.Vector#multiply} directly.
         * @param s - The scalar to multiply by.
         */
        multiplyScalar(s: number): void;
        /**
         * Divide an object with x / y component values to the instance.
         */
        divide(v: Two.Vector): void;
        /**
         * Divide an object with x / y component values to the instance.
         */
        divide(v: Two.Vector): void;
        /**
         * Divide an object with x / y component values to the instance.
         */
        divide(v: Two.Vector): void;
        /**
         * Alias for {@link Two.Vector.divide}.
         */
        divideSelf(): void;
        /**
         * Divide the vector by a single number. Shorthand to call {@link Two.Vector#divide} directly.
         * @param s - The scalar to divide by.
         */
        divideScalar(s: number): void;
        /**
         * Invert each component's sign value.
         */
        negate(): void;
        /**
         * Invert each component's sign value.
         */
        negate(): void;
        /**
         * Get the length of a vector.
         */
        length(): number;
        /**
         * Get the length of the vector to the power of two. Widely used as less expensive than {@link Two.Vector#length}, because it isn't square-rooting any numbers.
         */
        lengthSquared(): number;
        /**
         * Normalize the vector from negative one to one.
         */
        normalize(): void;
        /**
         * Get the distance between two vectors.
         */
        distanceTo(): number;
        /**
         * Get the distance between two vectors to the power of two. Widely used as less expensive than {@link Two.Vector#distanceTo}, because it isn't square-rooting any numbers.
         */
        distanceToSquared(): number;
        /**
         * Set the length of a vector.
         * @param l - length to set vector to.
         */
        setLength(l: number): void;
        /**
         * Qualify if one vector roughly equal another. With a margin of error defined by epsilon.
         * @param v - The vector to compare against.
         * @param [eps = 0.0001] - An options epsilon for precision.
         */
        equals(v: Two.Vector, eps?: number): boolean;
        /**
         * Linear interpolate one vector to another by an amount `t` defined as a zero to one number.
         * @param v - The destination vector to step towards.
         * @param t - The zero to one value of how close the current vector gets to the destination vector.
         */
        lerp(v: Two.Vector, t: number): void;
        /**
         * Check to see if vector is roughly zero, based on the `epsilon` precision value.
         * @param [eps = 0.0001] - Optional precision amount to check against.
         */
        isZero(eps?: number): boolean;
        /**
         * Return a comma-separated string of x, y value. Great for storing in a database.
         */
        toString(): string;
        /**
         * Return a JSON compatible plain object that represents the vector.
         */
        toObject(): any;
        /**
         * Rotate a vector.
         * @param Number - The amoun to rotate the vector by.
         */
        rotate(Number: number): void;
    }
}

/**
 * The entrypoint for Two.js. Instantiate a `new Two` in order to setup a scene to render to. `Two` is also the publicly accessible namespace that all other sub-classes, functions, and utilities attach to.
 * @param [options.fullscreen = false] - Set to `true` to automatically make the stage adapt to the width and height of the parent document. This parameter overrides `width` and `height` parameters if set to `true`. This overrides `options.fitted` as well.
 * @param [options.fitted = false] - = Set to `true` to automatically make the stage adapt to the width and height of the parent element. This parameter overrides `width` and `height` parameters if set to `true`.
 * @param [options.width = 640] - The width of the stage on construction. This can be set at a later time.
 * @param [options.height = 480] - The height of the stage on construction. This can be set at a later time.
 * @param [options.type = Two.Types.svg] - The type of renderer to setup drawing with. See {@link Two.Types} for available options.
 * @param [options.autostart = false] - Set to `true` to add the instance to draw on `requestAnimationFrame`. This is a convenient substitute for {@link Two#play}.
 * @param [options.domElement] - The canvas or SVG element to draw into. This overrides the `options.type` argument.
 */
declare class Two {
    constructor(options?: {
        fullscreen?: boolean;
        fitted?: boolean;
        width?: number;
        height?: number;
        type?: string;
        autostart?: boolean;
        domElement?: Element;
    });
    /**
     * The id of the next requestAnimationFrame function.
     */
    static nextFrameID: {};
    /**
     * @property undefined - The different rendering types available in the library.
     */
    static Types: {};
    /**
     * @property undefined - The current working version of the library.
     */
    static Version: {};
    /**
     * @property undefined - The automatically generated publish date in the build process to verify version release candidates.
     */
    static PublishDate: {};
    /**
     * @property undefined - String prefix for all Two.js object's ids. This trickles down to SVG ids.
     */
    static Identifier: {};
    /**
     * @property undefined - Default amount of vertices to be used for interpreting Arcs and ArcSegments.
     */
    static Resolution: {};
    /**
     * @property undefined - When importing SVGs through the {@link two#interpret} and {@link two#load}, this boolean determines whether Two.js infers and then overrides the exact transformation matrix of the reference SVG.
     */
    static AutoCalculateImportedMatrices: {};
    /**
     * @property undefined - Registered list of all Two.js instances in the current session.
     */
    static Instances: {};
    /**
     * Simple method to access an incrementing value. Used for `id` allocation on all Two.js objects.
     * @returns Ever increasing Number.
     */
    static uniqueId(): number;
    /**
     * If `options.fullscreen` or `options.fitted` in construction create this function. It sets the `width` and `height` of the instance to its respective parent `window` or `element` depending on the `options` passed.
     */
    fit(): void;
    /**
     * @property undefined - A string representing which type of renderer the instance has instantiated.
     */
    type: string;
    /**
     * @property undefined - The instantiated rendering class for the instance. For a list of possible rendering types check out Two.Types.
     */
    renderer: {};
    /**
     * @property undefined - The base level {@link Two.Group} which houses all objects for the instance. Because it is a {@link Two.Group} transformations can be applied to it that will affect all objects in the instance. This is handy as a makeshift inverted camera.
     */
    scene: {};
    /**
     * @property undefined - The width of the instance's dom element.
     */
    width: {};
    /**
     * @property undefined - The height of the instance's dom element.
     */
    height: {};
    /**
     * @property undefined - An integer representing how many frames have elapsed.
     */
    frameCount: {};
    /**
     * @property undefined - A number representing how much time has elapsed since the last frame in milliseconds.
     */
    timeDelta: {};
    /**
     * @property undefined - A boolean representing whether or not the instance is being updated through the automatic `requestAnimationFrame`.
     */
    playing: {};
    /**
     * Shorthand method to append your instance of Two.js to the `document`.
     * @param elem - The DOM element to append the Two.js stage to.
     */
    appendTo(elem: Element): void;
    /**
     * Call to start an internal animation loop.
     */
    play(): void;
    /**
     * Call to stop the internal animation loop for a specific instance of Two.js.
     */
    pause(): void;
    /**
     * Release an arbitrary class' events from the Two.js corpus and recurse through its children and or vertices.
     * @returns The object passed for event deallocation.
     */
    release(obj: any): any;
    /**
     * Update positions and calculations in one pass before rendering. Then render to the canvas.
     */
    update(): void;
    /**
     * Render all drawable and visible objects of the scene.
     */
    render(): void;
    /**
     * A shorthand method to add specific Two.js objects to the scene.
     * @param [objects] - An array of Two.js objects. Alternatively can add objects as individual arguments.
     */
    add(objects?: Two.Shape[] | Two.Shape): void;
    /**
     * A shorthand method to remove specific Two.js objects from the scene.
     * @param [objects] - An array of Two.js objects.
     */
    remove(objects?: Two.Shape[] | Two.Shape): void;
    /**
     * Removes all objects from the instance's scene. If you intend to have the browser garbage collect this, don't forget to delete the references in your application as well.
     */
    clear(): void;
    /**
     * Creates a Two.js line and adds it to the scene.
     */
    makeLine(x1: number, y1: number, x2: number, y2: number): Two.Line;
    /**
     * Creates a Two.js arrow and adds it to the scene.
     */
    makeArrow(x1: number, y1: number, x2: number, y2: number): Two.Path;
    /**
     * Creates a Two.js rectangle and adds it to the scene.
     */
    makeRectangle(x: number, y: number, width: number, height: number): Two.Rectangle;
    /**
     * Creates a Two.js rounded rectangle and adds it to the scene.
     */
    makeRoundedRectangle(x: number, y: number, width: number, height: number, sides: number): Two.Rectangle;
    /**
     * Creates a Two.js circle and adds it to the scene.
     */
    makeCircle(x: number, y: number, radius: number, resolution?: number): Two.Circle;
    /**
     * Creates a Two.js ellipse and adds it to the scene.
     */
    makeEllipse(x: number, y: number, rx: number, ry: number, resolution?: number): Two.Ellipse;
    /**
     * Creates a Two.js star and adds it to the scene.
     */
    makeStar(x: number, y: number, outerRadius: number, innerRadius: number, sides: number): Two.Star;
    /**
     * Creates a Two.js path that is curved and adds it to the scene.
     * @param [points] - An array of {@link Two.Anchor} points.
     * @param undefined - Alternatively you can pass alternating `x` / `y` coordinate values as individual arguments. These will be combined into {@link Two.Anchor}s for use in the path.
     * @returns - Where `path.curved` is set to `true`.
     */
    makeCurve(points?: Two.Anchor[]): Two.Path;
    /**
     * Creates a Two.js polygon and adds it to the scene.
     */
    makePolygon(x: number, y: number, radius: number, sides: number): Two.Polygon;
    /**
     * @param [resolution = Two.Resolution] - The number of vertices that should comprise the arc segment.
     */
    makeArcSegment(x: number, y: number, innerRadius: number, outerRadius: number, startAngle: number, endAngle: number, resolution?: number): void;
    /**
     * Creates a Two.js path and adds it to the scene.
     * @param [points] - An array of {@link Two.Anchor} points.
     * @param undefined - Alternatively you can pass alternating `x` / `y` coordinate values as individual arguments. These will be combined into {@link Two.Anchor}s for use in the path.
     */
    makePath(points?: Two.Anchor[]): Two.Path;
    /**
     * Creates a Two.js text object and adds it to the scene.
     * @param [styles] - An object to describe any of the {@link Two.Text.Properties} including `fill`, `stroke`, `linewidth`, `family`, `alignment`, `leading`, `opacity`, etc..
     */
    makeText(message: string, x: number, y: number, styles?: any): Two.Text;
    /**
     * Creates a Two.js linear gradient and ads it to the scene. In the case of an effect it's added to an invisible "definitions" group.
     * @param stops - Any number of color stops sometimes reffered to as ramp stops. If none are supplied then the default black-to-white two stop gradient is applied.
     */
    makeLinearGradient(x1: number, y1: number, x2: number, y2: number, ...stops: Two.Stop[]): Two.LinearGradient;
    /**
     * Creates a Two.js linear-gradient object and ads it to the scene. In the case of an effect it's added to an invisible "definitions" group.
     * @param stops - Any number of color stops sometimes reffered to as ramp stops. If none are supplied then the default black-to-white two stop gradient is applied.
     */
    makeRadialGradient(x1: number, y1: number, radius: number, ...stops: Two.Stop[]): Two.RadialGradient;
    /**
     * Creates a Two.js sprite object and adds it to the scene. Sprites can be used for still images as well as animations.
     * @param pathOrTexture - The URL path to an image or an already created {@link Two.Texture}.
     */
    makeSprite(pathOrTexture: string | Two.Texture, x: number, y: number, columns?: number, rows?: number, frameRate?: number, autostart?: boolean): Two.Sprite;
    /**
     * Creates a Two.js image sequence object and adds it to the scene.
     * @param pathsOrTextures - An array of paths or of {@link Two.Textures}.
     */
    makeImageSequence(pathsOrTextures: String[] | Two.Texture[], x: number, y: number, frameRate?: number, autostart?: boolean): Two.ImageSequence;
    /**
     * Creates a Two.js texture object.
     * @param [pathOrSource] - The URL path to an image or a DOM image-like element.
     * @param [callback] - Function to be invoked when the image is loaded.
     */
    makeTexture(pathOrSource?: string | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, callback?: (...params: any[]) => any): Two.Texture;
    /**
     * Creates a Two.js group object and adds it to the scene.
     * @param [objects] - Two.js objects to be added to the group in the form of an array or as individual arguments.
     */
    makeGroup(objects?: Two.Shape[] | Two.Shape): Two.Group;
    /**
     * Interpret an SVG Node and add it to this instance's scene. The distinction should be made that this doesn't `import` svg's, it solely interprets them into something compatible for Two.js - this is slightly different than a direct transcription.
     * @param SVGElement - The SVG node to be parsed.
     * @param shallow - Don't create a top-most group but append all content directly.
     * @param add - – Automatically add the reconstructed SVG node to scene.
     */
    interpret(SVGElement: SVGElement, shallow: boolean, add: boolean): Two.Group;
    /**
     * Load an SVG file or SVG text and interpret it into Two.js legible objects.
     * @param pathOrSVGContent - The URL path of an SVG file or an SVG document as text.
     * @param callback - Function to call once loading has completed.
     */
    load(pathOrSVGContent: string | SVGElement, callback: (...params: any[]) => any): Two.Group;
    /**
     * @property undefined - A massive object filled with utility functions and properties.
     */
    static Utils: {};
    /**
     * @property undefined - Map of possible path commands. Taken from the SVG specification.
     */
    static Commands: {};
}

