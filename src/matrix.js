(function(Two) {

  // Constants

  var cos = Math.cos, sin = Math.sin, tan = Math.tan;
  var _ = Two.Utils, fix = _.toFixed;
  var array = [];

  /**
   * @name Two.Matrix
   * @class
   * @param {Number} [a=1] - The value for element at the first column and first row.
   * @param {Number} [b=0] - The value for element at the second column and first row.
   * @param {Number} [c=0] - The value for element at the third column and first row.
   * @param {Number} [d=0] - The value for element at the first column and second row.
   * @param {Number} [e=1] - The value for element at the second column and second row.
   * @param {Number} [f=0] - The value for element at the third column and second row.
   * @param {Number} [g=0] - The value for element at the first column and third row.
   * @param {Number} [h=0] - The value for element at the second column and third row.
   * @param {Number} [i=1] - The value for element at the third column and third row.
   * @description A class to store 3 x 3 transformation matrix information. In addition to storing data `Two.Matrix` has suped up methods for commonplace mathematical operations.
   * @nota-bene Order is based on how to construct transformation strings for the browser.
   */
  var Matrix = Two.Matrix = function(a, b, c, d, e, f) {

    /**
     * @name Two.Matrix#elements
     * @property {Array} - The underlying data stored as an array.
     */
    this.elements = new Two.Array(9);

    var elements = a;
    if (!_.isArray(elements)) {
      elements = _.toArray(arguments);
    }

    // initialize the elements with default values.
    this.identity();

    if (elements.length > 0) {
      this.set(elements);
    }

  };

  _.extend(Matrix, {

    /**
     * @name Two.Matrix.Identity
     * @property {Array} - A stored reference to the default value of a 3 x 3 matrix.
     */
    Identity: [
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    ],

    /**
     * @name Two.Matrix.Multiply
     * @function
     * @param {Two.Matrix} A
     * @param {Two.Matrix} B
     * @param {Two.Matrix} [C] - An optional matrix to apply the multiplication to.
     * @returns {Two.Matrix} - If an optional `C` matrix isn't passed then a new one is created and returned.
     * @description Multiply two matrices together and return the result.
     */
    Multiply: function(A, B, C) {

      if (B.length <= 3) { // Multiply Vector

        var x, y, z, e = A;

        var a = B[0] || 0,
            b = B[1] || 0,
            c = B[2] || 0;

        // Go down rows first
        // a, d, g, b, e, h, c, f, i

        x = e[0] * a + e[1] * b + e[2] * c;
        y = e[3] * a + e[4] * b + e[5] * c;
        z = e[6] * a + e[7] * b + e[8] * c;

        return { x: x, y: y, z: z };

      }

      var A0 = A[0], A1 = A[1], A2 = A[2];
      var A3 = A[3], A4 = A[4], A5 = A[5];
      var A6 = A[6], A7 = A[7], A8 = A[8];

      var B0 = B[0], B1 = B[1], B2 = B[2];
      var B3 = B[3], B4 = B[4], B5 = B[5];
      var B6 = B[6], B7 = B[7], B8 = B[8];

      C = C || new Two.Array(9);

      C[0] = A0 * B0 + A1 * B3 + A2 * B6;
      C[1] = A0 * B1 + A1 * B4 + A2 * B7;
      C[2] = A0 * B2 + A1 * B5 + A2 * B8;
      C[3] = A3 * B0 + A4 * B3 + A5 * B6;
      C[4] = A3 * B1 + A4 * B4 + A5 * B7;
      C[5] = A3 * B2 + A4 * B5 + A5 * B8;
      C[6] = A6 * B0 + A7 * B3 + A8 * B6;
      C[7] = A6 * B1 + A7 * B4 + A8 * B7;
      C[8] = A6 * B2 + A7 * B5 + A8 * B8;

      return C;

    }

  });

  _.extend(Matrix.prototype, Two.Utils.Events, {

    constructor: Matrix,

    /**
     * @name Two.Matrix#manual
     * @property {Boolean} - Determines whether Two.js automatically calculates the values for the matrix or if the developer intends to manage the matrix.
     * @nota-bene - Setting to `true` nullifies {@link Two.Shape#translation}, {@link Two.Shape#rotation}, and {@link Two.Shape#scale}.
     */
    manual: false,

    /**
     * @name Two.Matrix#set
     * @function
     * @param {Number} a - The value for element at the first column and first row.
     * @param {Number} b - The value for element at the second column and first row.
     * @param {Number} c - The value for element at the third column and first row.
     * @param {Number} d - The value for element at the first column and second row.
     * @param {Number} e - The value for element at the second column and second row.
     * @param {Number} f - The value for element at the third column and second row.
     * @param {Number} g - The value for element at the first column and third row.
     * @param {Number} h - The value for element at the second column and third row.
     * @param {Number} i - The value for element at the third column and third row.
     * @description Set an array of values onto the matrix. Order described in {@link Two.Matrix}.
     */

     /**
      * @name Two.Matrix#set
      * @function
      * @param {Number[]} a - The array of elements to apply.
      * @description Set an array of values onto the matrix. Order described in {@link Two.Matrix}.
      */
    set: function(a) {

      var elements = a;
      if (arguments.length > 1) {
        elements = _.toArray(arguments);
      }

      this.elements[0] = elements[0];
      this.elements[1] = elements[1];
      this.elements[2] = elements[2];
      this.elements[3] = elements[3];
      this.elements[4] = elements[4];
      this.elements[5] = elements[5];
      this.elements[6] = elements[6];
      this.elements[7] = elements[7];
      this.elements[8] = elements[8];

      return this.trigger(Two.Events.change);

    },

    /**
     * @name Two.Matrix#identity
     * @function
     * @description Turn matrix to the identity, like resetting.
     */
    identity: function() {

      this.elements[0] = Matrix.Identity[0];
      this.elements[1] = Matrix.Identity[1];
      this.elements[2] = Matrix.Identity[2];
      this.elements[3] = Matrix.Identity[3];
      this.elements[4] = Matrix.Identity[4];
      this.elements[5] = Matrix.Identity[5];
      this.elements[6] = Matrix.Identity[6];
      this.elements[7] = Matrix.Identity[7];
      this.elements[8] = Matrix.Identity[8];

      return this.trigger(Two.Events.change);

    },

    /**
     * @name Two.Matrix.multiply
     * @function
     * @param {Number} a - The scalar to be multiplied.
     * @description Multiply all components of the matrix against a single scalar value.
     */

    /**
     * @name Two.Matrix.multiply
     * @function
     * @param {Number} a - The x component to be multiplied.
     * @param {Number} b - The y component to be multiplied.
     * @param {Number} c - The z component to be multiplied.
     * @description Multiply all components of a matrix against a 3 component vector.
     */

    /**
     * @name Two.Matrix.multiply
     * @function
     * @param {Number} a - The value at the first column and first row of the matrix to be multiplied.
     * @param {Number} b - The value at the second column and first row of the matrix to be multiplied.
     * @param {Number} c - The value at the third column and first row of the matrix to be multiplied.
     * @param {Number} d - The value at the first column and second row of the matrix to be multiplied.
     * @param {Number} e - The value at the second column and second row of the matrix to be multiplied.
     * @param {Number} f - The value at the third column and second row of the matrix to be multiplied.
     * @param {Number} g - The value at the first column and third row of the matrix to be multiplied.
     * @param {Number} h - The value at the second column and third row of the matrix to be multiplied.
     * @param {Number} i - The value at the third column and third row of the matrix to be multiplied.
     * @description Multiply all components of a matrix against another matrix.
     */
    multiply: function(a, b, c, d, e, f, g, h, i) {

      var elements = arguments, l = elements.length;

      // Multiply scalar

      if (l <= 1) {

        this.elements[0] *= a;
        this.elements[1] *= a;
        this.elements[2] *= a;
        this.elements[3] *= a;
        this.elements[4] *= a;
        this.elements[5] *= a;
        this.elements[6] *= a;
        this.elements[7] *= a;
        this.elements[8] *= a;

        return this.trigger(Two.Events.change);

      }

      if (l <= 3) { // Multiply Vector

        var x, y, z;
        a = a || 0;
        b = b || 0;
        c = c || 0;
        e = this.elements;

        // Go down rows first
        // a, d, g, b, e, h, c, f, i

        x = e[0] * a + e[1] * b + e[2] * c;
        y = e[3] * a + e[4] * b + e[5] * c;
        z = e[6] * a + e[7] * b + e[8] * c;

        return { x: x, y: y, z: z };

      }

      // Multiple matrix

      var A = this.elements;
      var B = elements;

      var A0 = A[0], A1 = A[1], A2 = A[2];
      var A3 = A[3], A4 = A[4], A5 = A[5];
      var A6 = A[6], A7 = A[7], A8 = A[8];

      var B0 = B[0], B1 = B[1], B2 = B[2];
      var B3 = B[3], B4 = B[4], B5 = B[5];
      var B6 = B[6], B7 = B[7], B8 = B[8];

      this.elements[0] = A0 * B0 + A1 * B3 + A2 * B6;
      this.elements[1] = A0 * B1 + A1 * B4 + A2 * B7;
      this.elements[2] = A0 * B2 + A1 * B5 + A2 * B8;

      this.elements[3] = A3 * B0 + A4 * B3 + A5 * B6;
      this.elements[4] = A3 * B1 + A4 * B4 + A5 * B7;
      this.elements[5] = A3 * B2 + A4 * B5 + A5 * B8;

      this.elements[6] = A6 * B0 + A7 * B3 + A8 * B6;
      this.elements[7] = A6 * B1 + A7 * B4 + A8 * B7;
      this.elements[8] = A6 * B2 + A7 * B5 + A8 * B8;

      return this.trigger(Two.Events.change);

    },

    /**
     * @name Two.Matrix#inverse
     * @function
     * @param {Two.Matrix} [out] - The optional matrix to apply the inversion to.
     * @description Return an inverted version of the matrix. If no optional one is passed a new matrix is created and returned.
     */
    inverse: function(out) {

      var a = this.elements;
      out = out || new Two.Matrix();

      var a00 = a[0], a01 = a[1], a02 = a[2];
      var a10 = a[3], a11 = a[4], a12 = a[5];
      var a20 = a[6], a21 = a[7], a22 = a[8];

      var b01 = a22 * a11 - a12 * a21;
      var b11 = -a22 * a10 + a12 * a20;
      var b21 = a21 * a10 - a11 * a20;

      // Calculate the determinant
      var det = a00 * b01 + a01 * b11 + a02 * b21;

      if (!det) {
        return null;
      }

      det = 1.0 / det;

      out.elements[0] = b01 * det;
      out.elements[1] = (-a22 * a01 + a02 * a21) * det;
      out.elements[2] = (a12 * a01 - a02 * a11) * det;
      out.elements[3] = b11 * det;
      out.elements[4] = (a22 * a00 - a02 * a20) * det;
      out.elements[5] = (-a12 * a00 + a02 * a10) * det;
      out.elements[6] = b21 * det;
      out.elements[7] = (-a21 * a00 + a01 * a20) * det;
      out.elements[8] = (a11 * a00 - a01 * a10) * det;

      return out;

    },

    /**
     * @name Two.Matrix#scale
     * @function
     * @param {Number} scale - The one dimensional scale to apply to the matrix.
     * @description Uniformly scale the transformation matrix.
     */

    /**
     * @name Two.Matrix#scale
     * @function
     * @param {Number} sx - The horizontal scale factor.
     * @param {Number} sy - The vertical scale factor
     * @description Scale the transformation matrix in two dimensions.
     */
    scale: function(sx, sy) {

      var l = arguments.length;
      if (l <= 1) {
        sy = sx;
      }

      return this.multiply(sx, 0, 0, 0, sy, 0, 0, 0, 1);

    },

    /**
     * @name Two.Matrix#rotate
     * @function
     * @param {Radians} radians - The amount to rotate in radians.
     * @description Rotate the matrix.
     */
    rotate: function(radians) {

      var c = cos(radians);
      var s = sin(radians);

      return this.multiply(c, -s, 0, s, c, 0, 0, 0, 1);

    },

    /**
     * @name Two.Matrix#translate
     * @function
     * @param {Number} x - The horizontal translation value to apply.
     * @param {Number} y - The vertical translation value to apply.
     * @description Translate the matrix.
     */
    translate: function(x, y) {

      return this.multiply(1, 0, x, 0, 1, y, 0, 0, 1);

    },

    /**
     * @name Two.Matrix#skewX
     * @function
     * @param {Radians} radians - The amount to skew in radians.
     * @description Skew the matrix by an angle in the x axis direction.
     */
    skewX: function(radians) {

      var a = tan(radians);

      return this.multiply(1, a, 0, 0, 1, 0, 0, 0, 1);

    },

    /**
     * @name Two.Matrix#skewY
     * @function
     * @param {Radians} radians - The amount to skew in radians.
     * @description Skew the matrix by an angle in the y axis direction.
     */
    skewY: function(radians) {

      var a = tan(radians);

      return this.multiply(1, 0, 0, a, 1, 0, 0, 0, 1);

    },

    /**
     * @name Two.Matrix#toString
     * @function
     * @param {Boolean} [fullMatrix=false] - Return the full 9 elements of the matrix or just 6 for 2D transformations.
     * @returns {String} - The transformation matrix as a 6 component string separated by spaces.
     * @description Create a transform string. Used for the Two.js rendering APIs.
     */
    toString: function(fullMatrix) {

      array.length = 0;
      this.toArray(fullMatrix, array);

      return array.join(' ');

    },

    /**
     * @name Two.Matrix#toArray
     * @function
     * @param {Boolean} [fullMatrix=false] - Return the full 9 elements of the matrix or just 6 for 2D transformations.
     * @param {Number[]} [output] - An array empty or otherwise to apply the values to.
     * @description Create a transform array. Used for the Two.js rendering APIs.
     */
    toArray: function(fullMatrix, output) {

     var elements = this.elements;
     var hasOutput = !!output;

     var a = fix(elements[0]);
     var b = fix(elements[1]);
     var c = fix(elements[2]);
     var d = fix(elements[3]);
     var e = fix(elements[4]);
     var f = fix(elements[5]);

      if (!!fullMatrix) {

        var g = fix(elements[6]);
        var h = fix(elements[7]);
        var i = fix(elements[8]);

        if (hasOutput) {
          output[0] = a;
          output[1] = d;
          output[2] = g;
          output[3] = b;
          output[4] = e;
          output[5] = h;
          output[6] = c;
          output[7] = f;
          output[8] = i;
          return;
        }

        return [
          a, d, g, b, e, h, c, f, i
        ];
      }

      if (hasOutput) {
        output[0] = a;
        output[1] = d;
        output[2] = b;
        output[3] = e;
        output[4] = c;
        output[5] = f;
        return;
      }

      return [
        a, d, b, e, c, f  // Specific format see LN:19
      ];

    },

    /**
     * @name Two.Matrix#clone
     * @function
     * @description Clone the current matrix.
     */
    clone: function() {
      var a, b, c, d, e, f, g, h, i;

      a = this.elements[0];
      b = this.elements[1];
      c = this.elements[2];
      d = this.elements[3];
      e = this.elements[4];
      f = this.elements[5];
      g = this.elements[6];
      h = this.elements[7];
      i = this.elements[8];

      var matrix = new Two.Matrix(a, b, c, d, e, f, g, h, i);
      matrix.manual = this.manual;

      return matrix;

    }

  });

})((typeof global !== 'undefined' ? global : (this || window)).Two);
