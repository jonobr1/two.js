# Two.js Helper/Gizmo Implementation Plan

## Executive Summary

This document outlines the implementation plan for a comprehensive helper/gizmo system for Two.js and react-two.js, inspired by Three.js's separation of concerns between visual helpers and interactive controls. The system will enable Figma/Illustrator-style selection, transformation, and vertex editing.

---

## Architecture Philosophy

### Three.js Pattern (Reference)

Three.js separates concerns cleanly:

| Component | Purpose | Event Handling |
|-----------|---------|----------------|
| `BoxHelper` | Visual bounding box display | None - pure visualization |
| `TransformControls` | Interactive manipulation | Built-in dragging, rotation, scaling |
| `VertexNormalsHelper` | Debug visualization | None - pure visualization |

### Our Approach for Two.js

We'll follow the same pattern:

```
┌─────────────────────────────────────────────────────────────────┐
│                        TWO.JS LAYER                             │
│  (Imperative, event-free, pure visualization + calculation)     │
├─────────────────────────────────────────────────────────────────┤
│  BoundingBoxHelper   │  TransformHelper   │  VertexHelper       │
│  - Visual bounds     │  - Handles UI      │  - Anchor points    │
│  - No events         │  - Cursor hints    │  - Bezier handles   │
│  - update() method   │  - Hit detection   │  - No events        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      REACT-TWO.JS LAYER                         │
│      (Declarative, event handling built-in, batteries included) │
├─────────────────────────────────────────────────────────────────┤
│  <TransformControls>  │  <SelectionBox>  │  <VertexEditor>      │
│  - Pointer events     │  - Multi-select  │  - Click/drag verts  │
│  - onChange callback  │  - Box select    │  - Handle editing    │
│  - Keyboard modifiers │  - Lasso select  │  - onVertexChange    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Part 1: Two.js Core Helpers

### 1.1 BoundingBoxHelper

A pure visualization helper that shows the oriented bounding box of target object(s).

```typescript
// two.js/extras/jsm/helpers/BoundingBoxHelper.ts

import Two from 'two.js';
import { Group } from 'two.js/src/group';
import { Shape } from 'two.js/src/shape';
import { Path } from 'two.js/src/path';
import { Rectangle } from 'two.js/src/shapes/rectangle';
import { Points } from 'two.js/src/shapes/points';
import { getComputedMatrix } from 'two.js/src/utils/math';

export interface BoundingBoxHelperOptions {
  /** Stroke color for the bounding box */
  color?: string;
  /** Line width for the bounding box */
  linewidth?: number;
  /** Show corner handles */
  showHandles?: boolean;
  /** Handle size in pixels */
  handleSize?: number;
  /** Handle fill color */
  handleFill?: string;
  /** Show rotation handle */
  showRotationHandle?: boolean;
  /** Distance of rotation handle from top edge */
  rotationHandleOffset?: number;
}

export interface BoundingBoxInfo {
  /** Center X in world space */
  centerX: number;
  /** Center Y in world space */
  centerY: number;
  /** Width of bounds (before rotation) */
  width: number;
  /** Height of bounds (before rotation) */
  height: number;
  /** Rotation in radians */
  rotation: number;
  /** Scale X */
  scaleX: number;
  /** Scale Y */
  scaleY: number;
  /** Corner positions in world space [nw, ne, se, sw] */
  corners: Array<{ x: number; y: number }>;
}

export class BoundingBoxHelper extends Group {
  /** The target object(s) being visualized */
  private _targets: Array<Shape | Group> = [];
  
  /** The bounding box rectangle */
  public box: Rectangle;
  
  /** Corner handle points */
  public handles: Points;
  
  /** Rotation handle group */
  public rotationHandle: Group;
  
  /** Options */
  private _options: Required<BoundingBoxHelperOptions>;

  constructor(
    target?: Shape | Group | Array<Shape | Group>,
    options: BoundingBoxHelperOptions = {}
  ) {
    super();

    this._options = {
      color: options.color ?? '#00AEFF',
      linewidth: options.linewidth ?? 1,
      showHandles: options.showHandles ?? true,
      handleSize: options.handleSize ?? 8,
      handleFill: options.handleFill ?? '#00AEFF',
      showRotationHandle: options.showRotationHandle ?? true,
      rotationHandleOffset: options.rotationHandleOffset ?? 20,
    };

    // Create bounding box rectangle
    this.box = new Two.Rectangle(0, 0, 0, 0);
    this.box.stroke = this._options.color;
    this.box.linewidth = this._options.linewidth;
    this.box.noFill();

    // Create corner handles (8 points: 4 corners + 4 edge midpoints)
    this.handles = new Two.Points([
      new Two.Vector(), // NW
      new Two.Vector(), // N (top center)
      new Two.Vector(), // NE
      new Two.Vector(), // E (right center)
      new Two.Vector(), // SE
      new Two.Vector(), // S (bottom center)
      new Two.Vector(), // SW
      new Two.Vector(), // W (left center)
    ]);
    this.handles.size = this._options.handleSize;
    this.handles.fill = this._options.handleFill;
    this.handles.noStroke();
    this.handles.visible = this._options.showHandles;

    // Create rotation handle
    this.rotationHandle = new Two.Group();
    const rotLine = new Two.Line(0, 0, 0, -this._options.rotationHandleOffset);
    rotLine.stroke = this._options.color;
    rotLine.linewidth = this._options.linewidth;
    
    const rotCircle = new Two.Circle(0, -this._options.rotationHandleOffset, 5);
    rotCircle.fill = this._options.handleFill;
    rotCircle.noStroke();
    
    this.rotationHandle.add(rotLine, rotCircle);
    this.rotationHandle.visible = this._options.showRotationHandle;

    this.add(this.box, this.handles, this.rotationHandle);

    // Set initial target
    if (target) {
      this.setTarget(target);
    }
  }

  /**
   * Set the target object(s) for the bounding box
   */
  setTarget(target: Shape | Group | Array<Shape | Group>): this {
    this._targets = Array.isArray(target) ? target : [target];
    this.update();
    return this;
  }

  /**
   * Get current targets
   */
  get targets(): Array<Shape | Group> {
    return this._targets;
  }

