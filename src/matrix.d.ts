declare module 'two.js/src/matrix' {
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
   * @description A class to store 3 x 3 transformation matrix information. In addition to storing data `Two.Matrix` has souped-up methods for commonplace mathematical operations.
   * @nota-bene Order is based on how to construct transformation strings for the browser.
   */
  export class Matrix extends Events {
    /**
     * @name Two.Matrix.Identity
     * @property {Number[]} - A stored reference to the default value of a 3 x 3 matrix.
     */
    static Identity: [1, 0, 0, 0, 1, 0, 0, 0, 1];
    /**
     * @name Two.Matrix.Multiply
     * @function
     * @param {Matrix} A
     * @param {Matrix} B
     * @param {Matrix} [C] - An optional matrix to apply the multiplication to.
     * @returns {Matrix} - If an optional `C` matrix isn't passed then a new one is created and returned.
     * @description Multiply two matrices together and return the result.
     */
    static Multiply(A: Matrix, B: Matrix, C?: Matrix): Matrix;
    /**
     * @name Two.Matrix.fromObject
     * @function
     * @param {Object} obj - The object notation of a Two.Matrix to create a new instance
     * @returns {Two.Matrix}
     * @description Create a new {@link Two.Matrix} from an object notation of a {@link Two.Matrix}.
     * @nota-bene Works in conjunction with {@link Two.Matrix#toObject}
     */
    static fromObject(
      obj:
        | object
        | {
            elements?: number[];
            manual?: boolean;
          }
    ): Matrix;
    constructor(elements: number[]);
    constructor(
      a?: number,
      b?: number,
      c?: number,
      d?: number,
      e?: number,
      f?: number
    );
    /**
     * @name Two.Matrix#elements
     * @property {Number[]} - The underlying data stored as an array.
     */
    elements: [
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number
    ];
    /**
     * @name Two.Matrix#manual
     * @property {Boolean} - Determines whether Two.js automatically calculates the values for the matrix or if the developer intends to manage the matrix.
     * @nota-bene - Setting to `true` nullifies {@link Two.Shape#translation}, {@link Two.Shape#rotation}, and {@link Two.Shape#scale}.
     */
    manual: boolean;
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
    set(
      a: number[],
      b: any,
      c: any,
      d: any,
      e: any,
      f: any,
      g: any,
      h: any,
      i: any
    ): any;
    /**
     * @name Two.Matrix#copy
     * @function
     * @description Copy the matrix of one to the current instance.
     */
    copy(m: any): Matrix;
    /**
     * @name Two.Matrix#identity
     * @function
     * @description Turn matrix to the identity, like resetting.
     */
    identity(): Matrix;
    /**
     * @name Two.Matrix#multiply
     * @function
     * @param {Number} a - The scalar to be multiplied.
     * @description Multiply all components of the matrix against a single scalar value.
     * @overloaded
     */
    multiply(a: number): Matrix;
    /**
     * @name Two.Matrix#multiply
     * @function
     * @param {Number} a - The x component to be multiplied.
     * @param {Number} b - The y component to be multiplied.
     * @param {Number} c - The z component to be multiplied.
     * @description Multiply all components of a matrix against a 3 component vector.
     * @overloaded
     */
    multiply(
      a: number,
      b: number,
      c?: number
    ): [x: number, y: number, z: number];
    /**
     * @name Two.Matrix#multiply
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
     * @overloaded
     */
    multiply(
      a: number,
      b: number,
      c: number,
      d: number,
      e: number,
      f: number,
      g: number,
      h: number,
      i: number
    ): Matrix;
    /**
     * @name Two.Matrix#inverse
     * @function
     * @param {Matrix} [out] - The optional matrix to apply the inversion to.
     * @description Return an inverted version of the matrix. If no optional one is passed a new matrix is created and returned.
     */
    inverse(out?: Matrix): Matrix;
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
    scale(sx: number, sy: number, ...args: any[]): Matrix;
    /**
     * @name Two.Matrix#rotate
     * @function
     * @param {Number} Number - The amount to rotate in Number.
     * @description Rotate the matrix.
     */
    rotate(Number: number): Matrix;
    /**
     * @name Two.Matrix#translate
     * @function
     * @param {Number} x - The horizontal translation value to apply.
     * @param {Number} y - The vertical translation value to apply.
     * @description Translate the matrix.
     */
    translate(x: number, y: number): Matrix;
    /**
     * @name Two.Matrix#skewX
     * @function
     * @param {Number} Number - The amount to skew in Number.
     * @description Skew the matrix by an angle in the x axis direction.
     */
    skewX(Number: number): Matrix;
    /**
     * @name Two.Matrix#skewY
     * @function
     * @param {Number} Number - The amount to skew in Number.
     * @description Skew the matrix by an angle in the y axis direction.
     */
    skewY(Number: number): Matrix;
    /**
     * @name Two.Matrix#toString
     * @function
     * @param {Boolean} [fullMatrix=false] - Return the full 9 elements of the matrix or just 6 for 2D transformations.
     * @returns {String} - The transformation matrix as a 6 component string separated by spaces.
     * @description Create a transform string. Used for the Two.js rendering APIs.
     */
    toString(fullMatrix?: boolean): string;
    /**
     * @name Two.Matrix#toTransformArray
     * @function
     * @param {Boolean} [fullMatrix=false] - Return the full 9 elements of the matrix or just 6 in the format for 2D transformations.
     * @param {Number[]} [output] - An array empty or otherwise to apply the values to.
     * @description Create a transform array. Used for the Two.js rendering APIs.
     */
    toTransformArray(fullMatrix?: boolean, output?: number[]): number[];
    /**
     * @name Two.Matrix#toArray
     * @function
     * @param {Boolean} [fullMatrix=false] - Return the full 9 elements of the matrix or just 6 for 2D transformations.
     * @param {Number[]} [output] - An array empty or otherwise to apply the values to.
     * @description Create a transform array. Used for the Two.js rendering APIs.
     */
    toArray(fullMatrix?: boolean, output?: number[]): number[];
    /**
     * @name Two.Matrix#toObject
     * @function
     * @description Create a JSON compatible object that represents information of the matrix.
     */
    toObject(): {
      elements: number[];
      manual: boolean;
    };
    /**
     * @name Two.Matrix#clone
     * @function
     * @description Clone the current matrix.
     */
    clone(): Matrix;
  }
  import { Events } from 'two.js/src/events';
}
