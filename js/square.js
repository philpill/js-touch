define(function (require) {

    var CanvasObject = require('object');

    var Square = function (args) {

        this.id = args.id;
        this.type = 'square';
        this.height = args.height || 10;
        this.width = args.width || 10;
        this.x = args.x || 30;
        this.y = args.y || 30;
        this.fillStyle = '#ff0000';
        this.isClickable = true;
        this.isFocusable = true;
        this.isSelectable = true;
        this.snapToGrid = true;
    }

    // JavaScript Inheritance Done Right
    // http://ncombo.wordpress.com/2013/07/11/javascript-inheritance-done-right/

    var prototype = Object.create(CanvasObject.prototype);

    prototype.contains = function (mouseX, mouseY) {

        var inX = (this.x <= mouseX) && (mouseX <= this.x + this.width);
        var inY = (this.y <= mouseY) && (mouseY <= this.y + this.height);

        return (inX && inY);
    };

    prototype.serialize = function () {

        return {

            zIndex      : 1,
            type        : this.type,
            height      : this.height,
            width       : this.width,
            x           : this.x,
            y           : this.y,
            fillStyle   : this.fillStyle,
            isSelected  : this.isSelected,
            snapToGrid  : this.snapToGrid
        }
    };

    Square.prototype = prototype;

    return Square;
});