  /**
   * Update the bounding box visualization
   * Call this in your animation loop or when targets change
   */
  update(): this {
    if (this._targets.length === 0) {
      this.visible = false;
      return this;
    }

    this.visible = true;
    const info = this.getBoundingInfo();

    // Update box dimensions
    this.box.width = info.width;
    this.box.height = info.height;

    // Update group position and rotation to match target
    this.position.set(info.centerX, info.centerY);
    this.rotation = info.rotation;

    // Update handle positions (in local space)
    const hw = info.width / 2;
    const hh = info.height / 2;

    const verts = this.handles.vertices;
    verts[0].set(-hw, -hh); // NW
    verts[1].set(0, -hh);    // N
    verts[2].set(hw, -hh);   // NE
    verts[3].set(hw, 0);     // E
    verts[4].set(hw, hh);    // SE
    verts[5].set(0, hh);     // S
    verts[6].set(-hw, hh);   // SW
    verts[7].set(-hw, 0);    // W

    // Update rotation handle position
    this.rotationHandle.position.set(0, -hh);

    return this;
  }

  /**
   * Get comprehensive bounding information
   */
  getBoundingInfo(): BoundingBoxInfo {
    if (this._targets.length === 0) {
      return {
        centerX: 0, centerY: 0,
        width: 0, height: 0,
        rotation: 0,
        scaleX: 1, scaleY: 1,
        corners: [],
      };
    }

    // For single target, use its transform directly
    if (this._targets.length === 1) {
      return this._getSingleTargetInfo(this._targets[0]);
    }

    // For multiple targets, compute combined bounds
    return this._getMultiTargetInfo(this._targets);
  }

  private _getSingleTargetInfo(target: Shape | Group): BoundingBoxInfo {
    // Get local bounds (before world transform)
    const rect = target.getBoundingClientRect(true);
    
    const position = target.position || { x: 0, y: 0 };
    const rotation = typeof target.rotation === 'number' ? target.rotation : 0;
    const scale = target.scale;
    const scaleX = typeof scale === 'number' ? scale : (scale?.x ?? 1);
    const scaleY = typeof scale === 'number' ? scale : (scale?.y ?? 1);

    const width = rect.width;
    const height = rect.height;

    // Calculate corners in world space
    const hw = width / 2;
    const hh = height / 2;
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);

    const corners = [
      { x: -hw, y: -hh }, // NW
      { x: hw, y: -hh },  // NE
      { x: hw, y: hh },   // SE
      { x: -hw, y: hh },  // SW
    ].map(({ x, y }) => ({
      x: position.x + (x * cos - y * sin),
      y: position.y + (x * sin + y * cos),
    }));

    return {
      centerX: position.x,
      centerY: position.y,
      width,
      height,
      rotation,
      scaleX,
      scaleY,
      corners,
    };
  }

  private _getMultiTargetInfo(targets: Array<Shape | Group>): BoundingBoxInfo {
    // Get world-space AABB of all targets
    let minX = Infinity, minY = Infinity;
    let maxX = -Infinity, maxY = -Infinity;

    for (const target of targets) {
      const rect = target.getBoundingClientRect(false); // world space
      minX = Math.min(minX, rect.left);
      minY = Math.min(minY, rect.top);
      maxX = Math.max(maxX, rect.right);
      maxY = Math.max(maxY, rect.bottom);
    }

    const width = maxX - minX;
    const height = maxY - minY;
    const centerX = minX + width / 2;
    const centerY = minY + height / 2;

    return {
      centerX,
      centerY,
      width,
      height,
      rotation: 0, // Multi-select uses axis-aligned box
      scaleX: 1,
      scaleY: 1,
      corners: [
        { x: minX, y: minY },
        { x: maxX, y: minY },
        { x: maxX, y: maxY },
        { x: minX, y: maxY },
      ],
    };
  }

  /**
   * Dispose of the helper
   */
  dispose(): this {
    this._targets = [];
    if (this.parent) {
      this.parent.remove(this);
    }
    return this;
  }
}
```

### 1.2 TransformHelper

Extends BoundingBoxHelper with hit detection and cursor information for building interactive controls.

```typescript
// two.js/extras/jsm/helpers/TransformHelper.ts

import { BoundingBoxHelper, BoundingBoxHelperOptions } from './BoundingBoxHelper';
import { Shape } from 'two.js/src/shape';
import { Group } from 'two.js/src/group';
import { Vector } from 'two.js/src/vector';
import { getComputedMatrix } from 'two.js/src/utils/math';

export type HandleType = 
  | 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w'  // Resize handles
  | 'rotate'     // Rotation handle
  | 'body'       // Inside the box (translate)
  | null;        // Outside

export type CursorType = 
  | 'nw-resize' | 'n-resize' | 'ne-resize' | 'e-resize'
  | 'se-resize' | 's-resize' | 'sw-resize' | 'w-resize'
  | 'alias'     // Rotation cursor
  | 'grab' | 'grabbing'
  | 'default';

export interface HitTestResult {
  /** What part of the control was hit */
  handle: HandleType;
  /** Suggested cursor for this handle */
  cursor: CursorType;
  /** The handle's position in world space (for corner/edge handles) */
  handlePosition?: { x: number; y: number };
}

export interface TransformHelperOptions extends BoundingBoxHelperOptions {
  /** Hit radius for corner handles */
  cornerHitRadius?: number;
  /** Hit radius for edge handles */
  edgeHitRadius?: number;
  /** Hit radius for rotation handle */
  rotationHitRadius?: number;
}

export class TransformHelper extends BoundingBoxHelper {
  private _transformOptions: Required<TransformHelperOptions>;

  constructor(
    target?: Shape | Group | Array<Shape | Group>,
    options: TransformHelperOptions = {}
  ) {
    super(target, options);

    this._transformOptions = {
      color: options.color ?? '#00AEFF',
      linewidth: options.linewidth ?? 1,
      showHandles: options.showHandles ?? true,
      handleSize: options.handleSize ?? 8,
      handleFill: options.handleFill ?? '#00AEFF',
      showRotationHandle: options.showRotationHandle ?? true,
      rotationHandleOffset: options.rotationHandleOffset ?? 20,
      cornerHitRadius: options.cornerHitRadius ?? 10,
      edgeHitRadius: options.edgeHitRadius ?? 20,
      rotationHitRadius: options.rotationHitRadius ?? 15,
    };
  }

