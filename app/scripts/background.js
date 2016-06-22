'use strict';

import savedState from './background/savedState'
import setupListener from './background/hackathon'
setupListener()

// Enable chromereload by uncommenting this line:
// import './lib/livereload';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'Allo'});

console.log('\'Allo \'Allo! Event Page for Browser Action');


// From hackathon

// var defaultSearch = {
//   "#deepSearch-search": "",
//   "#is-regex": false,
//   "#is-deep": false,
//   "#is-case-insensitive": false
// }
// // To escape the module's scope, you must save as global.*
// global.currentSearch = cloneObj(defaultSearch)

// function cloneObj(obj) {
//   console.log("clonedObj")
//   var clone = {}
//   Object.keys(obj).forEach(function(key) {
//     clone[key] = obj[key]
//   })
//   return clone
// }
