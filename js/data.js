define(function (require) {

    var Circle = require('circle');

    var Square = require('square');

    return {

        getSquares : function () {

            var squares = [];

            var l = 5;

            while (l--) {

                squares.push(new Square({

                    id : 'square' + l,
                    height : 16,
                    width : 16,
                    x : (40 * l) + 41,
                    y : 121
                }));
            }

            return squares;
        },
        getCircles : function () {

            var circles = [];

            var l = 5;

            while (l--) {

                circles.push(new Circle({

                    id : 'circle' + l,
                    radius : 8,
                    x : (40 * l) + 49,
                    y : 229
                }));
            }

            return circles;
        }
    }
});