  /**
   * Test what part of the helper is at the given point (world coordinates)
   */
  hitTest(worldX: number, worldY: number): HitTestResult {
    if (this.targets.length === 0 || !this.visible) {
      return { handle: null, cursor: 'default' };
    }

    const info = this.getBoundingInfo();
    
    // Transform point to local space of the helper
    const localPoint = this._worldToLocal(worldX, worldY, info);

    const hw = info.width / 2;
    const hh = info.height / 2;

    // Check rotation handle first (highest priority)
    if (this._transformOptions.showRotationHandle) {
      const rotDist = Math.sqrt(
        localPoint.x ** 2 + 
        (localPoint.y + hh + this._transformOptions.rotationHandleOffset) ** 2
      );
      if (rotDist < this._transformOptions.rotationHitRadius) {
        return { 
          handle: 'rotate', 
          cursor: 'alias',
          handlePosition: this._localToWorld(0, -hh - this._transformOptions.rotationHandleOffset, info),
        };
      }
    }

    // Check corner handles (priority over edge handles)
    const corners: Array<{ name: HandleType; x: number; y: number; cursor: CursorType }> = [
      { name: 'nw', x: -hw, y: -hh, cursor: 'nw-resize' },
      { name: 'ne', x: hw, y: -hh, cursor: 'ne-resize' },
      { name: 'se', x: hw, y: hh, cursor: 'se-resize' },
      { name: 'sw', x: -hw, y: hh, cursor: 'sw-resize' },
    ];

    for (const corner of corners) {
      const dist = Math.sqrt(
        (localPoint.x - corner.x) ** 2 + 
        (localPoint.y - corner.y) ** 2
      );
      if (dist < this._transformOptions.cornerHitRadius) {
        return { 
          handle: corner.name, 
          cursor: this._getRotatedCursor(corner.cursor, info.rotation),
          handlePosition: this._localToWorld(corner.x, corner.y, info),
        };
      }
    }

    // Check edge handles
    const edges: Array<{ name: HandleType; x: number; y: number; cursor: CursorType }> = [
      { name: 'n', x: 0, y: -hh, cursor: 'n-resize' },
      { name: 'e', x: hw, y: 0, cursor: 'e-resize' },
      { name: 's', x: 0, y: hh, cursor: 's-resize' },
      { name: 'w', x: -hw, y: 0, cursor: 'w-resize' },
    ];

    for (const edge of edges) {
      const dist = Math.sqrt(
        (localPoint.x - edge.x) ** 2 + 
        (localPoint.y - edge.y) ** 2
      );
      if (dist < this._transformOptions.edgeHitRadius) {
        return { 
          handle: edge.name, 
          cursor: this._getRotatedCursor(edge.cursor, info.rotation),
          handlePosition: this._localToWorld(edge.x, edge.y, info),
        };
      }
    }

    // Check if inside the box (for translate)
    if (
      localPoint.x >= -hw && localPoint.x <= hw &&
      localPoint.y >= -hh && localPoint.y <= hh
    ) {
      return { handle: 'body', cursor: 'grab' };
    }

    return { handle: null, cursor: 'default' };
  }

  /**
   * Get the opposite handle for anchor-based scaling
   */
  getOppositeHandle(handle: HandleType): HandleType {
    const opposites: Record<string, HandleType> = {
      nw: 'se', ne: 'sw', se: 'nw', sw: 'ne',
      n: 's', s: 'n', e: 'w', w: 'e',
    };
    return opposites[handle as string] ?? null;
  }

  /**
   * Get handle position in world coordinates
   */
  getHandlePosition(handle: HandleType): { x: number; y: number } | null {
    if (!handle || handle === 'body') return null;

    const info = this.getBoundingInfo();
    const hw = info.width / 2;
    const hh = info.height / 2;

    const positions: Record<string, { x: number; y: number }> = {
      nw: { x: -hw, y: -hh },
      n: { x: 0, y: -hh },
      ne: { x: hw, y: -hh },
      e: { x: hw, y: 0 },
      se: { x: hw, y: hh },
      s: { x: 0, y: hh },
      sw: { x: -hw, y: hh },
      w: { x: -hw, y: 0 },
      rotate: { x: 0, y: -hh - this._transformOptions.rotationHandleOffset },
    };

    const local = positions[handle];
    if (!local) return null;

    return this._localToWorld(local.x, local.y, info);
  }

  private _worldToLocal(
    worldX: number, 
    worldY: number, 
    info: ReturnType<typeof this.getBoundingInfo>
  ): { x: number; y: number } {
    // Translate to center
    const dx = worldX - info.centerX;
    const dy = worldY - info.centerY;

    // Rotate back
    const cos = Math.cos(-info.rotation);
    const sin = Math.sin(-info.rotation);

    return {
      x: dx * cos - dy * sin,
      y: dx * sin + dy * cos,
    };
  }

  private _localToWorld(
    localX: number, 
    localY: number, 
    info: ReturnType<typeof this.getBoundingInfo>
  ): { x: number; y: number } {
    const cos = Math.cos(info.rotation);
    const sin = Math.sin(info.rotation);

    return {
      x: info.centerX + (localX * cos - localY * sin),
      y: info.centerY + (localX * sin + localY * cos),
    };
  }

  private _getRotatedCursor(baseCursor: CursorType, rotation: number): CursorType {
    // Adjust cursor based on rotation (in 45-degree increments)
    const cursors: CursorType[] = [
      'n-resize', 'ne-resize', 'e-resize', 'se-resize',
      's-resize', 'sw-resize', 'w-resize', 'nw-resize',
    ];

    const cursorIndex = cursors.indexOf(baseCursor);
    if (cursorIndex === -1) return baseCursor;

    // Convert rotation to cursor offset (each cursor covers 45 degrees)
    const offset = Math.round((rotation * 180 / Math.PI) / 45) % 8;
    const newIndex = (cursorIndex + offset + 8) % 8;

    return cursors[newIndex];
  }
}
```

### 1.3 VertexHelper

Visualizes path vertices and their bezier control handles.

```typescript
// two.js/extras/jsm/helpers/VertexHelper.ts

import Two from 'two.js';
import { Group } from 'two.js/src/group';
import { Path } from 'two.js/src/path';
import { Points } from 'two.js/src/shapes/points';
import { Line } from 'two.js/src/shapes/line';
import { Anchor } from 'two.js/src/anchor';
import { Vector } from 'two.js/src/vector';
import { getComputedMatrix } from 'two.js/src/utils/math';

export interface VertexHelperOptions {
  /** Color for vertex points */
  vertexColor?: string;
  /** Size of vertex points */
  vertexSize?: number;
  /** Color for control handle lines */
  handleLineColor?: string;
  /** Color for control handle points */
  handlePointColor?: string;
  /** Size of control handle points */
  handlePointSize?: number;
  /** Show control handles */
  showHandles?: boolean;
}

