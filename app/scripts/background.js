'use strict';

import initializeState from './background/savedState'
import setupListener from './background/setupListener'
import { initializeQueue } from './background/pageQueue'
initializeState()
setupListener()
initializeQueue()

// Enable chromereload by uncommenting this line:
// import './lib/livereload';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '.*'});
