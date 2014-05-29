define(function (require) {

    require('microevent');

    var CanvasObject = function () {

        this.zIndex = 0;
        this.type = 'object';
        this.height = 0;
        this.width = 0;
        this.x = 0;
        this.y = 0;
        this.lineWidth = 0;
        this.fillStyle = '#ffffff';
        this.strokeStyle = '#000000';
        this.isClickable = false;
        this.isSelectable = false;
        this.isFocusable = false;
        this.hasFocus = false;
        this.translateDelta = 0;
    }

    CanvasObject.prototype = {

        execute : function () {

            var args = [].slice.call(arguments);

            var command = args[0];

            this[command + 'Command'](args.slice(1));
        },
        tickCommand : function () {

            var args = [].slice.call(arguments)[0];
            // console.log(args);
        },
        serialize : function () {

            return {

                zIndex      : 1,
                type        : this.type,
                height      : this.height,
                width       : this.width,
                x           : this.x,
                y           : this.y,
                lineWidth   : this.lineWidth,
                fillStyle   : this.fillStyle,
                strokeStyle : this.strokecolour
            }
        },
        blurCommand : function (e) {
            this.hasFocus = false;
            this.isSelected = false;
        },
        focusCommand : function (e) {
            if (this.isFocusable) {
                this.hasFocus = true;
            }
        },
        clickCommand : function (e) {
            if (this.isClickable) {
                console.log(this);
                console.log('clicked');
            }
        },
        selectCommand : function (e) {
            if (this.isSelectable) {
                this.isSelected = true;
            }
        }
    }

    MicroEvent.mixin(CanvasObject);

    return CanvasObject;
});