export type VertexHitType = 
  | { type: 'vertex'; index: number; position: Vector }
  | { type: 'handleLeft'; index: number; position: Vector }
  | { type: 'handleRight'; index: number; position: Vector }
  | null;

export class VertexHelper extends Group {
  private _target: Path | null = null;
  private _options: Required<VertexHelperOptions>;

  /** Visual representation of vertices */
  public vertexPoints: Points;

  /** Groups containing handle lines and points for each vertex */
  public handleGroups: Group[] = [];

  constructor(target?: Path, options: VertexHelperOptions = {}) {
    super();

    this._options = {
      vertexColor: options.vertexColor ?? '#FF6B6B',
      vertexSize: options.vertexSize ?? 8,
      handleLineColor: options.handleLineColor ?? '#4ECDC4',
      handlePointColor: options.handlePointColor ?? '#4ECDC4',
      handlePointSize: options.handlePointSize ?? 6,
      showHandles: options.showHandles ?? true,
    };

    // Create vertex points (will be populated on update)
    this.vertexPoints = new Two.Points([]);
    this.vertexPoints.fill = this._options.vertexColor;
    this.vertexPoints.size = this._options.vertexSize;
    this.vertexPoints.noStroke();
    this.add(this.vertexPoints);

    if (target) {
      this.setTarget(target);
    }
  }

  /**
   * Set the target path
   */
  setTarget(target: Path | null): this {
    this._target = target;
    this.update();
    return this;
  }

  /**
   * Get current target
   */
  get target(): Path | null {
    return this._target;
  }

  /**
   * Update the helper visualization
   */
  update(): this {
    if (!this._target) {
      this.visible = false;
      return this;
    }

    this.visible = true;
    const vertices = this._target.vertices;
    const matrix = this._target.worldMatrix;

    // Update vertex points
    while (this.vertexPoints.vertices.length < vertices.length) {
      this.vertexPoints.vertices.push(new Two.Vector());
    }
    while (this.vertexPoints.vertices.length > vertices.length) {
      this.vertexPoints.vertices.pop();
    }

    // Clear old handle groups
    for (const group of this.handleGroups) {
      this.remove(group);
    }
    this.handleGroups = [];

    // Update each vertex position and create handle visualizations
    for (let i = 0; i < vertices.length; i++) {
      const anchor = vertices[i] as Anchor;
      
      // Transform vertex to world space
      const [worldX, worldY] = matrix.multiply(anchor.x, anchor.y, 1);
      this.vertexPoints.vertices[i].set(worldX, worldY);

      // Create handle visualization if this anchor has controls
      if (this._options.showHandles && anchor.controls) {
        const handleGroup = this._createHandleGroup(anchor, matrix, worldX, worldY);
        if (handleGroup) {
          this.handleGroups.push(handleGroup);
          this.add(handleGroup);
        }
      }
    }

    return this;
  }

  private _createHandleGroup(
    anchor: Anchor, 
    matrix: Two.Matrix,
    anchorWorldX: number,
    anchorWorldY: number
  ): Group | null {
    const left = anchor.controls?.left;
    const right = anchor.controls?.right;

    if (!left && !right) return null;

    const group = new Two.Group();

    if (left && (left.x !== 0 || left.y !== 0)) {
      // Left control handle
      const [leftWorldX, leftWorldY] = matrix.multiply(
        anchor.x + left.x, 
        anchor.y + left.y, 
        1
      );

      const leftLine = new Two.Line(anchorWorldX, anchorWorldY, leftWorldX, leftWorldY);
      leftLine.stroke = this._options.handleLineColor;
      leftLine.linewidth = 1;

      const leftPoint = new Two.Circle(leftWorldX, leftWorldY, this._options.handlePointSize / 2);
      leftPoint.fill = this._options.handlePointColor;
      leftPoint.noStroke();

      group.add(leftLine, leftPoint);
    }

    if (right && (right.x !== 0 || right.y !== 0)) {
      // Right control handle
      const [rightWorldX, rightWorldY] = matrix.multiply(
        anchor.x + right.x, 
        anchor.y + right.y, 
        1
      );

      const rightLine = new Two.Line(anchorWorldX, anchorWorldY, rightWorldX, rightWorldY);
      rightLine.stroke = this._options.handleLineColor;
      rightLine.linewidth = 1;

      const rightPoint = new Two.Circle(rightWorldX, rightWorldY, this._options.handlePointSize / 2);
      rightPoint.fill = this._options.handlePointColor;
      rightPoint.noStroke();

      group.add(rightLine, rightPoint);
    }

    return group.children.length > 0 ? group : null;
  }

  /**
   * Hit test for vertices and control handles
   */
  hitTest(worldX: number, worldY: number, radius: number = 10): VertexHitType {
    if (!this._target) return null;

    const vertices = this._target.vertices;
    const matrix = this._target.worldMatrix;
    const radiusSq = radius * radius;

    for (let i = 0; i < vertices.length; i++) {
      const anchor = vertices[i] as Anchor;
      const [vx, vy] = matrix.multiply(anchor.x, anchor.y, 1);

      // Check control handles first (higher priority for precise editing)
      if (anchor.controls) {
        const left = anchor.controls.left;
        const right = anchor.controls.right;

        if (left && (left.x !== 0 || left.y !== 0)) {
          const [lx, ly] = matrix.multiply(anchor.x + left.x, anchor.y + left.y, 1);
          if ((worldX - lx) ** 2 + (worldY - ly) ** 2 < radiusSq) {
            return { 
              type: 'handleLeft', 
              index: i, 
              position: new Two.Vector(lx, ly) 
            };
          }
        }

        if (right && (right.x !== 0 || right.y !== 0)) {
          const [rx, ry] = matrix.multiply(anchor.x + right.x, anchor.y + right.y, 1);
          if ((worldX - rx) ** 2 + (worldY - ry) ** 2 < radiusSq) {
            return { 
              type: 'handleRight', 
              index: i, 
              position: new Two.Vector(rx, ry) 
            };
          }
        }
      }

      // Check vertex
      if ((worldX - vx) ** 2 + (worldY - vy) ** 2 < radiusSq) {
        return { 
          type: 'vertex', 
          index: i, 
          position: new Two.Vector(vx, vy) 
        };
      }
    }

    return null;
  }

  /**
   * Dispose of the helper
   */
  dispose(): this {
    this._target = null;
    for (const group of this.handleGroups) {
      this.remove(group);
    }
    this.handleGroups = [];
    if (this.parent) {
      this.parent.remove(this);
    }
    return this;
  }
}
```

---

## Part 2: React-Two.js Components

### 2.1 Event Infrastructure

Create a shared event management system:

```typescript
// react-two.js/lib/helpers/usePointerEvents.ts

