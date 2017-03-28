/** Type declaration for ambient System. */
declare const System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    'rxjs': 'libs/rxjs',
    'main': 'main.js',

    // Angular specific mappings.
    '@angular/core': 'libs/@angular/core/bundles/core.umd.js',
    '@angular/common': 'libs/@angular/common/bundles/common.umd.js',
    '@angular/compiler': 'libs/@angular/compiler/bundles/compiler.umd.js',
    '@angular/http': 'libs/@angular/http/bundles/http.umd.js',
    '@angular/forms': 'libs/@angular/forms/bundles/forms.umd.js',
    '@angular/router': 'libs/@angular/router/bundles/router.umd.js',
    '@angular/animations': 'libs/@angular/animations/bundles/animations.umd.js',
    '@angular/animations/browser': 'libs/@angular/animations/bundles/animations-browser.umd.js',
    '@angular/platform-browser': 'libs/@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser/animations':
          'libs/@angular/platform-browser/bundles/platform-browser-animations.umd.js',
    '@angular/platform-browser-dynamic':
      'libs/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    'md2': 'md2/bundles/md2.umd.js'
  },
  packages: {
    // Thirdparty barrels.
    'rxjs': { main: 'index' },
    // Set the default extension for the root package, because otherwise the demo-app can't
    // be built within the production mode. Due to missing file extensions.
    '.': {
      defaultExtension: 'js'
    }
  }
});
