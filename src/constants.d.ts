declare module 'two.js/src/constants' {
  export interface Constants {
    NextFrameId: number;
    Types: {
      webgl: 'WebGLRenderer';
      svg: 'SVGRenderer';
      canvas: 'CanvasRenderer';
    };
    Version: string;
    PublishDate: string;
    Identifier: string;
    Resolution: number;
    AutoCalculateImportedMatrices: boolean;
    Instances: Two[];
    uniqueId(): number;
  }
  import Two from 'two.js';
}