import { useCallback, useEffect, useRef } from 'react';
import { useTwo } from '../Context';

export interface PointerState {
  isDown: boolean;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  deltaX: number;
  deltaY: number;
  shiftKey: boolean;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
}

export interface UsePointerEventsOptions {
  onPointerDown?: (state: PointerState, event: PointerEvent) => void;
  onPointerMove?: (state: PointerState, event: PointerEvent) => void;
  onPointerUp?: (state: PointerState, event: PointerEvent) => void;
  /** Only trigger events when this returns true */
  enabled?: boolean | (() => boolean);
}

export function usePointerEvents(options: UsePointerEventsOptions) {
  const { two } = useTwo();
  const stateRef = useRef<PointerState>({
    isDown: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    deltaX: 0,
    deltaY: 0,
    shiftKey: false,
    altKey: false,
    ctrlKey: false,
    metaKey: false,
  });

  const optionsRef = useRef(options);
  optionsRef.current = options;

  const isEnabled = useCallback(() => {
    const { enabled } = optionsRef.current;
    if (enabled === undefined) return true;
    if (typeof enabled === 'function') return enabled();
    return enabled;
  }, []);

  useEffect(() => {
    if (!two) return;

    const domElement = two.renderer.domElement;

    const updateModifiers = (e: PointerEvent) => {
      stateRef.current.shiftKey = e.shiftKey;
      stateRef.current.altKey = e.altKey;
      stateRef.current.ctrlKey = e.ctrlKey;
      stateRef.current.metaKey = e.metaKey;
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (!isEnabled()) return;

      stateRef.current.isDown = true;
      stateRef.current.startX = e.clientX;
      stateRef.current.startY = e.clientY;
      stateRef.current.currentX = e.clientX;
      stateRef.current.currentY = e.clientY;
      stateRef.current.deltaX = 0;
      stateRef.current.deltaY = 0;
      updateModifiers(e);

      optionsRef.current.onPointerDown?.(stateRef.current, e);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isEnabled()) return;

      const prevX = stateRef.current.currentX;
      const prevY = stateRef.current.currentY;

      stateRef.current.currentX = e.clientX;
      stateRef.current.currentY = e.clientY;
      stateRef.current.deltaX = e.clientX - prevX;
      stateRef.current.deltaY = e.clientY - prevY;
      updateModifiers(e);

      optionsRef.current.onPointerMove?.(stateRef.current, e);
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!isEnabled()) return;

      stateRef.current.isDown = false;
      updateModifiers(e);

      optionsRef.current.onPointerUp?.(stateRef.current, e);
    };

    domElement.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      domElement.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [two, isEnabled]);

  return stateRef;
}
```

### 2.2 TransformControls Component

The main React component for selection and transformation:

```typescript
// react-two.js/lib/helpers/TransformControls.tsx

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import Two from 'two.js';
import type { Shape } from 'two.js/src/shape';
import type { Group } from 'two.js/src/group';

import { useTwo, useFrame } from '../Context';
import { TransformHelper, HandleType, HitTestResult } from './TransformHelper';
import { usePointerEvents, PointerState } from './usePointerEvents';

export interface TransformControlsProps {
  /** Target shape(s) to control */
  target?: Shape | Group | Array<Shape | Group> | null;
  
  /** Enable/disable the controls */
  enabled?: boolean;
  
  /** Transform mode */
  mode?: 'translate' | 'rotate' | 'scale' | 'all';
  
  /** Show rotation handle */
  showRotation?: boolean;
  
  /** Color for the bounding box */
  color?: string;
  
  /** Callback when transform starts */
  onTransformStart?: (target: Shape | Group | Array<Shape | Group>) => void;
  
  /** Callback during transform */
  onTransform?: (target: Shape | Group | Array<Shape | Group>) => void;
  
  /** Callback when transform ends */
  onTransformEnd?: (target: Shape | Group | Array<Shape | Group>) => void;
  
  /** Callback for cursor changes */
  onCursorChange?: (cursor: string) => void;
}

export interface TransformControlsRef {
  /** The underlying TransformHelper instance */
  helper: TransformHelper | null;
  /** Force update the controls */
  update: () => void;
  /** Reset to initial state */
  reset: () => void;
}

interface DragState {
  mode: 'translate' | 'rotate' | 'scale' | null;
  handle: HandleType;
  anchorPosition: { x: number; y: number } | null;
  initialRotation: number;
  initialScale: { x: number; y: number };
  initialPosition: { x: number; y: number };
  startAngle: number;
}

