import TwoError from './error.js';

var shaders = {

  create: function(gl, source, type) {
    var shader, compiled, error;
    shader = gl.createShader(gl[type]);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
      error = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new TwoError('unable to compile shader ' + shader + ': ' + error);
    }

    return shader;

  },

  types: {
    vertex: 'VERTEX_SHADER',
    fragment: 'FRAGMENT_SHADER'
  },

  path : {

    vertex:`
      precision mediump float;
      attribute vec2 a_position;

      uniform mat3 u_matrix;
      uniform vec2 u_resolution;
      uniform vec4 u_rect;

      varying vec2 v_textureCoords;

      void main() {
        vec2 rectCoords = (a_position * (u_rect.zw - u_rect.xy)) + u_rect.xy;
        vec2 projected = (u_matrix * vec3(rectCoords, 1.0)).xy;
        vec2 normal = projected / u_resolution;
        vec2 clipspace = (normal * 2.0) - 1.0;

        gl_Position = vec4(clipspace * vec2(1.0, -1.0), 0.0, 1.0);
        v_textureCoords = a_position;
      }
    `,

    fragment: `
      precision mediump float;

      uniform sampler2D u_image;
      varying vec2 v_textureCoords;

      void main() {
        vec4 texel = texture2D(u_image, v_textureCoords);
        if (texel.a == 0.0) {
          discard;
        }
        gl_FragColor = texel;
      }
    `,

  },

  points: {

    vertex: `
      precision mediump float;
      attribute vec2 a_position;

      uniform float u_size;
      uniform mat3 u_matrix;
      uniform vec2 u_resolution;
      uniform vec4 u_rect;

      varying vec2 v_textureCoords;

      void main() {
        vec2 rectCoords = (a_position * (u_rect.zw - u_rect.xy)) + u_rect.xy;
        vec2 projected = (u_matrix * vec3(rectCoords, 1.0)).xy;
        vec2 normal = projected / u_resolution;
        vec2 clipspace = (normal * 2.0) - 1.0;

        gl_PointSize = u_size;
        gl_Position = vec4(clipspace * vec2(1.0, -1.0), 0.0, 1.0);
        v_textureCoords = a_position;
      }
    `,

    fragment: `
      precision mediump float;

      void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      }
    `

  }

};

export default shaders;
