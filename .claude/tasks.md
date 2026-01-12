# Claude Code Implementation Tasks

## Quick Reference: Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                           USER CODE                                     │
│   <Canvas>                                                              │
│     <Circle ref={circleRef} />                                          │
│     <TransformControls target={circleRef.current} />  ◄── React layer  │
│   </Canvas>                                                             │
└─────────────────────────────────┬──────────────────────────────────────┘
                                  │
                                  ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    REACT-TWO.JS (lib/helpers/)                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  TransformControls.tsx  │  VertexEditor.tsx  │  SelectionBox.tsx│   │
│  │  - usePointerEvents     │  - usePointerEvents │                 │   │
│  │  - State management     │  - Vertex dragging  │  (future)       │   │
│  │  - Callbacks            │  - Handle mirroring │                 │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                  │                                      │
│                    Creates & updates instances of:                      │
│                                  ▼                                      │
└────────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    TWO.JS (extras/jsm/helpers/)                                │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  TransformHelper        │  VertexHelper       │  BoundingBoxHelper  │
│  │  - Extends Group        │  - Extends Group    │  - Extends Group │   │
│  │  - hitTest(x, y)        │  - hitTest(x, y)    │  - update()      │   │
│  │  - getBoundingInfo()    │  - update()         │  - setTarget()   │   │
│  │  - Pure visualization   │  - Pure visualization                  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Task Checklist

### Phase 1: Two.js BoundingBoxHelper

```bash
# File: two.js/extras/jsm/helpers/BoundingBoxHelper.ts
```

- [ ] **Task 1.1**: Create `BoundingBoxHelper` class extending `Group`
  - Constructor: `(target?, options?)`
  - Properties: `box: Rectangle`, `handles: Points`, `rotationHandle: Group`
  - Options interface: `color`, `linewidth`, `showHandles`, `handleSize`, `handleFill`, `showRotationHandle`, `rotationHandleOffset`

- [ ] **Task 1.2**: Implement `setTarget(target: Shape | Group | Array<Shape | Group>)`
  - Accept single shape, group, or array for multi-selection
  - Store reference internally

- [ ] **Task 1.3**: Implement `update()` method
  - Calculate bounding box using `getBoundingClientRect(true)` for local bounds
  - Update box dimensions and position
  - Update 8 handle positions (4 corners + 4 edges)
  - Update rotation handle position

- [ ] **Task 1.4**: Implement `getBoundingInfo()` method
  - Return: `{ centerX, centerY, width, height, rotation, scaleX, scaleY, corners }`
  - Handle single vs. multi-selection differently
  - Multi-selection returns axis-aligned bounds (rotation = 0)

- [ ] **Task 1.5**: Implement `dispose()` method
  - Clear targets
  - Remove from parent

- [ ] **Task 1.6**: Export as extras module

BoundingBoxHelper is now an optional extra, not part of the core Two.js API.

```javascript
// ESM import:
import { BoundingBoxHelper } from 'two.js/extras/jsm/helpers/bounding-box-helper.js';

// UMD usage (after including script):
// <script src="two.js/extras/js/helpers/bounding-box-helper.js"></script>
const helper = new Two.Helpers.BoundingBoxHelper(shape);
```

---

### Phase 2: Two.js TransformHelper

```bash
# File: two.js/extras/jsm/helpers/TransformHelper.ts
```

- [ ] **Task 2.1**: Create `TransformHelper` extending `BoundingBoxHelper`
  - Additional options: `cornerHitRadius`, `edgeHitRadius`, `rotationHitRadius`

- [ ] **Task 2.2**: Implement `hitTest(worldX, worldY): HitTestResult`
  - Transform world coords to local space (accounting for rotation)
  - Check rotation handle first (if shown)
  - Check corners (within `cornerHitRadius`)
  - Check edges (within `edgeHitRadius`)
  - Check body (inside bounding box)
  - Return `{ handle, cursor, handlePosition }`