export const TransformControls = forwardRef<TransformControlsRef, TransformControlsProps>(
  (
    {
      target,
      enabled = true,
      mode = 'all',
      showRotation = true,
      color = '#00AEFF',
      onTransformStart,
      onTransform,
      onTransformEnd,
      onCursorChange,
    },
    ref
  ) => {
    const { two, parent } = useTwo();
    const helperRef = useRef<TransformHelper | null>(null);
    const dragStateRef = useRef<DragState>({
      mode: null,
      handle: null,
      anchorPosition: null,
      initialRotation: 0,
      initialScale: { x: 1, y: 1 },
      initialPosition: { x: 0, y: 0 },
      startAngle: 0,
    });

    // Create helper instance
    useEffect(() => {
      if (!two || !parent) return;

      const helper = new TransformHelper(undefined, {
        color,
        showRotationHandle: showRotation,
      });

      parent.add(helper);
      helperRef.current = helper;

      return () => {
        helper.dispose();
        helperRef.current = null;
      };
    }, [two, parent, color, showRotation]);

    // Update target
    useEffect(() => {
      if (!helperRef.current) return;

      if (target) {
        helperRef.current.setTarget(target);
        helperRef.current.visible = enabled;
      } else {
        helperRef.current.visible = false;
      }
    }, [target, enabled]);

    // Update helper on each frame
    useFrame(() => {
      helperRef.current?.update();
    });

    // Get primary target for transforms
    const getPrimaryTarget = useCallback((): Shape | Group | null => {
      if (!target) return null;
      return Array.isArray(target) ? target[0] : target;
    }, [target]);

    // Handle pointer down
    const handlePointerDown = useCallback(
      (state: PointerState, event: PointerEvent) => {
        if (!helperRef.current || !target || !enabled) return;

        const hit = helperRef.current.hitTest(event.clientX, event.clientY);
        if (!hit.handle) return;

        const primaryTarget = getPrimaryTarget();
        if (!primaryTarget) return;

        // Determine drag mode based on handle and allowed modes
        let dragMode: 'translate' | 'rotate' | 'scale' | null = null;

        if (hit.handle === 'body') {
          dragMode = mode === 'all' || mode === 'translate' ? 'translate' : null;
        } else if (hit.handle === 'rotate') {
          dragMode = mode === 'all' || mode === 'rotate' ? 'rotate' : null;
        } else {
          dragMode = mode === 'all' || mode === 'scale' ? 'scale' : null;
        }

        if (!dragMode) return;

        // Store initial state
        const scale = primaryTarget.scale;
        dragStateRef.current = {
          mode: dragMode,
          handle: hit.handle,
          anchorPosition: hit.handle !== 'body' && hit.handle !== 'rotate'
            ? helperRef.current.getHandlePosition(
                helperRef.current.getOppositeHandle(hit.handle)
              )
            : null,
          initialRotation: primaryTarget.rotation ?? 0,
          initialScale: {
            x: typeof scale === 'number' ? scale : (scale?.x ?? 1),
            y: typeof scale === 'number' ? scale : (scale?.y ?? 1),
          },
          initialPosition: {
            x: primaryTarget.position?.x ?? 0,
            y: primaryTarget.position?.y ?? 0,
          },
          startAngle: Math.atan2(
            event.clientY - (primaryTarget.position?.y ?? 0),
            event.clientX - (primaryTarget.position?.x ?? 0)
          ),
        };

        onTransformStart?.(target);
        onCursorChange?.(hit.handle === 'body' ? 'grabbing' : hit.cursor);
      },
      [target, enabled, mode, getPrimaryTarget, onTransformStart, onCursorChange]
    );

    // Handle pointer move
    const handlePointerMove = useCallback(
      (state: PointerState, event: PointerEvent) => {
        if (!helperRef.current || !target) return;

        const dragState = dragStateRef.current;

        // If not dragging, just update cursor
        if (!state.isDown || !dragState.mode) {
          const hit = helperRef.current.hitTest(event.clientX, event.clientY);
          onCursorChange?.(hit.cursor);
          return;
        }

        const primaryTarget = getPrimaryTarget();
        if (!primaryTarget) return;

        const targets = Array.isArray(target) ? target : [target];

        switch (dragState.mode) {
          case 'translate': {
            // Move all targets by delta
            for (const t of targets) {
              if (t.position) {
                t.position.x += state.deltaX;
                t.position.y += state.deltaY;
              }
            }
            break;
          }

          case 'rotate': {
            // Calculate rotation based on angle from center
            const currentAngle = Math.atan2(
              event.clientY - dragState.initialPosition.y,
              event.clientX - dragState.initialPosition.x
            );
            const deltaAngle = currentAngle - dragState.startAngle;
            
            // Constrain to 15-degree increments with Shift
            let newRotation = dragState.initialRotation + deltaAngle;
            if (state.shiftKey) {
              const increment = Math.PI / 12; // 15 degrees
              newRotation = Math.round(newRotation / increment) * increment;
            }

            for (const t of targets) {
              t.rotation = newRotation;
            }
            break;
          }

          case 'scale': {
            // Scale from anchor point
            const handle = dragState.handle;
            const anchor = dragState.anchorPosition;
            
            if (!anchor) break;

            // Calculate scale based on distance from anchor
            const dx = event.clientX - state.startX;
            const dy = event.clientY - state.startY;

            // Rotate delta to account for object rotation
            const rotation = primaryTarget.rotation ?? 0;
            const cos = Math.cos(-rotation);
            const sin = Math.sin(-rotation);
            const rotatedDx = dx * cos - dy * sin;
            const rotatedDy = dx * sin + dy * cos;

            // Calculate scale factors based on handle
            let scaleX = dragState.initialScale.x;
            let scaleY = dragState.initialScale.y;

            const info = helperRef.current.getBoundingInfo();
            const initialWidth = info.width / dragState.initialScale.x;
            const initialHeight = info.height / dragState.initialScale.y;

            // Horizontal scaling
            if (['e', 'ne', 'se'].includes(handle as string)) {
              scaleX = dragState.initialScale.x + (rotatedDx / initialWidth);
            } else if (['w', 'nw', 'sw'].includes(handle as string)) {
              scaleX = dragState.initialScale.x - (rotatedDx / initialWidth);
            }

            // Vertical scaling
            if (['s', 'se', 'sw'].includes(handle as string)) {
              scaleY = dragState.initialScale.y + (rotatedDy / initialHeight);
            } else if (['n', 'ne', 'nw'].includes(handle as string)) {
              scaleY = dragState.initialScale.y - (rotatedDy / initialHeight);
            }

            // Uniform scale with Shift
            if (state.shiftKey) {
              const uniformScale = Math.max(Math.abs(scaleX), Math.abs(scaleY));
              scaleX = Math.sign(scaleX) * uniformScale;
              scaleY = Math.sign(scaleY) * uniformScale;
            }

            // Apply scale (alt for center scaling)
            for (const t of targets) {
              if (typeof t.scale === 'number') {
                t.scale = Math.max(scaleX, scaleY);
              } else if (t.scale) {
                t.scale.x = scaleX;
                t.scale.y = scaleY;
              }

              // Adjust position for anchor-based scaling (unless Alt is held)
              if (!state.altKey && t.position) {
                // TODO: Calculate proper position offset for anchor-based scaling
              }
            }
            break;
          }
        }

        onTransform?.(target);
      },
      [target, getPrimaryTarget, onTransform, onCursorChange]
    );

    // Handle pointer up
    const handlePointerUp = useCallback(
      (state: PointerState, event: PointerEvent) => {
        if (dragStateRef.current.mode && target) {
          onTransformEnd?.(target);
        }

        dragStateRef.current = {
          mode: null,
          handle: null,
          anchorPosition: null,
          initialRotation: 0,
          initialScale: { x: 1, y: 1 },
          initialPosition: { x: 0, y: 0 },
          startAngle: 0,
        };

        onCursorChange?.('default');
      },
      [target, onTransformEnd, onCursorChange]
    );

    // Register pointer events
    usePointerEvents({
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      enabled,
    });

    // Expose ref
    useImperativeHandle(
      ref,
      () => ({
        helper: helperRef.current,
        update: () => helperRef.current?.update(),
        reset: () => {
          dragStateRef.current = {
            mode: null,
            handle: null,
            anchorPosition: null,
            initialRotation: 0,
            initialScale: { x: 1, y: 1 },
            initialPosition: { x: 0, y: 0 },
            startAngle: 0,
          };
        },
      }),
      []
    );

    return null; // No visual output - helper renders directly to Two.js
  }
);

