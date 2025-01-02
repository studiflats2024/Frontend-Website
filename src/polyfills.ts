/***************************************************************************************************
 * BROWSER POLYFILLS
 */

/** *************************************************************************************************
 * Modern browsers that support ES6+ (Chrome, Firefox, Safari 10+, Edge) require these polyfills.
 * By default, Angular includes only these polyfills to support Evergreen browsers.
 */

/***************************************************************************************************
 * Zone JS is required by Angular itself.
 */
import 'zone.js';  // Included with Angular CLI.


/** *************************************************************************************************
 * APPLICATION IMPORTS
 */

// Add global polyfills here, such as for internationalization or other libraries.

/**
 * If your application supports Internet Explorer, you'll need additional polyfills.
 * Uncomment the imports below for IE support.
 */

/***************************************************************************************************
 * Polyfills for Legacy Browsers like IE11 and other older versions of browsers
 */

// For IE11, you would uncomment these imports:
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////remove
// import 'core-js/es/object';
// import 'core-js/es/array';
// import 'core-js/es/promise';
// import 'core-js/es/symbol';
// import 'core-js/es/string';
// import 'core-js/es/map';
// import 'core-js/es/set';
// import 'whatwg-fetch';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////remove

/***************************************************************************************************
 * Polyfills for `@angular/platform-browser` for Internet Explorer 9 - 11.
 * These polyfills are needed if you are using Angular's platform-browser module and want to support IE9-11.
 */
// import 'classlist.js';  // Run `npm install --save classlist.js`.

/***************************************************************************************************
 * Additional Polyfills for Browsers
 */

/**
 * Polyfill for `Object.entries` and `Object.values`.
 * IE11 does not support Object.entries and Object.values natively.
 */
// import 'core-js/features/object/entries';
// import 'core-js/features/object/values';

/**
 * Polyfill for `Array.prototype.includes`.
 * IE11 does not support `includes` natively.
 */
// import 'core-js/features/array/includes';

/**
 * Polyfill for `String.prototype.includes`.
 * IE11 does not support `includes` natively.
 */
// import 'core-js/features/string/includes';

/**
 * Polyfill for `String.prototype.startsWith` and `String.prototype.endsWith`.
 * IE11 does not support `startsWith` and `endsWith` natively.
 */
// import 'core-js/features/string/starts-with';
// import 'core-js/features/string/ends-with';

/***************************************************************************************************
 * Other legacy polyfills can be added here as necessary
 */

/** Uncomment the below polyfill if you're using the Reflect API */
// import 'core-js/es/reflect';  // Reflect API, needed for older browsers.

/**
 * Polyfills for Web Animations.
 * Required for: All but Chrome, Firefox and Opera.
 * Optional for: Angular's animation support.
 */
// import 'web-animations-js';  // Run `npm install --save web-animations-js`.

/**
 * Polyfills for Safari 10.
 * Needed for NgClass support on SVG elements.
 */
// import 'classlist.js';  // Run `npm install --save classlist.js`.

/**
 * Polyfills for Intl (Internationalization API).
 * Required for: all browsers except Chrome, Firefox, Edge, IE11 and Safari 10.
 * Note: you may also need to install and include `intl` npm package.
 */
// import 'intl';  // Run `npm install --save intl`.
