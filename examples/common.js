//Configure loading modules from the lib directory,
//except for 'app' ones, which are in a sibling
//directory.
requirejs.config({
    baseUrl: '../src',
    paths: {
        'bootstrap': 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min',
        'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min',
        'layermanager': '../examples/LayerManager',
        'worldwind': [
            '../worldwind.min',
            'WorldWind'
        ]
    },
    shim: {
        "bootstrap": {
            deps: ["jquery"]
        }
    }
});