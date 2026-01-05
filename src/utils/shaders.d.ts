declare module 'two.js/src/utils/shaders' {
  export interface shaders {
    create(gl: any, source: any, type: any): any;
    types: {
      vertex: string;
      fragment: string;
    };
    path: {
      vertex: string;
      fragment: string;
    };
    points: {
      vertex: string;
      fragment: string;
    };
  }
}