TransformControls.displayName = 'TransformControls';
```

### 2.3 VertexEditor Component

For editing path vertices and bezier handles:

```typescript
// react-two.js/lib/helpers/VertexEditor.tsx

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import Two from 'two.js';
import type { Path } from 'two.js/src/path';
import type { Anchor } from 'two.js/src/anchor';

import { useTwo, useFrame } from '../Context';
import { VertexHelper, VertexHitType } from './VertexHelper';
import { usePointerEvents, PointerState } from './usePointerEvents';

export interface VertexEditorProps {
  /** Target path to edit */
  target?: Path | null;
  
  /** Enable/disable the editor */
  enabled?: boolean;
  
  /** Show bezier control handles */
  showHandles?: boolean;
  
  /** Callback when a vertex is moved */
  onVertexChange?: (index: number, anchor: Anchor) => void;
  
  /** Callback when a handle is moved */
  onHandleChange?: (
    index: number, 
    handleType: 'left' | 'right', 
    position: { x: number; y: number }
  ) => void;
  
  /** Callback for vertex selection */
  onSelect?: (index: number | null) => void;
}

export interface VertexEditorRef {
  /** The underlying VertexHelper instance */
  helper: VertexHelper | null;
  /** Force update */
  update: () => void;
  /** Currently selected vertex index */
  selectedIndex: number | null;
}

interface DragState {
  type: 'vertex' | 'handleLeft' | 'handleRight' | null;
  index: number;
  initialPosition: { x: number; y: number };
}

export const VertexEditor = forwardRef<VertexEditorRef, VertexEditorProps>(
  (
    {
      target,
      enabled = true,
      showHandles = true,
      onVertexChange,
      onHandleChange,
      onSelect,
    },
    ref
  ) => {
    const { two, parent } = useTwo();
    const helperRef = useRef<VertexHelper | null>(null);
    const selectedIndexRef = useRef<number | null>(null);
    const dragStateRef = useRef<DragState>({
      type: null,
      index: -1,
      initialPosition: { x: 0, y: 0 },
    });

    // Create helper
    useEffect(() => {
      if (!two || !parent) return;

      const helper = new VertexHelper(undefined, { showHandles });
      parent.add(helper);
      helperRef.current = helper;

      return () => {
        helper.dispose();
        helperRef.current = null;
      };
    }, [two, parent, showHandles]);

    // Update target
    useEffect(() => {
      if (!helperRef.current) return;

      if (target) {
        helperRef.current.setTarget(target);
        helperRef.current.visible = enabled;
      } else {
        helperRef.current.visible = false;
      }
    }, [target, enabled]);

    // Update on each frame
    useFrame(() => {
      helperRef.current?.update();
    });

    // Handle pointer down
    const handlePointerDown = useCallback(
      (state: PointerState, event: PointerEvent) => {
        if (!helperRef.current || !target || !enabled) return;

        const hit = helperRef.current.hitTest(event.clientX, event.clientY);

        if (hit) {
          selectedIndexRef.current = hit.index;
          onSelect?.(hit.index);

          const anchor = target.vertices[hit.index] as Anchor;

          dragStateRef.current = {
            type: hit.type,
            index: hit.index,
            initialPosition: {
              x: hit.type === 'vertex' 
                ? anchor.x 
                : hit.type === 'handleLeft'
                  ? anchor.controls?.left?.x ?? 0
                  : anchor.controls?.right?.x ?? 0,
              y: hit.type === 'vertex'
                ? anchor.y
                : hit.type === 'handleLeft'
                  ? anchor.controls?.left?.y ?? 0
                  : anchor.controls?.right?.y ?? 0,
            },
          };
        } else {
          selectedIndexRef.current = null;
          onSelect?.(null);
        }
      },
      [target, enabled, onSelect]
    );

    // Handle pointer move
    const handlePointerMove = useCallback(
      (state: PointerState, event: PointerEvent) => {
        if (!state.isDown || !target || !enabled) return;

        const dragState = dragStateRef.current;
        if (!dragState.type) return;

        const anchor = target.vertices[dragState.index] as Anchor;
        if (!anchor) return;

        // Calculate delta in local space
        const worldMatrix = target.worldMatrix;
        const inverse = worldMatrix.inverse();
        
        // Transform movement to local coordinates
        const [startLocalX, startLocalY] = inverse.multiply(state.startX, state.startY, 1);
        const [currentLocalX, currentLocalY] = inverse.multiply(state.currentX, state.currentY, 1);
        const localDeltaX = currentLocalX - startLocalX;
        const localDeltaY = currentLocalY - startLocalY;

        switch (dragState.type) {
          case 'vertex': {
            anchor.x = dragState.initialPosition.x + localDeltaX;
            anchor.y = dragState.initialPosition.y + localDeltaY;
            onVertexChange?.(dragState.index, anchor);
            break;
          }

          case 'handleLeft': {
            if (anchor.controls?.left) {
              anchor.controls.left.x = dragState.initialPosition.x + localDeltaX;
              anchor.controls.left.y = dragState.initialPosition.y + localDeltaY;

              // Mirror to right handle with Shift
              if (state.shiftKey && anchor.controls.right) {
                anchor.controls.right.x = -anchor.controls.left.x;
                anchor.controls.right.y = -anchor.controls.left.y;
              }

              onHandleChange?.(dragState.index, 'left', {
                x: anchor.controls.left.x,
                y: anchor.controls.left.y,
              });
            }
            break;
          }

          case 'handleRight': {
            if (anchor.controls?.right) {
              anchor.controls.right.x = dragState.initialPosition.x + localDeltaX;
              anchor.controls.right.y = dragState.initialPosition.y + localDeltaY;

              // Mirror to left handle with Shift
              if (state.shiftKey && anchor.controls.left) {
                anchor.controls.left.x = -anchor.controls.right.x;
                anchor.controls.left.y = -anchor.controls.right.y;
              }

              onHandleChange?.(dragState.index, 'right', {
                x: anchor.controls.right.x,
                y: anchor.controls.right.y,
              });
            }
            break;
          }
        }
      },
      [target, enabled, onVertexChange, onHandleChange]
    );

    // Handle pointer up
    const handlePointerUp = useCallback(() => {
      dragStateRef.current = {
        type: null,
        index: -1,
        initialPosition: { x: 0, y: 0 },
      };
    }, []);

    // Register pointer events
    usePointerEvents({
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      enabled,
    });

    // Expose ref
    useImperativeHandle(
      ref,
      () => ({
        helper: helperRef.current,
        update: () => helperRef.current?.update(),
        get selectedIndex() {
          return selectedIndexRef.current;
        },
      }),
      []
    );

    return null;
  }
);

