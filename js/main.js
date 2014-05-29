require.config({
    baseUrl: 'js',
    paths: {
        json        : 'external/json',
        text        : 'external/text',
        microevent  : 'external/microevent',
        astar       : 'external/astar',
    },
    shim: {
        microevent  : { exports : 'MicroEvent' },
        astar       : { exports : 'astar' }
    },
    deps            : ['core', 'json!config.json'],
    callback: function(Core, config) {

        var core = new Core(config);

        core.init();
    }
});