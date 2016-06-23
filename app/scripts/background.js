'use strict';

import savedState from './background/savedState'
import setupListener from './background/setupListener'
setupListener()

// Enable chromereload by uncommenting this line:
// import './lib/livereload';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '.*'});
