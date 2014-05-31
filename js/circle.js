define(function (require) {

    var CanvasObject = require('object');

    var Circle = function (args) {

        this.id = args.id;
        this.type = 'circle';
        this.radius = args.radius || 10;
        this.start = args.start || 0;
        this.end = args.end || 2*Math.PI;
        this.x = args.x || 30;
        this.y = args.y || 30;
        this.fillStyle = '#0000ff';
        this.snapToGrid = true;
        this.isActive = !!args.isActive;
        this.isClickable = !!args.isClickable;
        this.isSelectable = !!args.isSelectable;
        this.isFocusable = !!args.isFocusable;
        this.isSelected = !!args.isSelected;
    }

    // JavaScript Inheritance Done Right
    // http://ncombo.wordpress.com/2013/07/11/javascript-inheritance-done-right/

    var prototype = Object.create(CanvasObject.prototype);

    prototype.contains = function (mouseX, mouseY) {

        return (Math.pow(mouseX - this.x, 2) + Math.pow(mouseY - this.y, 2) < Math.pow(this.radius, 2));
    };

    prototype.serialize = function () {

        return {

            zIndex      : 1,
            type        : this.type,
            radius      : this.radius,
            start       : this.start,
            end         : this.end,
            x           : this.x,
            y           : this.y,
            fillStyle   : this.fillStyle,
            isSelected  : this.isSelected,
            snapToGrid  : this.snapToGrid,
            isActive    : this.isActive,
            isSelected  : this.isSelected,
            isClickable : this.isClickable,
            isFocusable : this.isFocusable,
            isSelectable : this.isSelectable,
            zIndex      : this.zIndex
        }
    };

    Circle.prototype = prototype;

    return Circle;
});
