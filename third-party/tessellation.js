/*
 * Tessellation is a revised JavaScript port of poly2tri optimized for
 * use with two.js.
 *
 * @author jonobr1 / http://jonobr1.com
 *
 * poly2tri Copyright (c) 2009-2010, poly2tri Contributors
 * http://code.google.com/p/poly2tri/
 * All rights reserved.
 *
 */

(function() {

  // Export closured variables.

  var root = this;
  previousTessellation = root.tessellation,
  tessellation = root.tessellation = {
    noConflict: function() {
      root.tessellation = previousTessellation;
      return this;
    }
  };


  /**
   * Utility functions for Vectors.
   */

  /**
   * Compare two Two.Vectors component-wise.
   * @param   a   Two.Vector object.
   * @param   b   Two.Vector object.
   * @return <code>-1</code> if <code>a &lt; b</code>, <code>1</code> if
   *     <code>a &gt; b</code>, <code>0</code> otherwise.
   */
  tessellation.cmp = function(a, b) {
    if (a.y == b.y) {
      return a.x - b.x;
    } else {
      return a.y - b.y;
    }
  };

  /**
   * Test two Two.Vector objects for equality.
   * @param   a   Two.Vector object.
   * @param   b   Two.Vector object.
   * @return <code>True</code> if <code>a == b</code>, <code>false</code> otherwise.
   */
  tessellation.equals = function(a, b) {
    return a.x == b.x && a.y == b.y;
  };


  /**
   * Edge
   */
  tessellation.Edge = function() {

    this.p = null;
    this.q = null;

    if (arguments.length == 2) {
      if (arguments[0].y > arguments[1].y) {
        this.q = arguments[0];
        this.p = arguments[1];
      } else if (arguments[0].y == arguments[1].y) {
        if (arguments[0].x > arguments[1].x) {
          this.q = arguments[0];
          this.p = arguments[1];
        } else if (arguments[0].x == arguments[1].x) {
          alert('Invalid tessellation.edge constructor call: repeated points!');
        } else {
          this.p = arguments[0];
          this.q = arguments[1];
        }
      } else {
        this.p = arguments[0];
        this.q = arguments[1];
      }
    } else {
      alert('Invalid tessellation.Edge constructor call!');
    }

    if (this.p && !_.isArray(this.p.edges)) {
      this.p.edges = [];
    }
    if (this.q && !_.isArray(this.q.edges)) {
      this.q.edges = [];
    }

    this.q.edges.push(this);
  };

  /**
   * Triangle<br>
   * Triangle-based data structures are known to have better performance than
   * quad-edge structures.
   * See: J. Shewchuk, "Triangle: Engineering a 2D Quality Mesh Generator and
   * Delaunay Triangulator", "Triangulations in CGAL"
   * 
   * @param   p1  Two.Vector object.
   * @param   p2  Two.Vector object.
   * @param   p3  Two.Vector object.
   */
  tessellation.Triangle = function(p1, p2, p3) {
    // Triangle points
    this.points = [ null, null, null ];
    // Neighbor list
    this.neighbors = [ null, null, null ];
    // Has this triangle been marked as an interior triangle?
    this.interior = false;
    // Flags to determine if an edge is a Constrained edge
    this.constrained_edge = [ false, false, false ];
    // Flags to determine if an edge is a Delauney edge
    this.delaunay_edge = [ false, false, false ];

    if (arguments.length == 3) {
      this.points[0] = p1;
      this.points[1] = p2;
      this.points[2] = p3;
    }
  };

  tessellation.Triangle.prototype.GetPoint = function(index) {
    return this.points[index];
  };

  tessellation.Triangle.prototype.GetNeighbor = function(index) {
    return this.neighbors[index];
  };

  /**
   * Test if this Triangle contains the Two.Vector objects given as parameters as its
   * vertices.
   * @return <code>True</code> if the Two.Vector objects are of the Triangle's vertices,
   *     <code>false</code> otherwise.
   */
  tessellation.Triangle.prototype.ContainsP = function() {
    var back = true;
    for (var aidx=0; aidx < arguments.length; ++aidx) {
      back = back && (arguments[aidx].equals(this.points[0]) ||
              arguments[aidx].equals(this.points[1]) ||
              arguments[aidx].equals(this.points[2])
      );
    }
    return back;
  };

  /**
   * Test if this Triangle contains the Edge objects given as parameters as its
   * bounding edges.
   * @return <code>True</code> if the Edge objects are of the Triangle's bounding
   *     edges, <code>false</code> otherwise.
   */
  tessellation.Triangle.prototype.ContainsE = function() {
    var back = true;
    for (var aidx=0; aidx < arguments.length; ++aidx) {
      back = back && this.ContainsP(arguments[aidx].p, arguments[aidx].q);
    }
    return back;
  };

  tessellation.Triangle.prototype.IsInterior = function() {
    if (arguments.length == 0) {
      return this.interior;
    } else {
      this.interior = arguments[0];
      return this.interior;
    }
  };

  /**
   * Update neighbor pointers.<br>
   * This method takes either 3 parameters (<code>p1</code>, <code>p2</code> and
   * <code>t</code>) or 1 parameter (<code>t</code>).
   * @param   p1  Two.Vector object.
   * @param   p2  Two.Vector object.
   * @param   t   Triangle object.
   */
  tessellation.Triangle.prototype.MarkNeighbor = function() {
    var t;
    if (arguments.length == 3) {
      var p1 = arguments[0];
      var p2 = arguments[1];
      t = arguments[2];

      if ((p1.equals(this.points[2]) && p2.equals(this.points[1])) || (p1.equals(this.points[1]) && p2.equals(this.points[2]))) this.neighbors[0] = t;
      else if ((p1.equals(this.points[0]) && p2.equals(this.points[2])) || (p1.equals(this.points[2]) && p2.equals(this.points[0]))) this.neighbors[1] = t;
      else if ((p1.equals(this.points[0]) && p2.equals(this.points[1])) || (p1.equals(this.points[1]) && p2.equals(this.points[0]))) this.neighbors[2] = t;
      else alert('Invalid tessellation.Triangle.MarkNeighbor call (1)!');
    } else if (arguments.length == 1) {
      // exhaustive search to update neighbor pointers
      t = arguments[0];
      if (t.ContainsP(this.points[1], this.points[2])) {
        this.neighbors[0] = t;
        t.MarkNeighbor(this.points[1], this.points[2], this);
      } else if (t.ContainsP(this.points[0], this.points[2])) {
        this.neighbors[1] = t;
        t.MarkNeighbor(this.points[0], this.points[2], this);
      } else if (t.ContainsP(this.points[0], this.points[1])) {
        this.neighbors[2] = t;
        t.MarkNeighbor(this.points[0], this.points[1], this);
      }
    } else {
      alert('Invalid tessellation.Triangle.MarkNeighbor call! (2)');
    }
  };

  tessellation.Triangle.prototype.ClearNeigbors = function() {
    this.neighbors[0] = null;
    this.neighbors[1] = null;
    this.neighbors[2] = null;
  };

  tessellation.Triangle.prototype.ClearDelunayEdges = function() {
    this.delaunay_edge[0] = false;
    this.delaunay_edge[1] = false;
    this.delaunay_edge[2] = false;
  };

  /**
   * Return the Two.Vector clockwise to the given Two.Vector.
   */
  tessellation.Triangle.prototype.PointCW = function(p) {
    if (p.equals(this.points[0])) {
      return this.points[2];
    } else if (p.equals(this.points[1])) {
      return this.points[0];
    } else if (p.equals(this.points[2])) {
      return this.points[1];
    } else {
      return null;
    }
  };

  /**
   * Return the Two.Vector counter-clockwise to the given Two.Vector.
   */
  tessellation.Triangle.prototype.PointCCW = function(p) {
    if (p.equals(this.points[0])) {
      return this.points[1];
    } else if (p.equals(this.points[1])) {
      return this.points[2];
    } else if (p.equals(this.points[2])) {
      return this.points[0];
    } else {
      return null;
    }
  };

  /**
   * Return the neighbor clockwise to given Two.Vector.
   */
  tessellation.Triangle.prototype.NeighborCW = function(p) {
    if (p.equals(this.points[0])) {
      return this.neighbors[1];
    } else if (p.equals(this.points[1])) {
      return this.neighbors[2];
    } else {
      return this.neighbors[0];
    }
  };

  /**
   * Return the neighbor counter-clockwise to given Two.Vector.
   */
  tessellation.Triangle.prototype.NeighborCCW = function(p) {
    if (p.equals(this.points[0])) {
      return this.neighbors[2];
    } else if (p.equals(this.points[1])) {
      return this.neighbors[0];
    } else {
      return this.neighbors[1];
    }
  };

  tessellation.Triangle.prototype.GetConstrainedEdgeCW = function(p) {
    if (p.equals(this.points[0])) {
      return this.constrained_edge[1];
    } else if (p.equals(this.points[1])) {
      return this.constrained_edge[2];
    } else {
      return this.constrained_edge[0];
    }
  };

  tessellation.Triangle.prototype.GetConstrainedEdgeCCW = function(p) {
    if (p.equals(this.points[0])) {
      return this.constrained_edge[2];
    } else if (p.equals(this.points[1])) {
      return this.constrained_edge[0];
    } else {
      return this.constrained_edge[1];
    }
  };

  tessellation.Triangle.prototype.SetConstrainedEdgeCW = function(p, ce) {
    if (p.equals(this.points[0])) {
      this.constrained_edge[1] = ce;
    } else if (p.equals(this.points[1])) {
      this.constrained_edge[2] = ce;
    } else {
      this.constrained_edge[0] = ce;
    }
  };

  tessellation.Triangle.prototype.SetConstrainedEdgeCCW = function(p, ce) {
    if (p.equals(this.points[0])) {
      this.constrained_edge[2] = ce;
    } else if (p.equals(this.points[1])) {
      this.constrained_edge[0] = ce;
    } else {
      this.constrained_edge[1] = ce;
    }
  };

  tessellation.Triangle.prototype.GetDelaunayEdgeCW = function(p) {
    if (p.equals(this.points[0])) {
      return this.delaunay_edge[1];
    } else if (p.equals(this.points[1])) {
      return this.delaunay_edge[2];
    } else {
      return this.delaunay_edge[0];
    }
  };

  tessellation.Triangle.prototype.GetDelaunayEdgeCCW = function(p) {
    if (p.equals(this.points[0])) {
      return this.delaunay_edge[2];
    } else if (p.equals(this.points[1])) {
      return this.delaunay_edge[0];
    } else {
      return this.delaunay_edge[1];
    }
  };

  tessellation.Triangle.prototype.SetDelaunayEdgeCW = function(p, e) {
    if (p.equals(this.points[0])) {
      this.delaunay_edge[1] = e;
    } else if (p.equals(this.points[1])) {
      this.delaunay_edge[2] = e;
    } else {
      this.delaunay_edge[0] = e;
    }
  };

  tessellation.Triangle.prototype.SetDelaunayEdgeCCW = function(p, e) {
    if (p.equals(this.points[0])) {
      this.delaunay_edge[2] = e;
    } else if (p.equals(this.points[1])) {
      this.delaunay_edge[0] = e;
    } else {
      this.delaunay_edge[1] = e;
    }
  };

  /**
   * The neighbor across to given point.
   */
  tessellation.Triangle.prototype.NeighborAcross = function(p) {
    if (p.equals(this.points[0])) {
      return this.neighbors[0];
    } else if (p.equals(this.points[1])) {
      return this.neighbors[1];
    } else {
      return this.neighbors[2];
    }
  };

  tessellation.Triangle.prototype.OppositePoint = function(t, p) {
    var cw = t.PointCW(p);
    return this.PointCW(cw);
  };

  /**
   * Legalize triangle by rotating clockwise.<br>
   * This method takes either 1 parameter (then the triangle is rotated around
   * points(0)) or 2 parameters (then the triangle is rotated around the first
   * parameter).
   */
  tessellation.Triangle.prototype.Legalize = function() {
    if (arguments.length == 1) {
      this.Legalize(this.points[0], arguments[0]);
    } else if (arguments.length == 2) {
      var opoint = arguments[0];
      var npoint = arguments[1];

      if (opoint.equals(this.points[0])) {
        this.points[1] = this.points[0];
        this.points[0] = this.points[2];
        this.points[2] = npoint;
      } else if (opoint.equals(this.points[1])) {
        this.points[2] = this.points[1];
        this.points[1] = this.points[0];
        this.points[0] = npoint;
      } else if (opoint.equals(this.points[2])) {
        this.points[0] = this.points[2];
        this.points[2] = this.points[1];
        this.points[1] = npoint;
      } else {
        alert('Invalid tessellation.Triangle.Legalize call!');
      }
    } else {
      alert('Invalid tessellation.Triangle.Legalize call!');
    }
  };

  tessellation.Triangle.prototype.Index = function(p) {
    if (p.equals(this.points[0])) return 0;
    else if (p.equals(this.points[1])) return 1;
    else if (p.equals(this.points[2])) return 2;
    else return -1;
  };

  tessellation.Triangle.prototype.EdgeIndex = function(p1, p2) {
    if (p1.equals(this.points[0])) {
      if (p2.equals(this.points[1])) {
        return 2;
      } else if (p2.equals(this.points[2])) {
        return 1;
      }
    } else if (p1.equals(this.points[1])) {
      if (p2.equals(this.points[2])) {
        return 0;
      } else if (p2.equals(this.points[0])) {
        return 2;
      }
    } else if (p1.equals(this.points[2])) {
      if (p2.equals(this.points[0])) {
        return 1;
      } else if (p2.equals(this.points[1])) {
        return 0;
      }
    }
    return -1;
  };

  /**
   * Mark an edge of this triangle as constrained.<br>
   * This method takes either 1 parameter (an edge index or an Edge instance) or
   * 2 parameters (two Two.Vector instances defining the edge of the triangle).
   */
  tessellation.Triangle.prototype.MarkConstrainedEdge = function() {
    if (arguments.length == 1) {
      if (typeof(arguments[0]) == 'number') {
        this.constrained_edge[arguments[0]] = true;
      } else {
        this.MarkConstrainedEdge(arguments[0].p, arguments[0].q);
      }
    } else if (arguments.length == 2) {
      var p = arguments[0];
      var q = arguments[1];
      if ((q.equals(this.points[0]) && p.equals(this.points[1])) || (q.equals(this.points[1]) && p.equals(this.points[0]))) {
        this.constrained_edge[2] = true;
      } else if ((q.equals(this.points[0]) && p.equals(this.points[2])) || (q.equals(this.points[2]) && p.equals(this.points[0]))) {
        this.constrained_edge[1] = true;
      } else if ((q.equals(this.points[1]) && p.equals(this.points[2])) || (q.equals(this.points[2]) && p.equals(this.points[1]))) {
        this.constrained_edge[0] = true;
      }
    } else {
      alert('Invalid tessellation.Triangle.MarkConstrainedEdge call!');
    }
  };

  /**
   * Utils
   */
  tessellation.PI_3div4 = 3 * Math.PI / 4;
  tessellation.PI_2 = Math.PI / 2;
  tessellation.EPSILON = 1e-12;

  /* 
   * Inital triangle factor, seed triangle will extend 30% of
   * PointSet width to both left and right.
   */
  tessellation.kAlpha = 0.3;

  tessellation.Orientation = {
    "CW"      : 1,
    "CCW"     : -1,
    "COLLINEAR" : 0
  };

  /**
   * Forumla to calculate signed area<br>
   * Positive if CCW<br>
   * Negative if CW<br>
   * 0 if collinear<br>
   * <pre>
   * A[P1,P2,P3]  =  (x1*y2 - y1*x2) + (x2*y3 - y2*x3) + (x3*y1 - y3*x1)
   *        =  (x1-x3)*(y2-y3) - (y1-y3)*(x2-x3)
   * </pre>
   */
  tessellation.Orient2d = function(pa, pb, pc) {
    var detleft = (pa.x - pc.x) * (pb.y - pc.y);
    var detright = (pa.y - pc.y) * (pb.x - pc.x);
    var val = detleft - detright;
    if (val > -(tessellation.EPSILON) && val < (tessellation.EPSILON)) {
      return tessellation.Orientation.COLLINEAR;
    } else if (val > 0) {
      return tessellation.Orientation.CCW;
    } else {
      return tessellation.Orientation.CW;
    }
  };

  tessellation.InScanArea = function(pa, pb, pc, pd) {
    var pdx = pd.x;
    var pdy = pd.y;
    var adx = pa.x - pdx;
    var ady = pa.y - pdy;
    var bdx = pb.x - pdx;
    var bdy = pb.y - pdy;

    var adxbdy = adx * bdy;
    var bdxady = bdx * ady;
    var oabd = adxbdy - bdxady;

    if (oabd <= (tessellation.EPSILON)) {
      return false;
    }

    var cdx = pc.x - pdx;
    var cdy = pc.y - pdy;

    var cdxady = cdx * ady;
    var adxcdy = adx * cdy;
    var ocad = cdxady - adxcdy;

    if (ocad <= (tessellation.EPSILON)) {
      return false;
    }

    return true;
  };

  tessellation.Node = function() {
    this.point = null; // Point
    this.triangle = null; // Triangle

    this.next = null; // Node
    this.prev = null; // Node

    this.value = 0.0; // double

    if (arguments.length == 1) {
      this.point = arguments[0];
      this.value = this.point.x;
    } else if (arguments.length == 2) {
      this.point = arguments[0];
      this.triangle = arguments[1];
      this.value = this.point.x;
    } else {
      alert('Invalid tessellation.Node constructor call!');
    }
  };

  /**
   * Advancing Front
   */
  tessellation.AdvancingFront = function(head, tail) {
    this.head = head; // Node
    this.tail = tail; // Node
    this.search_node = head; // Node
  };

  tessellation.AdvancingFront.prototype.search = function() {
    return this.search_node;
  };

  tessellation.AdvancingFront.prototype.set_search = function(node) {
    this.search_node = node;
  };

  tessellation.AdvancingFront.prototype.FindSearchNode = function(x) {
    return this.search_node;
  };

  tessellation.AdvancingFront.prototype.LocateNode = function(x) {
    var node = this.search_node;

    if (x < node.value) {
      while ((node = node.prev) != null) {
        if (x >= node.value) {
          this.search_node = node;
          return node;
        }
      }
    } else {
      while ((node = node.next) != null) {
        if (x < node.value) {
          this.search_node = node.prev;
          return node.prev;
        }
      }
    }
    return null;
  };

  tessellation.AdvancingFront.prototype.LocatePoint = function(point) {
    var px = point.x;
    var node = this.FindSearchNode(px);
    var nx = node.point.x;

    if (px == nx) {
      // We might have two nodes with same x value for a short time
      if (node.prev && point.equals(node.prev.point)) {
        node = node.prev;
      } else if (node.next && point.equals(node.next.point)) {
        node = node.next;
      } else if (point.equals(node.point)) {
        // do nothing
      } else {
        alert('Invalid tessellation.AdvancingFront.LocatePoint call!');
        return null;
      }
    } else if (px < nx) {
      while ((node = node.prev) != null) {
        if (point.equals(node.point)) break;
      }
    } else {
      while ((node = node.next) != null) {
        if (point.equals(node.point)) break;
      }
    }

    if (node != null) this.search_node = node;
    return node;
  };

  /**
   * Basin
   */
  tessellation.Basin = function() {
    this.left_node = null; // Node
    this.bottom_node = null; // Node
    this.right_node = null; // Node
    this.width = 0.0; // number
    this.left_highest = false;
  };

  tessellation.Basin.prototype.Clear = function() {
    this.left_node = null;
    this.bottom_node = null;
    this.right_node = null;
    this.width = 0.0;
    this.left_highest = false;
  };

  /**
   * EdgeEvent
   */
  tessellation.EdgeEvent = function() {
    this.constrained_edge = null; // Edge
    this.right = false;
  };

  /**
   * SweepContext
   */
  tessellation.SweepContext = function(polyline) {
    this.triangles = [];
    this.map = [];
    this.points = polyline;
    this.edges = [];

    // Advancing front
    this.front = null; // AdvancingFront
    // head point used with advancing front
    this.head = null; // Point
    // tail point used with advancing front
    this.tail = null; // Point

    this.af_head = null; // Node
    this.af_middle_ = null; // Node
    this.af_tail = null; // Node

    this.basin = new tessellation.Basin();
    this.edge_event = new tessellation.EdgeEvent();

    this.InitEdges(this.points);
  };

  tessellation.SweepContext.prototype.AddHole = function(polyline) {
    this.InitEdges(polyline);
    for (var i in polyline) {
      this.points.push(polyline[i]);
    }
  };

  tessellation.SweepContext.prototype.point_count = function() {
    return this.points.length;
  };

  tessellation.SweepContext.prototype.GetTriangles = function() {
    return this.triangles;
  };

  tessellation.SweepContext.prototype.GetMap = function() {
    return this.map;
  };

  tessellation.SweepContext.prototype.InitTriangulation = function() {
    var xmax = this.points[0].x;
    var xmin = this.points[0].x;
    var ymax = this.points[0].y;
    var ymin = this.points[0].y;

    // Calculate bounds
    for (var i in this.points) {
      var p = this.points[i];
      if (p.x > xmax) xmax = p.x;
      if (p.x < xmin) xmin = p.x;
      if (p.y > ymax) ymax = p.y;
      if (p.y < ymin) ymin = p.y;
    }

    var dx = tessellation.kAlpha * (xmax - xmin);
    var dy = tessellation.kAlpha * (ymax - ymin);
    this.head = new Two.Vector(xmax + dx, ymin - dy);
    this.tail = new Two.Vector(xmin - dy, ymin - dy);

    // Sort points along y-axis
    this.points.sort(tessellation.cmp);
  };

  tessellation.SweepContext.prototype.InitEdges = function(polyline) {
    for (var i=0; i < polyline.length; ++i) {
      this.edges.push(new tessellation.Edge(polyline[i], polyline[(i+1) % polyline.length]));
    }
  };

  tessellation.SweepContext.prototype.GetPoint = function(index) {
    return this.points[index];
  };

  tessellation.SweepContext.prototype.AddToMap = function(triangle) {
    this.map.push(triangle);
  };

  tessellation.SweepContext.prototype.LocateNode = function(point) {
    return this.front.LocateNode(point.x);
  };

  tessellation.SweepContext.prototype.CreateAdvancingFront = function() {
    var head;
    var middle;
    var tail;
    // Initial triangle
    var triangle = new tessellation.Triangle(this.points[0], this.tail, this.head);

    this.map.push(triangle);

    head = new tessellation.Node(triangle.GetPoint(1), triangle);
    middle = new tessellation.Node(triangle.GetPoint(0), triangle);
    tail = new tessellation.Node(triangle.GetPoint(2));

    this.front = new tessellation.AdvancingFront(head, tail);

    head.next = middle;
    middle.next = tail;
    middle.prev = head;
    tail.prev = middle;

  };

  tessellation.SweepContext.prototype.RemoveNode = function(node) {
    // do nothing
  };

  tessellation.SweepContext.prototype.MapTriangleToNodes = function(t) {
    for (var i=0; i<3; ++i) {
      if (t.GetNeighbor(i) == null) {
        var n = this.front.LocatePoint(t.PointCW(t.GetPoint(i)));
        if (n != null) {
          n.triangle = t;
        }
      }
    }
  };

  tessellation.SweepContext.prototype.RemoveFromMap = function(triangle) {
    for (var i in this.map) {
      if (this.map[i] == triangle) {
        delete this.map[i];
        break;
      }
    }
  };

  tessellation.SweepContext.prototype.MeshClean = function(triangle) {
    if (triangle != null && !triangle.IsInterior()) {
      triangle.IsInterior(true);
      this.triangles.push(triangle);
      for (var i=0; i<3; ++i) {
        if (!triangle.constrained_edge[i]) {
          this.MeshClean(triangle.GetNeighbor(i));
        }
      }
    }
  };

  /**
   * sweep
   */
  tessellation.sweep = {};

  /**
   * Triangulate simple polygon with holes.
   * @param   tcx SweepContext object.
   */
  tessellation.sweep.Triangulate = function(tcx) {
    tcx.InitTriangulation();
    tcx.CreateAdvancingFront();
    // Sweep points; build mesh
    tessellation.sweep.SweepPoints(tcx);
    // Clean up
    tessellation.sweep.FinalizationPolygon(tcx);
  };

  tessellation.sweep.SweepPoints = function(tcx) {
    for (var i=1; i < tcx.point_count(); ++i) {
      var point = tcx.GetPoint(i);
      var node = tessellation.sweep.PointEvent(tcx, point);
      for (var j=0; j < point.edges.length; ++j) {
        tessellation.sweep.EdgeEvent(tcx, point.edges[j], node);
      }
    }
  };

  tessellation.sweep.FinalizationPolygon = function(tcx) {
    // Get an Internal triangle to start with
    var t = tcx.front.head.next.triangle;
    var p = tcx.front.head.next.point;
    while (!t.GetConstrainedEdgeCW(p)) {
      t = t.NeighborCCW(p);
    }

    // Collect interior triangles constrained by edges
    tcx.MeshClean(t);
  };

  /**
   * Find closes node to the left of the new Two.Vector and
   * create a new triangle. If needed new holes and basins
   * will be filled to.
   */
  tessellation.sweep.PointEvent = function(tcx, point) {
    var node = tcx.LocateNode(point);
    var new_node = tessellation.sweep.NewFrontTriangle(tcx, point, node);

    // Only need to check +epsilon since Two.Vector never have smaller
    // x value than node due to how we fetch nodes from the front
    if (point.x <= node.point.x + (tessellation.EPSILON)) {
      tessellation.sweep.Fill(tcx, node);
    }

    //tcx.AddNode(new_node);

    tessellation.sweep.FillAdvancingFront(tcx, new_node);
    return new_node;
  };

  tessellation.sweep.EdgeEvent = function() {
    var tcx;
    if (arguments.length == 3) {
      tcx = arguments[0];
      var edge = arguments[1];
      var node = arguments[2];

      tcx.edge_event.constrained_edge = edge;
      tcx.edge_event.right = (edge.p.x > edge.q.x);

      if (tessellation.sweep.IsEdgeSideOfTriangle(node.triangle, edge.p, edge.q)) {
        return;
      }

      // For now we will do all needed filling
      // TODO: integrate with flip process might give some better performance
      //     but for now this avoid the issue with cases that needs both flips and fills
      tessellation.sweep.FillEdgeEvent(tcx, edge, node);
      tessellation.sweep.EdgeEvent(tcx, edge.p, edge.q, node.triangle, edge.q);
    } else if (arguments.length == 5) {
      tcx = arguments[0];
      var ep = arguments[1];
      var eq = arguments[2];
      var triangle = arguments[3];
      var point = arguments[4];

      if (tessellation.sweep.IsEdgeSideOfTriangle(triangle, ep, eq)) {
        return;
      }

      var p1 = triangle.PointCCW(point);
      var o1 = tessellation.Orient2d(eq, p1, ep);
      if (o1 == tessellation.Orientation.COLLINEAR) {
        alert('tessellation.sweep.EdgeEvent: Collinear not supported!');
        return;
      }

      var p2 = triangle.PointCW(point);
      var o2 = tessellation.Orient2d(eq, p2, ep);
      if (o2 == tessellation.Orientation.COLLINEAR) {
        alert('tessellation.sweep.EdgeEvent: Collinear not supported!');
        return;
      }

      if (o1 == o2) {
        // Need to decide if we are rotating CW or CCW to get to a triangle
        // that will cross edge
        if (o1 == tessellation.Orientation.CW) {
          triangle = triangle.NeighborCCW(point);
        } else {
          triangle = triangle.NeighborCW(point);
        }
        tessellation.sweep.EdgeEvent(tcx, ep, eq, triangle, point);
      } else {
        // This triangle crosses constraint so lets flippin start!
        tessellation.sweep.FlipEdgeEvent(tcx, ep, eq, triangle, point);
      }
    } else {
      alert('Invalid tessellation.sweep.EdgeEvent call!');
    }
  };

  tessellation.sweep.IsEdgeSideOfTriangle = function(triangle, ep, eq) {
    var index = triangle.EdgeIndex(ep, eq);
    if (index != -1) {
      triangle.MarkConstrainedEdge(index);
      var t = triangle.GetNeighbor(index);
      if (t != null) {
        t.MarkConstrainedEdge(ep, eq);
      }
      return true;
    }
    return false;
  };

  tessellation.sweep.NewFrontTriangle = function(tcx, point, node) {
    var triangle = new tessellation.Triangle(point, node.point, node.next.point);

    triangle.MarkNeighbor(node.triangle);
    tcx.AddToMap(triangle);

    var new_node = new tessellation.Node(point);
    new_node.next = node.next;
    new_node.prev = node;
    node.next.prev = new_node;
    node.next = new_node;

    if (!tessellation.sweep.Legalize(tcx, triangle)) {
      tcx.MapTriangleToNodes(triangle);
    }

    return new_node;
  };

  /**
   * Adds a triangle to the advancing front to fill a hole.
   * @param tcx
   * @param node - middle node, that is the bottom of the hole
   */
  tessellation.sweep.Fill = function(tcx, node) {
    var triangle = new tessellation.Triangle(node.prev.point, node.point, node.next.point);

    // TODO: should copy the constrained_edge value from neighbor triangles
    //     for now constrained_edge values are copied during the legalize
    triangle.MarkNeighbor(node.prev.triangle);
    triangle.MarkNeighbor(node.triangle);

    tcx.AddToMap(triangle);

    // Update the advancing front
    node.prev.next = node.next;
    node.next.prev = node.prev;


    // If it was legalized the triangle has already been mapped
    if (!tessellation.sweep.Legalize(tcx, triangle)) {
      tcx.MapTriangleToNodes(triangle);
    }

    //tcx.RemoveNode(node);
  };

  /**
   * Fills holes in the Advancing Front
   */
  tessellation.sweep.FillAdvancingFront = function(tcx, n) {
    // Fill right holes
    var node = n.next;
    var angle;

    while (node.next != null) {
      angle = tessellation.sweep.HoleAngle(node);
      if (angle > tessellation.PI_2 || angle < -(tessellation.PI_2)) break;
      tessellation.sweep.Fill(tcx, node);
      node = node.next;
    }

    // Fill left holes
    node = n.prev;

    while (node.prev != null) {
      angle = tessellation.sweep.HoleAngle(node);
      if (angle > tessellation.PI_2 || angle < -(tessellation.PI_2)) break;
      tessellation.sweep.Fill(tcx, node);
      node = node.prev;
    }

    // Fill right basins
    if (n.next != null && n.next.next != null) {
      angle = tessellation.sweep.BasinAngle(n);
      if (angle < tessellation.PI_3div4) {
        tessellation.sweep.FillBasin(tcx, n);
      }
    }
  };

  tessellation.sweep.BasinAngle = function(node) {
    var ax = node.point.x - node.next.next.point.x;
    var ay = node.point.y - node.next.next.point.y;
    return Math.atan2(ay, ax);
  };

  /**
   *
   * @param node - middle node
   * @return the angle between 3 front nodes
   */
  tessellation.sweep.HoleAngle = function(node) {
  /* Complex plane
   * ab = cosA +i*sinA
   * ab = (ax + ay*i)(bx + by*i) = (ax*bx + ay*by) + i(ax*by-ay*bx)
   * atan2(y,x) computes the principal value of the argument function
   * applied to the complex number x+iy
   * Where x = ax*bx + ay*by
   *     y = ax*by - ay*bx
   */
  var ax = node.next.point.x - node.point.x;
  var ay = node.next.point.y - node.point.y;
  var bx = node.prev.point.x - node.point.x;
  var by = node.prev.point.y - node.point.y;
  return Math.atan2(ax * by - ay * bx, ax * bx + ay * by);
  };

  /**
   * Returns true if triangle was legalized
   */
  tessellation.sweep.Legalize = function(tcx, t) {
    // To legalize a triangle we start by finding if any of the three edges
    // violate the Delaunay condition
    for (var i=0; i < 3; ++i) {
      if (t.delaunay_edge[i]) continue;

      var ot = t.GetNeighbor(i);
      if (ot != null) {
        var p = t.GetPoint(i);
        var op = ot.OppositePoint(t, p);
        var oi = ot.Index(op);

        // If this is a Constrained Edge or a Delaunay Edge(only during recursive legalization)
        // then we should not try to legalize
        if (ot.constrained_edge[oi] || ot.delaunay_edge[oi]) {
          t.constrained_edge[i] = ot.constrained_edge[oi];
          continue;
        }

        var inside = tessellation.sweep.Incircle(p, t.PointCCW(p), t.PointCW(p), op);
        if (inside) {
          // Lets mark this shared edge as Delaunay
          t.delaunay_edge[i] = true;
          ot.delaunay_edge[oi] = true;

          // Lets rotate shared edge one vertex CW to legalize it
          tessellation.sweep.RotateTrianglePair(t, p, ot, op);

          // We now got one valid Delaunay Edge shared by two triangles
          // This gives us 4 new edges to check for Delaunay

          // Make sure that triangle to node mapping is done only one time for a specific triangle
          var not_legalized = !tessellation.sweep.Legalize(tcx, t);
          if (not_legalized) {
            tcx.MapTriangleToNodes(t);
          }

          not_legalized = !tessellation.sweep.Legalize(tcx, ot);
          if (not_legalized) tcx.MapTriangleToNodes(ot);

          // Reset the Delaunay edges, since they only are valid Delaunay edges
          // until we add a new triangle or Two.Vector.
          // XXX: need to think about this. Can these edges be tried after we
          //    return to previous recursive level?
          t.delaunay_edge[i] = false;
          ot.delaunay_edge[oi] = false;

          // If triangle have been legalized no need to check the other edges since
          // the recursive legalization will handles those so we can end here.
          return true;
        }
      }
    }
    return false;
  };

  /**
   * <b>Requirement</b>:<br>
   * 1. a,b and c form a triangle.<br>
   * 2. a and d is know to be on opposite side of bc<br>
   * <pre>
   *        a
   *        +
   *         / \
   *        /   \
   *      b/     \c
   *      +-------+
   *       /  d  \
   *      /       \
   * </pre>
   * <b>Fact</b>: d has to be in area B to have a chance to be inside the circle formed by
   *  a,b and c<br>
   *  d is outside B if orient2d(a,b,d) or orient2d(c,a,d) is CW<br>
   *  This preknowledge gives us a way to optimize the incircle test
   * @param pa - triangle Two.Vector, opposite d
   * @param pb - triangle Two.Vector
   * @param pc - triangle Two.Vector
   * @param pd - Two.Vector opposite a
   * @return true if d is inside circle, false if on circle edge
   */
  tessellation.sweep.Incircle = function(pa, pb, pc, pd) {
    var adx = pa.x - pd.x;
    var ady = pa.y - pd.y;
    var bdx = pb.x - pd.x;
    var bdy = pb.y - pd.y;

    var adxbdy = adx * bdy;
    var bdxady = bdx * ady;
    var oabd = adxbdy - bdxady;

    if (oabd <= 0) return false;

    var cdx = pc.x - pd.x;
    var cdy = pc.y - pd.y;

    var cdxady = cdx * ady;
    var adxcdy = adx * cdy;
    var ocad = cdxady - adxcdy;

    if (ocad <= 0) return false;

    var bdxcdy = bdx * cdy;
    var cdxbdy = cdx * bdy;

    var alift = adx * adx + ady * ady;
    var blift = bdx * bdx + bdy * bdy;
    var clift = cdx * cdx + cdy * cdy;

    var det = alift * (bdxcdy - cdxbdy) + blift * ocad + clift * oabd;
    return det > 0;
  };

  /**
   * Rotates a triangle pair one vertex CW
   *<pre>
   *     n2          n2
   *  P +-----+       P +-----+
   *  | t  /|         |\  t |
   *  | / |         | \ |
   *  n1|  /  |n3     n1|  \  |n3
   *  | /   |    after CW   |   \ |
   *  |/ oT |         | oT \|
   *  +-----+ oP        +-----+
   *     n4          n4
   * </pre>
   */
  tessellation.sweep.RotateTrianglePair = function(t, p, ot, op) {
    var n1; var n2; var n3; var n4;
    n1 = t.NeighborCCW(p);
    n2 = t.NeighborCW(p);
    n3 = ot.NeighborCCW(op);
    n4 = ot.NeighborCW(op);

    var ce1; var ce2; var ce3; var ce4;
    ce1 = t.GetConstrainedEdgeCCW(p);
    ce2 = t.GetConstrainedEdgeCW(p);
    ce3 = ot.GetConstrainedEdgeCCW(op);
    ce4 = ot.GetConstrainedEdgeCW(op);

    var de1; var de2; var de3; var de4;
    de1 = t.GetDelaunayEdgeCCW(p);
    de2 = t.GetDelaunayEdgeCW(p);
    de3 = ot.GetDelaunayEdgeCCW(op);
    de4 = ot.GetDelaunayEdgeCW(op);

    t.Legalize(p, op);
    ot.Legalize(op, p);

    // Remap delaunay_edge
    ot.SetDelaunayEdgeCCW(p, de1);
    t.SetDelaunayEdgeCW(p, de2);
    t.SetDelaunayEdgeCCW(op, de3);
    ot.SetDelaunayEdgeCW(op, de4);

    // Remap constrained_edge
    ot.SetConstrainedEdgeCCW(p, ce1);
    t.SetConstrainedEdgeCW(p, ce2);
    t.SetConstrainedEdgeCCW(op, ce3);
    ot.SetConstrainedEdgeCW(op, ce4);

    // Remap neighbors
    // XXX: might optimize the markNeighbor by keeping track of
    //    what side should be assigned to what neighbor after the
    //    rotation. Now mark neighbor does lots of testing to find
    //    the right side.
    t.ClearNeigbors();
    ot.ClearNeigbors();
    if (n1) ot.MarkNeighbor(n1);
    if (n2) t.MarkNeighbor(n2);
    if (n3) t.MarkNeighbor(n3);
    if (n4) ot.MarkNeighbor(n4);
    t.MarkNeighbor(ot);
  };

  /**
   * Fills a basin that has formed on the Advancing Front to the right
   * of given node.<br>
   * First we decide a left,bottom and right node that forms the
   * boundaries of the basin. Then we do a reqursive fill.
   *
   * @param tcx
   * @param node - starting node, this or next node will be left node
   */
  tessellation.sweep.FillBasin = function(tcx, node) {
    if (tessellation.Orient2d(node.point, node.next.point, node.next.next.point) == tessellation.Orientation.CCW) {
      tcx.basin.left_node = node.next.next;
    } else {
      tcx.basin.left_node = node.next;
    }

    // Find the bottom and right node
    tcx.basin.bottom_node = tcx.basin.left_node;
    while (tcx.basin.bottom_node.next != null && tcx.basin.bottom_node.point.y >= tcx.basin.bottom_node.next.point.y) {
      tcx.basin.bottom_node = tcx.basin.bottom_node.next;
    }
    if (tcx.basin.bottom_node == tcx.basin.left_node) {
      // No valid basin
      return;
    }

    tcx.basin.right_node = tcx.basin.bottom_node;
    while (tcx.basin.right_node.next != null && tcx.basin.right_node.point.y < tcx.basin.right_node.next.point.y) {
      tcx.basin.right_node = tcx.basin.right_node.next;
    }
    if (tcx.basin.right_node == tcx.basin.bottom_node) {
      // No valid basins
      return;
    }

    tcx.basin.width = tcx.basin.right_node.point.x - tcx.basin.left_node.point.x;
    tcx.basin.left_highest = tcx.basin.left_node.point.y > tcx.basin.right_node.point.y;

    tessellation.sweep.FillBasinReq(tcx, tcx.basin.bottom_node);
  };

  /**
   * Recursive algorithm to fill a Basin with triangles
   *
   * @param tcx
   * @param node - bottom_node
   */
  tessellation.sweep.FillBasinReq = function(tcx, node) {
    // if shallow stop filling
    if (tessellation.sweep.IsShallow(tcx, node)) {
      return;
    }

    tessellation.sweep.Fill(tcx, node);

    var o;
    if (node.prev == tcx.basin.left_node && node.next == tcx.basin.right_node) {
      return;
    } else if (node.prev == tcx.basin.left_node) {
      o = tessellation.Orient2d(node.point, node.next.point, node.next.next.point);
      if (o == tessellation.Orientation.CW) {
        return;
      }
      node = node.next;
    } else if (node.next == tcx.basin.right_node) {
      o = tessellation.Orient2d(node.point, node.prev.point, node.prev.prev.point);
      if (o == tessellation.Orientation.CCW) {
        return;
      }
      node = node.prev;
    } else {
      // Continue with the neighbor node with lowest Y value
      if (node.prev.point.y < node.next.point.y) {
        node = node.prev;
      } else {
        node = node.next;
      }
    }

    tessellation.sweep.FillBasinReq(tcx, node);
  };

  tessellation.sweep.IsShallow = function(tcx, node) {
    var height;
    if (tcx.basin.left_highest) {
      height = tcx.basin.left_node.point.y - node.point.y;
    } else {
      height = tcx.basin.right_node.point.y - node.point.y;
    }

    // if shallow stop filling
    if (tcx.basin.width > height) {
      return true;
    }
    return false;
  };

  tessellation.sweep.FillEdgeEvent = function(tcx, edge, node) {
    if (tcx.edge_event.right) {
      tessellation.sweep.FillRightAboveEdgeEvent(tcx, edge, node);
    } else {
      tessellation.sweep.FillLeftAboveEdgeEvent(tcx, edge, node);
    }
  };

  tessellation.sweep.FillRightAboveEdgeEvent = function(tcx, edge, node) {
    while (node.next.point.x < edge.p.x) {
      // Check if next node is below the edge
      if (tessellation.Orient2d(edge.q, node.next.point, edge.p) == tessellation.Orientation.CCW) {
        tessellation.sweep.FillRightBelowEdgeEvent(tcx, edge, node);
      } else {
        node = node.next;
      }
    }
  };

  tessellation.sweep.FillRightBelowEdgeEvent = function(tcx, edge, node) {
    if (node.point.x < edge.p.x) {
      if (tessellation.Orient2d(node.point, node.next.point, node.next.next.point) == tessellation.Orientation.CCW) {
        // Concave
        tessellation.sweep.FillRightConcaveEdgeEvent(tcx, edge, node);
      } else{
        // Convex
        tessellation.sweep.FillRightConvexEdgeEvent(tcx, edge, node);
        // Retry this one
        tessellation.sweep.FillRightBelowEdgeEvent(tcx, edge, node);
      }
    }
  };

  tessellation.sweep.FillRightConcaveEdgeEvent = function(tcx, edge, node) {
    tessellation.sweep.Fill(tcx, node.next);
    if (node.next.point != edge.p) {
      // Next above or below edge?
      if (tessellation.Orient2d(edge.q, node.next.point, edge.p) == tessellation.Orientation.CCW) {
        // Below
        if (tessellation.Orient2d(node.point, node.next.point, node.next.next.point) == tessellation.Orientation.CCW) {
          // Next is concave
          tessellation.sweep.FillRightConcaveEdgeEvent(tcx, edge, node);
        } else {
        // Next is convex
        }
      }
    }
  };

  tessellation.sweep.FillRightConvexEdgeEvent = function(tcx, edge, node) {
    // Next concave or convex?
    if (tessellation.Orient2d(node.next.point, node.next.next.point, node.next.next.next.point) == tessellation.Orientation.CCW) {
      // Concave
      tessellation.sweep.FillRightConcaveEdgeEvent(tcx, edge, node.next);
    } else {
      // Convex
      // Next above or below edge?
      if (tessellation.Orient2d(edge.q, node.next.next.point, edge.p) == tessellation.Orientation.CCW) {
        // Below
        tessellation.sweep.FillRightConvexEdgeEvent(tcx, edge, node.next);
      } else {
        // Above
      }
    }
  };

  tessellation.sweep.FillLeftAboveEdgeEvent = function(tcx, edge, node) {
    while (node.prev.point.x > edge.p.x) {
      // Check if next node is below the edge
      if (tessellation.Orient2d(edge.q, node.prev.point, edge.p) == tessellation.Orientation.CW) {
        tessellation.sweep.FillLeftBelowEdgeEvent(tcx, edge, node);
      } else {
        node = node.prev;
      }
    }
  };

  tessellation.sweep.FillLeftBelowEdgeEvent = function(tcx, edge, node) {
    if (node.point.x > edge.p.x) {
      if (tessellation.Orient2d(node.point, node.prev.point, node.prev.prev.point) == tessellation.Orientation.CW) {
        // Concave
        tessellation.sweep.FillLeftConcaveEdgeEvent(tcx, edge, node);
      } else {
        // Convex
        tessellation.sweep.FillLeftConvexEdgeEvent(tcx, edge, node);
        // Retry this one
        tessellation.sweep.FillLeftBelowEdgeEvent(tcx, edge, node);
      }
    }
  };

  tessellation.sweep.FillLeftConvexEdgeEvent = function(tcx, edge, node) {
    // Next concave or convex?
    if (tessellation.Orient2d(node.prev.point, node.prev.prev.point, node.prev.prev.prev.point) == tessellation.Orientation.CW) {
      // Concave
      tessellation.sweep.FillLeftConcaveEdgeEvent(tcx, edge, node.prev);
    } else {
      // Convex
      // Next above or below edge?
      if (tessellation.Orient2d(edge.q, node.prev.prev.point, edge.p) == tessellation.Orientation.CW) {
        // Below
        tessellation.sweep.FillLeftConvexEdgeEvent(tcx, edge, node.prev);
      } else {
        // Above
      }
    }
  };

  tessellation.sweep.FillLeftConcaveEdgeEvent = function(tcx, edge, node) {
    tessellation.sweep.Fill(tcx, node.prev);
    if (node.prev.point != edge.p) {
      // Next above or below edge?
      if (tessellation.Orient2d(edge.q, node.prev.point, edge.p) == tessellation.Orientation.CW) {
        // Below
        if (tessellation.Orient2d(node.point, node.prev.point, node.prev.prev.point) == tessellation.Orientation.CW) {
          // Next is concave
          tessellation.sweep.FillLeftConcaveEdgeEvent(tcx, edge, node);
        } else {
          // Next is convex
        }
      }
    }
  };

  tessellation.sweep.FlipEdgeEvent = function(tcx, ep, eq, t, p) {
    var ot = t.NeighborAcross(p);
    if (ot == null) {
      // If we want to integrate the fillEdgeEvent do it here
      // With current implementation we should never get here
      alert('[BUG:FIXME] FLIP failed due to missing triangle!');
      return;
    }
    var op = ot.OppositePoint(t, p);

    if (tessellation.InScanArea(p, t.PointCCW(p), t.PointCW(p), op)) {
      // Lets rotate shared edge one vertex CW
      tessellation.sweep.RotateTrianglePair(t, p, ot, op);
      tcx.MapTriangleToNodes(t);
      tcx.MapTriangleToNodes(ot);

      if (p == eq && op == ep) {
        if (eq == tcx.edge_event.constrained_edge.q && ep == tcx.edge_event.constrained_edge.p) {
          t.MarkConstrainedEdge(ep, eq);
          ot.MarkConstrainedEdge(ep, eq);
          tessellation.sweep.Legalize(tcx, t);
          tessellation.sweep.Legalize(tcx, ot);
        } else {
          // XXX: I think one of the triangles should be legalized here?
        }
      } else {
        var o = tessellation.Orient2d(eq, op, ep);
        t = tessellation.sweep.NextFlipTriangle(tcx, o, t, ot, p, op);
        tessellation.sweep.FlipEdgeEvent(tcx, ep, eq, t, p);
      }
    } else {
      var newP = tessellation.sweep.NextFlipPoint(ep, eq, ot, op);
      tessellation.sweep.FlipScanEdgeEvent(tcx, ep, eq, t, ot, newP);
      tessellation.sweep.EdgeEvent(tcx, ep, eq, t, p);
    }
  };

  tessellation.sweep.NextFlipTriangle = function(tcx, o, t, ot, p, op) {
    var edge_index;
    if (o == tessellation.Orientation.CCW) {
      // ot is not crossing edge after flip
      edge_index = ot.EdgeIndex(p, op);
      ot.delaunay_edge[edge_index] = true;
      tessellation.sweep.Legalize(tcx, ot);
      ot.ClearDelunayEdges();
      return t;
    }

    // t is not crossing edge after flip
    edge_index = t.EdgeIndex(p, op);

    t.delaunay_edge[edge_index] = true;
    tessellation.sweep.Legalize(tcx, t);
    t.ClearDelunayEdges();
    return ot;
  };

  tessellation.sweep.NextFlipPoint = function(ep, eq, ot, op) {
    var o2d = tessellation.Orient2d(eq, op, ep);
    if (o2d == tessellation.Orientation.CW) {
      // Right
      return ot.PointCCW(op);
    } else if (o2d == tessellation.Orientation.CCW) {
      // Left
      return ot.PointCW(op);
    } else {
      alert("[Unsupported] tessellation.sweep.NextFlipPoint: opposing point on constrained edge!");
      return undefined;
    }
  };

  tessellation.sweep.FlipScanEdgeEvent = function(tcx, ep, eq, flip_triangle, t, p) {
    var ot = t.NeighborAcross(p);

    if (ot == null) {
      // If we want to integrate the fillEdgeEvent do it here
      // With current implementation we should never get here
      alert('[BUG:FIXME] FLIP failed due to missing triangle');
      return;
    }
    var op = ot.OppositePoint(t, p);

    if (tessellation.InScanArea(eq, flip_triangle.PointCCW(eq), flip_triangle.PointCW(eq), op)) {
      // flip with new edge op.eq
      tessellation.sweep.FlipEdgeEvent(tcx, eq, op, ot, op);
      // TODO: Actually I just figured out that it should be possible to
      //     improve this by getting the next ot and op before the the above
      //     flip and continue the flipScanEdgeEvent here
      // set new ot and op here and loop back to inScanArea test
      // also need to set a new flip_triangle first
      // Turns out at first glance that this is somewhat complicated
      // so it will have to wait.
    } else {
      var newP = tessellation.sweep.NextFlipPoint(ep, eq, ot, op);
      tessellation.sweep.FlipScanEdgeEvent(tcx, ep, eq, flip_triangle, ot, newP);
    }
  };

})();
