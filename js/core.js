define(function (require) {

    var Ticker      = require('ticker'),
        Interface   = require('interface'),
        Canvas      = require('canvas'),
        Circle      = require('circle'),
        Square      = require('square'),
        Indicator   = require('indicator'),
        data        = require('data'),
        Utils       = require('utils');

    require('astar');

    var Core = function (config) {

        this.config = config;
        this.utils = new Utils(config);
    }

    Core.prototype = {

        constructor : Core,

        init : function () {

            this.loadModules(this.config);
            this.bindEvents(this.config);
            this.loadShapes(this.config);

            this.selected = null;
        },
        loadShapes : function (config) {

            this.shapes = [];
            this.shapes.push(this.getTouchIndicator());
            this.shapes = this.shapes.concat(data.getSquares());
            this.shapes = this.shapes.concat(data.getCircles());
        },
        getTouchIndicator : function () {

            return new Indicator();
        },
        loadModules : function (config) {

            this.ticker = new Ticker(config);
            this.ticker.init();

            this.interface = new Interface(config);
            this.interface.init();

            this.canvas = new Canvas(config);
            this.canvas.init();
        },
        getSerializedShapes : function () {

            var l = this.shapes ? this.shapes.length : 0;
            var serializedShapes = [];
            while (l--) {
                serializedShapes.push(this.shapes[l].serialize());
            }
            return serializedShapes;
        },
        getClickedObject : function (e) {

            var objects = [];
            var l = this.shapes ? this.shapes.length : 0;
            while (l--) {
                if (this.shapes[l].contains(e.x, e.y) && this.shapes[l].isClickable) {
                    objects.push(this.shapes[l]);
                }
            }

            return objects.sort(function(a, b) {
                return b.zIndex - a.zIndex;
            })[0];
        },

        getMouse : function(e) {
            var element = this.canvas.canvas, offsetX = 0, offsetY = 0, mx, my;

            if (element.offsetParent !== undefined) {
                do {
                  offsetX += element.offsetLeft;
                  offsetY += element.offsetTop;
                } while ((element = element.offsetParent));
              }

            mx = e.pageX - offsetX;
            my = e.pageY - offsetY;

            return {x: mx, y: my};
        },

        blurObjects : function () {
            this.selected = null;
            var l = this.shapes.length;
            while (l--) {
                this.shapes[l].execute('blur');
            }
        },

        tickObjects : function (objects, e) {
            var l = objects.length;
            while (l--) {
                var obj = objects[l];
                if (obj.isActive) {
                    var map = this.utils.getObjectMap(this.shapes);
                    this.translate(objects[l], map);
                    objects[l].execute('tick', e);
                }
            }
        },

        getPath : function (object, map) {

            var width = this.config.canvas.grid.width;
            var height = this.config.canvas.grid.height;

            var gridX = this.utils.getGridFromCoord(object.x);
            var gridY = this.utils.getGridFromCoord(object.y);

            var gridDestinationX = object.destinationX ? this.utils.getGridFromCoord(object.destinationX) : gridX;
            var gridDestinationY = object.destinationY ? this.utils.getGridFromCoord(object.destinationY) : gridY;

            var start = [gridX, gridY];
            var end = [gridDestinationX, gridDestinationY];

            return a_star(start, end, map, width, height, true);
        },

        translate : function (object, map) {

            if (object.destinationX || object.destinationY) {

                var gridSize = this.config.canvas.grid.size;

                var path = this.getPath(object, map);

                if (path.length > 1) {

                    var next = path[1];

                    console.log(object.id + ': ' + start, ' -> ', next, ' ... ', end);

                    if (gridX < next.x) {

                        object.x = object.x + gridSize;

                    } else if (gridX > next.x) {

                        object.x = object.x - gridSize;
                    }

                    if (gridY < next.y) {

                        object.y = object.y + gridSize;

                    } else if (gridY > next.y) {

                        object.y = object.y - gridSize;
                    }

                } else {

                    object.destinationX = null;
                    object.destinationY = null;
                }
            }
        },

        activateObject : function (object, mouse) {

            if (object && object.isSelected) {

                this.blurObjects();

            } else if (object) {

                this.blurObjects();

                object.execute('focus');
                object.execute('click');

                if (object.isSelectable) {
                    this.selected = object;
                    object.execute('select');
                }

            } else if (this.selected) {

                if (!this.config.isPaused) {
                    // move object
                    this.selected.destinationX = mouse.x;
                    this.selected.destinationY = mouse.y;
                }
            }
        },

        getIndicator : function () {
            var indicators = this.shapes.filter(function (shape) {
                return shape.id ==='indicator';
            });
            return indicators.length ? indicators[0] : null;
        },

        bindEvents : function (config) {

            var that = this;

            this.ticker.bind('tick', function(e) {
                that.interface.execute('tick', e);
                that.tickObjects(that.shapes, e);
                that.canvas.execute('tick', {
                    event: e,
                    shapes : that.getSerializedShapes()
                });
            });

            this.canvas.bind('touchstart', function (e) {
                e.preventDefault();
                var mouse = that.getMouse({
                    pageX : e.changedTouches[0].pageX,
                    pageY : e.changedTouches[0].pageY
                });

                var indicator = that.getIndicator();

                indicator.x = mouse.x; // start indicator
                indicator.y = mouse.y; // start indicator

                indicator.isActive = true;
            });

            this.canvas.bind('touchend', function (e) {
                e.preventDefault();
                var indicator = that.getIndicator();

                indicator.isActive = false;

                var mouse = that.getMouse({
                    pageX : e.changedTouches[0].pageX,
                    pageY : e.changedTouches[0].pageY
                });

                var object = that.getClickedObject(mouse);

                that.activateObject(object, mouse);
            });

            this.canvas.bind('touchmove', function (e) {
                e.preventDefault();
                var indicator = that.getIndicator();

                var mouse = that.getMouse({
                    pageX : e.changedTouches[0].pageX,
                    pageY : e.changedTouches[0].pageY
                });

                indicator.x = mouse.x; // end indicator
                indicator.y = mouse.y; // end indicator

                // draw path
            });

            this.canvas.bind('click', function (e) {
                var mouse = that.getMouse(e);
                var object = that.getClickedObject(mouse);
                that.activateObject(object, mouse);
            });

            this.ticker.bind('pause', function(e) {
                console.log('ticker:pause');
                that.interface.execute('pause');
                config.isPaused = true;
            });

            this.ticker.bind('resume', function(e) {
                console.log('ticker:resume');
                that.interface.execute('resume');
                config.isPaused = false;
            });

            this.interface.bind('pause', function(e) {
                e.preventDefault();
                console.log('interface:pause');
                that.ticker.execute('pause');
            });

            this.interface.bind('resume', function(e) {
                e.preventDefault();
                console.log('interface:resume');
                that.ticker.execute('resume');
            });
        }
    }

    return Core;

});
