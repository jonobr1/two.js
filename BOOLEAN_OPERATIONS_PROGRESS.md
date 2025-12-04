# Boolean Operations Implementation Progress

**Date:** 2025-12-04
**Branch:** `596-boolean-operations`
**Status:** Phase 1 Weeks 5-6 - Core Implementation Complete, Debugging in Progress

## Summary

Implemented the core boolean operations algorithm for Two.js BooleanGroup, including winding number calculation (via existing ray-casting), point-in-path testing, path splitting, segment classification, and contour tracing. The implementation builds, lints, and runs without errors, but the visual results are showing incomplete paths.

## What Was Implemented

### 1. Core Boolean Operations (`src/utils/boolean-result.js`) - NEW FILE (~650 lines)

**Point-in-Path Testing:**
- `pointInPath(path, x, y, precision)` - Wrapper around existing `buildPathHitParts()` and `pointInPolygons()` from `hit-test.js`
- `pointInAnyPath(paths, x, y, excludeIndex, precision)` - Tests if point is inside any of multiple paths
- **Design Decision:** Reused existing ray-casting from `hit-test.js` instead of implementing new winding number algorithm (saves ~300 lines)

**Path Splitting:**
- `evaluateCubicBezier(p0, p1, p2, p3, t)` - Evaluate Bézier curve at parameter t
- `getSegmentMidpoint(a1, a2)` - Calculate midpoint (handles curves at t=0.5)
- `insertAnchorAtIntersection(path, segmentIndex, t, point)` - Split curve at intersection using De Casteljau subdivision
- `splitPathsAtIntersections(paths, intersections)` - Insert anchors at all intersection points
- **Fix Applied:** Uses exact intersection point coordinates for consistency

**Segment Classification:**
- `shouldKeepSegment(isInsideOther, pathIndex, operation)` - Rules for each boolean operation
- `classifySegments(segments, paths, operation, precision)` - Classify each segment as inside/outside

**Contour Tracing:**
- `anchorKey(anchor)` - Create key string for anchor positions (3 decimal precision)
- `anchorsEqual(a1, a2)` - Check if anchors match (0.01 pixel tolerance)
- `buildAdjacencyMap(segments)` - Map anchor positions to segments
- `findNextSegment(adjacencyMap, anchor, usedSegments)` - Find connected segment
- `traceContours(segments, operation)` - Trace closed contours from classified segments

**Result Construction:**
- `buildResultPath(contours)` - Convert traced contours to Two.Path
- `constructBooleanResult(paths, operation, allIntersections)` - Main entry point

### 2. Boolean Operations Utilities (`src/utils/boolean-operations.js`) - MODIFIED

**Added Exports:**
```javascript
export { anchorToSegment, segmentToAnchor, subdivideCurve };
```

### 3. BooleanGroup Class (`src/boolean-group.js`) - MODIFIED

**Implemented `getResultPath()` method:**
- Filters children to get only Path objects
- Handles edge cases:
  - 0 children → returns null with warning
  - 1 child → returns clone
  - Open paths → returns null with warning (strict mode)
- Finds all pairwise intersections
- Calls `constructBooleanResult()` to compute boolean operation
- Caches result in `_resultPath`

**Updated `flatten()` documentation:**
- Removed "Phase 1" placeholders

### 4. Two.js Main (`src/two.js`) - MODIFIED

**Added imports and exports:**
```javascript
import { constructBooleanResult } from './utils/boolean-result.js';

const Utils = _.extend({
  // ...
  constructBooleanResult,  // NEW
}, ...);
```

### 5. Visual Test Page (`tests/boolean-operations.html`) - NEW FILE

**Test Cases:**
1. Union: Two overlapping circles → Venn diagram
2. Subtract: Large circle - small circle → Donut
3. Intersect: Two overlapping circles → Lens shape
4. Exclude: Two overlapping circles → XOR (two crescents)
5. Union: Circle + Rectangle
6. Subtract: Rectangle - Circle → Hole in rectangle

## Design Decisions Made

