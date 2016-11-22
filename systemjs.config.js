/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    paths = {
        // paths serve as alias
        'npm:': 'node_modules/',
        "ng2-charts/ng2-charts": "node_modules/ng2-charts/ng2-charts",
        'core-js': 'node_modules/core-js',
    };
    // map tells the System loader where to look for things
    var map = {
        'moment': 'node_modules/moment/moment.js',
        'ng2-bootstrap/ng2-bootstrap': 'node_modules/ng2-bootstrap/bundles/ng2-bootstrap.umd.js',
        'app': 'app', // 'dist',
        '@angular': 'node_modules/@angular',
        'rxjs': 'node_modules/rxjs',
        'ng2-charts': 'node_modules/ng2-charts',
        'primeng': 'node_modules/primeng',
        'angular2-ladda': 'node_modules/angular2-ladda',
        'ladda': 'node_modules/angular2-ladda/node_modules/ladda/js',
        'spin': 'node_modules/angular2-ladda/node_modules/ladda/js/spin.js',
        // 'angular2-ladda': 'node_modules/angular2-ladda',
        // 'ladda': 'node_modules/ladda/js',
        // 'spin': 'node_modules/ladda/js/spin.js',
        'ts-metadata-helper': 'node_modules/ts-metadata-helper',
        'angular2-dynamic-component': 'node_modules/angular2-dynamic-component',
        'angular2-busy': 'node_modules/angular2-busy',
        'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
    };
    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': {main: 'main.js', defaultExtension: 'js'},
        'rxjs': {defaultExtension: 'js'},
        "node_modules/ng2-charts": {defaultExtension: 'js'},
        'node_modules/ng2-slider-component': {
            main: 'ng2-slider.component.system.js',
            defaultExtension: 'system.js'
        },
        primeng: {
            defaultExtension: 'js'
        },
        'angular2-ladda': {main: 'index.js', defaultExtension: 'js'},
        'ladda': {main: 'ladda.js', defaultExtension: 'js'},
        'ts-metadata-helper': {
            defaultExtension: 'js'
        },
        'angular2-dynamic-component': {
            defaultExtension: 'js'
        },
        'angular2-busy': {
            main: './index.js',
            defaultExtension: 'js'
        }
    };

    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'forms',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router',
        'router-deprecated',
        'upgrade',
    ];
    // Individual files (~300 requests):
    function packIndex(pkgName) {
        packages['@angular/' + pkgName] = {main: 'index.js', defaultExtension: 'js'};
    }

    // Bundled (~40 requests):
    function packUmd(pkgName) {
        packages['@angular/' + pkgName] = {main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js'};
    }

    // Most environments should use UMD; some (Karma) need the individual index files
    var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
    // Add package entries for angular packages
    ngPackageNames.forEach(setPackageConfig);
    var config = {
        map: map,
        packages: packages
    };
    System.config(config);
})(this);
