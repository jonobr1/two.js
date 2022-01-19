# TypeScript Types Declaration Build Instructions

1. Run `npm run types`
2. Remove all `'.js'` import references
3. Change `"src/two"` two `two.js`
4. Change all `"src/` references to `"two.js/src/`
5. Change all `"extras/"` references to `"two.js/extras/`