### 1. Ray Casting vs Winding Number
**Decision:** Use existing ray casting (`pointInPolygons` from `hit-test.js`)
**Rationale:**
- Already implemented and tested in Two.js
- Sufficient for boolean operations (just need inside/outside)
- Saves ~300 lines of code
- Works with existing `buildPathHitParts` infrastructure

### 2. Multi-Path Strategy
**Decision:** N-way operations (not sequential)
**Rationale:**
- Compute all pairwise intersections: O(N²) comparisons
- Classify each segment against ALL other paths simultaneously
- Natural n-way semantics

### 3. Open Path Handling
**Decision:** Strict mode - return null and warn
**Rationale:** Predictable behavior, forces users to ensure paths are closed

### 4. Curve Precision
**Decision:** Default precision = 8 (from hit-test.js)
**Rationale:** Balances accuracy vs performance, consistent with existing hit testing

## Current Status

### ✅ Complete
- [x] Core implementation of all functions
- [x] Build passes (no compilation errors)
- [x] Lint passes (all code style checks)
- [x] Test page created and loads without errors
- [x] All 4 operations execute without throwing errors

### ⚠️ Issues Found

**Problem:** Visual results show incomplete paths (only partial arcs visible)

**Symptoms:**
- Union shows only small arc segments instead of full Venn outline
- Subtract shows small arc instead of full donut
- Intersect shows single line instead of lens shape
- Tests report "Success" but visuals are incorrect

**Root Cause (Suspected):**
The contour tracing or path construction is only capturing a small portion of the segments. Possible issues:
1. Segments not connecting properly in adjacency map
2. Contour tracing stopping prematurely
3. Segment classification incorrectly marking segments to discard
4. World space vs local space transformation issues

### Recent Fixes Applied

1. **Bounds checking in `insertAnchorAtIntersection`:**
   - Added null checks for `a1` and `a2`
   - Handle wrapping for closed paths
   - Check `a2.command` exists before accessing

2. **Anchor key precision:**
   - Changed from `EPSILON` rounding to 3 decimal places
   - More lenient to avoid false mismatches

3. **Anchor equality tolerance:**
   - Changed from `EPSILON` to 0.01 pixels
   - Helps segments connect properly

4. **Use exact intersection coordinates:**
   - When inserting anchors, use the exact intersection point
   - Ensures perfect alignment between split curves

5. **No-intersections handling:**
   - Added logic for when paths don't intersect
   - Union/exclude returns combined paths
   - Intersect returns null

6. **Transform preservation:**
   - Clone paths with proper transformation copying

## Files Modified/Created

### Created:
1. `/Users/jonobrandel/Documents/two.js/src/utils/boolean-result.js` (~650 lines)
2. `/Users/jonobrandel/Documents/two.js/tests/boolean-operations.html` (~350 lines)
3. `/Users/jonobrandel/Documents/two.js/BOOLEAN_OPERATIONS_PROGRESS.md` (this file)

### Modified:
1. `/Users/jonobrandel/Documents/two.js/src/boolean-group.js` (~60 lines changed)
2. `/Users/jonobrandel/Documents/two.js/src/utils/boolean-operations.js` (1 line - exports)
3. `/Users/jonobrandel/Documents/two.js/src/two.js` (2 lines - imports/exports)

## Debugging Steps to Continue

### 1. Add More Console Logging

Add to `constructBooleanResult()` in `boolean-result.js`:
```javascript
console.log('Intersections found:', allIntersections.length);
console.log('Segments created:', segments.length);
console.log('Segments to keep:', segments.filter(s => s.keep).length);
console.log('Contours traced:', contours.length);
console.log('Contour details:', contours.map(c => ({
  segments: c.segments.length,
  closed: c.closed
})));
```

### 2. Check Segment Classification

The issue might be that segments are incorrectly classified. Check:
- Are most segments being marked as `keep: false`?
- Is `pointInAnyPath()` working correctly?
- Are transformations being applied correctly for hit testing?

### 3. Verify Contour Tracing

