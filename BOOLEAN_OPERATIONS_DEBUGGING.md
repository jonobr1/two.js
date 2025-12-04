# Boolean Operations Debugging Guide

## Quick Start

When you return to debug this implementation, start here:

### 1. Open the Test Page
```bash
cd /Users/jonobrandel/Documents/two.js
open tests/boolean-operations.html
```

Open browser console (F12) to see any logs.

### 2. Current Issue

**Problem:** Paths are generated but incomplete - only showing small arc segments instead of full shapes.

**Expected Results:**
- Union of two circles → Full Venn diagram outline
- Subtract → Full donut/ring shape
- Intersect → Full lens shape
- Exclude → Two full crescent shapes

**Actual Results:**
- Union → Small arc segment only
- Subtract → Small arc segment only
- Intersect → Single line segment only
- Exclude → Small arc segment only

## Debugging Strategy

### Step 1: Add Logging to `constructBooleanResult()`

Edit `src/utils/boolean-result.js` around line 615:

```javascript
export function constructBooleanResult(paths, operation, allIntersections) {
  console.log('=== BOOLEAN OPERATION START ===');
  console.log('Operation:', operation);
  console.log('Number of paths:', paths.length);
  console.log('Number of intersections:', allIntersections ? allIntersections.length : 0);

  // ... existing code ...

  // After splitting
  console.log('Split paths:', splitPaths.length);

  // After creating segments
  console.log('Total segments created:', segments.length);
  console.log('Segments by path:', splitPaths.map((p, i) => ({
    pathIndex: i,
    vertices: p.vertices.length,
    closed: p.closed
  })));

  // After classification
  const keptSegments = segments.filter(s => s.keep);
  console.log('Segments marked to keep:', keptSegments.length, '/', segments.length);
  console.log('Keep ratio:', (keptSegments.length / segments.length * 100).toFixed(1) + '%');

  // After tracing
  console.log('Contours traced:', contours.length);
  contours.forEach((c, i) => {
    console.log(`Contour ${i}:`, {
      segments: c.segments.length,
      closed: c.closed
    });
  });

  // After building result
  if (resultPath) {
    console.log('Result path vertices:', resultPath.vertices.length);
    console.log('Result path closed:', resultPath.closed);
  } else {
    console.log('Result path is NULL');
  }
  console.log('=== BOOLEAN OPERATION END ===\n');

  return resultPath;
}
```

### Step 2: Rebuild and Test

```bash
npm run build
# Refresh browser and check console
```

### Step 3: Analyze the Logs

Look for these red flags:

#### Issue: Too Few Segments Kept
```
Segments marked to keep: 2 / 40
Keep ratio: 5.0%
```
**Diagnosis:** Segment classification is wrong
**Fix Location:** `classifySegments()` function (line 338)
**Possible causes:**
- `pointInAnyPath()` returning incorrect results
- Transformation matrix issues
- Operation rules in `shouldKeepSegment()` are inverted

#### Issue: Contours Have Few Segments
```
Contour 0: { segments: 2, closed: false }
```
**Diagnosis:** Contour tracing stopping too early
**Fix Location:** `traceContours()` function (line 452)
**Possible causes:**
- Adjacency map not built correctly
- Anchor keys not matching due to precision issues
- `findNextSegment()` not finding connected segments

#### Issue: Many Segments Kept But Few Vertices
```
Segments marked to keep: 35 / 40
Contours traced: 1
Contour 0: { segments: 35, closed: true }
Result path vertices: 3
```
**Diagnosis:** Path construction failing
**Fix Location:** `buildResultPath()` function (line 534)
**Possible causes:**
- Vertices not being added properly
- Commands not set correctly
- Clone operation failing

### Step 4: Targeted Fixes

Based on the diagnosis from Step 3, try these fixes:

#### Fix 1: If Segment Classification is Wrong

Check if `pointInPath()` is working:

```javascript
// Add to classifySegments() before line 358
console.log('Testing segment', i, 'midpoint:', midpoint, 'pathIndex:', pathIndex);
console.log('  World coords:', worldX, worldY);
console.log('  Inside other?', isInsideOther);
console.log('  Keep?', segment.keep);
```

Try inverting the logic:
```javascript
// In shouldKeepSegment() - line 301
case 'union':
  return !isInsideOther;  // Try: return isInsideOther;
```

#### Fix 2: If Contour Tracing is Wrong

Check adjacency map:

```javascript
// Add to traceContours() after line 453
console.log('Adjacency map size:', adjacencyMap.size);
console.log('Adjacency map entries:');
adjacencyMap.forEach((segments, key) => {
  console.log(`  ${key}: ${segments.length} segments`);
});
```

