/*
 * Copyright (C) 2014 United States Government as represented by the Administrator of the
 * National Aeronautics and Space Administration. All Rights Reserved.
 */
/**
 * @version $Id: BasicExample.js 3320 2015-07-15 20:53:05Z dcollins $
 */

requirejs.config({
    paths: {
        'bootstrap': 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min',
        'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min',
        'worldwind': '../worldwind.min'
    },
    shim: {
        "bootstrap": {
            deps: ["jquery"]
        }
    }
});

requirejs(['worldwind', './LayerManager'],
    function (WorldWind, LayerManager) {
        "use strict";

        WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

        var wwd = new WorldWind.WorldWindow("canvasOne");

        var layers = [
            {layer: new WorldWind.BMNGLayer(), enabled: true},
            {layer: new WorldWind.BMNGLandsatLayer(), enabled: false},
            {layer: new WorldWind.BingAerialLayer(null), enabled: false},
            {layer: new WorldWind.BingAerialWithLabelsLayer(null), enabled: true},
            {layer: new WorldWind.BingRoadsLayer(null), enabled: false},
            {layer: new WorldWind.CompassLayer(), enabled: true},
            {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
            {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
        ];

        for (var l = 0; l < layers.length; l++) {
            layers[l].layer.enabled = layers[l].enabled;
            wwd.addLayer(layers[l].layer);
        }

        // Create a layer manager for controlling layer visibility.
        var layerManger = new LayerManager(wwd);
    },
    // Error detection to communicate the library may not have been built
    function (err) {
        //The error has a list of modules that failed
        var failedId = err.requireModules && err.requireModules[0];
        if (failedId === 'worldwind') {
            alert("The compiled WorldWind library was not found. Try building the library: `npm run build` or using the watch command `npm run watch`.");
        }
});
