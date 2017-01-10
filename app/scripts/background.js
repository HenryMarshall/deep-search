import messageListener from './background/messageListener'
import { initializeQueue } from './background/pageQueue'
messageListener()
initializeQueue()

global.savedState = new Map()

// Enable chromereload by uncommenting this line:
// import './lib/livereload';

chrome.runtime.onInstalled.addListener(function(details) {
  console.log('previousVersion', details.previousVersion)
})