Check if segments are connecting:

```javascript
// Add inside the tracing loop (around line 505)
console.log('Current segment end:', currentEnd);
console.log('Looking for next segment...');
const nextSegment = findNextSegment(adjacencyMap, currentEnd, usedSegments);
console.log('Found next segment:', !!nextSegment);
```

#### Fix 3: If Path Construction is Wrong

Check vertex addition:

```javascript
// Add to buildResultPath() inside loop (around line 564)
console.log('Adding segment', s, 'end anchor:', segment.endAnchor);
console.log('  Command:', endAnchor.command);
console.log('  Position:', endAnchor.x, endAnchor.y);
allVertices.push(endAnchor);
console.log('  Total vertices now:', allVertices.length);
```

### Step 5: Test with Simple Case

Create a minimal test with two rectangles (easier to debug than circles):

```javascript
// Add to boolean-operations.html
function testSimpleRectangles() {
  const two = new Two({ width: 350, height: 250 })
    .appendTo(document.getElementById('test-simple'));

  const rect1 = two.makeRectangle(120, 125, 80, 80);
  rect1.fill = 'rgba(255, 0, 0, 0.3)';
  rect1.stroke = '#ccc';

  const rect2 = two.makeRectangle(180, 125, 80, 80);
  rect2.fill = 'rgba(0, 0, 255, 0.3)';
  rect2.stroke = '#ccc';

  const boolGroup = two.makeBooleanGroup([rect1, rect2], 'union');
  const result = boolGroup.getResultPath();

  console.log('SIMPLE TEST - Result:', result);

  if (result) {
    result.stroke = '#00aa00';
    result.linewidth = 3;
    two.add(result);
  }

  two.update();
}
```

Rectangles have:
- Only 4 vertices each
- Only straight lines (no curves)
- Easier to visualize and debug

### Step 6: Visual Debugging

Add visual markers to see what's happening:

```javascript
// After classifySegments() in constructBooleanResult()
// Draw kept segment midpoints
keptSegments.forEach(seg => {
  const circle = two.makeCircle(seg.midpoint.x, seg.midpoint.y, 3);
  circle.fill = '#00ff00';
  circle.noStroke();
});

// Draw discarded segment midpoints
segments.filter(s => !s.keep).forEach(seg => {
  const circle = two.makeCircle(seg.midpoint.x, seg.midpoint.y, 3);
  circle.fill = '#ff0000';
  circle.noStroke();
});
```

This will show green dots for kept segments and red dots for discarded segments.

## Common Issues and Solutions

### Issue: "Cannot read properties of undefined"
**Cause:** Array bounds issues or null checks missing
**Fix:** Add more defensive checks in `insertAnchorAtIntersection()`

### Issue: Segments not connecting
**Cause:** Anchor key precision mismatch
**Fix:** Adjust `anchorKey()` precision (try 2 or 4 decimal places instead of 3)

### Issue: Wrong segments kept for operation
**Cause:** Logic inverted or transformation issues
**Fix:** Double-check `shouldKeepSegment()` rules match the operation semantics

### Issue: Empty result path
**Cause:** All segments discarded or contour tracing failed
**Fix:** Check that at least some segments are marked `keep: true`

## Quick Reference: Operation Rules

For a segment on path A being tested against path B:

| Operation | Segment Inside B | Keep Segment? |
|-----------|------------------|---------------|
| Union     | No               | ✓ Yes         |
| Union     | Yes              | ✗ No          |
| Subtract  | No (A only)      | ✓ Yes         |
| Subtract  | Yes (A only)     | ✗ No          |
| Subtract  | Any (B segments) | ✗ No          |
| Intersect | Yes              | ✓ Yes         |
| Intersect | No               | ✗ No          |
| Exclude   | No               | ✓ Yes         |
| Exclude   | Yes              | ✗ No          |

## Files to Check

Main implementation:
- `src/utils/boolean-result.js` - All the logic
- `src/boolean-group.js` - Entry point
- `tests/boolean-operations.html` - Test page

Supporting files:
- `src/utils/boolean-operations.js` - Intersection detection (working)
- `src/utils/hit-test.js` - Ray casting (used for point-in-path)

## Rebuild Commands

```bash
# Full rebuild
npm run build && npm run lint

# Quick rebuild (skip lint)
npm run build

# Watch mode (if available)
npm run dev
```

## Success Criteria

When fixed, you should see:
- Union: Full outline combining both shapes
- Subtract: Full shape with hole(s) removed
- Intersect: Full overlapping region
- Exclude: Full non-overlapping regions

Each should have 20-50+ vertices for smooth curves.