- [ ] **Task 2.3**: Implement `_getRotatedCursor(baseCursor, rotation)`
  - Rotate cursor name based on object rotation
  - 8 directional cursors in 45° increments

- [ ] **Task 2.4**: Implement `getOppositeHandle(handle): HandleType`
  - Map: nw↔se, ne↔sw, n↔s, e↔w

- [ ] **Task 2.5**: Implement `getHandlePosition(handle): {x, y} | null`
  - Return world-space coordinates of named handle

- [ ] **Task 2.6**: Add TypeScript types
  ```typescript
  type HandleType = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'rotate' | 'body' | null;
  type CursorType = 'nw-resize' | 'n-resize' | ... | 'alias' | 'grab' | 'default';
  ```

---

### Phase 3: Two.js VertexHelper

```bash
# File: two.js/extras/jsm/helpers/VertexHelper.ts
```

- [ ] **Task 3.1**: Create `VertexHelper` class extending `Group`
  - Constructor: `(target?: Path, options?)`
  - Options: `vertexColor`, `vertexSize`, `handleLineColor`, `handlePointColor`, `handlePointSize`, `showHandles`

- [ ] **Task 3.2**: Implement `setTarget(target: Path | null)`

- [ ] **Task 3.3**: Implement `update()` method
  - Iterate through `target.vertices`
  - Transform each anchor to world space using `worldMatrix`
  - Create/update vertex points
  - Create handle lines and points for each anchor's controls

- [ ] **Task 3.4**: Implement `hitTest(worldX, worldY, radius): VertexHitType`
  - Check control handles first (higher priority)
  - Then check vertices
  - Return `{ type: 'vertex' | 'handleLeft' | 'handleRight', index, position }`

- [ ] **Task 3.5**: Implement `dispose()`

---

### Phase 4: react-two.js usePointerEvents Hook

```bash
# File: react-two.js/lib/helpers/usePointerEvents.ts
```

- [ ] **Task 4.1**: Create `PointerState` interface
  ```typescript
  interface PointerState {
    isDown: boolean;
    startX: number; startY: number;
    currentX: number; currentY: number;
    deltaX: number; deltaY: number;
    shiftKey: boolean; altKey: boolean; ctrlKey: boolean; metaKey: boolean;
  }
  ```

- [ ] **Task 4.2**: Create `usePointerEvents(options)` hook
  - Options: `onPointerDown`, `onPointerMove`, `onPointerUp`, `enabled`
  - Get `two.renderer.domElement` from context
  - Attach `pointerdown` to domElement
  - Attach `pointermove` and `pointerup` to window (for drag outside)
  - Track modifier keys

- [ ] **Task 4.3**: Handle cleanup on unmount

---

### Phase 5: react-two.js TransformControls Component

```bash
# File: react-two.js/lib/helpers/TransformControls.tsx
```

- [ ] **Task 5.1**: Define props interface
  ```typescript
  interface TransformControlsProps {
    target?: Shape | Group | Array<Shape | Group> | null;
    enabled?: boolean;
    mode?: 'translate' | 'rotate' | 'scale' | 'all';
    showRotation?: boolean;
    color?: string;
    onTransformStart?: (target) => void;
    onTransform?: (target) => void;
    onTransformEnd?: (target) => void;
    onCursorChange?: (cursor: string) => void;
  }
  ```

- [ ] **Task 5.2**: Create and manage `TransformHelper` instance
  - Create in `useEffect` with `two` and `parent` deps
  - Add to parent group
  - Dispose on cleanup

- [ ] **Task 5.3**: Update helper target and visibility
  - React to `target` and `enabled` changes

- [ ] **Task 5.4**: Use `useFrame()` to call `helper.update()`

- [ ] **Task 5.5**: Implement drag state management
  ```typescript
  interface DragState {
    mode: 'translate' | 'rotate' | 'scale' | null;
    handle: HandleType;
    anchorPosition: { x, y } | null;
    initialRotation: number;
    initialScale: { x, y };
    initialPosition: { x, y };
    startAngle: number;
  }
  ```