VertexEditor.displayName = 'VertexEditor';
```

---

## Part 3: File Structure

```
two.js/
└── extras/
    ├── js/                          # UMD versions (browser globals)
    │   └── helpers/
    │       ├── bounding-box-helper.js    # UMD wrapper
    │       ├── transform-helper.js       # Phase 2
    │       └── vertex-helper.js          # Phase 3
    └── jsm/                         # ESM versions (modern imports)
        └── helpers/
            ├── bounding-box-helper.js    # Pure ESM
            ├── bounding-box-helper.d.ts  # TypeScript definitions
            ├── transform-helper.js       # Phase 2
            ├── transform-helper.d.ts     # Phase 2 types
            ├── vertex-helper.js          # Phase 3
            └── vertex-helper.d.ts        # Phase 3 types

react-two.js/
└── lib/
    ├── helpers/
    │   ├── index.ts                 # Export all helper components
    │   ├── usePointerEvents.ts      # Shared pointer event hook
    │   ├── TransformControls.tsx    # Full selection/transform controls
    │   ├── VertexEditor.tsx         # Path vertex editing
    │   ├── SelectionBox.tsx         # Multi-select box (future)
    │   └── types.ts                 # Shared TypeScript types
    └── main.ts                      # Add helper exports
```

---

## Part 4: API Reference

### Two.js Helpers

```typescript
// BoundingBoxHelper - Pure visualization
const helper = new BoundingBoxHelper(shape, {
  color: '#00AEFF',
  showHandles: true,
  showRotationHandle: true,
});
two.add(helper);
two.bind('update', () => helper.update());

// TransformHelper - Adds hit detection
const helper = new TransformHelper(shape);
const hit = helper.hitTest(mouseX, mouseY);
// hit.handle: 'nw' | 'n' | 'ne' | ... | 'rotate' | 'body' | null
// hit.cursor: 'nw-resize' | ... | 'grab' | 'default'

// VertexHelper - Path editing visualization
const helper = new VertexHelper(path, { showHandles: true });
const hit = helper.hitTest(mouseX, mouseY);
// hit.type: 'vertex' | 'handleLeft' | 'handleRight'
// hit.index: number
```

### React-Two.js Components

```tsx
// TransformControls - Full interactive controls
<Canvas>
  <Circle ref={circleRef} radius={50} x={100} y={100} />
  <TransformControls
    target={circleRef.current}
    enabled={isSelected}
    mode="all" // 'translate' | 'rotate' | 'scale' | 'all'
    onTransformStart={(target) => console.log('Start', target)}
    onTransform={(target) => console.log('Transforming', target)}
    onTransformEnd={(target) => console.log('End', target)}
    onCursorChange={(cursor) => (document.body.style.cursor = cursor)}
  />
</Canvas>

// VertexEditor - Path vertex editing (double-click mode)
<Canvas>
  <Path ref={pathRef} vertices={vertices} />
  {isEditMode && (
    <VertexEditor
      target={pathRef.current}
      showHandles={true}
      onVertexChange={(index, anchor) => console.log('Vertex moved', index)}
      onHandleChange={(index, type, pos) => console.log('Handle moved', type)}
    />
  )}
</Canvas>
```

---

## Part 5: Implementation Phases

### Phase 1: Core Infrastructure (Week 1)
- [ ] BoundingBoxHelper class for Two.js
- [ ] Basic update loop integration
- [ ] Unit tests for bounding calculations

### Phase 2: TransformHelper (Week 1-2)
- [ ] Hit detection for handles
- [ ] Cursor type calculation
- [ ] Rotation-aware cursor adjustment

### Phase 3: React TransformControls (Week 2)
- [ ] usePointerEvents hook
- [ ] TransformControls component
- [ ] Translate, rotate, scale operations
- [ ] Modifier key support (Shift, Alt)

### Phase 4: VertexHelper & Editor (Week 2-3)
- [ ] VertexHelper visualization
- [ ] Bezier handle rendering
- [ ] VertexEditor component
- [ ] Handle mirroring with Shift

### Phase 5: Polish & Documentation (Week 3)
- [ ] Storybook examples
- [ ] TypeDoc documentation
- [ ] Performance optimization
- [ ] Multi-selection support

---

## Part 6: Key Recommendations

### Separation of Concerns

1. **Two.js helpers should be stateless** - They compute and visualize but don't manage state
2. **React components handle events** - All pointer/keyboard logic lives in React layer
3. **Callbacks for external state** - Use `onTransform*` callbacks, don't force internal state management

### Following the CodePen Pattern

The provided CodePen demonstrates key techniques:

1. **Bounding box calculation via sampling**:
   ```javascript
   for (var i = 0; i < 1; i += 0.01) {
     var v = path.getPointAt(i);
     minX = Math.min(minX, v.x * path.scale.x);
     // ...
   }
   ```

2. **Matrix-aware hit testing**:
   ```javascript
   var matrix = Two.Utils.getComputedMatrix(object);
   var tl = matrix.multiply(v.x, v.y, 1);
   ```

3. **Rotation-adjusted scaling**:
   ```javascript
   if (path.rotation !== 0) {
     const cos = Math.cos(-path.rotation);
     const sin = Math.sin(-path.rotation);
     // Rotate delta to match object orientation
   }
   ```

### Three.js-Style API

Following Three.js patterns:

1. **Constructor takes target + options**:
   ```typescript
   new TransformHelper(mesh, { color: 'cyan' });
   ```

2. **Methods return `this` for chaining**:
   ```typescript
   helper.setTarget(shape).update();
   ```

3. **Dispose pattern for cleanup**:
   ```typescript
   helper.dispose();
   ```

---

## Conclusion

This implementation plan provides a complete roadmap for building a professional-grade helper/gizmo system for Two.js and react-two.js. The architecture follows industry patterns from Three.js while adapting to the unique requirements of 2D vector graphics editing.

Key differentiators:
- Clean separation between visualization (Two.js) and interaction (React)
- Full TypeScript support with comprehensive types
- Figma/Illustrator-style UX with modifier key support
- Extensible design for future features (multi-select, snap-to-grid, etc.)
