'use strict';
import $ from 'jquery'
// import initializeMatchedLinks from './content/matchedLinks'
// import initializeHighlightMatches from './content/highlightMatches'
import setupListeners from './content/messageListener'

$(document).on('ready', function() {
  setupListeners()
  // initializeMatchedLinks()
  // initializeHighlightMatches()
})
