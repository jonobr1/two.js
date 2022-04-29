# TypeScript Types Declaration Build Instructions

1. Remove all @extends commands from `/src` and `/extras`
2. Run `npm run types`

---

In output code `types.d.ts` do:

3. Remove all `Two.*` references — e.g: `Two.Vector` -> `Vector`
4. Remove all `typeof` references _except_ for static properties of Two — e.g: `Two.Group`
5. Remove all `'.js'` import references
6. Change `"src/two"` to `two.js`
7. Change all `"src/` references to `"two.js/src/`
8. Change all `"extras/"` references to `"two.js/extras/`
9. Fix all `constructor` methods to have proper argument ingestion
  - Includes: `Two.Rectangle`, `Two.Circle`, `Two.Ellipse`, `Two.Line`, and `Two.Polygon`
10. Fix private property assignment on `Two.Group`. e.g: `_stroke` -> `stroke`
  - Includes `Two.Text`
11. Add optional overloaded functions to `Two.makeCurve` and `Two.makePath` for `closed` attribute
  - And other functions with `...` argument syntax

Things to do to improve TypeScript Types:

1. Add default values to all methods (including constructors) to clarify what is mandatory and what is optional.
2. Figure out how to handle both ingestion of single argument Array's and full arguments as arrays.
