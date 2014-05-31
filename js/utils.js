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
        getObjectMap : function (objects) {
            var gridSize = this.config.canvas.grid.size;
            var l = objects.length;
            var grid = this.getBlankGrid();
            while (l--) {
                var obj = objects[l];
                if (obj.isActive) {
                    obj.gridX = Math.floor(obj.x/gridSize);
                    obj.gridY = Math.floor(obj.y/gridSize);
                    if (grid[obj.gridX]) {
                        grid[obj.gridX][obj.gridY] = 1;
                    }
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