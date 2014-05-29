define(function (require) {

    require('microevent');

    var Heartbeat = require('heartbeat');

    var Canvas = function (config) {

        this.beatRate = config.canvas.heartbeat.rate;
        this.gridSize = config.canvas.grid.size;
    }

    Canvas.prototype = {

        constructor : Canvas,

        init : function () {

            this.canvas = document.getElementById('Canvas');
            this.ctx = this.canvas.getContext("2d");
            this.heartbeat = new Heartbeat({
                ctx     : this.ctx,
                rate    : this.beatRate
            });
            this.bindEvents();
        },
        bindEvents : function () {

            this.canvas.onclick = this.trigger.bind(this, 'click');
        },
        execute : function (command, e) {

            this[command + 'Command'](e);
        },
        tickCommand : function (args) {

            this.clear();
            this.render(args.shapes);
            this.heartbeat.execute('tick', args.e);
        },
        clear : function () {

            this.canvas.width = this.canvas.width;
        },
        render : function (objects) {

            var l = objects.length;

            while (l--) {

                if (objects[l].type === 'square') {
                    this.renderSquare(objects[l]);

                } else if (objects[l].type === 'circle') {
                    this.renderCircle(objects[l]);
                }
            }
        },
        renderSquare : function (shape) {

            var selectedFillStyle = 'silver';

            this.ctx.beginPath();
            if (shape.isSelected) {
                this.ctx.fillStyle = selectedFillStyle;
            } else {
                this.ctx.fillStyle = shape.fillStyle;
            }
            var x = shape.snapToGrid ? Math.floor(shape.x/this.gridSize)*this.gridSize + 1 : shape.x;
            var y = shape.snapToGrid ? Math.floor(shape.y/this.gridSize)*this.gridSize + 1 : shape.y;
            this.ctx.rect(x, y, shape.width, shape.height);
            this.ctx.fill();
            this.ctx.stroke();
        },
        renderCircle : function (shape) {

            var selectedFillStyle = 'silver';

            this.ctx.beginPath();
            if (shape.isSelected) {
                this.ctx.fillStyle = selectedFillStyle;
            } else {
                this.ctx.fillStyle = shape.fillStyle;
            }
            var x = shape.snapToGrid ? Math.floor(shape.x/this.gridSize)*this.gridSize + (this.gridSize/2) - 1 : shape.x;
            var y = shape.snapToGrid ? Math.floor(shape.y/this.gridSize)*this.gridSize + (this.gridSize/2) - 1 : shape.y;
            this.ctx.arc(x, y, shape.radius, shape.start, shape.end);
            this.ctx.fill();
            this.ctx.stroke();

        }
    }

    MicroEvent.mixin(Canvas);

    return Canvas;
});

