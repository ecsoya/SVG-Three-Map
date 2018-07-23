# SVG-Three-Map
Convert SVG Map to 2.5D with Three.js

## Documentation
[https://ecsoya.github.io/three.js/2018/07/20/threejs.html](https://ecsoya.github.io/three.js/2018/07/20/threejs.html)

## Convert SVG to Three.js
Using SVGLoader to convert all SVG shapes to Three.js

## Generate a Grid for Astar
1. Using the first shape as floor.
2. Add all shapes of SVG as walls.

## Interaction with Three objects
1. Highlight when mouse move on by using Raycaster of three.
2. Add sprite when mouse click to select source and target.

## Path-finding
1. Finding a path by using Astar.js(http://github.com/bgrins/javascript-astar)
2. Drawing path line with THREE.MeshLine(https://github.com/spite/THREE.MeshLine)
	