Check if contours are closing properly:
- Are segments connecting via the adjacency map?
- Is `findNextSegment()` finding connected segments?
- Are contours stopping prematurely?

### 4. Test with Simpler Cases

Try testing with non-overlapping shapes first:
- Two circles far apart (union should return both)
- Fully contained shapes (circle inside another circle)

### 5. Compare with Existing Tests

Look at `tests/suite/boolean-intersections.js` to see how intersection detection is tested. The boolean operations build on this foundation.

### 6. Check Path Construction

In `buildResultPath()`, verify:
- Are all vertices being added?
- Are commands (move, line, curve) set correctly?
- Is `closed` flag set correctly?

## Next Steps

### Immediate (Debugging):
1. Add comprehensive console logging throughout the pipeline
2. Create a minimal test case (two simple rectangles)
3. Trace through the algorithm step-by-step with logging
4. Verify each stage produces expected output

### Short-term (Bug Fixes):
1. Fix segment classification logic if that's the issue
2. Fix contour tracing if segments aren't connecting
3. Fix path construction if vertices aren't being added properly
4. Add unit tests to `tests/suite/` directory

### Long-term (Testing & Refinement):
1. Create `tests/suite/boolean-point-in-path.js` unit tests
2. Create `tests/suite/boolean-operations.js` unit tests
3. Test with complex shapes (stars, polygons, etc.)
4. Test edge cases (tangent paths, coincident edges, etc.)
5. Performance testing with complex paths
6. Test with transformed (rotated/scaled) shapes

## Key Code References

### Entry Point:
`src/boolean-group.js:78` - `getResultPath()` method

### Main Algorithm:
`src/utils/boolean-result.js:615` - `constructBooleanResult()` function

### Critical Functions:
- Line 157: `insertAnchorAtIntersection()` - Path splitting
- Line 259: `splitPathsAtIntersections()` - Batch splitting
- Line 338: `classifySegments()` - Segment classification
- Line 452: `traceContours()` - Contour tracing
- Line 534: `buildResultPath()` - Path construction

### Test Page:
`tests/boolean-operations.html:116` - `testUnionCircles()` function

## Build Commands

```bash
# Build the project
npm run build

# Run linter
npm run lint

# Open visual test page
open tests/boolean-operations.html
```

## References

### GitHub Issue:
https://github.com/jonobr1/two.js/issues/596#issuecomment-3469620092

### Existing Tests:
- `tests/suite/boolean-intersections.js` - Intersection detection tests (working)
- `tests/boolean-intersections.html` - Visual intersection tests (working)

### Documentation:
- `/Users/jonobrandel/.claude/plans/curious-humming-hummingbird.md` - Original implementation plan

## Notes for Future Developer

1. The intersection detection (from Weeks 3-4) is working correctly - 16 tests pass
2. The issue is specifically in the boolean operation construction (Weeks 5-6)
3. The algorithm is sound in theory but has implementation bugs
4. Most likely culprit: segment classification or contour tracing
5. Consider using a visual debugger or adding drawing primitives to show:
   - Intersection points
   - Split paths
   - Classified segments (color-coded by keep/discard)
   - Traced contours

## Algorithm Overview (For Reference)

```
Boolean Operations Pipeline:
1. Find intersections (WORKING ✓)
2. Split paths at intersections (IMPLEMENTED)
3. Create segments from split paths (IMPLEMENTED)
4. Classify segments (IMPLEMENTED - SUSPECT)
   - Calculate segment midpoint
   - Test if inside other paths
   - Apply operation rules
5. Trace contours (IMPLEMENTED - SUSPECT)
   - Build adjacency map
   - Follow connected segments
   - Form closed loops
6. Build result path (IMPLEMENTED - SUSPECT)
   - Convert contours to vertices
   - Set commands properly
   - Return Two.Path

Issue is likely in steps 4, 5, or 6.
```

## Contact/Questions

If you need clarification on any part of this implementation, refer to:
- The original plan at `.claude/plans/curious-humming-hummingbird.md`
- The GitHub issue comment for requirements
- The existing intersection tests for working examples
