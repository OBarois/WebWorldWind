var fs = require('fs');
var requirejs = require('requirejs');

var debugTime;

// requirejs configuration
var config = {
    baseUrl: 'src',
    name: '../tools/almond',
    include: ['WorldWind'],
    optimize: 'uglify2',
    generateSourceMaps: true,
    preserveLicenseComments: false,
    out: 'worldwind.min.js',
    wrap: {
        startFile: 'tools/wrap.start',
        endFile: 'tools/wrap.end'
    }
};

// Check if the library has been compiled and compile if it hasn't
if (!fs.existsSync('worldwind.min.js')) {
    console.log('building initial library...');
    requirejs.optimize(config, function (buildResponse) {
        console.log(buildResponse);

    }, function (error) {
        console.error(error);
    });
}

// Watch the src directory for changes and rebuild if there are any
fs.watch('src', {recursive: true}, function (eventType, filename) {
    console.log('updating library due to ' + eventType + " on file: " + filename);
    debugTime = Date.now();
    requirejs.optimize(config, function (buildResponse) {
        console.log(Date.now() - debugTime);
    }, function (error) {
        console.error(error);
    });
});