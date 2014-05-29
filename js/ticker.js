define(function (require) {

    require('microevent');

    var Ticker = function (config) {

        this.targetFps = config.targetFps;
        this.previousTime = new Date();
        this.fps = 0;
    }

    Ticker.prototype = {

        constructor : Ticker,

        init : function (args) {

            this.tick();
        },
        tick : function () {

            this.timeoutID = setTimeout((function() {
                var timestamp = new Date();
                this.fps = (Math.round((1000 * (1 / (timestamp - this.previousTime)))*10))/10;
                this.trigger('tick', { 'fps' : this.fps, 'time' : Date.now() });
                this.previousTime = timestamp;
                this.tick();;
            }).bind(this), 1000 / this.targetFps);
        },
        pauseCommand : function () {

            clearTimeout(this.timeoutID);
            this.timeoutID = null;
            this.trigger('pause');
        },
        resumeCommand : function () {

            this.tick();
            this.trigger('resume');
        },
        execute : function (command) {

            this[command + 'Command']();
        }
    }

    MicroEvent.mixin(Ticker);

    return Ticker;
});
