// Return the position of object
function getPosition(object) {
    var position = new THREE.Vector3();
    if (object instanceof THREE.Mesh) {
        object.updateMatrixWorld(true);
        position.setFromMatrixPosition(object.matrixWorld);
    }
    return position;
}

function getBBoxPostion(object) {
    var center = getCenter(object);
    var size = getSize(object);
    var position = new THREE.Vector3();
    position.x = center.x - size.x / 2;
    position.y = center.y - size.y / 2;
    position.z = center.z - size.z / 2;
    return position;
}

function getSize(object) {
    if (object instanceof THREE.BufferGeometry) {
        var geometry = new THREE.Geometry().fromBufferGeometry(object);
        return getSize(geometry);
    } else if (object instanceof THREE.Mesh) {
        var box = new THREE.Box3();
        box.setFromObject(object);
        return box.getSize(new THREE.Vector3());
    } else if (object instanceof THREE.Geometry) {
        object.computeBoundingBox();
        return object.boundingBox.getSize(new THREE.Vector3());
    }
    return null;
}

function getCenter(object) {
    if (object instanceof THREE.BufferGeometry) {
        var geometry = new THREE.Geometry().fromBufferGeometry(object);
        return getCenter(geometry);
    } else if (object instanceof THREE.Geometry) {
        object.computeBoundingBox();
        return object.boundingBox.getCenter(new THREE.Vector3());
    } else if (object instanceof THREE.Mesh) {
        var box = new THREE.Box3();
        box.setFromObject(object);
        return box.getCenter(new THREE.Vector3());
    }
    return null;
}



function getGridRect(mesh) {
    if (!(mesh instanceof THREE.Mesh)) {
        return new Rect(0, 0, 0, 0);
    }
    var center = getCenter(mesh);
    var size = getSize(mesh);
    var rect = new Rect(
        center.x - size.x / 2 + floorInfo.width / 2, // Reverse to original location
        center.y - size.y / 2 + floorInfo.height / 2,
        size.x,
        size.y
    )
    // Rotate y axes.
    return reverseRectY(rect, floorInfo.height);
}

/*
* Reverse the rect from it's parent's center
*
* height is the parent's total height value.
*
* it means to rotate 180 degree of the parent through X axes.
* */
function reverseRectY(rect, height) {
    return new Rect(rect.x, height - (rect.y + rect.height), rect.width, rect.height)
}

function toScreenPosition(point3d) {
    var threePos = point3d.clone().project(camera);
    var halfWidth = window.innerWidth / 2;
    var halfHeight = window.innerHeight / 2;
    var result = {
        x: threePos.x * halfWidth + halfWidth,
        y: -threePos.y * halfHeight + halfHeight
    }
    return result;
}

function toThreePosition(point2d, z) {
    var widthHalf = 0.5 * window.innerWidth;
    var heightHalf = 0.5 * window.innerHeight;
    var zValue = z == undefined ? 0.5 : z;
    var point3d = new THREE.Vector3(
        (point2d.x / widthHalf) * 2 - 1,
        -(point2d.y / heightHalf) * 2 + 1,
        zValue);
    point3d.unproject(camera);
    return point3d;
}

function printInfo(object) {
    var size = getSize(object);
    var center = getCenter(object);
    var position = getPosition(object);

    console.log(object.name);
    console.log("  size: {x: " + size.x + ", y: " + size.y + ", z: " + size.z + "}");
    console.log("  center: {x: " + center.x + ", y: " + center.y + ", z: " + center.z + "}");
    console.log("  position: {x: " + position.x + ", y: " + position.y + ", z: " + position.z + "}");
    console.log("---------------------------------------");
}

function containsChinese(str) {
    return /.*[\u4e00-\u9fa5]+.*$/.test(str);
}

function findOpenNode(point) {
    var column = graph.grid.length;
    var row = graph.grid[0].length;

    var cellWidth = floorInfo.height / column;
    var cellHeight = floorInfo.width / row;

    var x = Math.ceil(point.y / cellHeight);
    var y = Math.ceil(point.x / cellWidth);

    var node = graph.grid[x][y];
    if (!node.isWall()) {
        return node;
    }
    var neighbors = findNeighbors(node);
    if (neighbors) {
        return neighbors;
    }
    return null;
}

function findNeighbors(node) {
    if (node && node.isWall()) {
        var neighbors = graph.neighbors(node);
        for (var i = 0; i < neighbors.length; i++) {
            if (!neighbors[i].isWall()) {
                return neighbors[i];
            }
        }
    }
    return null;
}

function computeScreenSpaceBoundingBox(mesh, camera) {
    var vertices;
    if (mesh.geometry instanceof THREE.BufferGeometry) {
        vertices = new THREE.Geometry().fromBufferGeometry(mesh.geometry).vertices;
    } else {
        vertices = mesh.geometry.vertices;
    }

    var vertex = new THREE.Vector3();
    var min = new THREE.Vector3(1);
    var max = new THREE.Vector3(-1);

    for (var i = 0; i < vertices.length; i++) {
        var vertexWorldCoord = vertex.copy(vertices[i]).applyMatrix4(mesh.matrixWorld);
        var vertexScreenSpace = vertexWorldCoord.project(camera);
        min.min(vertexScreenSpace);
        max.max(vertexScreenSpace);
    }

    return new THREE.Box2(min, max);
}

function normalizedToPixels(coord, renderWidthPixels, renderHeightPixels) {
    var halfScreen = new THREE.Vector2(renderWidthPixels / 2, renderHeightPixels / 2)
    return coord.clone().multiply(halfScreen);
}

function getBox3(object) {
    if (object instanceof THREE.Mesh) {
        return getBox3(object.geometry);
    } else if (object instanceof THREE.BufferGeometry) {
        var geometry = new THREE.Geometry().fromBufferGeometry(object);
        return getBox3(geometry);
    } else if (object instanceof THREE.Geometry) {
        object.computeBoundingBox();
        return object.boundingBox;
    }
    console.log("Unsupport Bbox3 for: " + object);
    return null;
}

function getBox2(mesh, camera) {
    if (mesh instanceof THREE.Mesh) {
        var geometry = mesh.geometry;
        if (geometry instanceof  THREE.BufferGeometry){
            geometry = new THREE.Geometry().fromBufferGeometry(geometry);
        }
        var vertices = geometry.vertices;
        var vertex = new THREE.Vector3();
        var min = new THREE.Vector3(1);
        var max = new THREE.Vector3(-1);

        for (var i = 0; i < vertices.length; i++) {
            var vertexWorldCoord = vertex.copy(vertices[i]).applyMatrix4(mesh.matrixWorld);
            var vertexScreenSpace = vertexWorldCoord.project(camera);
            min.min(vertexScreenSpace);
            max.max(vertexScreenSpace);
        }

        return new THREE.Box2(min, max);
    } else {
        console.log("Unsupport BBox2 for: " + mesh);
    }
    return null;
}