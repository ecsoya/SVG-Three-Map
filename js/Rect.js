Rect = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.center = {x: x + width / 2, y: y + height /2};
    this.top = {x: x + width/2, y: y };
    this.bottom = {x: x+ width/2, y: y+ height};
    this.left = {x: x, y: y + height/ 2};
    this.right = {x: x + width, y: y + height /2};
}

Point = function(x, y) {
    this.x = x;
    this.y = y;
}

Size = function (width, height) {
    this.width = width;
    this.height = height;
}