/**
 * Watches the 'src' directory for file changes (edits, saves, etc.) Rebuilds the minified WorldWind library on a
 * detected change. This implementation uses nodes fs.watch method which does not work on linux based systems (BSD based
 * systems do work).
 */
var fs = require('fs');
var requirejs = require('requirejs');

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
    requirejs.optimize(config, function () {}, function (error) {
        console.error(error);
    });
}

// Watch the src directory for changes and rebuild if there are any
fs.watch('src', {recursive: true}, function (eventType, filename) {
    // WebStorm creates two temporary files with the following extensions for every save. Ducking them here prevents
    // two additional library rebuilds.
    if (filename.endsWith('jb_tmp___') || filename.endsWith('jb_old___')) {
        return;
    }
    console.log('updating library due to change of file: ' + filename);
    requirejs.optimize(config, function () {}, function (error) {
        console.error(error);
    });
});
