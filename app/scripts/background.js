'use strict';

import setupListener from './background/setupListener'
import { initializeQueue } from './background/pageQueue'
setupListener()
initializeQueue()

// Enable chromereload by uncommenting this line:
// import './lib/livereload';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

