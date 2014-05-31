define(function (require) {

    var Square = require('square');

    var Indicator = function (args) {

        args = args || {};

        this.id = args.id || 'indicator';
        this.type = 'square';
        this.height = args.height || 16;
        this.width = args.width || 16;
        this.x = args.x || 30;
        this.y = args.y || 30;
        this.fillStyle = args.fillStyle || '#00ffff';
        this.snapToGrid = true;
        this.isActive = false;
        this.isClickable = false;
        this.isSelectable = false;
        this.isFocusable = false;
        this.isSelected = false;
        this.zIndex = args.zIndex || 5;
    }

    // JavaScript Inheritance Done Right
    // http://ncombo.wordpress.com/2013/07/11/javascript-inheritance-done-right/

    Indicator.prototype = Object.create(Square.prototype);

    return Indicator;
});