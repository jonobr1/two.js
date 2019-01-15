(function(Two) {

//    output example:
//
//    <image
//    preserveAspectRatio="none"
//    href="https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png"
//    height="100"
//    width="300"
//    />

  var _ = Two.Utils;

    /**
    * @class
    * @description Class that renders an image as an Image tag, it does not use the SVG header.
    * @param {number} [x=0] - x position at center
    * @param {numbert} [y=0] - y position at center
    * @param {number} [width] - width of image
    * @param {number} [height] - height of image
    * @param {string} [imageDataSource] - image data encoded as a base 64 string
    * @param {boolean} [preserveAspectRatio] - boolean to preserve the aspect ratio
    */
  var Image = Two.Image = function(x, y, width, height, imageDataSource, preserveAspectRatio) {

    Two.Shape.call(this);

    this._renderer.type = 'image';

    this.width = width;
    this.height = height;

    this.href = imageDataSource;
    this.opacity = 1.0;
    this.className = '';
    this.visible = true;

    // this should better be in future an enum that can describe what all renders can do.
    // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio
    if (!_.isUndefined(preserveAspectRatio)) {
      this.preserveAspectRatio = !!preserveAspectRatio;
    }

    if (_.isNumber(x) && _.isNumber(y)) {
      this.translation.set(x, y);
    }

    this._update();

  };

  _.extend(Image, {

    Properties: [
      'width',
      'height',
      'href',
      'preserveAspectRatio',
      'opacity',
      'className',
      'visible'
    ],

    MakeObservable: function(obj) {
      Two.Shape.MakeObservable(obj);
      _.each(Image.Properties, Two.Utils.defineProperty, obj);
    }

  });

  _.extend(Image.prototype, Two.Shape.prototype, {

    _flagWidth: false,
    _flagHeight: false,
    _flagHref: false,
    _flagPreserveAspectRatio: false,
    _flagVisible: false,
    _flagClassName: false,
    _flagOpacity: false,

    _width: 0,
    _height: 0,
    _href: '',
    _preserveAspectRatio: false,
    _opacity: 1.0,
    _className: '',
    _visible: true,

    constructor: Image,

    _update: function() {

      Two.Shape.prototype._update.call(this);
      return this;

    },

    flagReset: function() {

      this._flagWidth = this._flagHeight = this._flagHref
        = this._flagPreserveAspectRatio = this._flagVisible
        = this._flagClassName = this._flagOpacity = false;

      Two.Shape.prototype.flagReset.call(this);
      return this;

    }

  });

  Image.MakeObservable(Image.prototype);

})((typeof global !== 'undefined' ? global : (this || window)).Two);
