GridGenerator = function (width, height, dimention) {
    this.width = width;
    this.height = height;

    this.grid = [[]];
    this.dimention = dimention;

    this.numOfColumns = Math.round(width / dimention);
    this.numOfRows = Math.round(height / dimention);

    for (var x = 0; x <= this.numOfRows; x++) {
        this.grid[x] = [];

        for (var y = 0; y <= this.numOfColumns; y++) {
            this.grid[x][y] = 1;
        }
    }

    console.log("Grid: [" + this.numOfRows + "x" + this.numOfColumns + "]");

    this.addWalls = function (rect) {
        var sumColumn = Math.ceil(rect.width / this.dimention);
        var sumRow = Math.ceil(rect.height / this.dimention);
        var startColumn = Math.ceil(Math.max(0, rect.x) / this.dimention) + 1;
        var startRow = Math.ceil(Math.max(0, rect.y) / this.dimention) + 1;

        for (var r = startRow; r < (startRow + sumRow) && r < this.grid.length; r++) {
            for (var c = startColumn; c < (startColumn + sumColumn) && c < this.grid[r].length; c++) {
                this.grid[r][c] = 0;
            }
        }
        console.log(" Gird: block for: " + rect.x + ", " + rect.y + ", " + rect.width  + ", " + rect.height);
        console.log("       x from " + startRow + " to " + (startRow + sumRow - 1));
        console.log("       y from " + startColumn + " to " + (startColumn + sumColumn - 1));
    }

    this.gridArray = function () {
        var result = "[";
        for (var i = 0; i < this.grid.length; i++) {
            result += '[';
            for (var j = 0; j < this.grid[i].length; j++) {
                var rowStr = this.grid[i][j];
                if (j < this.grid[i].length - 1) {
                    rowStr += ',';
                }
                result += rowStr;
            }
            result += ']';
            if (i < this.grid.length - 1) {
                result += ',';
                result += '\n';
            }
        }
        result += "]";
        return result;
    }

    this.gridArrayDebug = function () {
        var result = "[\n";
        for (var i = 0; i < this.grid.length; i++) {
            result +=  (i + 10000).toString().substr(3) + ': [';
            for (var j = 0; j < this.grid[i].length; j++) {
                var rowStr = this.grid[i][j];
                if (j < this.grid[i].length - 1) {
                    rowStr += ',';
                }
                result += rowStr;
            }
            result += ']';
            if (i < this.grid.length - 1) {
                result += ',';
                result += '\n';
            }
        }
        result += "]";
        return result;
    }
}