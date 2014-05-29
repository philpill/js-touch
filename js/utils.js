define(function (require) {

    var Circle = require('circle');

    var Square = require('square');

    var Utils = function (config) {

        this.config = config;
    }

    Utils.prototype = {

        getBlankGrid : function () {
            var width = this.config.canvas.grid.width;
            var height = this.config.canvas.grid.height;
            var grid = new Array(width);
            var l = grid.length;
            while (l--) {
                grid[l] = [height];
                for (var k = 0; k < height; k++) {
                    grid[l][k] = 0;
                }
            }
            return grid;
        },

        fuzzyEqual : function (valueA, valueB, delta) {

            var fuzzyEqual = false;
            fuzzyEqual = Math.round(valueA/delta)*delta === Math.round(valueB/delta)*delta;
            return fuzzyEqual;
        },

        getGridFromCoord : function (coord) {

            if (isNaN(coord)) { return -1; }

            var gridSize = this.config.canvas.grid.size;

            return Math.floor(coord/gridSize);
        }
    }

    return Utils;
});