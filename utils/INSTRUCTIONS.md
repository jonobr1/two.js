# TypeScript Types Declaration Build Instructions

1. Remove all @extends commands from `/src` and `/extras`
2. Run `npm run types`

---

In output code `types.d.ts` do:

3. Remove all `Two.*` references — e.g: `Two.Vector` -> `Vector`
4. Remove all `typeof` references
5. Remove all `'.js'` import references
6. Change `"src/two"` two `two.js`
7. Change all `"src/` references to `"two.js/src/`
8. Change all `"extras/"` references to `"two.js/extras/`