- [ ] **Task 5.6**: Implement translate operation
  - On body drag, move all targets by delta

- [ ] **Task 5.7**: Implement rotate operation
  - Calculate angle from center to mouse
  - Apply delta from start angle
  - Shift key: snap to 15° increments

- [ ] **Task 5.8**: Implement scale operation
  - Calculate scale based on handle and movement
  - Account for rotation when computing delta
  - Shift key: uniform scale
  - Alt key: scale from center

- [ ] **Task 5.9**: Use `usePointerEvents` hook
  - Wire up `handlePointerDown`, `handlePointerMove`, `handlePointerUp`

- [ ] **Task 5.10**: Expose ref with `useImperativeHandle`
  ```typescript
  interface TransformControlsRef {
    helper: TransformHelper | null;
    update: () => void;
    reset: () => void;
  }
  ```

---

### Phase 6: react-two.js VertexEditor Component

```bash
# File: react-two.js/lib/helpers/VertexEditor.tsx
```

- [ ] **Task 6.1**: Define props interface
  ```typescript
  interface VertexEditorProps {
    target?: Path | null;
    enabled?: boolean;
    showHandles?: boolean;
    onVertexChange?: (index, anchor) => void;
    onHandleChange?: (index, handleType, position) => void;
    onSelect?: (index: number | null) => void;
  }
  ```

- [ ] **Task 6.2**: Create and manage `VertexHelper` instance

- [ ] **Task 6.3**: Implement vertex dragging
  - Transform mouse movement to local space using `worldMatrix.inverse()`
  - Update anchor position

- [ ] **Task 6.4**: Implement handle dragging
  - Update `anchor.controls.left` or `anchor.controls.right`
  - Shift key: mirror to opposite handle

- [ ] **Task 6.5**: Implement selection tracking
  - Track selected vertex index
  - Call `onSelect` callback

---

### Phase 7: Exports and Integration

```bash
# File: react-two.js/lib/helpers/index.ts
```

- [ ] **Task 7.1**: Create index file with all exports
  ```typescript
  export { TransformControls } from './TransformControls';
  export { VertexEditor } from './VertexEditor';
  export { usePointerEvents } from './usePointerEvents';
  export type { TransformControlsProps, TransformControlsRef } from './TransformControls';
  export type { VertexEditorProps, VertexEditorRef } from './VertexEditor';
  ```

- [ ] **Task 7.2**: Update `react-two.js/lib/main.ts`
  ```typescript
  export * from './helpers';
  ```

- [ ] **Task 7.3**: Update `two.js/src/two.js` with helper exports

---

### Phase 8: Testing

- [ ] **Task 8.1**: Unit tests for `BoundingBoxHelper.getBoundingInfo()`
  - Single shape with no transform
  - Single shape with rotation
  - Single shape with scale
  - Multiple shapes (axis-aligned bounds)

- [ ] **Task 8.2**: Unit tests for `TransformHelper.hitTest()`
  - Hit corner handles
  - Hit edge handles
  - Hit rotation handle
  - Hit body
  - Miss (outside)

- [ ] **Task 8.3**: Integration tests for `TransformControls`
  - Translate operation
  - Rotate operation with Shift snap
  - Scale operation with uniform constraint

---

### Phase 9: Documentation

- [ ] **Task 9.1**: Create Storybook stories
  - `TransformControls.stories.tsx` with interactive demo
  - `VertexEditor.stories.tsx` with path editing demo

- [ ] **Task 9.2**: Add JSDoc comments to all public APIs

- [ ] **Task 9.3**: Update CLAUDE.md with helper documentation

---

## Usage Examples

### Basic TransformControls

