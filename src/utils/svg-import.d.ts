declare module 'two.js/src/utils/svg-import' {
  import { SvgLoadOptions } from 'two.js';
  export function isSvgImport(node: Node): boolean;
  export function getSvgImportStyles(
    node: SVGElement,
    parentStyles?: Record<string, string>
  ): Record<string, string>;
  export function parseSvg(
    input: string | SVGElement,
    options: SvgLoadOptions,
    baseURL: string
  ): { svg: SVGSVGElement; wrapped: boolean };
}