```tsx
import { Canvas, Circle, TransformControls } from 'react-two.js';
import { useRef, useState } from 'react';
import type { RefCircle } from 'react-two.js';

function Editor() {
  const circleRef = useRef<RefCircle>(null);
  const [selected, setSelected] = useState(true);

  return (
    <Canvas width={800} height={600}>
      <Circle 
        ref={circleRef} 
        radius={50} 
        x={400} 
        y={300} 
        fill="coral"
        onClick={() => setSelected(true)}
      />
      
      {selected && (
        <TransformControls
          target={circleRef.current}
          enabled={selected}
          onTransformEnd={() => console.log('Transform complete')}
          onCursorChange={(cursor) => {
            document.body.style.cursor = cursor;
          }}
        />
      )}
    </Canvas>
  );
}
```

### Vertex Editing Mode

```tsx
import { Canvas, Path, TransformControls, VertexEditor } from 'react-two.js';
import { useRef, useState } from 'react';
import type { RefPath } from 'react-two.js';

function PathEditor() {
  const pathRef = useRef<RefPath>(null);
  const [mode, setMode] = useState<'select' | 'edit'>('select');

  return (
    <Canvas 
      width={800} 
      height={600}
      onDoubleClick={() => setMode(m => m === 'select' ? 'edit' : 'select')}
    >
      <Path 
        ref={pathRef}
        vertices={[
          { x: 100, y: 100, controls: { left: { x: -20, y: 0 }, right: { x: 20, y: 0 } } },
          { x: 200, y: 50 },
          { x: 300, y: 100 },
        ]}
        fill="none"
        stroke="black"
        curved
      />
      
      {mode === 'select' && (
        <TransformControls target={pathRef.current} />
      )}
      
      {mode === 'edit' && (
        <VertexEditor 
          target={pathRef.current}
          showHandles={true}
          onVertexChange={(index, anchor) => {
            console.log(`Vertex ${index} moved to`, anchor.x, anchor.y);
          }}
        />
      )}
    </Canvas>
  );
}
```

---

## Key Implementation Notes

### Coordinate Space Transformations

When working with helpers, you'll frequently need to transform between coordinate spaces:

```typescript
// World to Local (for hit testing)
function worldToLocal(worldX: number, worldY: number, target: Shape): { x: number; y: number } {
  const matrix = target.worldMatrix;
  const inverse = matrix.inverse();
  const [localX, localY] = inverse.multiply(worldX, worldY, 1);
  return { x: localX, y: localY };
}

// Local to World (for positioning handles)
function localToWorld(localX: number, localY: number, target: Shape): { x: number; y: number } {
  const matrix = target.worldMatrix;
  const [worldX, worldY] = matrix.multiply(localX, localY, 1);
  return { x: worldX, y: worldY };
}
```

### Bounding Box Calculation

For paths with curved segments, use sampling:

```typescript
function getPathBounds(path: Path): BoundingBox {
  let minX = Infinity, minY = Infinity;
  let maxX = -Infinity, maxY = -Infinity;

  // Sample the path at regular intervals
  for (let t = 0; t <= 1; t += 0.01) {
    const point = path.getPointAt(t);
    minX = Math.min(minX, point.x);
    maxX = Math.max(maxX, point.x);
    minY = Math.min(minY, point.y);
    maxY = Math.max(maxY, point.y);
  }

  return { left: minX, right: maxX, top: minY, bottom: maxY };
}
```

### Rotation-Aware Scaling

When scaling a rotated object, the mouse delta needs to be rotated to match the object's orientation:

```typescript
function rotateVector(dx: number, dy: number, rotation: number): { x: number; y: number } {
  const cos = Math.cos(-rotation);
  const sin = Math.sin(-rotation);
  return {
    x: dx * cos - dy * sin,
    y: dx * sin + dy * cos,
  };
}
```

---

## Performance Considerations

1. **Avoid creating new objects in update loops** - Reuse Vector instances
2. **Use `_update(true)` sparingly** - Only call when transforms change
3. **Batch property updates** - Update all targets in one frame
4. **Cache world matrices** - Avoid recalculating during drag operations
